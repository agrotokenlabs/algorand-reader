import { ENetworks, Reader } from '../'
import * as test from './testConfig'

describe('AccountsTest: happy path', () => {
  const reader = new Reader(ENetworks.TESTNET)

  it('Should return True if the address is valid', async () => {
    const isValid = await reader.validateAddress(test.address)
    expect(isValid).toBe(true)
  })

  it('Should return False if the address is not valid', async () => {
    const isValid = await reader.validateAddress(test.nonValidAddress)
    expect(isValid).toBe(false)
  })

  it('Should return the balance in algos for the address', async () => {
    const balance = await reader.getBalanceAlgos(test.address)
    expect(balance).toBe(19.995)
  })

  it('Should return the balance in microalgos for the address', async () => {
    const balance = await reader.getBalanceMicroalgos(test.address)
    expect(balance).toBe(19995000)
  })

  it('Should return zero if the address has no balance', async () => {
    const balance = await reader.getBalanceAlgos(test.nonBalAddress)
    expect(balance).toBe(0)
    const balance2 = await reader.getBalanceMicroalgos(test.nonBalAddress)
    expect(balance2).toBe(0)
  })

  it('Should return the minimum balance for the address', async () => {
    const minBalance = await reader.getMinBalance(test.address)
    expect(minBalance).toBe(0.5)
  })
})

describe('AccountsTest: unhappy path', () => {
  const reader = new Reader(ENetworks.TESTNET)

  it('Should throw an error if the address is not valid: getBalanceMicroalgo', async () => {
    expect.assertions(1)
    try {
      await reader.getBalanceMicroalgos(test.nonValidAddress)
    } catch (e) {
      expect(e).toEqual(
        Error(
          'Network request error. Received status 400: failed to parse the address'
        )
      )
    }
  })

  it('Should throw an error if the address is not valid: getBalanceAlgos', async () => {
    expect.assertions(1)
    try {
      await reader.getBalanceAlgos(test.nonValidAddress)
    } catch (e) {
      expect(e).toEqual(
        Error(
          'Network request error. Received status 400: failed to parse the address'
        )
      )
    }
  })

  it('Should throw an error if the address is not valid: getMinBalance', async () => {
    expect.assertions(1)
    try {
      await reader.getMinBalance(test.nonValidAddress)
    } catch (e) {
      expect(e).toEqual(
        Error(
          'Network request error. Received status 400: failed to parse the address'
        )
      )
    }
  })
})
