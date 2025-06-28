import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents() {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // CI/CD 優化設定
    experimentalRunAllSpecs: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    // 並行執行設定
    numTestsKeptInMemory: 0,
    // 錯誤處理
    retries: {
      runMode: 2,
      openMode: 0,
    },
    // 測試檔案模式
    specPattern: "cypress/e2e/**/*.cy.ts",
    // 忽略未捕獲的異常
    experimentalSessionAndOrigin: true,
  },
});
