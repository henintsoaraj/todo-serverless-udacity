// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '13aemg0rj4'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  domain: 'dev-i3nw4gatav4ufzss.us.auth0.com',            // Auth0 domain
  clientId: 'VlsHDY36d9cTtehzgxLQY3rf5Wqc7rkU',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
