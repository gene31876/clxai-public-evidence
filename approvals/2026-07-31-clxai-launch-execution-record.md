# CLXAI Raydium Launch Execution Record

**Status: EXECUTED AND INDEPENDENTLY VERIFIED - AUTHORIZES NOTHING FURTHER**

This record documents what actually happened during the launch ceremony of
2026-07-31. It is a factual record only. The launch configuration and the
Treasury ledger are reset to their blocked and paused states in the same pull
request, so nothing here authorizes a further release, a second pool, a
deposit, a farm, or any other transaction.

The SHA-256-bound approval record
`approvals/2026-07-31-clxai-raydium-launch-approval.md` is deliberately left
untouched. Its bytes are pinned by the launch gate and must never be edited.

## Result

- Pool: `BqDkupPtmBRQgBR8mto34gTD8RzzMAzCyxGYvjpCNNgT`
- LP mint: `5QjC8g2Zeg9LND6zuaj8HVhyvnoMp8sRP5t5uBsU92tF`
- Treasury LP token account: `EepXpNwzqbfwEnRabNn6SA8zAWJXK6L6X6wMduoGW6Za`
- LP held by the Squads Treasury: `894.427190899`
- LP held by Wallet 4: `0`
- Treasury CLXAI after the release: `999000000`
- Venue: Raydium CPMM, program `CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C`
- Fee configuration: `D4FPEruKEHrG5TenZ2mpDGEfu1iUvTiqBxvpU8HLBvC2`, 0.25%
- Creator fee: disabled

## Ceremony transactions

All three were read back from chain by the independent reviewer and matched
against the approved parameters.

### 1. Treasury release, Squads 2-of-3

- Signature:
  `2oJdu925dVYVvEURvCWd3coEECFJDY8GsAfvFvDKiNyhR7xb2G3HgLvSQ2epkufeU2BUGTKqqVZNxjkrXSMcivvt`
- UTC: `2026-07-31T09:49:38Z`, slot `436334111`, no error
- Moved `1000000` CLXAI from the Treasury token account
  `7LHWqNVKnJPwCJGB71huK9URRxi7r7ze35JmvDhCJrE6` to the Wallet 4 token account
  `12BHD3NbYQ7vtQnsJDxQ8KDhdqjHCcUygu2645aAYLtW`
- Transfer authority: `7SfKKpdBTww6UuT2fYUa8fXj6K6Fcj3iCaFWfDZAMyjQ`, the Squads
  Treasury vault
- Fee payer: `A5mMpzxrdvF3qLc6JhVwVrDBubeNUuto9gNy1r7SiMfc`, a recorded Squads
  signer
- Matches release request `CLXAI-REL-20260731-001`

### 2. Pool creation

- Signature:
  `2E4VM9GEWXQdJx9HqqKZUFty6yCmMZHrGZTAQsM9h1f9Ccp7WxSoYZmdLqmXVEAvq5b7b1WjKosugqZhHv8oXCB6`
- UTC: `2026-07-31T10:02:31Z`, slot `436335948`, no error
- Fee payer and signer: Wallet 4
- Deposited exactly `1000000` CLXAI and exactly `800` USDC into the pool vaults

The deposit amounts are confirmed independently by the LP supply. Constant
product initial liquidity is the square root of the product of the raw
deposits, minus the permanently locked minimum:
`sqrt(1000000000000000 * 800000000) - 100 = 894427190899`, which is the exact
LP mint supply observed on chain. Wallet 4 held `800.001` USDC at the time
because of the dust described below; the extra `0.001` USDC stayed out of the
pool.

### 3. LP transfer to the Treasury

- Signature:
  `4ceYUU8Qfu4kDdNnFdq27w9cSC6Lef1RA1vvxFowhe7jucxELQHY7PVfE55wNZExy2QpPgpHUafRLfJenVcRCyt7`
