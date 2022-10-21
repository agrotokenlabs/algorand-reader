import algosdk from 'algosdk'

export const client = new algosdk.Algodv2(
  '',
  'https://testnet-api.algonode.cloud',
  '443'
)

export const indexer = new algosdk.Indexer(
  '',
  'https://testnet-idx.algonode.cloud',
  '443'
)
export const address =
  'SXPXEGTVZBIU56NDZC6HA3HZVHAD7CSYECQ2RIKYLMB6KOG43K7UBRGFPI'
export const nonValidAddress = 'ASJJDJDKADIASASJUASKASASXJKSIA'
export const nonBalAddress =
  'LUFRYS56CGKWKFJ62EMYBLVBRYN2IIWSFNA6JCVZQFH6I3363COEAWLG5I'

export const asaId = 113619241
export const testId = 117347664
export const nftId = 117345116
export const nftMetadata = {
  standard: 'arc69',
  description: 'This is a new asset with ARC-69 standar',
  mime_type: 'image/png',
  external_url: '',
  properties: { Key1: 'Value1', Coolness: 'Alot', Miauness: 'Kinda' },
}
