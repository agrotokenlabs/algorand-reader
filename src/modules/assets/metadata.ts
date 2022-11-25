import { Indexer, Algodv2 } from 'algosdk'
import { AssetInfo } from '../common/types'
import { getCreatedAssets } from './assets'

function getAndDecodeNote(txRecord: unknown) {
  const txNote = txRecord['note']
  if (!txNote) throw new Error('Asset do not have note msg')
  const decodedNote = Buffer.from(txNote, 'base64').toString('utf8')
  try {
    return JSON.parse(decodedNote)
  } catch (e) {
    throw new Error('Asset not compatible with ARC-69')
  }
}

async function getAsaCreationTx(indexer: Indexer, assetId: number) {
  const assetTx = await indexer.lookupAssetTransactions(assetId).do()
  const createTx = assetTx['transactions'][0]
  return createTx
}

/**
 * Lookup an asset id using the metadataHash if the asset have one
 * @param client
 * @param hashKey
 * @param creator
 * @returns number
 */
export async function getAssetIdByMetadataHash(
  client: Algodv2,
  hash: string,
  creator: string
): Promise<number> {
  const assets = (await getCreatedAssets(client, creator)) as AssetInfo[]
  const asset = assets.find((asa) => asa['params']['metadata-hash'] == hash)
  return asset == undefined ? -1 : asset.index
}

/**
 * Returns the metadata stored in the creation tx of an asa
 * Using the ARC-69 standard for NFT metadata.
 * @param indexer: Indexer
 * @param assetId: number
 * @returns: string
 */
export async function getAssetMetadata(
  indexer: Indexer,
  assetId: number
): Promise<string> {
  const createTx = await getAsaCreationTx(indexer, assetId)
  return getAndDecodeNote(createTx)
}
