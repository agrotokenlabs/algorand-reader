import algosdk from 'algosdk'

/**
 * Receive an string, return true if it is a valid Algorand address
 * @param address: string
 * @returns: boolean
 */
export async function validateAddress(address: string) {
  return algosdk.isValidAddress(address)
}

/**
 * Receive a algorand valid address and return the amount of algos that account holds
 * @param client: Algodv2
 * @param address: string
 * @returns: number
 */
export async function getBalanceAlgos(
  client: algosdk.Algodv2,
  address: string
): Promise<number> {
  const balanceMicroalgos = await getBalanceMicroalgos(client, address)
  return algosdk.microalgosToAlgos(balanceMicroalgos)
}

/**
 * Receive a algorand valid address and return the amount of microalgos that account holds
 * @param client: Algodv2
 * @param address: string
 * @returns: number
 */
export async function getBalanceMicroalgos(
  client: algosdk.Algodv2,
  address: string
): Promise<number> {
  const accountInfo = await client.accountInformation(address).do()
  const balance = accountInfo['amount'] as number
  return balance
}

/**
 * Receive an address and return the minimum balance necessaries
 * @param client: Algodv2
 * @param address: string
 * @returns: number
 */
export async function getMinBalance(
  client: algosdk.Algodv2,
  address: string
): Promise<number> {
  const account = await client.accountInformation(address).do()
  const minBalance = account['min-balance']
  return algosdk.microalgosToAlgos(minBalance as number)
}
