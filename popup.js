// Google Search Central 公式ドキュメント準拠 (2026-03)
// https://developers.google.com/search/docs/appearance/structured-data/
const SCHEMA_RULES = {
  Product: {
    required: ['name', 'image', 'offers'],
    recommended: [
      'description', 'sku', 'brand', 'gtin', 'mpn', 'category',
      'review', 'aggregateRating',
    ],
  },
  Offer: {
    required: ['price', 'priceCurrency'],
    recommended: [
      'availability', 'url', 'priceValidUntil', 'itemCondition',
      'shippingDetails', 'hasMerchantReturnPolicy',
    ],
  },
  AggregateOffer: {
    required: ['lowPrice', 'priceCurrency'],
    recommended: ['highPrice', 'offerCount'],
  },
  AggregateRating: {
    required: ['ratingValue'],
    recommended: ['reviewCount', 'ratingCount', 'bestRating', 'worstRating'],
  },
  Review: {
    required: [],
    recommended: ['author', 'name', 'reviewRating', 'positiveNotes', 'negativeNotes'],
  },
  WebSite: {
    required: ['name', 'url'],
    recommended: ['alternateName'],
  },
  CollectionPage: {
    required: ['name'],
    recommended: ['description', 'url', 'isPartOf', 'publisher', 'mainEntity'],
  },
  ItemList: {
    required: ['itemListElement'],
    recommended: ['name', 'numberOfItems'],
  },
  ListItem: {
    required: ['position'],
    recommended: ['name'],
  },
  Organization: {
    required: [],
    recommended: [
      'name', 'url', 'logo', 'description', 'address', 'contactPoint',
      'email', 'telephone', 'sameAs', 'alternateName', 'legalName',
    ],
  },
  LocalBusiness: {
    required: ['name', 'address'],
    recommended: [
      'url', 'telephone', 'geo', 'openingHoursSpecification',
      'priceRange', 'image', 'aggregateRating', 'review',
    ],
  },
  Article: {
    required: [],
    recommended: [
      'headline', 'author', 'datePublished', 'dateModified', 'image', 'description',
    ],
  },
  NewsArticle: {
    required: [],
    recommended: [
      'headline', 'author', 'datePublished', 'dateModified', 'image', 'description',
    ],
  },
  BlogPosting: {
    required: [],
    recommended: [
      'headline', 'author', 'datePublished', 'dateModified', 'image', 'description',
    ],
  },
  BreadcrumbList: {
    required: ['itemListElement'],
    recommended: [],
  },
  FAQPage: {
    required: ['mainEntity'],
    recommended: [],
  },
  Question: {
    required: ['name', 'acceptedAnswer'],
    recommended: [],
  },
  Answer: {
    required: ['text'],
    recommended: [],
  },
  Event: {
    required: ['name', 'startDate', 'location'],
    recommended: [
      'endDate', 'description', 'image', 'eventStatus',
      'offers', 'organizer', 'performer', 'previousStartDate',
    ],
  },
  MerchantReturnPolicy: {
    required: ['applicableCountry', 'returnPolicyCategory'],
    recommended: ['merchantReturnDays', 'returnMethod', 'returnFees'],
  },
  PostalAddress: {
    required: [],
    recommended: ['addressCountry', 'addressRegion', 'streetAddress', 'postalCode', 'addressLocality'],
  },
  Credential: {
    required: ['credentialCategory'],
    recommended: ['identifier', 'recognizedBy'],
  },
};

