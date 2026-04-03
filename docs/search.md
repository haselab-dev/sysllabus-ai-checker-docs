---
title: 検索
description: ドキュメント全体からタイトルや本文中のキーワードを検索するページ
search: false
---

検索したいキーワードを入力すると，タイトルと本文から候補を探せます．

<div class="docs-search-page js-docs-search-page">
  <label class="docs-search-page__label" for="docs-search-page-input">キーワード</label>
  <input class="docs-search-page__input js-docs-search-page-input" id="docs-search-page-input" type="search" placeholder="例: APIキー, OpenRouter, 設定" autocomplete="off">
  <p class="docs-search-page__hint">複数語を入れると，そのすべてを含むページを優先して表示します．</p>
  <p class="docs-search-page__summary js-docs-search-page-summary">キーワードを入力すると候補が表示されます．</p>
  <ul class="docs-search-page__results js-docs-search-page-results"></ul>
</div>

<noscript>
  <p>検索結果の表示には JavaScript が必要です。</p>
</noscript>
