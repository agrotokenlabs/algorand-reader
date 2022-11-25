# Algorand Reader v1.1.1

Algorand reader provides a set of functions to read the Algorand blockchain status.
It allows to get balances, check opt-in, get nft metadata ARC-69 compliant and more.

## Installing

Install the package

```bash
npm install algorand-reader
```

## Requisites

Most of the functions uses an Algodv2 client and an Indexer client, if you don't specifies any the reader will use default algonode service (Testnet and Mainnet)
of the sandbox standard setup in local.
If you what to overwrite this should pass a Algodv2 and Indexer instance in the Reader constructor.

```javascript
// Simple start
import { Reader, ENetworks } from 'algorand-reader'
const reader = new Reader(ENetworks.TESTNET)
// OR
const algod = new algosdk.Algodv2('a'.repeat(64), 'http://localhost', 4001)
const indexer = new algosdk.Indexer('', 'http://localhost', 8980)
const reader = new Reader(ENetworks.TESTNET, algod, indexer)
```

## Examples

### Account

```javascript
import { Reader } from 'algorand-reader'
// Check if an account is valid
await reader.validateAddress(address)

// Get balance in algos
await reader.getBalanceAlgos(address)

// Get balance in microalgos
await reader.getBalanceMicroalgos(address)

// Get min balance
await reader.getMinBalance(address)
```

### Assets

```javascript
const asaId = 113619241

// Get created asset by an account
await reader.getCreatedAssets(address)

// Get asa balance from an account
await reader.getAsaBalance(address, asaId)

// Check if the account is opted-in to an asa
await reader.isOptIn(address, asaId)

// Get circulating supply of an asa
await reader.getTokenCirculatingSupply(testId)

// Get metadata from an asa with ARC-69 standard
const nftId = 117345116
await reader.getAssetMetadata(indexerClient, nftId)
```

### Transactions

```javascript
// Get the pending transactions for a given account
await reader.getPendingTx(address)

// Get a true if the account has pending transactions
await reader.thereArePendingTxs(address)
```

### Feel free to file issues, PR and make suggestions, Thanks! 🚀