- UTC: `2026-07-31T11:06:52Z`, slot `436345081`, no error
- Moved all `894.427190899` LP from the Wallet 4 token account
  `3k1i3tjx88SNeFq65qBJDuCZaJ3rgEMdkXobn5UsVgdW` to
  `EepXpNwzqbfwEnRabNn6SA8zAWJXK6L6X6wMduoGW6Za`
- Transfer authority: Wallet 4

## Independent verification of the LP destination

`npm run preflight:lp-destination -- --mint 5QjC8g2Zeg9LND6zuaj8HVhyvnoMp8sRP5t5uBsU92tF`
returned PASS at `2026-07-31T11:22:43Z`.

The destination was additionally confirmed without relying on the repository's
own derivation helper. The associated token address was recomputed from the
published program identifiers, and the on-chain account facts were read
directly, which is decisive because they do not depend on any derivation:

- Program owner: `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`, the classic
  Token Program
- Account owner: `7SfKKpdBTww6UuT2fYUa8fXj6K6Fcj3iCaFWfDZAMyjQ`, the Squads
  Treasury vault
- Mint: the LP mint
- Delegate: none. Close authority: none. State: initialized

No third party can move or close the account.

## Launch-day incidents

### Wallet 4 SOL cap

The first balance preflight of the day failed at `2026-07-31T07:58:18Z` because
Wallet 4 held `0.410001000` SOL against the documented cap of `0.3` SOL, after
an owner-authorized fee reserve of `0.4` SOL arrived at `07:17:55Z`. The launch
was blocked until `0.16` SOL was returned to Wallet 5 at `08:14:03Z` in
transaction
`42Ax4CT7K331Pm5eRmbAQabMPdAGfkbxkMrKUF6yDwt6kCKv8VDqXPfqwAjcqpoog9jJZt9vR58hRxNwEojoXzAb`.
Full detail is in the approval record.

### Address poisoning

Three dust transfers from lookalike addresses were observed. None of them moved
project funds and none was answered.

| UTC | Amount | Sender | Impersonates |
| --- | --- | --- | --- |
| `2026-07-31T07:18:23Z` | 1000 lamports | `Cq12odg4SPN9R8CTUSGZ2hCiMN6g2PDEVEiMxJxU4qo3` | the SOL funding source |
| `2026-07-31T09:13:15Z` | 0.001 USDC to Wallet 4 | `BXmKaJZC1ABhgEeQsUiF3iac6zpRHSuFhJeGiWq6dMpo` | Wallet 5 |
| `2026-07-31T09:13:15Z` | 0.001 USDC to Wallet 5 | `4bVPetaajLw2FqRnheojFnnbeXxp1SAiH2cuYqk9a6SE` | Wallet 4 |

The two USDC transfers landed in the same slot, 23 seconds after the legitimate
800 USDC funding, and impersonate the two wallets across each other. An earlier
attempt from `DGFWsdBWgnek2skXrYv1L3TSp2oYzZWWUa38qXYdko8K` against Wallet 5 is
recorded on `2026-07-22`, so the addresses have been watched for at least nine
days.

Each fake address shares the first four and last four characters of the address
it imitates. Checking only the beginning and the end of an address is therefore
not an acceptable control. Every address used in this ceremony was taken from
the pinned repository configuration and compared in full.

## Cost

Wallet 4 held `0.249980000` SOL before pool creation and `0.055757427` SOL
after the ceremony. Pool creation itself consumed `0.192176720` SOL, against a
pre-launch estimate of `0.192358560` SOL derived from the protocol fee of
`0.15` SOL plus account rent. The `0.3` SOL cap was never approached.

## Follow-up

- Wallet 4 has served its purpose, has been dusted by a poisoning campaign, and
  is to be retired. It must not be reused as an operator wallet.
- `controls.allowedDestinations` in the Treasury ledger is intentionally empty.
  Any future release requires a reviewed pull request that adds a destination
  and reopens the ledger.
