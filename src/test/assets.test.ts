import { ENetworks, Reader } from '../'
import * as test from './testConfig'

describe('AssetsTest: Happy Path', () => {
  const reader = new Reader(ENetworks.TESTNET)

  it('Should get all the asset crated by a waller', async () => {
    const createdAssets = await reader.getCreatedAssets(test.address)
    expect(createdAssets.length).toEqual(3)
  })

  it('Should get all the asset crated by a waller', async () => {
    const createdAssets = await reader.getCreatedAssets(test.nonBalAddress)
    expect(createdAssets.length).toEqual(0)
  })

  it('Should get the asa balance of one asset', async () => {
    const createdAssets = await reader.getCreatedAssets(test.address)
    const asaId = createdAssets[0].index
    const asaBalance = await reader.getAsaBalance(test.address, asaId)
    expect(asaBalance).toEqual(1)
  })

  it('Should return zero if the adders do not have that asset', async () => {
    const asaBalance = await reader.getAsaBalance(
      test.nonBalAddress,
      test.asaId
    )
    expect(asaBalance).toEqual(0)
  })

  it('Should return true if the account is optIn', async () => {
    const isOptIn = await reader.isOptIn(test.address, test.asaId)
    expect(isOptIn).toEqual(true)
  })

  it('Should return false if the account is not optIn', async () => {
    const isOptIn = await reader.isOptIn(test.nonBalAddress, test.asaId)
    expect(isOptIn).toEqual(false)
  })

  it('Should return the circulating supply of the token', async () => {
    const circulating = await reader.getTokenCirculatingSupply(test.testId)
    expect(circulating).toEqual(5000000000)
  })

  describe('MetadataTest: Happy Path', () => {
    it('Should get the metadata of the asset', async () => {
      const metadataInfo = await reader.getAssetMetadata(test.nftId)
      expect(metadataInfo).toEqual(test.nftMetadata)
    })

    // it('Should the the asset by it metadata hash', async () => {
    //   const hash = 'this is a hash'
    //   const asset = await metadata.getAssetIdByMetadataHash(client, hash, address)
    //   console.log(asset)
    // })
  })
})

describe('AssetsTest: Unhappy Path', () => {
  const reader = new Reader(ENetworks.TESTNET)

  it('Should throw an error if the address is not valid: getCreatedAssets', async () => {
    await expect(
      reader.getCreatedAssets(test.nonValidAddress)
    ).rejects.toThrow()
  })

  it('Should throw an error if the address is not valid: getAsaBalance', async () => {
    const createdAssets = await reader.getCreatedAssets(test.address)
    const asaId = createdAssets[0].index
    await expect(
      reader.getAsaBalance(test.nonValidAddress, asaId)
    ).rejects.toThrow()
  })

  it('Should throw an error if the address is not valid: isOptIn', async () => {
    await expect(
      reader.isOptIn(test.nonValidAddress, test.asaId)
    ).rejects.toThrow()
  })

  describe('MetadataTest: Unhappy Path', () => {
    it('Should throw an error if the asset does not exist', async () => {
      await expect(reader.getAssetMetadata(0)).rejects.toThrow()
    })

    it('Should throw an error if the asset does not have a note', async () => {
      await expect(reader.getAssetMetadata(test.testId)).rejects.toThrow()
    })

    it('Should throw an error if the asset does not have metadata', async () => {
      await expect(reader.getAssetMetadata(test.asaId)).rejects.toThrow()
    })
  })
})
