import algosdk from 'algosdk'

export default class Transactions {
  static async getPendingTxByAddress(
    client: algosdk.Algodv2,
    address: string
  ): Promise<unknown> {
    const pendingTxsByAddr = await client
      .pendingTransactionByAddress(address)
      .do()
    return pendingTxsByAddr
  }

  static async thereArePendingTxs(
    client: algosdk.Algodv2,
    address: string
  ): Promise<boolean> {
    const txs = await Transactions.getPendingTxByAddress(client, address)
    return txs['total-transactions'].length > 0
  }
}
