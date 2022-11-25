import algosdk from 'algosdk'
import * as accounts from './accounts'
import * as assets from './assets'
import * as common from './common'
import * as transactions from './transactions'

export class Reader {
  algod: algosdk.Algodv2
  indexer: algosdk.Indexer
  network: common.ENetworks

  constructor(
    network: common.ENetworks,
    algod?: algosdk.Algodv2,
    indexer?: algosdk.Indexer
  ) {
    this.algod = algod ?? common.getAlgodClient(network)
    this.indexer = indexer ?? common.getIndexerClient(network)
    this.network = network
  }

  /** Receive an string, return true if it is a valid Algorand address */
  async validateAddress(address: string) {
    return accounts.validateAddress(address)
  }

  /** Receive a algorand valid address and return the amount of algos that account holds */
  async getBalanceAlgos(address: string): Promise<number> {
    return accounts.getBalanceAlgos(this.algod, address)
  }

  /** Receive a algorand valid address and return
   * the amount of microalgos that account holds */
  async getBalanceMicroalgos(address: string): Promise<number> {
    return accounts.getBalanceMicroalgos(this.algod, address)
  }

  /** Receive an address and return the minimum balance necessaries */
  async getMinBalance(address: string): Promise<number> {
    return accounts.getMinBalance(this.algod, address)
  }

  /** Receive a client and address,
   * return all the created asset by that address */
  async getCreatedAssets(address: string): Promise<common.AssetInfo[]> {
    return assets.getCreatedAssets(this.algod, address)
  }

  /** Receive a algorand valid address and asaId then return the amount that account holds */
  async getAsaBalance(address: string, asaId: number): Promise<number> {
    return assets.getAsaBalance(this.algod, address, asaId)
  }

  /** Receive a algorand valid address and asaId
   * then return the optInState */
  async isOptIn(address: string, asaId: number): Promise<boolean> {
    return assets.isOptIn(this.algod, address, asaId)
  }

  /** Receive a token return the circulating supply of the token */
  async getTokenCirculatingSupply(asaId: number): Promise<number> {
    return assets.getTokenCirculatingSupply(this.algod, asaId)
  }

  /** Lookup an asset id using the metadataHash if the asset have one */
  async getAssetIdByMetadataHash(
    hash: string,
    creator: string
  ): Promise<number> {
    return assets.getAssetIdByMetadataHash(this.algod, hash, creator)
  }

  /** Returns the metadata stored in the creation tx of an asa
   * Using the ARC-69 standard for NFT metadata. */
  async getAssetMetadata(assetId: number): Promise<string> {
    return assets.getAssetMetadata(this.indexer, assetId)
  }

  /** Returns the pending transactions for an address
   *  'top-transactions': []
   *  'total-transactions': number
   */
  async getPendingTx(address: string): Promise<unknown> {
    return transactions.getPendingTxByAddress(this.algod, address)
  }

  /** Returns true if there is
   * the pending transactions for an address */
  async thereArePendingTxs(address: string): Promise<boolean> {
    return transactions.thereArePendingTxs(this.algod, address)
  }
}
