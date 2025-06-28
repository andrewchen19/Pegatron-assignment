# CI/CD 設定說明 - Netlify 部署

## 概述

這個專案使用 GitHub Actions 進行持續整合和部署到 Netlify，包含完整的 E2E 測試流程。

## 工作流程

### 1. 觸發條件

- Push 到 `main` 或 `develop` 分支
- Pull Request 到 `main` 或 `develop` 分支

### 2. 測試階段

#### 後端測試 (`backend-test`)

- 使用 MongoDB 服務容器
- 執行後端 API 測試
- 環境：Node.js 18

#### 前端測試 (`frontend-test`)

- 執行 ESLint 檢查
- 建置前端應用程式
- 驗證建置是否成功

#### E2E 測試 (`e2e-test`)

- 啟動後端服務器 (port 3000)
- 啟動前端開發服務器 (port 5173)
- 執行 Cypress E2E 測試
- 上傳測試結果和影片

### 3. 部署階段

#### 測試環境部署 (`deploy-staging`)

- 觸發條件：`develop` 分支
- 依賴：所有測試通過
- 部署到 Netlify 測試環境

#### 生產環境部署 (`deploy-production`)

- 觸發條件：`main` 分支
- 依賴：所有測試通過
- 部署到 Netlify 生產環境

## Netlify 設定

### 1. 獲取 Netlify Token

1. 登入 [Netlify](https://app.netlify.com/)
2. 前往 User Settings > Applications > Personal access tokens
3. 點擊 "New access token"
4. 複製生成的 token

### 2. 獲取 Site ID

1. 在 Netlify 中選擇你的網站
2. 前往 Site settings > General > Site information
3. 複製 Site ID

### 3. 設定 GitHub Secrets

在 GitHub 專案的 Settings > Secrets and variables > Actions 中設定：

```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID_STAGING=your_staging_site_id
NETLIFY_SITE_ID_PRODUCTION=your_production_site_id
```

### 4. 建立兩個 Netlify 網站

- **測試環境**：用於 `develop` 分支部署
- **生產環境**：用於 `main` 分支部署

## 本地測試

### 執行 E2E 測試

```bash
# 開發模式
cd client
npm run test:e2e:open

# 無頭模式
npm run test:e2e

# CI 模式
npm run test:e2e:ci
```

### 並行測試（需要 Cypress Cloud）

```bash
npm run test:e2e:parallel
```

## 環境變數

### 後端

- `MONGODB_URI`: MongoDB 連接字串
- `NODE_ENV`: 環境設定
- `PORT`: 服務器端口

### 前端

- `VITE_API_URL`: API 基礎 URL
- `CYPRESS_baseUrl`: Cypress 測試基礎 URL

### Netlify 環境變數

在 Netlify 的 Site settings > Environment variables 中設定：

```
VITE_API_URL=https://your-api-domain.com
NODE_ENV=production
```

## Netlify 特定配置

### 1. 重定向設定

在 `client/public/_redirects` 檔案中加入：

```
/*    /index.html   200
```

### 2. 建置設定

在 Netlify 的 Site settings > Build & deploy > Build settings 中設定：

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `18`

### 3. 自定義域名

1. 前往 Site settings > Domain management
2. 點擊 "Add custom domain"
3. 設定 DNS 記錄

## 部署流程

### 測試環境部署

1. 推送程式碼到 `develop` 分支
2. GitHub Actions 執行測試
3. 測試通過後自動部署到 Netlify 測試環境
4. 在 PR 中顯示部署連結

### 生產環境部署

1. 合併 PR 到 `main` 分支
2. GitHub Actions 執行測試
3. 測試通過後自動部署到 Netlify 生產環境
4. 發送部署通知

## 故障排除

### 常見問題

1. **MongoDB 連接失敗**

   - 檢查 MongoDB 服務容器是否正常啟動
   - 確認連接字串格式正確

2. **前端建置失敗**

   - 檢查 TypeScript 編譯錯誤
   - 確認所有依賴已正確安裝

3. **E2E 測試超時**

   - 增加 `defaultCommandTimeout` 設定
   - 檢查服務器啟動時間

4. **Netlify 部署失敗**

   - 檢查 `NETLIFY_AUTH_TOKEN` 是否正確
   - 確認 `NETLIFY_SITE_ID` 是否正確
   - 檢查建置目錄路徑

5. **環境變數問題**

   - 確認 Netlify 環境變數設定正確
   - 檢查前端環境變數前綴 `VITE_`

### 效能優化

1. **快取依賴**

   - 使用 `actions/setup-node` 的快取功能
   - 分別快取前端和後端依賴

2. **並行執行**

   - 後端、前端、E2E 測試可以並行執行
   - 使用 Cypress Cloud 進行並行測試

3. **測試分割**
   - 將測試分成多個 spec 檔案
   - 使用 `--spec` 參數執行特定測試

## 監控和報告

### 測試報告

- Cypress 測試結果會上傳為 artifacts
- 可以在 GitHub Actions 頁面查看詳細報告

### 部署狀態

- 每個部署階段都有明確的狀態指示
- 失敗時會發送通知
- Netlify 會自動在 PR 中顯示部署連結

### 效能指標

- 測試執行時間
- 建置時間
- 部署時間
- Netlify 部署狀態

## 進階功能

### 1. 預覽部署

每次 PR 都會自動建立預覽部署，方便測試。

### 2. 回滾部署

在 Netlify 中可以輕鬆回滾到之前的部署版本。

### 3. 部署通知

- Slack 通知
- Discord 通知
- Email 通知

### 4. 效能監控

- Netlify Analytics
- Core Web Vitals
- 載入時間監控
