import * as accounts from '../index'
import { address, nonBalAddress, nonValidAddress, client } from './testConfig'

describe('AccountsTest: happy path', () => {
  it('Should return True if the address is valid', async () => {
    const isValid = await accounts.validateAddress(address)
    expect(isValid).toBe(true)
  })

  it('Should return False if the address is not valid', async () => {
    const isValid = await accounts.validateAddress(nonValidAddress)
    expect(isValid).toBe(false)
  })

  it('Should return the balance in algos for the address', async () => {
    const balance = await accounts.getBalanceAlgos(client, address)
    expect(balance).toBe(19.995)
  })

  it('Should return the balance in microalgos for the address', async () => {
    const balance = await accounts.getBalanceMicroalgos(client, address)
    expect(balance).toBe(19995000)
  })

  it('Should return zero if the address has no balance', async () => {
    const balance = await accounts.getBalanceAlgos(client, nonBalAddress)
    expect(balance).toBe(0)
    const balance2 = await accounts.getBalanceMicroalgos(client, nonBalAddress)
    expect(balance2).toBe(0)
  })

  it('Should return the minimum balance for the address', async () => {
    const minBalance = await accounts.getMinBalance(client, address)
    expect(minBalance).toBe(0.5)
  })
})

describe('AccountsTest: unhappy path', () => {
  it('Should throw an error if the address is not valid: getBalanceMicroalgo', async () => {
    expect.assertions(1)
    try {
      await accounts.getBalanceMicroalgos(client, nonValidAddress)
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
      await accounts.getBalanceAlgos(client, nonValidAddress)
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
      await accounts.getMinBalance(client, nonValidAddress)
    } catch (e) {
      expect(e).toEqual(
        Error(
          'Network request error. Received status 400: failed to parse the address'
        )
      )
    }
  })
})
