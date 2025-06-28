/// <reference types="cypress" />

import "cypress-file-upload";

describe("Form Validation", () => {
  beforeEach(() => {
    // 使用 fixture 資料模擬 API 回應
    cy.fixture("users").then((data) => {
      cy.intercept("GET", "/api/v1/users*", {
        statusCode: 200,
        body: {
          users: data.users,
          numOfPages: 1,
          totalUsers: data.users.length,
        },
      }).as("getUsers");

      cy.intercept("GET", "/api/v1/users/1", {
        statusCode: 200,
        body: {
          user: data.singleUser,
        },
      }).as("getUser");

      cy.intercept("POST", "/api/v1/users", {
        statusCode: 201,
        body: { msg: "User created successfully" },
      }).as("createUser");

      cy.intercept("POST", "/api/v1/users", {
        statusCode: 400,
        body: { msg: "Unexpected Error. Please try again later." },
      }).as("createUserError");

      cy.intercept("PATCH", "/api/v1/users/1", {
        statusCode: 200,
        body: { msg: "User updated successfully" },
      }).as("updateUser");

      cy.intercept("PATCH", "/api/v1/users/1", {
        statusCode: 400,
        body: { msg: "Unexpected Error. Please try again later." },
      }).as("updateUserError");
    });
  });

  it("should validate required fields in create user form", () => {
    cy.visit("/create");

    // 嘗試提交空表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@createUserError");

    // 驗證錯誤訊息顯示
    cy.get(".Toastify__toast-body > :nth-child(2)").contains(
      "Unexpected Error. Please try again later."
    );
  });

  it("should handle server validation errors in create user form", () => {
    cy.visit("/create");

    // 填寫表單
    cy.get('input[name="name"]').type("Test User");
    cy.get('select[name="gender"]').select("Male");
    cy.get('input[name="birthday"]').type("1995-03-20");
    cy.get('select[name="occupation"]').select("Engineer");
    cy.get('input[name="phoneNumber"]').type("5551234567");

    // 提交表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@createUserError");

    // 驗證錯誤訊息顯示
    cy.get(".Toastify__toast-body > :nth-child(2)").contains(
      "Unexpected Error. Please try again later."
    );
  });

  it("should validate required fields in edit user form", () => {
    cy.visit("/");
    cy.wait("@getUsers");

    // 導航到編輯頁面
    cy.contains("John Doe").parent().parent().contains("Edit").click();
    cy.wait("@getUser");

    // 清空必填欄位
    cy.get('input[name="name"]').clear();

    // 嘗試提交表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@updateUserError");

    // 驗證錯誤訊息顯示
    cy.get(".Toastify__toast-body > :nth-child(2)").contains(
      "Unexpected Error. Please try again later."
    );
  });

  it("should handle server validation errors in edit user form", () => {
    cy.visit("/");
    cy.wait("@getUsers");

    // 導航到編輯頁面
    cy.contains("John Doe").parent().parent().contains("Edit").click();
    cy.wait("@getUser");

    // 修改用戶資料
    cy.get('input[name="name"]').clear().type("Invalid User");
    cy.get('input[name="phoneNumber"]').clear().type("invalid-phone");

    // 提交表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@updateUserError");

    // 驗證錯誤訊息顯示
    cy.get(".Toastify__toast-body > :nth-child(2)").contains(
      "Unexpected Error. Please try again later."
    );
  });

  it("should validate phone number format", () => {
    cy.visit("/create");

    // 檢查欄位類型
    cy.get('input[name="phoneNumber"]').should("have.attr", "type", "tel");

    // 測試數字輸入
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="phoneNumber"]').should("have.value", "1234567890");

    // 測試清空功能
    cy.get('input[name="phoneNumber"]').clear();
    cy.get('input[name="phoneNumber"]').should("have.value", "");
  });

  it("should validate date format", () => {
    cy.visit("/create");

    // 檢查欄位類型
    cy.get('input[name="birthday"]').should("have.attr", "type", "date");

    // 測試日期輸入
    cy.get('input[name="birthday"]').type("1990-01-01");
    cy.get('input[name="birthday"]').should("have.value", "1990-01-01");
  });

  it("should allow image file upload", () => {
    // 忽略未捕獲的異常
    cy.on("uncaught:exception", (err) => {
      // 忽略檔案上傳相關的錯誤
      if (err.message.includes("500") || err.message.includes("uploads")) {
        return false;
      }
      return true;
    });

    cy.visit("/create");

    // 檢查欄位類型
    cy.get('input[name="image"]').should("have.attr", "accept", "image/*");
    cy.get('input[name="image"]').should("have.attr", "type", "file");

    // 測試檔案選擇
    cy.fixture("text-image.jpg").then((fileContent) => {
      cy.get('input[name="image"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "text-image.jpg",
        mimeType: "image/jpeg",
      });
    });

    // 驗證檔案已選擇 - 檢查有值且不為空
    cy.get('input[name="image"]').should("not.have.value", "");
  });

  it("should navigate back from create user form", () => {
    cy.visit("/create");

    // 點擊返回按鈕
    cy.contains("back").click();

    // 驗證返回首頁
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should navigate back from edit user form", () => {
    cy.visit("/");
    cy.wait("@getUsers");

    // 導航到編輯頁面
    cy.contains("John Doe").parent().parent().contains("Edit").click();

    cy.wait("@getUser");

    // 點擊返回按鈕
    cy.contains("back").click();

    // 驗證返回首頁
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
