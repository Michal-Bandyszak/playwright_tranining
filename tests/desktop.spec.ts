import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('desktop tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const desktop = new DesktopPage(page);

    // Act
    await desktop.transfer(receiverId, transferAmount, transferTitle);

    // Assert
    await expect(desktop.show_message).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    const desktop = new DesktopPage(page);

    // Act
    await desktop.topup(topUpReceiver, topUpAmount);

    // Assert
    await expect(desktop.show_message).toHaveText(expectedMessage);
  });
});
