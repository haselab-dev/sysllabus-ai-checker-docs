# シラバスチェックアプリの説明書

このアプリのソースコードは公開されていません．

## GitHub PagesのURL

[https://haselab-dev.github.io/sysllabus-ai-checker-docs](https://haselab-dev.github.io/sysllabus-ai-checker-docs)


## localでホスティングする場合

RubyとBundlerを利用してローカルでビルド・プレビューする手順です。
Bundler が入っていない場合は `gem install bundler` を実行してください。

事前準備として，
```bash
bundle install
```

### ローカルサーバーを起動

```bash
bundle exec jekyll serve -s docs
```

起動後、ブラウザで [http://localhost:4000](http://localhost:4000) にアクセスする

### 3. 本番用の静的ファイルをビルド

```bash
bundle exec jekyll build -s docs
```



