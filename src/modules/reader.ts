import { Provider, ProviderOnlyClient } from './providers'
import Accounts from './accounts/accounts'
import Transactions from './transactions/transactions'
import Apps from './apps/apps'
import Assets from './assets/assets'
import Metadata from './assets/metadata'
import * as common from './common/types'

export class ReaderOnlyClient {
  provider: ProviderOnlyClient

  constructor(provider: ProviderOnlyClient) {
    this.provider = provider
  }

  /** Receive an string, return true if it is a valid Algorand address */
  async validateAddress(address: string) {
    return Accounts.validateAddress(address)
  }

  /** Receive a algorand valid address and return the amount of algos that account holds */
  async getBalanceAlgos(address: string): Promise<number> {
    return Accounts.getBalanceAlgos(this.provider.client, address)
  }

  /** Receive a algorand valid address and return
   * the amount of microalgos that account holds */
  async getBalanceMicroalgos(address: string): Promise<number> {
    return Accounts.getBalanceMicroalgos(this.provider.client, address)
  }

  /** Receive an address and return the minimum balance necessaries */
  async getMinBalance(address: string): Promise<number> {
    return Accounts.getMinBalance(this.provider.client, address)
  }

  /** Receive a client and address,
   * return all the created asset by that address */
  async getCreatedAssets(address: string): Promise<common.AssetInfo[]> {
    return Assets.getCreatedAssets(this.provider.client, address)
  }

  /** Receive a algorand valid address and asaId then return the amount that account holds */
  async getAsaBalance(address: string, asaId: number): Promise<number> {
    return Assets.getAsaBalance(this.provider.client, address, asaId)
  }

  /** Receive a algorand valid address and asaId
   * then return the optInState */
  async isOptIn(address: string, asaId: number): Promise<boolean> {
    return Assets.isOptIn(this.provider.client, address, asaId)
  }

  /** Receive a token return the circulating supply of the token */
  async getTokenCirculatingSupply(asaId: number): Promise<number> {
    return Assets.getTokenCirculatingSupply(this.provider.client, asaId)
  }

  /** Lookup an asset id using the metadataHash if the asset have one */
  async getAssetIdByMetadataHash(
    hash: string,
    creator: string
  ): Promise<number> {
    return Metadata.getAssetIdByMetadataHash(
      this.provider.client,
      hash,
      creator
    )
  }

  /** Returns the pending transactions for an address
   *  'top-transactions': []
   *  'total-transactions': number
   */
  async getPendingTx(address: string): Promise<unknown> {
    return Transactions.getPendingTxByAddress(this.provider.client, address)
  }

  /** Returns true if there is
   * the pending transactions for an address */
  async thereArePendingTxs(address: string): Promise<boolean> {
    return Transactions.thereArePendingTxs(this.provider.client, address)
  }

  /** Get the global state from any application */
  async getGlobalState(addr: string, appId: number) {
    return Apps.getGlobalState(this.provider.client, addr, appId)
  }
}

export class Reader extends ReaderOnlyClient {
  provider: Provider

  constructor(provider: Provider) {
    super(provider)
    this.provider = provider
  }

  /** Returns the metadata stored in the creation tx of an asa
   * Using the ARC-69 standard for NFT metadata. */
  async getAssetMetadata(assetId: number): Promise<string> {
    return Metadata.getAssetMetadata(this.provider.indexer, assetId)
  }
}
