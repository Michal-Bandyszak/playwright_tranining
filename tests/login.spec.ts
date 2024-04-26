import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/';

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const userPassword = '10987654';
    const expectedUSername = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUSername);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const userId = 'tester';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków'
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'testerLO';
    const wrongPassword = '1234';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(wrongPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków'
    );
  });
});
