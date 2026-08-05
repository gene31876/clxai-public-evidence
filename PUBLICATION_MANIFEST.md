# Publication Manifest

Status: local draft pending independent review

This repository is built from an explicit allowlist. It must not inherit the
private development repository's Git history.

## Included scope

- official Solana deployment identifiers and transaction signatures;
- permanent metadata records and content hashes;
- public token allocation, custody, and release controls;
- reviewed launch execution and Treasury release evidence;
- public Airdrop policy without recipient data;
- a read-only on-chain verification script;
- token metadata and the permanent public logo asset.

## Explicit exclusions

- private Git history and development branches;
- Squads screenshots and connected-wallet captures;
- seed phrases, keypairs, private keys, recovery material, or wallet files;
- signer identities not explicitly approved for publication;
- local paths, databases, logs, caches, build artifacts, and `node_modules`;
- server credentials, SSH details, deployment access, or private endpoints;
- unreviewed recipient lists or personal member data.

## Publication gate

Before this repository becomes public:

1. generate and record the complete tree/file hashes;
2. run secret and personal-data checks;
3. run `npm run verify:onchain` in a clean copy;
4. obtain an independent decision on the exact commit;
5. obtain an explicit owner decision to publish that reviewed commit.

No review or publication authorizes token movement.
