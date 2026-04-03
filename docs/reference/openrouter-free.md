---
title: 無料で運用するには
description: OpenRouter の無料モデルを使いながら，有料課金を避けるための設定と注意点
---

OpenRouter の無料モデルを使うと，初期費用10$のみで永続的に使用できます．
[https://openrouter.ai/docs/api/reference/limits](https://openrouter.ai/docs/api/reference/limits)によると，freeモデルの制限について以下のように書かれています．


* 無料利用の上限: モデル ID の末尾が `:free` の無料モデルを使う場合，1 分あたり最大 `20` リクエストまで送れます．1 日あたりの上限は次のとおりです．
*  `10` credits 未満しか購入していない場合，`:free` モデルは 1 日 `50` リクエストまでです．
*  `10` credits 以上を購入すると，`:free` モデルの 1 日の上限は `1000` リクエストに増えます．


## APIキー作成時の設定

[https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) を開いて，`Create` から API キーを作成します．無料モデルだけで運用したい場合は，次のように設定しておくと安全です．

- `Name`: 後で見て分かる名前を付けます．
- `Credit limit`: `0` に設定します．有料モデルに課金されないようにするためです．空欄のままだと無制限になるので注意してください．
- `Reset limit every`: `N/A` のままで構いません．
- `Expiration`: 利用する期間に合わせて設定します．使う期間はできるだけ短く設定し，使用するごとにAPIキーを作り直すことをお勧めします．

発行した API キーはコピーして保存しておきます．詳しい `APIキー` の確認方法は，[利用するLLMモデルの準備]({{ '/getting-started/api-providers/' | relative_url }}) の `OpenRouter` を参照してください．


## 無料モデルを使えるようにする設定

性能の高い無料モデルを使えるようにするには，[https://openrouter.ai/settings/privacy](https://openrouter.ai/settings/privacy) を開いて，次の項目をONにしておく必要があります．

【重要】\
この設定を有効にすると，入力したプロンプトがモデルの学習や公開データセットに使われる可能性があります．非公開にしたいデータを扱う場合は，この設定を有効にしないでください．

- `Privacy Settings > Enable free endpoints that may train on inputs`: `ON`
- `Privacy Settings > Enable free endpoints that may publish prompts`: `ON`
．

## このアプリでの推奨設定

無料モデルは，1分間に20リクエストまでという制限があります．設定画面から以下の値をセットしてください．
各項目の意味は [設定画面]({{ '/reference/settings/' | relative_url }}) で確認できます．

- `並列処理数`: `1`
- `API呼び出し間隔`: `3000` ms

失敗が続く場合は，`API呼び出し間隔` をさらに長くするか，時間を空けて再実行してください．

## 無料モデルの選び方

無料モデルは [https://openrouter.ai/collections/free-models](https://openrouter.ai/collections/free-models) から探せます．モデル詳細を開いて，表示されているモデル ID をそのままこのアプリの `モデル名` に入れてください．無料モデルは `:free` が付いた ID になっていることが多いです．

`ベースURL` は通常どおり `https://openrouter.ai/api/v1` を使います．詳しくは [利用するLLMモデルの準備]({{ '/getting-started/api-providers/' | relative_url }}) の `OpenRouter` を参照してください．
