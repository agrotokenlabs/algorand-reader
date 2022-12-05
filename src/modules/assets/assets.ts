import algosdk from 'algosdk'
import { Asset, AssetInfo } from '../common/types'

export default class Assets {
  private static getAccountAttribute(
    account: Record<string, unknown>,
    name: string
  ) {
    return account[name]
  }

  private static async getAssets(client: algosdk.Algodv2, address: string) {
    const account = await client.accountInformation(address).do()
    const assets = Assets.getAccountAttribute(account, 'assets')
    return assets
  }

  private static async findAsset(
    client: algosdk.Algodv2,
    address: string,
    asaId: number
  ) {
    const assets = (await Assets.getAssets(client, address)) as Asset[]
    return assets.find((asa: Asset) => asa['asset-id'] === asaId)
  }

  private static async getCirculatingSupply(
    client: algosdk.Algodv2,
    asaId: number
  ) {
    const asa = await client.getAssetByID(asaId).do()
    const asaParams = asa['params']
    const reserve = asaParams.reserve
    const reserveBalance = await Assets.getAsaBalance(client, reserve, asaId)
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
  static async getCreatedAssets(
    client: algosdk.Algodv2,
    address: string
  ): Promise<AssetInfo[]> {
    const account = await client.accountInformation(address).do()
    const createdAssets = Assets.getAccountAttribute(
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
  static async getAsaBalance(
    client: algosdk.Algodv2,
    address: string,
    asaId: number
  ): Promise<number> {
    const asa = await Assets.findAsset(client, address, asaId)
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
  static async isOptIn(
    client: algosdk.Algodv2,
    address: string,
    asaId: number
  ): Promise<boolean> {
    const asa = await Assets.findAsset(client, address, asaId)
    const amount = asa ? asa['amount'] : -1
    return amount != -1
  }

  /**
   * Receive a token return the circulating supply of the token
   * @param client: Algodv2
   * @param asaId: number
   * @returns: number
   */
  static async getTokenCirculatingSupply(
    client: algosdk.Algodv2,
    asaId: number
  ): Promise<number> {
    const circulating = await Assets.getCirculatingSupply(client, asaId)
    return circulating
  }
}
