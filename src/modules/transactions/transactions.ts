import algosdk from 'algosdk'

export async function getPendingTxByAddress(
  client: algosdk.Algodv2,
  address: string
): Promise<unknown> {
  const pendingTxsByAddr = await client
    .pendingTransactionByAddress(address)
    .do()
  return pendingTxsByAddr
}

export async function thereArePendingTxs(
  client: algosdk.Algodv2,
  address: string
): Promise<boolean> {
  const txs = await getPendingTxByAddress(client, address)
  return txs['total-transactions'].length > 0
}
