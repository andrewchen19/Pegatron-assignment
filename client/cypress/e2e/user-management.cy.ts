/// <reference types="cypress" />

describe("User Management System", () => {
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

      cy.intercept("PATCH", "/api/v1/users/1", {
        statusCode: 200,
        body: { msg: "User updated successfully" },
      }).as("updateUser");

      cy.intercept("DELETE", "/api/v1/users/1", {
        statusCode: 200,
        body: { msg: "User deleted successfully" },
      }).as("deleteUser");
    });

    cy.visit("/");
    cy.wait("@getUsers");
  });

  it("should display all users in grid layout by default", () => {
    // 驗證頁面標題顯示正確的用戶數量
    cy.contains("3 users found").should("be.visible");

    // 驗證用戶卡片顯示
    cy.contains("John Doe").should("be.visible");
    cy.contains("Jane Smith").should("be.visible");
    cy.contains("Bob Johnson").should("be.visible");

    // 驗證網格佈局按鈕處於活躍狀態
    cy.get('[data-test="grid-button"]').should("have.class", "btn-accent");

    // 驗證每個用戶卡片包含必要資訊
    cy.contains("Gender: Male").should("be.visible");
    cy.contains("Occupation: Engineer").should("be.visible");
    cy.contains("Gender: Female").should("be.visible");
    cy.contains("Occupation: Teacher").should("be.visible");
    cy.contains("Gender: Male").should("be.visible");
    cy.contains("Occupation: Student").should("be.visible");
  });

  it("should switch between grid and list layouts", () => {
    // 點擊列表佈局按鈕
    cy.get('[data-test="list-button"]').click();

    // 驗證列表佈局按鈕處於活躍狀態
    cy.get('[data-test="list-button"]').should("have.class", "btn-accent");
    cy.get('[data-test="grid-button"]').should("not.have.class", "btn-accent");

    // 切換回網格佈局
    cy.get('[data-test="grid-button"]').click();
    cy.get('[data-test="grid-button"]').should("have.class", "btn-accent");
  });

  it("should search users by name or occupation", () => {
    cy.intercept("GET", "/api/v1/users*", {
      statusCode: 200,
      body: {
        users: [
          {
            _id: "1",
            name: "John Doe",
            gender: "Male",
            birthday: "1990-01-01",
            occupation: "Engineer",
            phoneNumber: "0987654321",
            image:
              "https://res.cloudinary.com/dhrtfibhx/image/upload/v1721266453/pegatron/default_wozlch.jpg",
          },
        ],
        numOfPages: 1,
        totalUsers: 1,
      },
    }).as("getSpecificUser");

    // 搜尋特定用戶
    cy.get('input[name="search"]').type("John");

    cy.wait("@getSpecificUser");

    // 驗證搜尋結果
    cy.contains("John Doe").should("be.visible");
    cy.contains("Jane Smith").should("not.exist");

    // 重置搜尋
    cy.contains("reset").click();

    cy.contains("John Doe").should("be.visible");
    cy.contains("Jane Smith").should("be.visible");
  });

  it("should navigate to create user page and create a new user", () => {
    // 導航到創建用戶頁面
    cy.visit("/create");

    // 填寫表單
    cy.get('input[name="name"]').type("New User");
    cy.get('select[name="gender"]').select("Female");
    cy.get('input[name="birthday"]').type("2002-03-20");
    cy.get('select[name="occupation"]').select("Unemployed");
    cy.get('input[name="phoneNumber"]').type("0912345678");

    // 提交表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@createUser");

    // 驗證成功訊息和重定向
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should navigate to edit user page and update user information", () => {
    // 點擊編輯按鈕
    cy.contains("John Doe").parent().parent().contains("Edit").click();

    // 等待用戶資料載入
    cy.wait("@getUser");

    // 驗證表單預填了現有資料
    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('select[name="gender"]').should("have.value", "Male");

    // 修改用戶資料
    cy.get('input[name="name"]').clear().type("John Updated");

    // 提交表單
    cy.get('button[type="submit"]').click();

    // 等待 API 呼叫
    cy.wait("@updateUser");

    // 驗證成功訊息和重定向
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should delete a user with confirmation modal", () => {
    // 點擊刪除按鈕
    cy.contains("John Doe").parent().parent().contains("Delete").click();

    // 驗證 modal出現
    cy.get('[data-test="delete-modal"]').should("be.visible");

    // 確認刪除
    cy.get('[data-test="delete-modal"]').contains("delete").click();

    // 等待 API 呼叫
    cy.wait("@deleteUser");

    // 驗證模態框關閉
    cy.get('[data-test="delete-modal"]').should("not.be.visible");
  });

  it("should handle empty user list gracefully", () => {
    // 模擬空用戶列表
    cy.intercept("GET", "/api/v1/users*", {
      statusCode: 200,
      body: {
        users: [],
        numOfPages: 0,
        totalUsers: 0,
      },
    }).as("getEmptyUsers");

    cy.visit("/");
    cy.wait("@getEmptyUsers");

    // 驗證空狀態訊息
    cy.contains("No user to display...").should("be.visible");
  });
});
