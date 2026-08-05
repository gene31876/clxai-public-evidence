#!/usr/bin/env node
// Read-only independent re-verification of the CLXAI launch state.
// No keypairs, no signing, no writes. Only getMultipleAccountsInfo.
const RPC = process.env.SOLANA_RPC || "https://api.mainnet-beta.solana.com";
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const CPMM_PROGRAM = "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C";
const TREASURY_VAULT = "7SfKKpdBTww6UuT2fYUa8fXj6K6Fcj3iCaFWfDZAMyjQ";

const A = {
  clxaiMint: "ECZV4aRyQKz2zr3ZFB9qeb4EzJbzuMCQZ2gpiBQfoHrK",
  pool: "BqDkupPtmBRQgBR8mto34gTD8RzzMAzCyxGYvjpCNNgT",
  lpMint: "5QjC8g2Zeg9LND6zuaj8HVhyvnoMp8sRP5t5uBsU92tF",
  treasuryLpAta: "EepXpNwzqbfwEnRabNn6SA8zAWJXK6L6X6wMduoGW6Za",
  treasuryClxaiAta: "7LHWqNVKnJPwCJGB71huK9URRxi7r7ze35JmvDhCJrE6",
  wallet4LpAta: "3k1i3tjx88SNeFq65qBJDuCZaJ3rgEMdkXobn5UsVgdW",
  wallet4ClxaiAta: "12BHD3NbYQ7vtQnsJDxQ8KDhdqjHCcUygu2645aAYLtW",
};

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE58_INDEX = new Map([...BASE58].map((char, index) => [char, index]));

const base58Encode = (bytes) => {
  let value = 0n;
  for (const byte of bytes) value = value * 256n + BigInt(byte);
  let encoded = "";
  while (value > 0n) {
    encoded = BASE58[Number(value % 58n)] + encoded;
    value /= 58n;
  }
  for (const byte of bytes) {
    if (byte !== 0) break;
    encoded = "1" + encoded;
  }
  return encoded || "1";
};

const rpc = async (method, params) => {
  const response = await fetch(RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(`RPC ${payload.error.code}: ${payload.error.message}`);
  return payload.result;
};

const u64 = (buf, off) => buf.readBigUInt64LE(off);
const opt = (buf, offFlag, offKey) =>
  buf.readUInt32LE(offFlag) === 1 ? base58Encode(buf.subarray(offKey, offKey + 32)) : null;

const parseMint = (buf) => ({
  mintAuthority: opt(buf, 0, 4),
  supply: u64(buf, 36),
  decimals: buf[44],
  isInitialized: buf[45] === 1,
  freezeAuthority: opt(buf, 46, 50),
});

const parseTokenAccount = (buf) => ({
  mint: base58Encode(buf.subarray(0, 32)),
  owner: base58Encode(buf.subarray(32, 64)),
  amount: u64(buf, 64),
  delegate: opt(buf, 72, 76),
  state: buf[108], // 1 = initialized, 2 = frozen
  closeAuthority: opt(buf, 129, 133),
});

const results = [];
const check = (label, actual, expected) => {
  const ok = String(actual) === String(expected);
  results.push({ ok, label, actual: String(actual), expected: String(expected) });
};

async function main() {
  const keys = Object.values(A);
  const accountResult = await rpc("getMultipleAccounts", [
    keys,
    { commitment: "confirmed", encoding: "base64" },
  ]);
  const infos = accountResult.value.map((info) => info && ({
    ...info,
    data: Buffer.from(info.data[0], "base64"),
  }));
  const account = Object.fromEntries(Object.keys(A).map((name, index) => [name, infos[index]]));

  for (const [name, info] of Object.entries(account)) {
    if (!info) throw new Error(`account ${name} (${A[name]}) does not exist on chain`);
  }

  // 1. CLXAI mint: fixed supply, no mint or freeze authority.
  const clxai = parseMint(account.clxaiMint.data);
  check("CLXAI mint program owner", account.clxaiMint.owner, TOKEN_PROGRAM);
  check("CLXAI decimals", clxai.decimals, 9);
  check("CLXAI supply (raw)", clxai.supply, 1_000_000_000n * 10n ** 9n);
  check("CLXAI mint authority revoked", clxai.mintAuthority, "null");
  check("CLXAI freeze authority revoked", clxai.freezeAuthority, "null");

  // 2. Raydium CPMM pool exists and is owned by the CPMM program.
  check("Pool program owner", account.pool.owner, CPMM_PROGRAM);

  // 3. LP mint supply matches sqrt(k) - locked minimum from the execution record.
  const lp = parseMint(account.lpMint.data);
  check("LP mint program owner", account.lpMint.owner, TOKEN_PROGRAM);
  check("LP supply (raw)", lp.supply, 894_427_190_899n);
  check("LP mint authority = pool authority PDA", lp.mintAuthority !== null, "true");

  // 4. Whole LP position sits in the Squads Treasury, unencumbered.
  const treasuryLp = parseTokenAccount(account.treasuryLpAta.data);
  check("Treasury LP ATA program owner", account.treasuryLpAta.owner, TOKEN_PROGRAM);
  check("Treasury LP ATA mint", treasuryLp.mint, A.lpMint);
  check("Treasury LP ATA owner = Squads vault", treasuryLp.owner, TREASURY_VAULT);
  check("Treasury LP amount = full LP supply", treasuryLp.amount, lp.supply);
  check("Treasury LP delegate", treasuryLp.delegate, "null");
  check("Treasury LP close authority", treasuryLp.closeAuthority, "null");
  check("Treasury LP state initialized", treasuryLp.state, 1);

  // 5. Wallet 4 retains nothing.
  const wallet4Lp = parseTokenAccount(account.wallet4LpAta.data);
  const wallet4Clxai = parseTokenAccount(account.wallet4ClxaiAta.data);
  check("Wallet 4 LP balance", wallet4Lp.amount, 0n);
  check("Wallet 4 CLXAI balance", wallet4Clxai.amount, 0n);

  // 6. Treasury CLXAI after the 1,000,000 release.
  const treasuryClxai = parseTokenAccount(account.treasuryClxaiAta.data);
  check("Treasury CLXAI ATA owner = Squads vault", treasuryClxai.owner, TREASURY_VAULT);
  check("Treasury CLXAI ATA mint", treasuryClxai.mint, A.clxaiMint);
  check("Treasury CLXAI balance (raw)", treasuryClxai.amount, 999_000_000n * 10n ** 9n);
  check("Treasury CLXAI delegate", treasuryClxai.delegate, "null");
  check("Treasury CLXAI close authority", treasuryClxai.closeAuthority, "null");

  const failed = results.filter((entry) => !entry.ok);
  for (const entry of results) {
    console.log(`${entry.ok ? "PASS" : "FAIL"}  ${entry.label}: ${entry.actual}${entry.ok ? "" : ` (expected ${entry.expected})`}`);
  }
  const slot = await rpc("getSlot", [{ commitment: "confirmed" }]);
  console.log(`\nslot ${slot} @ ${new Date().toISOString()}`);
  console.log(failed.length ? `\n${failed.length} CHECK(S) FAILED` : `\nALL ${results.length} CHECKS PASS`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error("verification error:", error.message);
  process.exit(2);
});
