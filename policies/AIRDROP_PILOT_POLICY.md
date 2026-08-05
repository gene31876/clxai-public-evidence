# CLXAI Launch Airdrop Pilot Policy

Status: PLANNING ONLY. This document does not authorize a token transfer.

## Purpose

The first CLXAI airdrop is a controlled community-rewards pilot after the
Raydium market is live. It tests recipient validation, Treasury approvals,
distribution accounting, and public communication before any larger campaign.

## Fixed pilot limits

- Source bucket: `community-rewards`
- Earliest distribution: 24 hours after the Raydium pool becomes active
- Maximum recipients: 100
- Amount per recipient: 1,000 CLXAI
- Maximum pilot total: 100,000 CLXAI
- Custody: Squads Treasury `7SfKKpdBTww6UuT2fYUa8fXj6K6Fcj3iCaFWfDZAMyjQ`
- Approval: two independent reviewers plus the existing 2-of-3 Squads vote
- Distribution method: Squads Batch Send

These limits are below the Treasury maximum single release of 1,000,000 CLXAI.
Changing any pilot limit requires a separate reviewed pull request.

## Eligibility

Recipients must be selected using public, objective campaign criteria defined
before the snapshot. Examples are documented community contribution, completed
testing work, or participation in an announced campaign. Wallet purchases,
promised returns, referrals based only on investment, and private payments do
not qualify.

The final CSV contains only public Solana addresses and integer CLXAI amounts.
Do not store names, email addresses, Telegram handles, IP addresses, seed
phrases, private keys, or other personal data in the repository.

## Required process

1. Publish the eligibility rules and snapshot time.
2. Collect public Solana addresses without requesting recovery words.
3. Copy `airdrop/recipients.template.csv` and fill the candidate list.
4. Copy `airdrop/campaign.template.json` and fill the campaign evidence.
5. Record the confirmed CLXAI mint, Raydium pool, activation time, distribution
   time, recipient count, total, and SHA-256 hash of the final CSV.
6. Run `npm run validate:airdrop -- <campaign.json> <recipients.csv>`.
7. Obtain two independent reviews of the exact campaign JSON and CSV hash.
8. Create a normal `community-rewards` Treasury release request.
9. Re-run validation immediately before entering the Squads Batch Send.
10. Compare every address, amount, recipient count, and total in Squads against
    the reviewed files. Two Squads members approve and execute the transaction.
11. Record the Solana transaction signature and update the Treasury ledger.

## Automatic rejection

The validator rejects malformed CSV, duplicate or invalid addresses, internal
Treasury/member/operator addresses, non-integer amounts, amounts other than
1,000 CLXAI, more than 100 recipients, totals above 100,000 CLXAI, mismatched
CSV hashes or totals, wrong network/bucket/vault, a distribution scheduled less
than 24 hours after launch, and incomplete approvals for an approved campaign.

## Pause conditions

Do not create or execute the Squads transaction when the mint or pool is not
independently verified, the Raydium pool is not live, the CSV changes after
review, validation fails, approvals disagree, the Treasury ledger is paused,
or suspicious duplicate/Sybil activity is detected. Resolve the issue through
a new reviewed file version; never repair an approved list during execution.
