/// <reference types="cypress" />

describe("Fixture-based User Management Tests", () => {
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

  it("should display all users from fixture data", () => {
    cy.fixture("users").then((data) => {
      // 驗證所有用戶都顯示
      data.users.forEach((user) => {
        cy.contains(user.name).should("be.visible");
        cy.contains(`Gender: ${user.gender}`).should("be.visible");
        cy.contains(`Occupation: ${user.occupation}`).should("be.visible");
      });

      // 驗證用戶數量
      cy.contains(`${data.users.length} users found`).should("be.visible");
    });
  });

  it("should create a new user using fixture data", () => {
    cy.fixture("users").then((data) => {
      cy.visit("/create");

      // 使用 fixture 中的新用戶資料
      cy.get('input[name="name"]').type(data.newUser.name);
      cy.get('select[name="gender"]').select(data.newUser.gender);
      cy.get('input[name="birthday"]').type(data.newUser.birthday);
      cy.get('select[name="occupation"]').select(data.newUser.occupation);
      cy.get('input[name="phoneNumber"]').type(data.newUser.phoneNumber);

      // 提交表單
      cy.get('button[type="submit"]').click();

      // 等待 API 呼叫
      cy.wait("@createUser");

      // 驗證成功訊息和重定向
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  it("should edit user using fixture data", () => {
    cy.fixture("users").then((data) => {
      // 點擊編輯按鈕
      cy.contains(data.singleUser.name)
        .parent()
        .parent()
        .contains("Edit")
        .click();
      cy.wait("@getUser");

      // 驗證表單預填了現有資料
      cy.get('input[name="name"]').should("have.value", data.singleUser.name);
      cy.get('select[name="gender"]').should(
        "have.value",
        data.singleUser.gender
      );

      // 使用 fixture 中的更新資料
      cy.get('input[name="name"]').clear().type(data.updatedUser.name);
      cy.get('select[name="occupation"]').select(data.updatedUser.occupation);

      // 提交表單
      cy.get('button[type="submit"]').click();

      // 等待 API 呼叫
      cy.wait("@updateUser");

      // 驗證成功訊息和重定向
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  it("should search users using fixture data", () => {
    cy.fixture("users").then((data) => {
      // 模擬搜尋結果
      cy.intercept("GET", `/api/v1/users*`, {
        statusCode: 200,
        body: {
          users: data.users.slice(0, 1),
          numOfPages: 1,
          totalUsers: 1,
        },
      }).as("getSpecificUser");

      // 搜尋特定用戶
      cy.get('input[name="search"]').type(data.users[0].name);

      cy.wait("@getSpecificUser");

      // 驗證搜尋結果
      cy.contains(data.users[0].name).should("be.visible");

      // 重置搜尋
      cy.contains("reset").click();

      // 等待頁面重新載入或驗證重置效果
      cy.get('input[name="search"]').should("have.value", "");

      // 驗證所有用戶都顯示
      data.users.forEach((user) => {
        cy.contains(user.name).should("be.visible");
      });
    });
  });

  it("should test pagination with fixture data", () => {
    // 模擬分頁資料
    cy.fixture("users").then((data) => {
      // 只顯示前兩個用戶
      const paginatedUsers = data.users.slice(0, 2);

      cy.intercept("GET", "/api/v1/users*", {
        statusCode: 200,
        body: {
          users: paginatedUsers,
          numOfPages: 2,
          totalUsers: data.users.length,
        },
      }).as("getPaginatedUsers");

      cy.visit("/?page=1");
      cy.wait("@getPaginatedUsers");

      // 驗證分頁資訊
      cy.contains(`${data.users.length} users found`).should("be.visible");
      cy.contains(paginatedUsers[0].name).should("be.visible");
      cy.contains(paginatedUsers[1].name).should("be.visible");
    });
  });

  it("should handle empty search results", () => {
    // 模擬空搜尋結果
    cy.intercept("GET", "/api/v1/users*", {
      statusCode: 200,
      body: {
        users: [],
        numOfPages: 0,
        totalUsers: 0,
      },
    }).as("getEmptySearch");

    // 搜尋不存在的用戶
    cy.get('input[name="search"]').type("nonexistent");
    cy.wait("@getEmptySearch");

    // 驗證空狀態
    cy.contains("No user to display...").should("be.visible");
  });

  it("should test different user occupations from fixture", () => {
    cy.fixture("users").then((data) => {
      // 驗證不同職業的用戶都正確顯示
      const engineer = data.users.find(
        (user) => user.occupation === "Engineer"
      );
      const teacher = data.users.find((user) => user.occupation === "Teacher");
      const student = data.users.find((user) => user.occupation === "Student");

      if (engineer) {
        cy.contains(`Occupation: ${engineer.occupation}`).should("be.visible");
      }
      if (teacher) {
        cy.contains(`Occupation: ${teacher.occupation}`).should("be.visible");
      }
      if (student) {
        cy.contains(`Occupation: ${student.occupation}`).should("be.visible");
      }
    });
  });

  it("should test different user genders from fixture", () => {
    cy.fixture("users").then((data) => {
      // 驗證不同性別的用戶都正確顯示
      const maleUsers = data.users.filter((user) => user.gender === "Male");
      const femaleUsers = data.users.filter((user) => user.gender === "Female");

      maleUsers.forEach((user) => {
        cy.contains(`Gender: ${user.gender}`).should("be.visible");
      });

      femaleUsers.forEach((user) => {
        cy.contains(`Gender: ${user.gender}`).should("be.visible");
      });
    });
  });
});
