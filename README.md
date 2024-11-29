# シンプルな売上管理アプリケーション️

![image](https://github.com/himorishige/qwik-microcms-simple-store-template/assets/71954454/4d0bd4e9-2fcc-4792-b27e-f4f0b3304ffb)

SvelteKitとmicroCMSを利用したシンプルな売上管理アプリケーションのテンプレートです。
町内会や文化祭、フリーマーケットなど小さな店舗での利用を想定したPWA対応のアプリケーションになっています。

- [SvelteKit](https://kit.svelte.dev/)
- [microCMS](https://microcms.io/)

## 機能一覧

- 簡易レジ機能
- 当日・前日の販売データグラフの表示
- 販売履歴
- 販売データのCSVダウンロード

## 動作環境

- Node.js v16以上

## 必要なもの

利用にあたって下記の事前準備が必要となります。

- microCMS APIキーの権限変更

### microCMS APIキーの権限変更

レジページにて計算、売上のデータをmicroCMSに登録するために販売APIに対してのPOST権限が必要となります。以下の画像と同じように権限を追加設定してください。

![CleanShot 2023-05-17 at 16 14 15](https://github.com/himorishige/qwik-microcms-simple-store-template/assets/71954454/0cb8fb1c-443f-4911-9769-0fb42cb2aabb)

## 環境変数の設定

プロジェクトディレクトリ内に`.env`ファイルを作成の上下記必要事項を記述してください。

```shell:.env
MICROCMS_SERVICE_DOMAIN=microCMSのサービスドメイン名
MICROCMS_API_KEY=microCMSのAPIキー
```

## 開発

### インストール

```shell
npm install
```

### 開発サーバーの起動

```shell
npm run dev
```

## デプロイ

最新版のSvelteKitでは以下の環境へのデプロイについては自動的に必要なアダプターをインストールして設定を行ってくれます。[Zero\-config deployments • Docs • SvelteKit](https://kit.svelte.dev/docs/adapter-auto)

- @sveltejs/adapter-cloudflare for Cloudflare Pages
- @sveltejs/adapter-netlify for Netlify
- @sveltejs/adapter-vercel for Vercel
- svelte-adapter-azure-swa for Azure Static Web Apps
- svelte-kit-sst for AWS via SST

Adaptersを利用することで各種環境へのデプロイが可能です。詳しくは[Adapters](https://kit.svelte.dev/docs/adapters)を参照ください。