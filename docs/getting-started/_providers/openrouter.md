## OpenRouter

### APIキーの発行

1. [OpenRouter の Authentication ドキュメント](https://openrouter.ai/docs/api/reference/authentication) にアクセスします．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step1.png' | relative_url }}" alt="OpenRouter Documentation の Authentication ページ。Using an API key セクションと first create your key リンクが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. `first create your key` をクリックして [https://openrouter.ai/keys](https://openrouter.ai/keys) を開きます．未ログインの場合は，先にサインイン画面が表示されます．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step2.png' | relative_url }}" alt="OpenRouter のサインイン画面。Sign in to OpenRouter と表示され、GitHub、Google、MetaMask のサインインボタンとメールアドレス欄が見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

3. サインイン後は `API Keys` 画面が開くので，`Create` をクリックします．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step3.png' | relative_url }}" alt="OpenRouter の API Keys 画面。API Keys 見出しと Create ボタンが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

   初回は `No API keys yet` と表示されますが，そのまま `Create` を押せば大丈夫です．

4. キー作成モーダルが開いたら，キー名を入力し，必要なら credit limit や expiration を設定して `Create` を押します．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step4.png' | relative_url }}" alt="OpenRouter の API キー作成モーダル。Name、Credit limit、Expiration を設定して Create ボタンを押せる状態の画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

   `Credit limit` を空欄にすると上限なしです．迷う場合は，まずキー名だけ入れて作成すれば進められます．

5. 発行された API キーをコピーして保存しておきます．

### OpenAI互換APIのbase_urlの確認

2026年4月2日現在のベースURLは `https://openrouter.ai/api/v1` です．

変更があるかどうかは [OpenRouter Quickstart](https://openrouter.ai/docs/quickstart) の `Using the OpenAI SDK` で確認してください．

```typescript
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "<OPENROUTER_API_KEY>",
});
```

このとき，使う `base_url` は `https://openrouter.ai/api/v1` です．

<img src="{{ '/assets/screenshots/api-providers/openrouter/base_url_step1.png' | relative_url }}" alt="OpenRouter Quickstart の Using the OpenAI SDK セクション。baseURL が https://openrouter.ai/api/v1 になっているコード例を表示している画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

### 使用できるモデルの確認

1. [OpenRouter Models](https://openrouter.ai/models) を開きます．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/model_name_step1.png' | relative_url }}" alt="OpenRouter の Models ページ。検索欄とモデル一覧が表示され、ページ上部に 667 models と表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. 2026年4月2日現在，サイト上では `667 models` と表示されています．この数は頻繁に増減するため，利用前にその都度確認してください．

3. 一覧からモデルを開くと，モデル詳細画面で `openai/gpt-5.2` のようなモデル ID や料金，コンテキスト長を確認できます．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/model_name_step2.png' | relative_url }}" alt="OpenRouter の OpenAI: GPT-5.2 モデル詳細ページ。モデル ID openai/gpt-5.2 と価格、コンテキスト長、プロバイダー一覧が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

4. このアプリでは，OpenRouter のモデル ID をそのまま `モデル名` に入れます．たとえばコード例の `openai/gpt-5.2` のように，`プロバイダ名/モデル名` の形式を使います．テキストを扱えるモデルを [Models](https://openrouter.ai/models) から選んでください．
