---
title: 生成ファイルと保存場所
description: 設定，プロンプト，履歴，出力ファイルがどこに保存されるかを説明するページ
---

## 保存先ディレクトリ

アプリのデータは次の場所に保存されます．`APIキー` もここに入るため，取り扱いに注意してください．

- Windows: `%APPDATA%\syllabus-ai-checker\`
- macOS: `~/Library/Application Support/syllabus-ai-checker/`
- Linux: `~/.local/share/syllabus-ai-checker/`

## 主な保存内容

- `config.toml`: 設定内容です．`APIキー`，`ベースURL`，`モデル名` もここに保存されます．
- `prompts/`: プロンプトの Markdown ファイルです．
- `runs/`: 実行履歴です．実行ごとにフォルダが作られます．

## 実行ごとのファイル構成

各履歴フォルダには，おおむね次のファイルが作られます．

```text
runs/<run-id>/
  run.json
  run.log
  files/
    1-<入力ファイル名>/
      input.csv
      result.csv
      result-binary.csv
      result.md
```

## 生成ファイル

- `run.json`: 実行状態や進捗の記録です．
- `run.log`: 実行ログです．
- `input.csv`: 各入力ファイルのコピーです．複数ファイルを実行したときは，ファイルごとのフォルダに 1 つずつ保存されます．
- `result.csv`: 元の列に `<項目名>_結果` と `<項目名>_理由` を追加した CSV です．
- `result-binary.csv`: `〇` / `×` を `1` / `0` にした CSV です．`No`，`授業コード`，`授業科目名` も入ります．
- `result.md`: 判定結果を Markdown でまとめたファイルです．

入力ファイルの注意は，[入力ファイル]({{ '/reference/input-files/' | relative_url }}) を参照してください．
出力ファイルの見方は，[出力ファイル]({{ '/reference/output-files/' | relative_url }}) を参照してください．

## APIキーの扱い

- 保存先: `config.toml` に保存されます．
- 保存形式: 暗号化されず，平文で保存されます．
- 注意: `config.toml` や `api_key` を他人に共有しないでください．
- 更新と削除: 不要になった場合は，設定画面で値を更新するか `config.toml` を削除してください．
