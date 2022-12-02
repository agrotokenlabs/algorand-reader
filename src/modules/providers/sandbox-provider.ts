import { Provider, ProviderOnlyClient } from './provider'

export class SandboxOnlyClient extends ProviderOnlyClient {
  constructor() {
    const port = 4001
    const token = 'a'.repeat(64)
    const endpoint = 'http://localhost'
    super(token, endpoint, port)
  }
}

export class Sandbox extends Provider {
  constructor() {
    const port = 4001
    const indexerPort = 8980
    const endpoint = 'http://localhost'
    const indexerEndpoint = 'http://localhost'
    super('', endpoint, port, '', indexerEndpoint, indexerPort)
  }
}
