# CLXAI Public Evidence

This repository contains curated public technical evidence for CLXAI on
Solana. It is intentionally separate from private development and operational
repositories.

## Official identifiers

- Network: Solana Mainnet
- Token: CLXAI
- Mint: `ECZV4aRyQKz2zr3ZFB9qeb4EzJbzuMCQZ2gpiBQfoHrK`
- Decimals: 9
- Fixed supply: 1,000,000,000 CLXAI
- Official pair: CLXAI/USDC
- Raydium CPMM pool:
  `BqDkupPtmBRQgBR8mto34gTD8RzzMAzCyxGYvjpCNNgT`
- Website: https://core-logic-x.com/

Always compare complete addresses. Do not rely on shortened prefixes or
suffixes.

## Controls

- Mint authority: revoked
- Freeze authority: revoked
- Treasury custody: Squads 2-of-3 multisig
- Complete official LP position: held by the Squads Treasury at the latest
  published verification
- Public reviewer alias: `ForeverInLaw`

Signer identities and recovery materials are not public. Roles, approvals,
official addresses, transaction signatures, and on-chain results are published
where appropriate.

## Verify

The read-only verifier loads no wallet or keypair and creates no transaction.

```bash
npm run verify:onchain
```

The verifier uses only Node.js built-ins and has no third-party npm
dependencies.

Verification requires public Solana RPC access. An optional endpoint can be
selected with `SOLANA_RPC`; never put wallet secrets in that variable or in
this repository.

## Scope and limitations

This evidence does not authorize a token transfer, Treasury release, Airdrop,
pool change, or other on-chain action. It is not legal, tax, or investment
advice and does not promise price, liquidity, returns, listings, allocations,
or project outcomes.

Market values change continuously. Use public market sources for current
price, liquidity, volume, and transaction activity.

## Source integrity

`PUBLICATION_MANIFEST.md` records the curated source files and expected review
scope. Changes should be reviewed before publication. Private development Git
history, Squads screenshots, key material, server access data, caches, and
local working files are outside this repository's scope.
