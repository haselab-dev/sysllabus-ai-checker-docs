## OpenAI {#openai}

### APIキーの発行 {#openai-api-key}

OpenAI Platform で API キーを作成します。

1. [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) にアクセスします．OpenAI にログインしていない場合は，先にログインします．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step2.png' | relative_url }}" alt="OpenAI Platform のログイン画面。Build on the OpenAI API Platform と表示され、メールアドレス欄と Continue ボタンが見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. ログイン後に `API keys` 画面が開くので，右上の `Create new secret key` をクリックします．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step3.png' | relative_url }}" alt="OpenAI Platform の API keys 画面。API keys 見出しと Create new secret key ボタンが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

3. キー作成画面が開いたら，Nameに適当な文字を入力して， `Create secret key` を押します．

   <img src="{{ '/assets/screenshots/api-providers/openai/api_key_step4.png' | relative_url }}" alt="OpenAI Platform の Create new secret key モーダル。Owned by、Name、Project、Permissions を設定して Create secret key ボタンを押せる状態の画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

4. 発行後に表示された API キーをコピーして保存しておきます．この画面を閉じると，同じ文字列はあとから再表示できません．

5. 無料枠やで足りない場合は，[https://platform.openai.com/settings/organization/billing/overview](https://platform.openai.com/settings/organization/billing/overview) で課金設定をします．

   <img src="{{ '/assets/screenshots/api-providers/openai/billing_step1.png' | relative_url }}" alt="OpenAI Platform の Billing overview 画面。Credit remaining と Add payment details、View usage が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

   `Credit remaining` を見て残高を確認し，不足している場合は `Add payment details` から支払い方法を追加します．

### OpenAI APIのbase_urlの確認 {#openai-base-url}

2026年4月現在のベースURLは `https://api.openai.com/v1/` です．

変更があるかどうかは [https://developers.openai.com/api/reference/overview](https://developers.openai.com/api/reference/overview) や quickstart のリクエスト例で，`https://api.openai.com/v1/...` になっているかを確認してください．

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Organization: $ORGANIZATION_ID" \
  -H "OpenAI-Project: $PROJECT_ID"
```

<img src="{{ '/assets/screenshots/api-providers/openai/base_url_step1.png' | relative_url }}" alt="OpenAI API Reference の API Overview ページ。Authentication セクションに Authorization ヘッダーと curl https://api.openai.com/v1/models の例が表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

### 使用できるモデルの確認 {#openai-model}

1. [https://developers.openai.com/api/docs/models](https://developers.openai.com/api/docs/models) を開きます．

   <img src="{{ '/assets/screenshots/api-providers/openai/model_name_step1.png' | relative_url }}" alt="OpenAI Developers の Models ページ。Choosing a model と Frontier models が表示され、gpt-5.4, gpt-5.4-mini, gpt-5.4-nano が見えている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. 一覧から使用したいモデルを選び，モデル詳細画面を開きます．

3. モデル詳細画面で `Model ID` を確認して，その値を保存しておいてください．この値を `モデル名` として使用します．

4. テキストを扱いたい場合は，説明欄や対応機能を見て，入力と出力の両方でテキストを扱えるモデルを選んでください．迷う場合は，モデル一覧ページの冒頭で案内されているものから選ぶと進めやすいです．

   <img src="{{ '/assets/screenshots/api-providers/openai/model_name_step2.png' | relative_url }}" alt="OpenAI Developers の GPT-5.4 モデル詳細ページ。Model ID と Context window、Max output tokens などが表示されている画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">
