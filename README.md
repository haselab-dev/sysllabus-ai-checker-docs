# シラバスチェックアプリの説明書

このアプリのソースコードは公開されていません．

## GitHub PagesのURL

[https://haselab-dev.github.io/sysllabus-ai-checker-docs](https://haselab-dev.github.io/sysllabus-ai-checker-docs)


## 自分でビルドする場合

RubyとBundlerを利用してローカルでビルド・プレビューする手順です。

### 1. 依存関係のインストール

```bash
bundle install
```

### 2. ローカルサーバーを起動する

```bash
bundle exec jekyll serve -s docs
```

起動後、ブラウザで [http://localhost:4000](http://localhost:4000) にアクセスする

### 3. 本番用の静的ファイルをビルドする（出力のみ）

プレビューは不要で、HTMLファイル等を生成したいだけの場合は `build` コマンドを使用します。

```bash
bundle exec jekyll build -s docs
```



