## OpenAI

### APIキーの発行

1. [OpenAI の quickstart](https://developers.openai.com/api/docs/quickstart) にアクセスします．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step1.png' | relative_url }}" alt="OpenAI Developers の Developer quickstart ページ。Create and export an API key セクションと Create an API Key ボタンが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. `Create an API Key` をクリックして [API keys](https://platform.openai.com/api-keys) を開きます．OpenAI にログインしていない場合は，先にログイン画面が表示されます．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step2.png' | relative_url }}" alt="OpenAI Platform のログイン画面。Build on the OpenAI API Platform と表示され、メールアドレス欄と Continue ボタンが見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

3. ログイン後は `API keys` 画面が開くので，右上の `Create new secret key` をクリックします．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step3.png' | relative_url }}" alt="OpenAI Platform の API keys 画面。API keys 見出しと Create new secret key ボタンが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

   初回は中央にも `Create new secret key` ボタンが出るので，どちらを押しても大丈夫です．

4. キー作成モーダルが開いたら，必要に応じて名前や権限を設定して `Create secret key` を押します．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step4.png' | relative_url }}" alt="OpenAI Platform の Create new secret key モーダル。Owned by、Name、Project、Permissions を設定して Create secret key ボタンを押せる状態の画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

5. 発行後に表示された API キーはその場でコピーして保存しておきます．この表示はあとから再表示できません．

6. 残高や課金設定は [Billing overview](https://platform.openai.com/settings/organization/billing/overview) で確認できます．

   <img src="{{ '/assets/screenshots/api-providers/openai/billing_step1.png' | relative_url }}" alt="OpenAI Platform の Billing overview 画面。Credit remaining と Add payment details、View usage が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

   `Credit remaining` を見て残高を確認し，不足している場合は `Add payment details` から支払い方法を追加します．

### OpenAI APIのbase_urlの確認

2026年4月2日現在のベースURLは `https://api.openai.com/v1/` です．

変更があるかどうかは [API Overview](https://developers.openai.com/api/reference/overview) や quickstart のリクエスト例で，`https://api.openai.com/v1/...` になっているかを確認してください．

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

このとき，使う `base_url` は `https://api.openai.com/v1/` です．

<img src="{{ '/assets/screenshots/api-providers/openai/base_url_step1.png' | relative_url }}" alt="OpenAI API Reference の API Overview ページ。Authentication セクションに Authorization ヘッダーと curl https://api.openai.com/v1/models の例が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

### 使用できるモデルの確認

1. [Models](https://developers.openai.com/api/docs/models) を開きます．

   <img src="{{ '/assets/screenshots/api-providers/openai/model_name_step1.png' | relative_url }}" alt="OpenAI Developers の Models ページ。Choosing a model と Frontier models が表示され、gpt-5.4, gpt-5.4-mini, gpt-5.4-nano が見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. 2026年4月2日現在，このページでは最初の候補として `gpt-5.4`，軽量版として `gpt-5.4-mini` と `gpt-5.4-nano` が案内されています．

3. `gpt-5.4` などのモデルカードを開くと，モデル詳細画面で `Model ID` や `Context window`，`Max output tokens` を確認できます．

   <img src="{{ '/assets/screenshots/api-providers/openai/model_name_step2.png' | relative_url }}" alt="OpenAI Developers の GPT-5.4 モデル詳細ページ。Model ID と Context window、Max output tokens などが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">
