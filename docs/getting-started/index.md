---
title: はじめに
description: 動作に必要な最低限の準備を順番に確認するページ
---

このセクションでは動作に必要な最低限のステップを説明します．

## 初回起動時の警告について

初回起動時は，OS の保護機能によって警告が出ることがあります．必要な OS の項目を開いて確認してください．

<details class="docs-os-warning">
	<summary>Windows</summary>
	<div markdown="1">
- ダウンロードしたファイルを右クリックして `プロパティ` を開きます．
- 全般のセキュリティの`許可する`のチェックボックスにチェックを入れて，`適用`を押した後，`OK` を押します．

![Windows のプロパティ画面で「許可する」にチェックを入れる例]({{ '/assets/screenshots/getting-started/windows-warning.png' | relative_url }})
</div>
</details>

<details class="docs-os-warning">
  <summary>macOS</summary>
  <div markdown="1">
- アプリを `/Applications` へ移・動します．
- その後，ターミナルで次のコマンドを実行します．

```bash
sudo xattr -r -d com.apple.quarantine /Applications/syllabus-ai-checker.app
```
</div>
</details>

## 使い始めるまでの流れ

インストールが終わったら，次の 3 つを順番に進めるだけで使い始められます．

<div class="docs-guide-cards">
  {% include guide-card.html heading_tag='h3' id='prepare-llm' heading='1. 利用するLLMモデルを準備する' text='使用する LLM のプロバイダーを決めて，APIキー，ベースURL，モデル名を確認します．' url='/getting-started/api-providers/' link_label='利用するLLMモデルの準備の詳細を見る' %}

  {% include guide-card.html heading_tag='h3' id='initial-settings' heading='2. 設定に入力する' text='取得した値をアプリの設定画面に入力して保存します．' url='/getting-started/initial-settings/' link_label='初期設定の詳細を見る' %}

  {% include guide-card.html heading_tag='h3' id='try-demo' heading='3. 実際に使ってみる' text='CSV を読み込み，チェックを実行して結果を確認するまでの流れを確認します．' url='/getting-started/demo/' link_label='使用デモを見る' %}
</div>
