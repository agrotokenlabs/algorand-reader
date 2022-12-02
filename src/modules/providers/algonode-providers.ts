import { ENetworks } from '../common'
import { Provider, ProviderOnlyClient } from './provider'

export class AlgoNodeOnlyClient extends ProviderOnlyClient {
  constructor(network: ENetworks, token?: string) {
    const port = 443
    const algoToken = token ?? ''
    const endpoint = getAlgoNodeServer(network)
    super(algoToken, endpoint, port)
  }
}

export class AlgoNode extends Provider {
  constructor(network: ENetworks) {
    const port = 443
    const endpoint = getAlgoNodeServer(network)
    const indexerEndpoint = getIndexerServer(network)
    super('', endpoint, port, '', indexerEndpoint, port)
  }
}

function getAlgoNodeServer(network: ENetworks) {
  switch (network) {
    case ENetworks.MAINNET:
      return 'https://mainnet-api.algonode.cloud'
    case ENetworks.TESTNET:
      return 'https://testnet-api.algonode.cloud'
    case ENetworks.BETANET:
      return 'https://betanet-api.algonode.cloud'
    default:
      throw new Error('Unknown network')
  }
}

function getIndexerServer(network: ENetworks) {
  switch (network) {
    case ENetworks.MAINNET:
      return 'https://mainnet-idx.algonode.cloud'
    case ENetworks.TESTNET:
      return 'https://testnet-idx.algonode.cloud'
    case ENetworks.BETANET:
      return 'https://betanet-idx.algonode.cloud'
    default:
      throw new Error('Unknown network')
  }
}
