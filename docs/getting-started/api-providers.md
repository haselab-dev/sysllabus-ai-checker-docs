---
title: 利用するLLMモデルの準備
description: APIキー、ベースURL、モデル名の確認方法
---

このアプリでは、`APIキー`、`ベースURL`、`モデル名` が必要になります．

使用するLLMプロバイダーを選択し，以下を参考にしながら `APIキー`、`ベースURL`、`モデル名` を確認してください．

無料モデル中心で使いたい場合は，[無料で運用するには]({{ '/reference/openrouter-free/' | relative_url }}) も合わせて参照してください．

<div class="provider-tabs">
  <input checked data-provider="gemini" id="provider-tab-gemini" name="provider-tabs" type="radio">
  <input data-provider="openai" id="provider-tab-openai" name="provider-tabs" type="radio">
  <input data-provider="openrouter" id="provider-tab-openrouter" name="provider-tabs" type="radio">

  <div class="provider-tabs__labels">
    <label for="provider-tab-gemini">Gemini</label>
    <label for="provider-tab-openai">OpenAI</label>
    <label for="provider-tab-openrouter">OpenRouter</label>
  </div>

  <div class="provider-tabs__panels">
    <section class="provider-tabs__panel provider-tabs__panel--gemini" data-provider="gemini">
      {% capture provider_content %}{% include_relative _providers/gemini.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

    <section class="provider-tabs__panel provider-tabs__panel--openai" data-provider="openai">
      {% capture provider_content %}{% include_relative _providers/openai.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

    <section class="provider-tabs__panel provider-tabs__panel--openrouter" data-provider="openrouter">
      {% capture provider_content %}{% include_relative _providers/openrouter.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

  </div>
</div>
