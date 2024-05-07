import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { loginData } from '../test-data/login.data';
import { DesktopPage } from '../pages/desktop.page';

test.describe('payments tests', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    loginPage = new LoginPage(page);
    const desktopPage = new DesktopPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await desktopPage.sideMenuComponent.paymentLink.click();
  });

  test('single payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
    const payment = new PaymentPage(page);

    // Act
    await payment.makeTransfer(
      transferReceiver,
      transferAccount,
      transferAmount
    );
    // Assert
    await expect(payment.show_message).toHaveText(expectedMessage);
  });
});
