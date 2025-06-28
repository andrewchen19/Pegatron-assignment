# Cypress End-to-End 測試

這個目錄包含用戶管理系統的 End-to-End 測試，使用 Cypress 和 TypeScript 撰寫。

## 測試檔案結構

```
cypress/
├── e2e/
│   ├── user-management.cy.ts      # 主要用戶管理功能測試
│   ├── form-validation.cy.ts      # 表單驗證測試
│   ├── navigation.cy.ts           # 導航和路由測試
│   └── fixture-based.cy.ts        # 使用 fixture 資料的測試
├── fixtures/
│   └── users.json                 # 用戶測試資料
├── support/
│   ├── commands.ts                # 自定義 Cypress 命令
│   └── e2e.ts                     # 測試設定檔
```

## 測試覆蓋範圍

### 1. 用戶管理功能 (`user-management.cy.ts`)

- 顯示所有用戶列表
- 網格/列表佈局切換
- 用戶搜尋功能
- 創建新用戶
- 編輯現有用戶
- 刪除用戶（含確認模態框）
- 空用戶列表處理
- API 錯誤處理

### 2. 表單驗證 (`form-validation.cy.ts`)

- 必填欄位驗證
- 伺服器端驗證錯誤處理
- 電話號碼格式驗證
- 日期格式驗證
- 檔案上傳功能
- 返回按鈕功能

### 3. 導航和路由 (`navigation.cy.ts`)

- 頁面導航
- URL 驗證
- 瀏覽器前進/返回功能
- 頁面刷新處理
- 404 錯誤處理
- 網路錯誤處理
- 慢速網路回應處理

### 4. Fixture 資料測試 (`fixture-based.cy.ts`)

- 使用外部資料檔案的測試
- 分頁功能測試
- 不同用戶類型的測試
- 搜尋結果處理

## 執行測試

### 前置需求

1. 確保開發伺服器正在運行：

   ```bash
   npm run dev
   ```

2. 確保伺服器運行在 `http://localhost:5173`

### 執行測試

#### 開啟 Cypress 測試介面

```bash
npm run cypress:open
# 或
npm run test:e2e:open
```

#### 在終端機執行所有測試

```bash
npm run cypress:run
# 或
npm run test:e2e
```

#### 執行特定測試檔案

```bash
npx cypress run --spec "cypress/e2e/user-management.cy.ts"
```

## 測試最佳實踐

### 1. API 模擬

- 使用 `cy.intercept()` 模擬 API 回應
- 避免依賴真實後端服務
- 確保測試的隔離性和可重複性

### 2. 選擇器策略

- 優先使用 `name` 屬性選擇器
- 避免使用 CSS 類別選擇器
- 使用語義化的選擇器

### 3. 等待策略

- 使用 `cy.wait()` 等待 API 呼叫
- 避免硬編碼的延遲
- 使用 `cy.should()` 進行條件等待

### 4. 資料管理

- 使用 fixture 檔案管理測試資料
- 保持測試資料的一致性
- 避免在測試中硬編碼資料

### 5. 錯誤處理

- 測試成功和失敗場景
- 驗證錯誤訊息的顯示
- 測試邊界條件

## 配置說明

### Cypress 配置 (`cypress.config.ts`)

- `baseUrl`: 設定為開發伺服器 URL
- `viewportWidth/Height`: 設定測試視窗大小
- `defaultCommandTimeout`: 設定預設命令超時時間
- `video: false`: 關閉影片錄製以提升效能

### 測試資料 (`fixtures/users.json`)

包含各種測試場景所需的用戶資料：

- 多個用戶資料
- 單一用戶資料
- 新用戶資料
- 更新後的用戶資料

## 故障排除

### 常見問題

1. **測試失敗：找不到元素**

   - 檢查選擇器是否正確
   - 確認頁面已完全載入
   - 檢查 API 模擬是否正確

2. **測試超時**

   - 增加 `defaultCommandTimeout` 設定
   - 檢查網路連線
   - 確認開發伺服器正在運行

3. **API 模擬不工作**
   - 檢查 `cy.intercept()` 的 URL 模式
   - 確認 API 端點路徑正確
   - 檢查回應格式是否正確

### 除錯技巧

1. **使用 Cypress 除錯工具**

   ```javascript
   cy.pause(); // 暫停測試執行
   cy.debug(); // 開啟除錯模式
   ```

2. **檢查網路請求**

   - 在 Cypress 測試介面中查看網路標籤
   - 確認 API 模擬是否被觸發

3. **查看測試截圖**
   - 測試失敗時會自動截圖
   - 檢查 `cypress/screenshots/` 目錄

## 持續整合

這些測試可以整合到 CI/CD 流程中：

```yaml
# GitHub Actions 範例
- name: Run E2E Tests
  run: |
    npm run build
    npm run test:e2e
```

## 維護建議

1. **定期更新測試**

   - 當 UI 變更時更新選擇器
   - 當 API 變更時更新模擬資料
   - 當新功能加入時新增測試

2. **保持測試簡潔**

   - 每個測試專注於單一功能
   - 避免測試之間的依賴
   - 使用描述性的測試名稱

3. **監控測試效能**
   - 定期檢查測試執行時間
   - 優化慢速測試
   - 移除不必要的等待時間
