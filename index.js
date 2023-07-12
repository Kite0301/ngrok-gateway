// run `node index.js <port> <region>`

const program = require("commander");
const { execSync } = require('child_process')
const ngrok = require('ngrok')
require('dotenv').config()

program.parse(process.argv)

const awsConfig = {
  restApiId: process.env.REST_API_ID,
  resourceId: process.env.RESOURCE_ID,
  httpMethod: "ANY",
}

const port = program.args[0]
const region = program.args[1] || 'jp'
const ngrokConfig = {
  addr: port,
  region,
}

const main = async () => {
    const ngrokUrl = await ngrok.connect(ngrokConfig)
    console.log(ngrokUrl)

    execSync(`aws apigateway put-integration --rest-api-id ${awsConfig.restApiId} --resource-id ${awsConfig.resourceId} --http-method ${awsConfig.httpMethod} --type HTTP_PROXY --integration-http-method ${awsConfig.httpMethod} --uri ${ngrokUrl}`)
    execSync(`aws apigateway create-deployment --rest-api-id ${awsConfig.restApiId} --stage-name ${ngrokConfig.addr}`)
    console.log(`https://${awsConfig.restApiId}.execute-api.ap-northeast-1.amazonaws.com/${ngrokConfig.addr}`)
}
main()
