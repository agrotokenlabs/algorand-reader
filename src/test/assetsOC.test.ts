import { ENetworks, AlgoNodeOnlyClient, ReaderOnlyClient } from '../index'
import * as test from './testConfig'

describe('AssetsTest::ReaderOnlyClient: Happy Path', () => {
  const provider = new AlgoNodeOnlyClient(ENetworks.TESTNET)
  const reader = new ReaderOnlyClient(provider)

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
})

describe('AssetsTest: Unhappy Path', () => {
  const provider = new AlgoNodeOnlyClient(ENetworks.TESTNET)
  const reader = new ReaderOnlyClient(provider)

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
})
