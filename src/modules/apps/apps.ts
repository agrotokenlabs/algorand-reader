import algosdk from 'algosdk'

export default class Apps {
  static async getGlobalState(
    client: algosdk.Algodv2,
    addr: string,
    appId: number
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalState: any = {}
    const accountInfo = await client.accountInformation(addr).do()
    const createdApps = accountInfo['created-apps']
    const app = createdApps.find((elem: { id: number }) => elem.id == appId)
    if (app) {
      const appState = app['params']['global-state']
      for (let valueIndex = 0; valueIndex < appState.length; valueIndex++) {
        const valuePair = appState[valueIndex]
        const valueKey = Buffer.from(valuePair.key, 'base64').toString()
        globalState[valueKey] = valuePair.value
      }
    }
    return globalState
  }
}
