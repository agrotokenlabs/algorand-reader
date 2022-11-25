import { ENetworks, Reader } from '../'
import * as test from './testConfig'

describe('TransactionTest: happy path', () => {
  const reader = new Reader(ENetworks.TESTNET)

  it('Should return the pending txs from an account', async () => {
    const pendingTxs = await reader.getPendingTx(test.address)
    expect(pendingTxs).toBeDefined()
  })

  it('Should return false if there is not a pending tx', async () => {
    const pendingTxs = await reader.thereArePendingTxs(test.address)
    expect(pendingTxs).toBe(false)
  })
})
