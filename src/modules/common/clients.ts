import algosdk from 'algosdk'
import { ENetworks } from './types'

const INDEXER_MAINNET_SERVER = 'https://mainnet-idx.algonode.cloud'
const INDEXER_TESTNET_SERVER = 'https://testnet-idx.algonode.cloud'
const ALGOD_MAINNET_SERVER = 'https://mainnet-api.algonode.cloud'
const ALGOD_TESTNET_SERVER = 'https://testnet-api.algonode.cloud'
const SANDBOX_TOKEN = 'a'.repeat(64)
const SANDBOX_SERVER = 'http://localhost'
const ALGONODE_PORT = 443
const ALGOD_SANDBOX_PORT = 4001
const INDEXER_SANDBOX_PORT = 8980
const EMPTY_TOKEN = ''

const ALGOD_MAINNET = new algosdk.Algodv2(
  EMPTY_TOKEN,
  ALGOD_MAINNET_SERVER,
  ALGONODE_PORT
)

const ALGOD_TESTNET = new algosdk.Algodv2(
  EMPTY_TOKEN,
  ALGOD_TESTNET_SERVER,
  ALGONODE_PORT
)

const ALGOD_SANDBOX = new algosdk.Algodv2(
  SANDBOX_TOKEN,
  SANDBOX_SERVER,
  ALGOD_SANDBOX_PORT
)

const INDEXER_MAINNET = new algosdk.Indexer(
  EMPTY_TOKEN,
  INDEXER_MAINNET_SERVER,
  ALGONODE_PORT
)

const INDEXER_TESTNET = new algosdk.Indexer(
  EMPTY_TOKEN,
  INDEXER_TESTNET_SERVER,
  ALGONODE_PORT
)

const INDEXER_SANDBOX = new algosdk.Indexer(
  EMPTY_TOKEN,
  SANDBOX_SERVER,
  INDEXER_SANDBOX_PORT
)

export function getAlgodClient(network: ENetworks) {
  switch (network) {
    case ENetworks.MAINNET:
      return ALGOD_MAINNET
    case ENetworks.TESTNET:
      return ALGOD_TESTNET
    case ENetworks.LOCAL:
      return ALGOD_SANDBOX
    default:
      throw new Error('Invalid network')
  }
}

export function getIndexerClient(network: ENetworks) {
  switch (network) {
    case ENetworks.MAINNET:
      return INDEXER_MAINNET
    case ENetworks.TESTNET:
      return INDEXER_TESTNET
    case ENetworks.LOCAL:
      return INDEXER_SANDBOX
    default:
      throw new Error('Invalid network')
  }
}
