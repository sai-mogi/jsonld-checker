# JSON-LD Checker

ページ上のJSON-LD構造化データを検証するChrome拡張。
構文エラー検出、Schema.orgの必須/推奨プロパティチェック、Markdownエクスポートに対応。

## インストール

1. このリポジトリをcloneまたはダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 右上の「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、リポジトリのディレクトリを選択
5. ツールバーに拡張アイコンが表示される

## 使い方

1. JSON-LD構造化データがあるページに移動
2. ツールバーの拡張アイコンをクリック
3. 各JSON-LDブロックがステータス付きで表示される
   - **OK** -- 必須プロパティが全て存在し、警告なし
   - **Warning** -- 推奨プロパティが不足
   - **Error** -- 必須プロパティの不足、またはJSONパースエラー
4. ブロックのヘッダーをクリックすると詳細を展開（プロパティチェックリスト、子要素の問題、Raw JSON）
5. **「Copy as Markdown」** ボタンでチェック結果全体をクリップボードにコピー

## 機能

- **JSON-LD自動検出** -- ページ内の全ての `<script type="application/ld+json">` タグを検出
- **構文チェック** -- JSONパースエラーを詳細に表示。制御文字は自動除去してリトライ
- **Schema.orgプロパティチェック** -- Google Search Central公式ドキュメント（2026-03時点）に基づく必須/推奨プロパティの検証
- **`@graph` 対応** -- 1つの `@graph` 配列内の複数エンティティを展開して個別にチェック
- **BreadcrumbListバリデーション** -- Google仕様に準拠し、最後のアイテム以外に `item`（URL）がない場合はエラーとして検出
- **日本語対応** -- スキーマタイプ名やプロパティ名に日本語の説明を併記表示
- **Markdownエクスポート** -- 「Markdown」ボタンでチェック結果をMarkdown形式でコピー。AIツールやチームへの共有に便利
- **Googleリッチリザルトテスト連携** -- 「Rich Results Test」ボタンで現在のページURLを指定して[Googleリッチリザルトテスト](https://search.google.com/test/rich-results)を直接開く（公開URLのみ対応。ローカル環境では下記の「Rich Result用」コピーを利用）
- **Googleリッチリザルトテスト用コピー** -- 「Rich Result用」ボタンで `<script type="application/ld+json">` タグごとコピー。[Googleリッチリザルトテスト](https://search.google.com/test/rich-results)のコード入力にそのまま貼り付けて検証できる
- **Raw JSONコピー** -- 各JSON-LDブロックを個別にコピー可能

## 対応スキーマタイプ

| タイプ | 日本語名 | 必須 | 推奨 |
|--------|----------|------|------|
| Product | 商品 | name, image, offers | description, sku, brand, gtin, mpn, category, review, aggregateRating |
| Offer | 販売情報 | price, priceCurrency | availability, url, priceValidUntil, itemCondition, shippingDetails, hasMerchantReturnPolicy |
| AggregateOffer | 価格帯 | lowPrice, priceCurrency | highPrice, offerCount |
| AggregateRating | 総合評価 | ratingValue | reviewCount, ratingCount, bestRating, worstRating |
| Review | レビュー | (なし) | author, name, reviewRating, positiveNotes, negativeNotes |
| WebSite | ウェブサイト | name, url | alternateName |
| CollectionPage | コレクションページ | name | description, url, isPartOf, publisher, mainEntity |
| Organization | 組織 | (なし) | name, url, logo, description, address, contactPoint, email, telephone, sameAs, alternateName, legalName |
| LocalBusiness | ローカルビジネス | name, address | url, telephone, geo, openingHoursSpecification, priceRange, image |
| Article | 記事 | (なし) | headline, author, datePublished, dateModified, image, description |
| NewsArticle | ニュース記事 | (なし) | headline, author, datePublished, dateModified, image, description |
| BlogPosting | ブログ記事 | (なし) | headline, author, datePublished, dateModified, image, description |
| BreadcrumbList | パンくずリスト | itemListElement | (なし) |
| ItemList | リスト | itemListElement | name, numberOfItems |
| ListItem | リスト項目 | position | name |
| FAQPage | よくある質問 | mainEntity | (なし) |
| Question | 質問 | name, acceptedAnswer | (なし) |
| Answer | 回答 | text | (なし) |
| Event | イベント | name, startDate, location | endDate, description, image, eventStatus, offers, organizer, performer |
| MerchantReturnPolicy | 返品ポリシー | applicableCountry, returnPolicyCategory | merchantReturnDays, returnMethod, returnFees |
| PostalAddress | 住所 | (なし) | addressCountry, addressRegion, streetAddress, postalCode, addressLocality |
| Credential | 資格・許可 | credentialCategory | identifier, recognizedBy |

プロパティルールは [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/) の公式ドキュメントに準拠。

## スキーマタイプの追加方法

`popup.js` の `SCHEMA_RULES` オブジェクトを編集:

```javascript
const SCHEMA_RULES = {
  // ...既存のルール...
  YourNewType: {
    required: ['propertyA', 'propertyB'],
    recommended: ['propertyC', 'propertyD'],
  },
};
```

- `required` -- 未定義の場合 **Error** になるプロパティ
- `recommended` -- 未定義の場合 **Warning** になるプロパティ
- `@type` を持つ子オブジェクトは再帰的にチェックされる（最大3階層）

編集後、`chrome://extensions/` で拡張を再読み込みすると反映される。

## 設定

### チェック深度

子要素のチェック深度はデフォルトで3階層まで。変更する場合は `popup.js` の `validateNode` 関数内の `MAX_DEPTH` を編集:

```javascript
function validateNode(data, path = '', depth = 0) {
  const MAX_DEPTH = 3; // この値を変更
```

## ファイル構成

```
jsonld-checker/
  manifest.json   -- Chrome拡張マニフェスト (Manifest V3)
  popup.html      -- ポップアップUI
  popup.js        -- 検出、パース、バリデーション、Markdownエクスポート
  icon.png        -- ツールバーアイコン (48x48)
  icon128.png     -- 拡張ページアイコン (128x128)
  LICENSE         -- MITライセンス
```

## ライセンス

MIT
