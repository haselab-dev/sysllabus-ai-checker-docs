## OpenRouter {#openrouter}

### APIキーの発行 {#openrouter-api-key}

OpenRouter で API キーを作成します。

1. [https://openrouter.ai/docs/api-reference/authentication](https://openrouter.ai/docs/api-reference/authentication) にアクセスします．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step1.png' | relative_url }}" alt="OpenRouter Documentation の Authentication ページ。Using an API key セクションと first create your key リンクが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. `first create your key` をクリックして [https://openrouter.ai/keys](https://openrouter.ai/keys) を開きます．未ログインの場合は，先にサインイン画面が表示されます．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step2.png' | relative_url }}" alt="OpenRouter のサインイン画面。Sign in to OpenRouter と表示され、GitHub、Google、MetaMask のサインインボタンとメールアドレス欄が見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

3. サインイン後に `API Keys` 画面が開くので，`Create` をクリックします．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step3.png' | relative_url }}" alt="OpenRouter の API Keys 画面。API Keys 見出しと Create ボタンが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">


4. キー作成画面が開いたら，キー名を入力して `Create` を押します．必要なら `credit limit` や `expiration` も設定できます．安全のため設定しておくことをお勧めします．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/api_key_step4.png' | relative_url }}" alt="OpenRouter の API キー作成モーダル。Name、Credit limit、Expiration を設定して Create ボタンを押せる状態の画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

5. 発行された API キーをコピーして保存しておきます．

### OpenAI互換APIのbase_urlの確認 {#openrouter-base-url}

2026年4月現在のベースURLは `https://openrouter.ai/api/v1` です．

変更があるかどうかは [https://openrouter.ai/docs/quick-start](https://openrouter.ai/docs/quick-start) の `Using the OpenAI SDK` で確認してください．

```python
from openai import OpenAI

client = OpenAI(
    api_key="OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
)
```

この `base_url` の部分が変わっていなければ，`https://openrouter.ai/api/v1` を使います．

<img src="{{ '/assets/screenshots/api-providers/openrouter/base_url_step1.png' | relative_url }}" alt="OpenRouter Quickstart の Using the OpenAI SDK セクション。baseURL が https://openrouter.ai/api/v1 になっているコード例を表示している画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

### 使用できるモデルの確認 {#openrouter-model}

1. [https://openrouter.ai/models](https://openrouter.ai/models) を開きます．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/model_name_step1.png' | relative_url }}" alt="OpenRouter の Models ページ。検索欄とモデル一覧が表示され、ページ上部に 667 models と表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. 一覧から使用したいモデルを選び，モデル詳細画面を開きます．

3. モデル詳細画面で，`openai/gpt-5.2` のようなモデル ID を確認して保存しておいてください．この値を `モデル名` として使用します．

   <img src="{{ '/assets/screenshots/api-providers/openrouter/model_name_step2.png' | relative_url }}" alt="OpenRouter の OpenAI: GPT-5.2 モデル詳細ページ。モデル ID openai/gpt-5.2 と価格、コンテキスト長、プロバイダー一覧が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

4. このアプリでは，OpenRouter のモデル ID をそのまま `モデル名` に入れます．`プロバイダ名/モデル名` の形式になっているので，そのままコピーして使ってください．

5. テキストを扱いたい場合は，説明欄や対応機能を見て，テキスト入力とテキスト出力に対応しているモデルを選んでください．料金やコンテキスト長もモデルごとに違うので，必要に応じて確認してください．
