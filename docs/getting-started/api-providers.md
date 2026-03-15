---
title: 利用するLLMモデルの準備
description: APIキー、ベースURL、モデル名の確認方法
layout: article
nav_key: docs
sidebar:
  nav: docs
aside: false
---

このアプリでは、`APIキー`、`ベースURL`、`モデル名` が必要になります．

使用するLLMプロバイダーを選択し，以下を参考にしながら `APIキー`、`ベースURL`、`モデル名` を確認してください．

<div class="provider-tabs">
  <input checked id="provider-tab-gemini" name="provider-tabs" type="radio">
  <input id="provider-tab-openai" name="provider-tabs" type="radio">
  <input id="provider-tab-openrouter" name="provider-tabs" type="radio">
  <input id="provider-tab-anthropic" name="provider-tabs" type="radio">

  <div class="provider-tabs__labels">
    <label for="provider-tab-gemini">Gemini</label>
    <label for="provider-tab-openai">OpenAI</label>
    <label for="provider-tab-openrouter">OpenRouter</label>
    <label for="provider-tab-anthropic">Anthropic</label>
  </div>

  <div class="provider-tabs__panels">
    <section class="provider-tabs__panel provider-tabs__panel--gemini">
      {% capture provider_content %}{% include_relative _providers/gemini.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

    <section class="provider-tabs__panel provider-tabs__panel--openai">
      {% capture provider_content %}{% include_relative _providers/openai.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

    <section class="provider-tabs__panel provider-tabs__panel--openrouter">
      {% capture provider_content %}{% include_relative _providers/openrouter.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

    <section class="provider-tabs__panel provider-tabs__panel--anthropic">
      {% capture provider_content %}{% include_relative _providers/anthropic.md %}{% endcapture %}
      {{ provider_content | markdownify }}
    </section>

  </div>
</div>
