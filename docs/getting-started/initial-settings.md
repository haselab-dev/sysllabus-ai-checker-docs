---
title: 初期設定
description: APIキー、ベースURL、モデル名をアプリに入力して保存する手順
---

このページでは，[利用するLLMモデルの準備]({{ '/getting-started/api-providers/' | relative_url }}) で確認した `APIキー`、`ベースURL`、`モデル名` をアプリの設定画面に入力して，最初の設定を完了する流れを説明します．

`APIキー`、`ベースURL`、`モデル名`にどんな値を設定すれば良いかがわからない場合は，[利用するLLMモデルの準備]({{ '/getting-started/api-providers/' | relative_url }}) を参考に確認してください．

## 1. 設定画面を開く

アプリ上部のナビゲーションから `設定` を開き，`編集` を押して入力できる状態にします．

入力欄が有効になると，次のような画面になります．

<img src="{{ '/assets/screenshots/getting-started/initial-settings/settings-overview.png' | relative_url }}" alt="設定画面。共通設定と LLM 個別設定が表示され、右上に キャンセル と 保存 ボタンがある状態" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

## 2. 各項目を入力する

取得した値を，対応する入力欄にそのまま入力します．

- `APIキー`: 使用する LLM プロバイダーで発行したキー
- `ベースURL`: このプロバイダーが指定している接続先 URL
- `モデル名`: 実際に利用するモデルの名前

## 3. 保存する

入力が終わったら，右上の `保存` を押します．

保存できれば初期設定は完了です．設定を変更しない限り，同じ値を毎回入れ直す必要はありません．
