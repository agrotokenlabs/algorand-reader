import { ENetworks, Reader } from '../'
import { AlgoNode } from '../modules/providers'
import * as test from './testConfig'

describe('TransactionTest: happy path', () => {
  const provider = new AlgoNode(ENetworks.TESTNET)
  const reader = new Reader(provider)

  it('Should return the pending txs from an account', async () => {
    const pendingTxs = await reader.getPendingTx(test.address)
    expect(pendingTxs).toBeDefined()
  })

  it('Should return false if there is not a pending tx', async () => {
    const pendingTxs = await reader.thereArePendingTxs(test.address)
    expect(pendingTxs).toBe(false)
  })
})
