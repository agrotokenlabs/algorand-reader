export type Asset = {
  'amount': number
  'asset-id': number
  'is-frozen': boolean
}

export type AssetInfo = {
  index: number
  params: {
    'clawback': string
    'creator': string
    'decimals': number
    'default-frozen': boolean
    'freeze': string
    'manager': string
    'metadata-hash': string
    'name': string
    'name-b64': string
    'reserve': string
    'total': number
    'unit-name': string
    'unit-name-b64': string
  }
}

export type CreatedAsset = {
  index: number
  params: {
    'creator': string
    'clawback'?: string
    'freeze'?: string
    'manager'?: string
    'reserve'?: string
    'decimals': number
    'default-frozen': boolean
    'name': string
    'name-b64': string
    'total': number
    'unit-name': string
    'unit-name-b64': string
    'url': string
    'url-b64': string
  }
}

export type AccountInformation = {
  'address': string
  'amount': number
  'amount-without-pending-rewards': number
  'apps-local-state': []
  'apps-total-schema': { 'num-byte-slice': 0; 'num-uint': 0 }
  'assets': Asset[]
  'created-apps': []
  'created-assets': CreatedAsset[]
  'min-balance': number
  'pending-rewards': number
  'reward-base': number
  'rewards': number
  'round': number
  'status': string
  'total-apps-opted-in': number
  'total-assets-opted-in': number
  'total-created-apps': number
  'total-created-assets': number
}

export type PendingTxs = {
  'top-transactions': []
  'total-transactions': number
}

export enum ENetworks {
  LOCAL,
  TESTNET,
  MAINNET,
  BETANET,
}
