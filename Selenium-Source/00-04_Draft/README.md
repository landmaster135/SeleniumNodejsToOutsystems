# Sample
## kouhochi-ichiran.js
- 以下の手順のテストを再現しています。

1. アプリにログインして、ページのtitleが「候補地一覧・既存店一覧」であることを確認。
2. 画面内の「保存」ボタンが「確定」ボタンではなく「保存」ボタンであることを確認。
3. 絞り込みポップアップ画面を表示して、その中の項目一覧の中に、'契約時遵守事項成就完了'、'建物登記・抵当権設定'、'着工後遵守事項成就完了'があることを確認。
4. 絞り込みポップアップ画面の中の項目一覧の中に、`unexepectedTexts`の項目名がないことを確認。
5. コメントアウトしています。絞り込みポップアップ画面の中の項目の全てにチェックマークを付ける動きです。疑似要素を見て制御しています。
6. こっちで良かった・・・。絞り込みポップアップ画面の中の項目の全てにチェックマークを付ける動きです。
7. 絞り込みポップアップ画面の中の項目の全てのチェックマークを外す動きです。
8. 保守334で追加した、'契約時遵守事項成就完了'、'建物登記・抵当権設定'、'着工後遵守事項成就完了'だけにチェックを付けます。
9. チェックボックスのXPathが取れるかどうかテスト、そして、ポップアップ画面を「表示項目選択」ボタンで閉じる。
10. チェックを付けた項目がDatagridで表示されているかどうかを確認。編集ボタンを押しているので、編集不可になっているかどうかも確認できます。
11. 割愛。やり方はまだ調べていない。
12. CSV出力ボタンを押す。簡単そうだが、まだ実装していない。

## kouhochi-shosai.js

0. 候補地詳細の開発環境にログイン
1. 候補地詳細の保守環境にログイン。Office365ログインを経由。表示部だけスクショ。
2. アコーディオンを全てクリックして開く。そして、ページ全体をスクショ。
3. 画面内の「保存」ボタンが「確定」ボタンではなく「保存」ボタンであることを確認。
4. 再度候補地詳細画面に入り直す。今回はOffice365ログインはない。そして、「面積合計(賃借面積)(㎡)※借地、FL」の値が0以上であることを確認。

# Image of Directory Structure

```bash

│  chromedriver.exe
│  kouhochi-ichiran.js
│  kouhochi-shosai.js
│  package.json
│
├─lib
│      getXpathByElement.js
│      lib-methods.js
│      lib-variables.js
│
├─RSYS_SMARTSR_PRODUCTION-334
│  └─02.テスト項目・エビデンス
│      ├─03_正常系_表示_絞り込みポップアップ
│      │      screenshot-0001.jpg
│      │
│      ├─04_正常系_非表示_絞り込みポップアップ
│      │      screenshot-0001.jpg
│      │
│      ├─08_正常系_選択_今回の追加項目
│      │      screenshot-0001.jpg
│      │      screenshot-0002.jpg
│      │      screenshot-0003.jpg
│      │
│      └─10_正常系_表示_メイン画面Datagrid
│              screenshot-0001.jpg
│
├─RSYS_SMARTSR_PRODUCTION-436
│  └─02.テスト項目・エビデンス
│      └─02_正常系_表示_保存ボタン
│              screenshot-0001.jpg
│
└─なし（基本動作確認）
    └─02.テスト項目・エビデンス
        ├─01_正常系_表示_ページタイトル
        │      screenshot-0001.jpg
        │
        ├─06_正常系_表示_表示項目を全選択（こっちで良かった・・・）
        │      screenshot-0001.jpg
        │
        └─07_正常系_表示_表示項目を全解除
                screenshot-0001.jpg
```

# Library
## lib-methods.js 🦾
### Functions 🔧
- sleep

  Sleep to wait until display render finishing.

- assertEqual_and_log

  Execute assertion and Output log.

- outputLog

  Output log.

- getStrRepeatedToMark

  Repeate string on parameter to mainly output log.

### Classes 👨‍👨‍👧‍👦

- Operator 🖱

  画面をスクロールしたり、クリックしたりする係です。クリックする際に同時に画面をスクロールするように実装しているつもりです。

- Inspector 🔍

  画面の要素から属性値を取得したりする係です。

- Photographer 📸

  画面をスクショする係です。

- Gofer 🧹

  雑用です。  今のところ、配列をエクセルに貼り付けやすい形で出力したり、数字を0埋めします。

## getXpathByElement.js 🧗

ECMAScriptとしてブラウザで実行させるスクリプトファイルです。
`Inspector`の`getXpathsByClassName`メソッドで使用しています。

## lib-variables.js 📖

### Classes 🖥

- KouhochiShosai

  「候補地詳細」画面用変数

- KouhochiIchiran

  「候補地一覧」画面用変数

- KouhochibetsuShinchoku

  「候補地別進捗表示/編集」画面用変数

and so on ...

# Dev Tips

## Datagridをスクロールさせるのはかなりキツイかも

`Photographer`の`scrollAndCaptureDisplayKohochiIchiranDatagrid`メソッドになりますが、以下の問題点があり掲題の実装は見合わせました。

- スクロールバーによる、スクロールができない。
- 要素によるスクロールをすると、ヘッダー部とデータ部が独立して動くため、スクロールを各々に実行させる必要がある。その場合、どちらかのスクロールが失敗すると、表示の整合性が取れない。
- DatagridのDOM生成はDatagridをスクロールする度に行われ、表示されている項目のDOMしか生成されない。
- Datagridのセルの数が一定ではない。同じ画面の解像度で行って、ヘッダーにあたる要素数が12だったり13だったり7だったりする。

## ログを頻繁に仕込みながら。

SeleniumのAssertionログとエラーメッセージが離れているので、なんだか見づらいためログをゴリゴリ仕込みながら開発していました。

## エラーメッセージ

### ElementClickInterceptedException:

要素をクリックできない時などに起きるエラーです。以下が考えられます。

- ポップアップ画面にある要素なのに、ポップアップ画面を開かないでクリックを実行している。
- メイン画面の要素なのに、ポップアップ画面を開きながらクリックを実行している。
- 画面の描画が終わらないうちにクリックを実行しているため、上２つの事象が起きている。
- 目的の要素が画面に表示されていない。

### NoSuchElementException:

- 指定したクラス名やIDやXPathの要素がない。

### ReferenceError:

- メソッド名が間違っている。
- メソッドを実行するクラスが違う。
- クラスを付け忘れている。

***

[return top](#Sample)
