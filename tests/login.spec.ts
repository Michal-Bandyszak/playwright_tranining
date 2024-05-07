import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials @login', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPassword = '10987654';
    const expectedUSername = 'Jan Demobankowy';
    const desktopPage = new DesktopPage(page);

    // Act
    await loginPage.login(userId, userPassword);

    // Assert
    await expect(desktopPage.userNameText).toHaveText(expectedUSername);
  });

  test('unsuccessful login with too short username @login', async ({ page }) => {
    // Arrange
    const userId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(loginPage.loginError_id).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password @login', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const wrongPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(wrongPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.loginError_password).toHaveText(
      expectedErrorMessage
    );
  });
});
