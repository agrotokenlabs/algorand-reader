import * as metadata from '../index'
import {
  indexer,
  asaId,
  nftId,
  nftMetadata,
  testId,
  // client,
  // address,
} from './testConfig'

describe('MetadataTest: Happy Path', () => {
  it('Should get the metadata of the asset', async () => {
    const metadataInfo = await metadata.getAssetMetadata(indexer, nftId)
    expect(metadataInfo).toEqual(nftMetadata)
  })

  // it('Should the the asset by it metadata hash', async () => {
  //   const hash = 'this is a hash'
  //   const asset = await metadata.getAssetIdByMetadataHash(client, hash, address)
  //   console.log(asset)
  // })
})

describe('MetadataTest: Unhappy Path', () => {
  it('Should throw an error if the asset does not exist', async () => {
    await expect(metadata.getAssetMetadata(indexer, 0)).rejects.toThrow()
  })

  it('Should throw an error if the asset does not have a note', async () => {
    await expect(metadata.getAssetMetadata(indexer, testId)).rejects.toThrow()
  })

  it('Should throw an error if the asset does not have metadata', async () => {
    await expect(metadata.getAssetMetadata(indexer, asaId)).rejects.toThrow()
  })
})
