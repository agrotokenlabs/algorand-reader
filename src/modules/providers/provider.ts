import { Algodv2, Indexer } from 'algosdk'

export class ProviderOnlyClient {
  client: Algodv2

  constructor(token: string, server: string, port: number) {
    this.client = new Algodv2(token, server, port)
  }
}

export class Provider extends ProviderOnlyClient {
  indexer: Indexer

  constructor(
    token: string,
    server: string,
    port: number,
    indexerToken: string,
    indexerServer: string,
    indexerPort: number
  ) {
    super(token, server, port)
    this.indexer = new Indexer(indexerToken, indexerServer, indexerPort)
  }
}
