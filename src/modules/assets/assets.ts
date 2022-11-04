import algosdk from 'algosdk'
import { Asset, AssetInfo } from '../common/types'

function getAccountAttribute(account: Record<string, unknown>, name: string) {
  return account[name]
}

async function getAssets(client: algosdk.Algodv2, address: string) {
  const account = await client.accountInformation(address).do()
  const assets = getAccountAttribute(account, 'assets')
  return assets
}

async function findAsset(
  client: algosdk.Algodv2,
  address: string,
  asaId: number
) {
  const assets = (await getAssets(client, address)) as Asset[]
  return assets.find((asa: Asset) => asa['asset-id'] === asaId)
}

async function getCirculatingSupply(client: algosdk.Algodv2, asaId: number) {
  const asa = await client.getAssetByID(asaId).do()
  const asaParams = asa['params']
  const reserve = asaParams.reserve
  const reserveBalance = await getAsaBalance(client, reserve, asaId)
  const total = asaParams.total
  const circulating = total - reserveBalance
  return circulating
}

/**
 * Receive a client and address, return all the created asset by that address
 * @param client: Algodv2
 * @param address: string
 * @returns: AssetInfo[]
 */
export async function getCreatedAssets(
  client: algosdk.Algodv2,
  address: string
): Promise<AssetInfo[]> {
  const account = await client.accountInformation(address).do()
  const createdAssets = getAccountAttribute(
    account,
    'created-assets'
  ) as AssetInfo[]
  return createdAssets
}

/**
 * Receive a algorand valid address and asaId then return the amount that account holds
 * @param client: Algodv2
 * @param address: string
 * @param asaId: number
 * @returns: number
 */
export async function getAsaBalance(
  client: algosdk.Algodv2,
  address: string,
  asaId: number
): Promise<number> {
  const asa = await findAsset(client, address, asaId)
  const amount = asa ? asa['amount'] : 0
  return amount
}

/**
 * Receive a algorand valid address and asaId then return the optInState
 * @param client: Algodv2
 * @param address: string
 * @param asaId: number
 * @returns: boolean
 */
export async function isOptIn(
  client: algosdk.Algodv2,
  address: string,
  asaId: number
): Promise<boolean> {
  const asa = await findAsset(client, address, asaId)
  const amount = asa ? asa['amount'] : -1
  return amount != -1
}

/**
 * Receive a token return the circulating supply of the token
 * @param client: Algodv2
 * @param asaId: number
 * @returns: number
 */
export async function getTokenCirculatingSupply(
  client: algosdk.Algodv2,
  asaId: number
): Promise<number> {
  const circulating = await getCirculatingSupply(client, asaId)
  return circulating
}
