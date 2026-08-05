# Permanent CLXAI Metadata

## Decision

Use public Arweave storage for the final logo and metadata JSON. Both permanent URLs were verified before the completed Mainnet deployment. Do not use the CLXAI deployment keypair for storage uploads.

## Security Model

- Use a separate Arweave/ArDrive upload wallet containing only the small amount required for the two uploads.
- Never paste a seed phrase, private key, or wallet JSON into this repository, chat, shell command, or screenshot.
- Upload both files publicly because token metadata must be readable by wallets and explorers.
- Record the Arweave data transaction IDs and SHA-256 hashes.

## Step 1: Upload The Logo

1. Open https://app.ardrive.io using the official link.
2. Create or connect a dedicated upload wallet.
3. Create a public drive or public folder.
4. Upload `metadata/clxai-logo-arweave.png` as `image/png`.
5. Wait until the file resolves at `https://arweave.net/<IMAGE_DATA_TX_ID>`.
6. Compare the downloaded SHA-256 with the repository logo hash:
   `98d2dc8e4e4c7bd6b2afa724474d8a49b76bea2d18190a5cdf39050891a9bf82`.

Do not use an ArDrive metadata transaction ID. Use the file's **data transaction ID**, which directly serves the PNG.

## Step 2: Prepare The Final JSON

Run:

```bash
npm run metadata:prepare -- <IMAGE_DATA_TX_ID>
```

The command validates the 43-character transaction ID and writes an ignored private staging file at `deployments/private/clxai-token-metadata.arweave.json`. Inspect its name, symbol, description, image URL, and hash.

## Step 3: Upload The JSON

Upload the generated JSON publicly as `application/json`. Wait until it resolves at `https://arweave.net/<METADATA_DATA_TX_ID>`, download it again, and compare its SHA-256 with the value printed by the preparation command.

## Step 4: Update Deployment Configuration

Only after both files and hashes are independently verified:

1. Replace the GitHub metadata URI used by the deployment script with `https://arweave.net/<METADATA_DATA_TX_ID>`.
2. Run all tests, preflight, and plan again.
3. Have the second reviewer compare both permanent URLs and hashes.
4. Keep deployment approval blocked until either legal review or a committed owner legal-review waiver is recorded, followed by explicit final approval. A waiver is not legal approval.

## Automated Verification

Run the checked-in copies without network access:

```bash
npm run verify:assets:local
```

Verify the permanent Arweave responses independently:

```bash
npm run verify:assets
```

Both commands check byte counts, SHA-256 hashes, PNG format, and exact metadata fields. They load no wallet or keypair and create no transaction.

## References

- ArDrive CLI and permanent file documentation: https://docs.ardrive.io/docs/cli/using-the-cli.html
- ArFS protocol: https://docs.ardrive.io/
