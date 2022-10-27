import algosdk from 'algosdk'

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

export const ALGOD_MAINNET = new algosdk.Algodv2(
  EMPTY_TOKEN,
  ALGOD_MAINNET_SERVER,
  ALGONODE_PORT
)

export const ALGOD_TESTNET = new algosdk.Algodv2(
  EMPTY_TOKEN,
  ALGOD_TESTNET_SERVER,
  ALGONODE_PORT
)

export const ALGOD_SANDBOX = new algosdk.Algodv2(
  SANDBOX_TOKEN,
  SANDBOX_SERVER,
  ALGOD_SANDBOX_PORT
)

export const INDEXER_MAINNET = new algosdk.Indexer(
  EMPTY_TOKEN,
  INDEXER_MAINNET_SERVER,
  ALGONODE_PORT
)

export const INDEXER_TESTNET = new algosdk.Indexer(
  EMPTY_TOKEN,
  INDEXER_TESTNET_SERVER,
  ALGONODE_PORT
)

export const INDEXER_SANDBOX = new algosdk.Indexer(
  EMPTY_TOKEN,
  SANDBOX_SERVER,
  INDEXER_SANDBOX_PORT
)