// 日本語翻訳
const LABELS = {
  types: {
    Product: '商品',
    Offer: '販売情報',
    AggregateOffer: '価格帯',
    AggregateRating: '総合評価',
    Review: 'レビュー',
    WebSite: 'ウェブサイト',
    CollectionPage: 'コレクションページ',
    ItemList: 'リスト',
    ListItem: 'リスト項目',
    Organization: '組織',
    LocalBusiness: 'ローカルビジネス',
    Article: '記事',
    NewsArticle: 'ニュース記事',
    BlogPosting: 'ブログ記事',
    BreadcrumbList: 'パンくずリスト',
    FAQPage: 'よくある質問',
    Question: '質問',
    Answer: '回答',
    Event: 'イベント',
    MerchantReturnPolicy: '返品ポリシー',
    PostalAddress: '住所',
    Credential: '資格・許可',
  },
  props: {
    name: '名前',
    image: '画像',
    offers: '販売情報',
    description: '説明',
    sku: '商品コード',
    brand: 'ブランド',
    gtin: 'JANコード',
    mpn: '型番',
    category: 'カテゴリ',
    review: 'レビュー',
    aggregateRating: '総合評価',
    price: '価格',
    priceCurrency: '通貨',
    availability: '在庫状況',
    url: 'URL',
    priceValidUntil: '価格有効期限',
    itemCondition: '商品の状態',
    shippingDetails: '配送情報',
    hasMerchantReturnPolicy: '返品ポリシー',
    lowPrice: '最低価格',
    highPrice: '最高価格',
    offerCount: 'オファー数',
    ratingValue: '評価値',
    reviewCount: 'レビュー数',
    ratingCount: '評価数',
    bestRating: '最高評価',
    worstRating: '最低評価',
    author: '著者',
    reviewRating: '評価',
    positiveNotes: '良い点',
    negativeNotes: '悪い点',
    alternateName: '別名',
    logo: 'ロゴ',
    address: '住所',
    contactPoint: '連絡先',
    email: 'メール',
    telephone: '電話番号',
    sameAs: 'SNS・外部リンク',
    legalName: '正式名称',
    headline: '見出し',
    datePublished: '公開日',
    dateModified: '更新日',
    publisher: '発行者',
    isPartOf: '所属サイト',
    mainEntity: 'メインコンテンツ',
    itemListElement: 'リスト要素',
    numberOfItems: 'アイテム数',
    position: '順番',
    item: 'アイテム',
    startDate: '開始日',
    endDate: '終了日',
    location: '場所',
    eventStatus: 'ステータス',
    organizer: '主催者',
    performer: '出演者',
    previousStartDate: '変更前の開始日',
    geo: '座標',
    openingHoursSpecification: '営業時間',
    priceRange: '価格帯',
    mainEntity: 'メインコンテンツ',
    acceptedAnswer: '回答',
    text: '本文',
    applicableCountry: '対象国',
    returnPolicyCategory: '返品種別',
    merchantReturnDays: '返品期限（日数）',
    returnMethod: '返品方法',
    returnFees: '返品費用',
    addressCountry: '国',
    addressRegion: '都道府県',
    streetAddress: '住所（番地）',
    postalCode: '郵便番号',
    addressLocality: '市区町村',
    credentialCategory: '資格種別',
    identifier: '識別番号',
    recognizedBy: '発行元',
  },
};

function labelType(type) {
  const ja = LABELS.types[type];
  return ja ? `${type}（${ja}）` : type;
}

function labelProp(prop) {
  const ja = LABELS.props[prop];
  return ja ? `${prop}（${ja}）` : prop;
}

function extractJsonLd() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  return Array.from(scripts).map((el) => el.textContent || '');
}

function sanitize(raw) {
  return raw.replace(/[\x00-\x1F\x7F]/g, (m) =>
    m === '\n' || m === '\r' || m === '\t' ? ' ' : ''
  );
}

function tryParse(raw) {
  // まず生のままパース
  try {
    return { data: JSON.parse(raw), cleaned: false, error: null };
  } catch (_) {
    // 制御文字を除去してリトライ
  }
  const cleaned = sanitize(raw);
  try {
    return { data: JSON.parse(cleaned), cleaned: true, error: null };
  } catch (e) {
    return { data: null, cleaned: true, error: e.message };
  }
}

function validateNode(data, path = '', depth = 0) {
  const MAX_DEPTH = 3; // 3階層より深い子要素はチェックしない
  const issues = [];
  const type = data['@type'];
  if (!type) {
    issues.push({ path, level: 'error', msg: '@type が未定義' });
    return issues;
  }

  if (depth >= MAX_DEPTH) return issues;

  const rule = SCHEMA_RULES[type];
  if (!rule) {
    issues.push({ path, level: 'info', msg: `${labelType(type)} のルール未定義（チェックスキップ）` });
    return issues;
  }

  for (const prop of rule.required) {
    if (data[prop] === undefined || data[prop] === null || data[prop] === '') {
      issues.push({ path, level: 'error', msg: `必須: ${labelProp(prop)} が未定義`, prop });
    }
  }
  for (const prop of rule.recommended) {
    if (data[prop] === undefined || data[prop] === null || data[prop] === '') {
      issues.push({ path, level: 'warn', msg: `推奨: ${labelProp(prop)} が未定義`, prop });
    }
  }

  // BreadcrumbList: 最後以外のListItemには item（URL）が必須
  if (type === 'BreadcrumbList' && Array.isArray(data.itemListElement)) {
    const items = data.itemListElement;
    items.forEach((li, i) => {
      if (li && li['@type'] === 'ListItem' && i < items.length - 1) {
        if (!li.item) {
          const liPath = path ? `${path}.itemListElement[${i}]` : `itemListElement[${i}]`;
          issues.push({ path: liPath, level: 'error', msg: `必須: ${labelProp('item')} が未定義（最後のアイテム以外はURLが必要）` });
        }
      }
    });
  }

  // 子要素の再帰チェック
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === 'object' && val['@type']) {
      issues.push(...validateNode(val, path ? `${path}.${key}` : key, depth + 1));
    }
    if (Array.isArray(val)) {
      val.forEach((item, i) => {
        if (item && typeof item === 'object' && item['@type']) {
          issues.push(...validateNode(item, `${path ? path + '.' : ''}${key}[${i}]`, depth + 1));
        }
      });
    }
  }

  return issues;
}

