# Algorand Reader v1.0.4

Algorand reader provides a set of functions to read the Algorand blockchain status.
It allows to get balances, check opt-in, get nft metadata ARC-69 compliant and more.

## Installing

Install the package

```bash
npm install algorand-reader
```

## Requisites

Most of the functions uses an Algodv2 client and an Indexer client, you could set up a [sandbox](https://github.com/algorand/sandbox.git) or use an [external provider](https://algonode.io/api/#free-as-in--algorand-api-access).

```javascript
// Algodv2 client using sandbox
const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const server = 'http://localhost'
const port = 4001
const algodClient = new algosdk.Algodv2(token, server, port)

// Indexer client using sandbox
const token = ''
const server = 'http://localhost'
const port = 8980
const indexerClient = new algosdk.Indexer(token, server, port)

// Algodv2 client using a provider like AlgoNode on testnet
const token = ''
const server = 'https://testnet-api.algonode.cloud'
const port = 443
const client = new algosdk.Algodv2(token, server, port)

// Indexer client using a provider like AlgoNode on testnet
const token = ''
const server = 'https://testnet-idx.algonode.cloud'
const port = 443
const indexerClient = new algosdk.Indexer(token, server, port)
```

## Examples

### Get account balance and min balance

```javascript
import * as reader from 'algorand-reader'

const address = 'SXPXEGTVZBIU56NDZC6HA3HZVHAD7CSYECQ2RIKYLMB6KOG43K7UBRGFPI'

const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const server = 'http://localhost'
const port = 4001
const client = new algosdk.Algodv2(token, server, port)

// Check if an account is valid
await reader.validateAddress(address)

// Get balance in algos
await reader.getBalanceAlgos(client, address)

// Get balance in microalgos
await reader.getBalanceMicroalgos(client, address)

// Get min balance
await reader.getMinBalance(client, address)
```

### Get asa account balance and check if the account is opt-in

```javascript
const asaId = 113619241

// Get created asset by an account
await reader.getCreatedAssets(client, address)

// Get asa balance from an account
await reader.getAsaBalance(client, address, asaId)

// Check if the account is opted-in to an asa
await reader.isOptIn(client, address, asaId)

// Get circulating supply of an asa
await reader.getTokenCirculatingSupply(client, testId)
```

### Get metadata from an asa with ARC-69 standard

```javascript
const token = ''
const server = 'http://localhost'
const port = 8980
const indexerClient = new algosdk.Indexer(token, server, port)

const nftId = 117345116

// Get metadata from the NFT
await reader.getAssetMetadata(indexerClient, nftId)
```

### Feel free to file issues, PR and make suggestions, Thanks! 🚀
