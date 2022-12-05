# Algorand Reader v1.1.2

Algorand reader provides a set of functions to read the Algorand blockchain status.
It allows to get balances, check opt-in, get nft metadata ARC-69 compliant and more.

## Installing

Install the package

```bash
npm install algorand-reader
```

## Requisites

Most of the functions requires a provider like an Algodv2 client and an Index client.
You could provide a custom client or initialize an know service provider like Algonode or use sandbox.

```javascript
// Simple start with Algonode
import { Reader, ENetworks, AlgoNode } from 'algorand-reader'
const provider = new AlgoNode(ENetworks.TESTNET)
const reader = new Reader(provider)

// OR with Sandbox
import { Reader, ENetworks, Sandbox } from 'algorand-reader'
const provider = new Sandbox()
const reader = new Reader(provider)

// OR using a custom provider
import { Reader, ENetworks, Provider } from 'algorand-reader'
const provider = new Provider(
  'a'.repeat(64), // Algodv2-token
  'http://localhost', // Algodv2-server
  4001, // Algodv2-port
  '', // Indexer-token
  'http://localhost', // Indexer-server
  8980 // Indexer-port
)
const reader = new Reader(provider)
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