function getAllProps(data, rule) {
  if (!rule) return { present: [], missing: [], recommended: [] };
  const all = [...rule.required, ...rule.recommended];
  const present = all.filter(
    (p) => data[p] !== undefined && data[p] !== null && data[p] !== ''
  );
  const missing = rule.required.filter(
    (p) => data[p] === undefined || data[p] === null || data[p] === ''
  );
  const recommended = rule.recommended.filter(
    (p) => data[p] === undefined || data[p] === null || data[p] === ''
  );
  return { present, missing, recommended };
}

function render(results) {
  const container = document.getElementById('results');
  const summaryEl = document.getElementById('summary');

  if (results.length === 0) {
    container.innerHTML = '<div class="empty">JSON-LD が見つかりません</div>';
    return;
  }

  let totalOk = 0;
  let totalWarn = 0;
  let totalErr = 0;

  // @graph を展開して個別ノードに分解
  const expandedResults = [];
  results.forEach((r) => {
    const { data, cleaned, error } = tryParse(r);
    if (!error && data && Array.isArray(data['@graph'])) {
      // @graph 内の各ノードを個別結果として展開
      data['@graph'].forEach((node) => {
        const nodeJson = JSON.stringify(node, null, 2);
        expandedResults.push({ raw: nodeJson, parsed: { data: node, cleaned, error: null } });
      });
    } else {
      expandedResults.push({ raw: r, parsed: { data, cleaned, error } });
    }
  });

  expandedResults.forEach(({ raw: r, parsed }, i) => {
    const block = document.createElement('div');
    block.className = 'block';

    const { data, cleaned, error } = parsed;

    let statusClass, badgeClass, statusLabel;
    if (error) {
      statusClass = 'status-err';
      badgeClass = 'badge-err';
      statusLabel = 'Parse Error';
      totalErr++;
    } else {
      const issues = validateNode(data);
      const hasErr = issues.some((x) => x.level === 'error');
      const hasWarn = issues.some((x) => x.level === 'warn');
      if (hasErr) {
        statusClass = 'status-err';
        badgeClass = 'badge-err';
        statusLabel = 'Error';
        totalErr++;
      } else if (hasWarn) {
        statusClass = 'status-warn';
        badgeClass = 'badge-warn';
        statusLabel = 'Warning';
        totalWarn++;
      } else {
        statusClass = 'status-ok';
        badgeClass = 'badge-ok';
        statusLabel = 'OK';
        totalOk++;
      }
    }

    const typeName = data ? data['@type'] || '(unknown)' : '(parse error)';

    // Header
    const header = document.createElement('div');
    header.className = 'block-header';
    header.innerHTML = `
      <span class="arrow">&#9654;</span>
      <span class="badge ${badgeClass}">${statusLabel}</span>
      <span>#${i + 1} — ${labelType(typeName)}</span>
    `;

    const body = document.createElement('div');
    body.className = 'block-body';

    header.addEventListener('click', () => {
      const arrow = header.querySelector('.arrow');
      arrow.classList.toggle('open');
      body.classList.toggle('open');
    });

    if (error) {
      // パースエラー
      let html = `<div class="section">
        <div class="section-title">Parse Error</div>
        <div class="error-msg">${escHtml(error)}</div>
      </div>`;
      if (cleaned) {
        html += `<div class="section">
          <div class="section-title">Note</div>
          <p style="font-size:12px;color:#666;">制御文字の除去後もパース失敗。JSON構文を確認してください。</p>
        </div>`;
      }
      html += rawSection(r, i);
      body.innerHTML = html;
    } else {
      // バリデーション
      const issues = validateNode(data);
      const rule = SCHEMA_RULES[typeName];
      const { present, missing, recommended } = getAllProps(data, rule);

      let html = '';

      if (cleaned) {
        html += `<div class="section">
          <div class="section-title" style="color:#d97706;">&#9888; 制御文字を除去してパースしました（元のJSONに不正な文字が含まれています）</div>
        </div>`;
      }

      // プロパティチェック
      if (rule) {
        html += `<div class="section"><div class="section-title">プロパティチェック -- ${labelType(typeName)}</div><ul class="prop-list">`;
        for (const p of present) {
          html += `<li class="prop-present">${labelProp(p)}</li>`;
        }
        for (const p of missing) {
          html += `<li class="prop-missing">${labelProp(p)} <span style="color:#dc2626;font-size:11px;">（必須）</span></li>`;
        }
        for (const p of recommended) {
          html += `<li class="prop-recommended">${labelProp(p)} <span style="color:#d97706;font-size:11px;">（推奨）</span></li>`;
        }
        html += '</ul></div>';
      }

      // 子要素のissue
      const childIssues = issues.filter((x) => x.path);
      if (childIssues.length > 0) {
        html += `<div class="section"><div class="section-title">子要素の問題</div><ul class="prop-list">`;
        for (const issue of childIssues) {
          const cls =
            issue.level === 'error'
              ? 'prop-missing'
              : issue.level === 'warn'
                ? 'prop-recommended'
                : 'prop-present';
          html += `<li class="${cls}"><strong>${issue.path}</strong>: ${issue.msg}</li>`;
        }
        html += '</ul></div>';
      }

      html += rawSection(r, i);
      body.innerHTML = html;
    }

    block.appendChild(header);
    block.appendChild(body);
    container.appendChild(block);
  });

  // サマリー
  summaryEl.innerHTML = `
    <div class="summary-item">検出: <strong>${expandedResults.length}</strong></div>
    ${totalOk ? `<div class="summary-item status-ok">OK: <strong>${totalOk}</strong></div>` : ''}
    ${totalWarn ? `<div class="summary-item status-warn">Warning: <strong>${totalWarn}</strong></div>` : ''}
    ${totalErr ? `<div class="summary-item status-err">Error: <strong>${totalErr}</strong></div>` : ''}
    <div class="btn-group">
      <button class="md-btn" id="copy-md-btn">Markdown</button>
      <button class="md-btn" id="copy-rich-btn" style="background:#b45309;">Rich Result用</button>
      <button class="md-btn" id="open-richtest-btn" style="background:#4285f4;">Rich Results Test</button>
    </div>
  `;

  // Markdownコピーボタン
  document.getElementById('copy-md-btn').addEventListener('click', (e) => {
    const md = buildMarkdownReport(results, currentPageUrl);
    navigator.clipboard.writeText(md).then(() => {
      e.target.textContent = 'Copied!';
      e.target.classList.add('copied');
      setTimeout(() => {
        e.target.textContent = 'Markdown';
        e.target.classList.remove('copied');
      }, 2000);
    });
  });

  // Rich Results Testを開くボタン
  document.getElementById('open-richtest-btn').addEventListener('click', () => {
    const testUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(currentPageUrl)}`;
    chrome.tabs.create({ url: testUrl });
  });

  // リッチリザルトテスト用コピーボタン
  document.getElementById('copy-rich-btn').addEventListener('click', (e) => {
    const html = results.map((r) => {
      const { data, error } = tryParse(r);
      if (error) return '';
      const json = JSON.stringify(data, null, 2);
      return `<script type="application/ld+json">\n${json}\n<\/script>`;
    }).filter(Boolean).join('\n');
    navigator.clipboard.writeText(html).then(() => {
      e.target.textContent = 'Copied!';
      e.target.classList.add('copied');
      setTimeout(() => {
        e.target.textContent = 'Rich Result用';
        e.target.classList.remove('copied');
      }, 2000);
    });
  });
}

function rawSection(raw, index) {
  const id = `raw-${index}`;
  return `<div class="section">
    <div class="section-title">Raw JSON-LD <button class="copy-btn" data-target="${id}">Copy</button></div>
    <div class="raw-json" id="${id}">${escHtml(raw.trim())}</div>
  </div>`;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 全結果をMarkdownレポートとして生成
function buildMarkdownReport(results, pageUrl) {
  // @graph を展開
  const expanded = [];
  results.forEach((r) => {
    const { data, cleaned, error } = tryParse(r);
    if (!error && data && Array.isArray(data['@graph'])) {
      data['@graph'].forEach((node) => {
        expanded.push({ raw: JSON.stringify(node, null, 2), parsed: { data: node, cleaned, error: null } });
      });
    } else {
      expanded.push({ raw: r, parsed: { data, cleaned, error } });
    }
  });

  const lines = [];
  lines.push(`# JSON-LD チェック結果`);
  lines.push('');
  lines.push(`**URL:** ${pageUrl}`);
  lines.push(`**検出数:** ${expanded.length}`);
  lines.push('');

  expanded.forEach(({ raw: r, parsed }, i) => {
    const { data, cleaned, error } = parsed;
    const typeName = data ? data['@type'] || '(unknown)' : '(parse error)';

    lines.push(`---`);
    lines.push('');
    lines.push(`## #${i + 1} — ${labelType(typeName)}`);
    lines.push('');

    if (error) {
      lines.push(`**Status:** Parse Error`);
      lines.push('');
      lines.push(`### エラー内容`);
      lines.push('');
      lines.push('```');
      lines.push(error);
      lines.push('```');
      if (cleaned) {
        lines.push('');
        lines.push('> 制御文字の除去後もパース失敗。JSON構文を確認してください。');
      }
    } else {
      const issues = validateNode(data);
      const hasErr = issues.some((x) => x.level === 'error');
      const hasWarn = issues.some((x) => x.level === 'warn');
      const status = hasErr ? 'Error' : hasWarn ? 'Warning' : 'OK';
      lines.push(`**Status:** ${status}`);

      if (cleaned) {
        lines.push('');
        lines.push('> 制御文字を除去してパースしました（元のJSONに不正な文字が含まれています）');
      }

      const rule = SCHEMA_RULES[typeName];
      if (rule) {
        const { present, missing, recommended } = getAllProps(data, rule);
        lines.push('');
        lines.push(`### プロパティチェック -- ${labelType(typeName)}`);
        lines.push('');
        for (const p of present) {
          lines.push(`- [x] \`${p}\`（${LABELS.props[p] || ''}）`);
        }
        for (const p of missing) {
          lines.push(`- [ ] \`${p}\`（${LABELS.props[p] || ''}）— **必須**`);
        }
        for (const p of recommended) {
          lines.push(`- [ ] \`${p}\`（${LABELS.props[p] || ''}）— 推奨`);
        }
      }

      const childIssues = issues.filter((x) => x.path);
      if (childIssues.length > 0) {
        lines.push('');
        lines.push(`### 子要素の問題`);
        lines.push('');
        for (const issue of childIssues) {
          const icon = issue.level === 'error' ? '**[ERROR]**' : issue.level === 'warn' ? '[WARN]' : '[INFO]';
          lines.push(`- ${icon} \`${issue.path}\`: ${issue.msg}`);
        }
      }
    }

    // Raw JSON
    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Raw JSON-LD</summary>');
    lines.push('');
    lines.push('```json');
    if (data) {
      try {
        lines.push(JSON.stringify(data, null, 2));
      } catch (_) {
        lines.push(r.trim());
      }
    } else {
      lines.push(r.trim());
    }
    lines.push('```');
    lines.push('</details>');
    lines.push('');
  });

  return lines.join('\n');
}

// Copyボタンのイベント委譲
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    const target = document.getElementById(e.target.dataset.target);
    if (target) {
      navigator.clipboard.writeText(target.textContent).then(() => {
        e.target.textContent = 'Copied!';
        setTimeout(() => (e.target.textContent = 'Copy'), 1500);
      });
    }
  }
});

// ページからJSON-LDを取得して表示
let currentPageUrl = '';

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;
  currentPageUrl = tabs[0].url || '';

  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      func: extractJsonLd,
    },
    (injectionResults) => {
      if (chrome.runtime.lastError) {
        document.getElementById('results').innerHTML = `<div class="empty">エラー: ${escHtml(chrome.runtime.lastError.message)}</div>`;
        return;
      }
      const results = injectionResults?.[0]?.result || [];
      render(results);
    }
  );
});
