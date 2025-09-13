# Skills Wallet - 樣式系統指南

這個專案已經重構為使用 CSS Modules 和 SCSS，提供了一個可擴展且易於維護的樣式系統。

## 📁 檔案結構

```
src/
├── styles/
│   ├── variables.scss     # 全域變數（顏色、字體、間距等）
│   ├── mixins.scss       # 可重複使用的 mixins
│   └── global.scss       # 全域樣式
├── pages/
│   ├── Login.module.scss # 組件特定的樣式
│   └── provider/
│       └── ProviderDashboard.module.scss
└── components/
    └── ComponentName.module.scss
```

## 🎨 使用方式

### 1. 創建新的組件樣式

為每個組件創建對應的 `.module.scss` 檔案：

```scss
// ComponentName.module.scss
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.container {
  @include flex-center;
  background: $digital-dark;
  padding: $spacing-8;
}

.title {
  @include heading-1;
  color: white;
}
```

### 2. 在 React 組件中使用

```jsx
import React from 'react';
import styles from './ComponentName.module.scss';

export default function ComponentName() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World</h1>
    </div>
  );
}
```

## 🎯 可用的變數

### 顏色
```scss
$primary-orange: #ff6b35;
$sunset-orange: #f7931e;
$primary-blue: #2e86ab;
$primary-green: #4ecdcc;
$digital-dark: #0f172a;
```

### 字體大小
```scss
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px
```

### 間距
```scss
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
```

## 🔧 可用的 Mixins

### 布局 Mixins
```scss
@include flex-center;        // display: flex, align-items: center, justify-content: center
@include flex-between;       // display: flex, align-items: center, justify-content: space-between
@include flex-column;        // display: flex, flex-direction: column
@include grid-2;             // display: grid, grid-template-columns: repeat(2, 1fr)
@include grid-3;             // display: grid, grid-template-columns: repeat(3, 1fr)
@include grid-4;             // display: grid, grid-template-columns: repeat(4, 1fr)
```

### 視覺效果 Mixins
```scss
@include glass-effect(0.95);           // 玻璃效果
@include gradient-bg($color1, $color2); // 漸層背景
@include glow-effect($color, 20px);     // 發光效果
@include text-gradient($color1, $color2); // 文字漸層
```

### 互動效果 Mixins
```scss
@include hover-lift(-3px);    // 懸停時向上移動
@include button-hover;        // 按鈕懸停效果
@include focus-ring($color);  // 焦點環效果
```

### 表單元素 Mixins
```scss
@include input-style;         // 標準輸入框樣式
@include button-primary;      // 主要按鈕樣式
@include button-secondary;    // 次要按鈕樣式
@include button-success;      // 成功按鈕樣式
```

### 排版 Mixins
```scss
@include heading-1;    // 大標題樣式
@include heading-2;    // 中標題樣式
@include heading-3;    // 小標題樣式
@include body-text;    // 正文樣式
```

### 響應式 Mixins
```scss
@include mobile {
  // 手機樣式
}

@include tablet {
  // 平板樣式
}

@include desktop {
  // 桌面樣式
}
```

## 📱 響應式設計

使用內建的斷點 mixins：

```scss
.component {
  padding: $spacing-4;
  
  @include mobile {
    padding: $spacing-2;
  }
  
  @include tablet {
    padding: $spacing-6;
  }
}
```

## 🌙 深色模式支援

系統已預設為深色模式，使用 `$digital-dark` 作為主要背景色。未來可以輕鬆切換到淺色模式。

## 🎭 動畫效果

可用的動畫類別：
- `.fade-in` - 淡入效果
- `.fade-in-up` - 從下往上淡入效果

## 📝 最佳實踐

1. **使用變數**：總是使用 SCSS 變數而不是硬編碼的值
2. **使用 Mixins**：重複的樣式模式使用 mixins
3. **模組化**：每個組件有自己的樣式檔案
4. **命名規範**：使用 camelCase 命名 CSS 類別
5. **響應式優先**：從移動裝置開始設計，然後向上擴展

## 🔄 從舊樣式遷移

1. 移除 `style jsx` 區塊
2. 創建 `.module.scss` 檔案
3. 將樣式轉換為 SCSS 語法
4. 使用變數和 mixins
5. 更新 JSX 中的 className

## ✅ 已重構的組件

以下組件已經完全重構為 CSS Modules：

- ✅ **Login.jsx** - 登入頁面
- ✅ **Assessment.jsx** - 評估頁面
- ✅ **ProviderDashboard.jsx** - 教育提供者儀表板
- ✅ **IssueCredential.jsx** - 發行憑證頁面
- ✅ **BlockchainRecords.jsx** - 區塊鏈記錄頁面
- ✅ **VerifierDashboard.jsx** - 驗證者儀表板
- ✅ **DesignSystem.jsx** - 設計系統展示頁面

所有組件都已經：
- 移除了內聯樣式
- 使用 CSS Modules
- 導入全域變數和 mixins
- 實現響應式設計
- 保持深色主題一致性

## 🛠️ 開發工具

- **Vite** 配置已設定支援 SCSS
- **CSS Modules** 自動處理類別名稱作用域
- **熱重載** 支援樣式變更

這個樣式系統提供了：
- ✅ 類型安全的 CSS
- ✅ 自動化的類別名稱作用域
- ✅ 可重複使用的設計系統
- ✅ 響應式設計支援
- ✅ 深色模式準備
- ✅ 易於維護和擴展
