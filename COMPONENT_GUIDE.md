# 🧩 UI Components Library Guide

本專案已建立完整的UI組件庫，所有UI元素都抽取成可重複使用的React組件。

## 📁 組件結構

```
src/components/ui/
├── Button.jsx & Button.module.scss
├── Card.jsx & Card.module.scss
├── Input.jsx & Input.module.scss
├── Badge.jsx & Badge.module.scss
├── Container.jsx & Container.module.scss
├── Typography.jsx & Typography.module.scss
├── Grid.jsx & Grid.module.scss
└── index.js
```

## 🎯 組件列表

### 1. Button 組件

**用途**: 可重複使用的按鈕組件

**Props**:
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean - 載入狀態
- `disabled`: boolean - 禁用狀態
- `fullWidth`: boolean - 全寬按鈕

**使用範例**:
```jsx
import { Button } from '../components/ui';

<Button variant="primary" size="lg" fullWidth>
  Sign In
</Button>

<Button variant="success" loading={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### 2. Card 組件

**用途**: 卡片容器組件

**Props**:
- `variant`: 'default' | 'glass' | 'outlined' | 'dark'
- `size`: 'sm' | 'md' | 'lg'
- `hover`: boolean - 懸停效果
- `clickable`: boolean - 可點擊狀態

**使用範例**:
```jsx
import { Card } from '../components/ui';

<Card variant="glass" size="lg" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### 3. Input 組件

**用途**: 輸入框組件

**Props**:
- `variant`: 'default' | 'dark' | 'outlined'
- `size`: 'sm' | 'md' | 'lg'
- `type`: string - 輸入類型
- `error`: boolean - 錯誤狀態
- `disabled`: boolean - 禁用狀態

**使用範例**:
```jsx
import { Input } from '../components/ui';

<Input
  variant="dark"
  size="lg"
  type="text"
  placeholder="Enter username"
  error={hasError}
/>
```

### 4. Badge 組件

**用途**: 狀態徽章組件

**Props**:
- `variant`: 'success' | 'warning' | 'error' | 'info' | 'neutral'
- `size`: 'sm' | 'md' | 'lg'
- `outlined`: boolean - 外框樣式

**使用範例**:
```jsx
import { Badge } from '../components/ui';

<Badge variant="success" size="md">
  Verified
</Badge>

<Badge variant="error" outlined>
  Failed
</Badge>
```

### 5. Container 組件

**用途**: 頁面容器組件

**Props**:
- `variant`: 'default' | 'glass' | 'gradient'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `fullHeight`: boolean - 全高度
- `centered`: boolean - 居中對齊

**使用範例**:
```jsx
import { Container } from '../components/ui';

<Container variant="default" size="lg" fullHeight centered>
  <h1>Page Content</h1>
</Container>
```

### 6. Typography 組件

**用途**: 文字排版組件

**Props**:
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption'
- `color`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white' | 'gray'
- `gradient`: boolean - 漸層文字效果
- `centered`: boolean - 居中對齊

**使用範例**:
```jsx
import { Typography } from '../components/ui';

<Typography variant="h1" gradient primary>
  Page Title
</Typography>

<Typography variant="body" color="white">
  Regular text content
</Typography>
```

### 7. Grid 組件

**用途**: 網格佈局組件

**Props**:
- `columns`: 1 | 2 | 3 | 4 | 6 | 12 - 欄位數量
- `gap`: 'sm' | 'md' | 'lg' - 間距大小
- `responsive`: boolean - 響應式佈局

**使用範例**:
```jsx
import { Grid } from '../components/ui';

<Grid columns={3} gap="md" responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

## 🚀 使用方式

### 導入組件

```jsx
// 導入單個組件
import { Button } from '../components/ui';

// 導入多個組件
import { Button, Card, Input, Typography } from '../components/ui';

// 導入所有組件
import * as UI from '../components/ui';
```

### 完整頁面範例

```jsx
import React from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Typography, 
  Container, 
  Grid 
} from '../components/ui';

export default function ExamplePage() {
  return (
    <Container variant="default" size="lg" fullHeight centered>
      <Card variant="glass" size="lg">
        <Typography variant="h1" gradient primary centered>
          Welcome
        </Typography>
        
        <Grid columns={2} gap="md" responsive>
          <Input
            variant="dark"
            placeholder="Username"
          />
          <Input
            variant="dark"
            type="password"
            placeholder="Password"
          />
        </Grid>
        
        <Button variant="primary" size="lg" fullWidth>
          Sign In
        </Button>
      </Card>
    </Container>
  );
}
```

## ✅ 已重構的頁面

- ✅ **LoginRefactored.jsx** - 使用組件庫重構的登入頁面示例

## 🎨 設計特點

- **一致性**: 所有組件使用統一的設計系統
- **可客製化**: 豐富的variant和size選項
- **響應式**: 內建響應式設計支援
- **無障礙**: 支援鍵盤導航和螢幕閱讀器
- **主題支援**: 深色主題和玻璃效果
- **動畫效果**: 平滑的過渡和懸停效果

## 📝 最佳實踐

1. **優先使用組件**: 避免重複編寫相同的UI代碼
2. **保持一致性**: 使用統一的variant和size
3. **響應式設計**: 使用Grid組件進行佈局
4. **無障礙性**: 為組件添加適當的aria標籤
5. **效能優化**: 使用React.memo優化重複渲染

## 🔄 遷移指南

將現有頁面遷移到組件庫：

1. 導入需要的組件
2. 替換現有的HTML元素
3. 使用適當的props配置樣式
4. 測試響應式行為
5. 確保無障礙性

## 🎯 下一步

- [ ] 重構所有頁面使用組件庫
- [ ] 添加更多組件（Modal, Dropdown, Table等）
- [ ] 創建Storybook文檔
- [ ] 添加單元測試
- [ ] 優化組件效能
