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
