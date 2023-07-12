# ngrok-gateway

## ref

- [ngrokを無料プランでURL固定してみる - Qiita](https://qiita.com/miso_develop/items/bdcf15489b069ba1fa61)

## need

- node.js
- AWS CLI
  - IAM `AmazonAPIGatewayInvokeFullAccess`
- ngrok　アカウント

## how to use

- APIGateway API作成（上記記事参照）
- 環境変数追記
- スクリプト実行

```sh
$ yarn
$ node index.js 3000 jp
```

- 無料アカウントでは同一リージョンに1つまでしかホストできないため、複数port利用する場合はリージョンを変える必要あり
- リージョン
  - `us, eu, au, ap, sa, jp, in`
