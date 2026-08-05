# CLXAI Tokenomics and Launch Plan

## Verified Token

- Network: Base Mainnet
- Contract: `0x551e78c8f240efe7dadd9f8c388f852b8601260d`
- Symbol: `CLXAI`
- Decimals: `18`
- Fixed total supply: `1,000,000,000 CLXAI`
- Additional minting: impossible

## Current On-Chain Allocation

Last confirmed state:

| Wallet | Role | CLXAI |
| --- | --- | ---: |
| `0x6875B10379F9ff76b44f1902b2208109567dBD5E` | Founder reserve | 100,000,000 |
| `0xEadAFE6cCB6a13a3173E7000095Fd6202C1af8c3` | Temporary deploy wallet | 900,000,000 |

The deploy wallet is temporary custody, not the final treasury structure.

## Target Allocation

| Allocation | Share | CLXAI | Purpose |
| --- | ---: | ---: | --- |
| Liquidity | 30% | 300,000,000 | Initial and future Base liquidity |
| Community and rewards | 25% | 250,000,000 | Campaigns, contribution rewards, future staking |
| Treasury and development | 20% | 200,000,000 | Product, infrastructure, audits, operations |
| Marketing and partnerships | 15% | 150,000,000 | Growth, listings, partnerships, market making |
| Founder reserve | 10% | 100,000,000 | Existing founder allocation |
| **Total** | **100%** | **1,000,000,000** | |

## Wallet Architecture

Do not keep operational allocations in the local deploy wallet.

Recommended target wallets:

1. `CLXAI Treasury Safe`: multisig for treasury and development.
2. `CLXAI Liquidity Safe`: multisig controlling liquidity assets and LP positions.
3. `CLXAI Community Safe`: multisig for rewards and future staking emissions.
4. `CLXAI Marketing Safe`: multisig with a limited operational balance.
5. Founder wallet: existing wallet, publicly disclosed as founder reserve.

Use at least a 2-of-3 multisig for treasury, liquidity, and community funds. Keep signer recovery methods offline and never store all signer secrets on one computer.

## Distribution Rules

- No transfer from the deploy wallet before the destination address and role are recorded.
- Test each new wallet with a small CLXAI transfer before moving the full allocation.
- Publish treasury and allocation addresses on the official website.
- Use vesting or a documented release schedule for founder, marketing, and rewards allocations.
- Do not advertise staking APY until the reward source and duration are mathematically funded.
- Do not create a public liquidity pool until the initial price, ETH amount, CLXAI amount, range, and LP custody are approved.

## Proposed Release Schedule

### Founder reserve

- Allocation: 100,000,000 CLXAI
- Suggested lock: 12 months
- Suggested vesting after lock: 24 months linear

### Marketing and partnerships

- Allocation: 150,000,000 CLXAI
- Initial operational amount: maximum 15,000,000 CLXAI
- Remaining allocation: monthly or milestone-based release

### Community and rewards

- Allocation: 250,000,000 CLXAI
- Release only against published campaigns or a funded staking program
- Suggested maximum first-year distribution: 50,000,000 CLXAI

### Treasury and development

- Allocation: 200,000,000 CLXAI
- Multisig approval required
- Public quarterly reporting recommended

### Liquidity

- Allocation ceiling: 300,000,000 CLXAI
- Do not place the full allocation into the first pool
- Start with a smaller pool and retain reserves for later liquidity support

## Launch Gates

The public launch should happen only after all required gates are complete:

- [x] Base Mainnet token deployed
- [x] Contract source verified
- [x] Fixed supply confirmed
- [ ] Mainnet balances rechecked
- [ ] Treasury multisig created
- [ ] Liquidity multisig created
- [ ] Community multisig created
- [ ] Marketing wallet created
- [ ] Allocation transfers completed and documented
- [ ] Website published
- [ ] Official X and Telegram links published
- [ ] BaseScan token profile submitted
- [ ] Legal disclaimer and risk notice published
- [ ] Initial pool parameters approved
- [ ] LP custody or lock policy published

## Staking Position

CLXAI does not use Proof of Work. Base provides blockchain security.

Staking should be introduced only as a separate audited rewards contract. A sustainable staking plan must define:

- reward allocation;
- emission period;
- maximum annual distribution;
- lock periods;
- early withdrawal behavior;
- administrative permissions;
- emergency controls;
- contract audit and test coverage.

Until those items are complete, CLXAI should not promise staking returns.
