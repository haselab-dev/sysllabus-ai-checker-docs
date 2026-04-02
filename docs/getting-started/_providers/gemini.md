## Gemini {#gemini}

### APIキーの発行 {#gemini-api-key}

Google AI Studio で API キーを作成します。

1. Google にログインした状態で [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) にアクセスします．
   <img src="{{ '/assets/screenshots/api-providers/gemini/api_key_step1.png' | relative_url }}" alt="Google AI Studio の API キー画面の状態 1。右上に APIキーを作成 ボタンが表示されている状態" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. 右上の `APIキーを作成` をクリックします。

   <img src="{{ '/assets/screenshots/api-providers/gemini/api_key_step2.png' | relative_url }}" alt="Google AI Studio の API キー画面の状態 2。右上に APIキーを作成 ボタンが表示されている状態" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

3. 「インポートしたプロジェクトを選択」の下の枠をクリックして「プロジェクトを作成」をクリックします．

   <img src="{{ '/assets/screenshots/api-providers/gemini/api_key_step3.png' | relative_url }}" alt="Google AI Studio の新しいキー作成ダイアログ。インポートしたプロジェクトを選択の下から新しいプロジェクトを作成する画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

4. 「プロジェクトを作成」をクリックした後，「APIキーを作成」を押すとAPIキーが発行されます．

   <img src="{{ '/assets/screenshots/api-providers/gemini/api_key_step4.png' | relative_url }}" alt="Google AI Studio の API キー発行画面の状態 4" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

5. キーの部分の文字列をクリックするとAPIキーが表示されますので，これを保存しておきます．

6. 無料枠で足りない場合は，「お支払い情報を設定」からクレジットカードなどを登録します．

### OpenAI互換APIのbase_urlの確認 {#gemini-base-url}

2026年3月現在のベースURLは`https://generativelanguage.googleapis.com/v1beta/openai/`です．

変更があるかどうかを[https://ai.google.dev/gemini-api/docs/openai](https://ai.google.dev/gemini-api/docs/openai)で確認してください．必ず，OPENAIのAPIと互換性があること確認してください．

```python
from openai import OpenAI

client = OpenAI(
    api_key="GEMINI_API_KEY",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)
```

の`base_url`の部分が変更されていれば，それを使うので保存しておいてください．

<img src="{{ '/assets/screenshots/api-providers/gemini/base_url_step1.png' | relative_url }}" alt="Gemini の OpenAI 互換 API ドキュメントで base_url を確認している画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

### 使用できるモデルの確認 {#gemini-model}

1. [https://ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)から使用したいモデルを選んでください．

   <img src="{{ '/assets/screenshots/api-providers/gemini/model_name_step1.png' | relative_url }}" alt="Gemini API のモデル一覧ページを確認している画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">

2. モデルを選ぶと，以下のような画面になります．「サポートされるデータタイプ」の入力，出力ともに`テキスト`が含まれいることとを確認して，モデルコード保存しておいてください．この値を`モデル名`として使用します．

   <img src="{{ '/assets/screenshots/api-providers/gemini/model_name_step2.png' | relative_url }}" alt="Gemini 3.1 Flash-Lite Preview のモデル詳細ページ。モデルコードとサポートされるデータタイプを確認している画面" style="max-width: 100%; height: auto; border: 1px solid #d8dee4; border-radius: 12px;">
