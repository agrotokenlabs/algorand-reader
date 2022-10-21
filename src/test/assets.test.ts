import * as assets from '../index'
import {
  address,
  nonBalAddress,
  nonValidAddress,
  client,
  asaId,
  testId,
} from './testConfig'

describe('AssetsTest: Happy Path', () => {
  it('Should get all the asset crated by a waller', async () => {
    const createdAssets = await assets.getCreatedAssets(client, address)
    expect(createdAssets.length).toEqual(3)
  })

  it('Should get all the asset crated by a waller', async () => {
    const createdAssets = await assets.getCreatedAssets(client, nonBalAddress)
    expect(createdAssets.length).toEqual(0)
  })

  it('Should get the asa balance of one asset', async () => {
    const createdAssets = await assets.getCreatedAssets(client, address)
    const asaId = createdAssets[0].index
    const asaBalance = await assets.getAsaBalance(client, address, asaId)
    expect(asaBalance).toEqual(1)
  })

  it('Should return zero if the adders do not have that asset', async () => {
    const asaBalance = await assets.getAsaBalance(client, nonBalAddress, asaId)
    expect(asaBalance).toEqual(0)
  })

  it('Should return true if the account is optIn', async () => {
    const isOptIn = await assets.isOptIn(client, address, asaId)
    expect(isOptIn).toEqual(true)
  })

  it('Should return false if the account is not optIn', async () => {
    const isOptIn = await assets.isOptIn(client, nonBalAddress, asaId)
    expect(isOptIn).toEqual(false)
  })

  it('Should return the circulating supply of the token', async () => {
    const circulating = await assets.getTokenCirculatingSupply(client, testId)
    expect(circulating).toEqual(5000000000)
  })
})

describe('AssetsTest: Unhappy Path', () => {
  it('Should throw an error if the address is not valid: getCreatedAssets', async () => {
    await expect(
      assets.getCreatedAssets(client, nonValidAddress)
    ).rejects.toThrow()
  })

  it('Should throw an error if the address is not valid: getAsaBalance', async () => {
    const createdAssets = await assets.getCreatedAssets(client, address)
    const asaId = createdAssets[0].index
    await expect(
      assets.getAsaBalance(client, nonValidAddress, asaId)
    ).rejects.toThrow()
  })

  it('Should throw an error if the address is not valid: isOptIn', async () => {
    await expect(
      assets.isOptIn(client, nonValidAddress, asaId)
    ).rejects.toThrow()
  })
})
