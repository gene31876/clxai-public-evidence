# CLXAI Roles And Approval Policy

**Status: DRAFT - Mainnet deployment is complete; Treasury, migration, and DEX launch actions remain subject to their separate approval controls.**

## Purpose

This policy separates review, deployment, treasury approval, migration processing, and public communications. No person should be able to create, approve, execute, and reconcile the same high-impact operation alone.

## Roles

### Project Owner

- approves the final public parameters and launch decision;
- confirms official communication channels;
- never shares seed phrases or private key files;
- cannot replace the required independent technical review;
- may waive external legal review only through a committed owner risk-acceptance record that states legal approval was not obtained.

### Independent Technical Reviewer

Reviewer-count policy (2026-07-24): DEX launch approval, Treasury release
requests, and launch evidence records require one independent technical
review instead of two under the documented owner decision of that date. The
owner cannot act as the independent reviewer. The airdrop pilot and migration
policies keep their own reviewer requirements. The change is not retroactive.
The underlying owner decision record remains in the private operational
repository and is outside this curated public evidence scope.

For the Airdrop pilot, the temporary two-person control is one independent
technical review by `ForeverInLaw` plus a separate explicit owner decision by
`gene31876`, under the documented temporary owner decision dated 2026-08-05.
The owner does not count as an independent reviewer. Both decisions must
reference the exact campaign JSON and recipient CSV hash. Repository access
alone does not count as approval. The underlying owner decision record remains
in the private operational repository and is outside this curated public
evidence scope.

- reviews the pinned repository commit and completes SECOND_REVIEW_CHECKLIST.md;
- runs only the keyless reviewer commands;
- records findings and an Approved or Rejected decision;
- does not receive the deployer keypair;
- does not execute Mainnet transactions as part of the review.

### Deployment Operator

- runs one guarded deployment stage at a time from the reviewed commit;
- controls only the fee-payer key required for deployment;
- compares every printed address and transaction before continuing;
- stops immediately on any mismatch;
- cannot approve Squads transactions alone.

The project owner may be the deployment operator, but the independent reviewer must remain a different person.

### Squads Signers

- independently inspect every Treasury proposal;
- approve only proposals matching the published purpose, destination, amount, and token;
- maintain separate recovery methods and devices;
- require the configured 2-of-3 threshold;
- never approve an unexplained or hurried transaction.

### Migration Operator

- accepts only pre-approved pilot requests while migration status is OPEN;
- verifies Base lock before preparing Solana release;
- records unique request, Base transaction, and Solana signature identifiers;
- cannot mark their own release complete without a second reviewer;
- pauses immediately on an incident trigger.

### Reconciliation Reviewer

- independently compares Base locks, Solana releases, and Treasury balance;
- signs each published reconciliation;
- must not be the sole migration operator for the reviewed batch.

### Legal Reviewer

- reviews migration terms, target jurisdictions, marketing claims, privacy, sanctions obligations, and tax disclosures;
- provides written approval or required changes;
- does not provide technical deployment approval.

### Owner Legal-Review Waiver

External legal review is strongly recommended. If the project owner elects to proceed without it, the owner must commit a dated waiver that explicitly states legal approval was not obtained and accepts responsibility for the resulting regulatory and legal risks. A waiver is not legal advice, legal review, regulatory clearance, or evidence of compliance. It does not waive applicable laws or obligations, and it does not replace any technical review, transaction approval, or jurisdiction-specific requirement imposed by a service provider or authority.

## Historical Mainnet Deployment Gates

All gates must be recorded before changing configuration status to approved:

1. Exact repository commit pinned.
2. Independent technical review approved with no unresolved critical or high finding.
3. Dependency audit reviewed and accepted.
4. Permanent metadata and logo hashes verified.
5. Squads 2-of-3 vault and members verified.
6. Legal review completed for intended launch jurisdictions, or a committed owner waiver records that legal approval was not obtained and accepts the resulting risks.
7. Website and official status channels finalized.
8. Migration remains closed or has separately approved OPEN terms.
9. Project owner gives explicit written Mainnet approval.
10. Deployment operator repeats preflight and plan immediately before stage one.

## Deployment Ceremony

1. Record date, participants, reviewed commit, RPC endpoint, and machine used.
2. Run npm ci, tests, audit, preflight, and plan.
3. Independent observer compares fee payer, Treasury, supply, decimals, and metadata URI.
4. Approve only the create-mint stage and record its signature.
5. Independently inspect the zero-supply mint and null freeze authority.
6. Approve create-supply; verify the full Treasury balance.
7. Approve create-metadata; verify permanent URI and update authority.
8. Run verification before finalization.
9. Approve finalize; permanently revoke mint authority.
10. Verify again and export the public deployment record.
11. Publish the mint only after the record receives a second check.

No stage may be skipped or combined. A failure pauses the ceremony. Do not silently create a replacement mint.

## Squads Transaction Review

Before a signer approves any proposal, they must independently compare:

- Squad and vault address;
- token mint and token program;
- source and destination accounts;
- human-readable amount and raw base units;
- instruction count and every program invoked;
- memo or documented purpose;
- expected post-transaction Treasury balance.

A signer must reject or pause if the interface hides instructions, simulation fails, the destination changed, or the transaction differs from its written approval record.

## Secret Handling

- Never commit, email, message, screenshot, or cloud-sync seed phrases or keypair JSON files.
- Never type a seed phrase into a website reached through a message or advertisement.
- Reviewer access is public and keyless.
- Deployer and Squads signer recovery materials remain separated.
- Suspected compromise immediately blocks deployment and migration.

## Required Records

- technical review statement;
- legal review statement, or the committed owner legal-review waiver and risk-acceptance record;
- final project-owner approval;
- deployment ceremony log;
- all Mainnet signatures;
- exported deployment record;
- Squads proposal and execution references;
- migration batch and reconciliation records;
- incident and pause decisions.
