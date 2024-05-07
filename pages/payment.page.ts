import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}
  transfer_reciever = this.page.getByTestId('transfer_receiver');
  form_account_to = this.page.getByTestId('form_account_to');
  form_amount = this.page.getByTestId('form_amount');
  send = this.page.getByRole('button', { name: 'wykonaj przelew' });
  close_btn = this.page.getByTestId('close-button');
  show_message = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string
  ): Promise<void> {
    await this.transfer_reciever.fill(transferReceiver);
    await this.form_account_to.fill(transferAccount);
    await this.form_amount.fill(transferAmount);
    await this.send.click();
    await this.close_btn.click();
  }
}
