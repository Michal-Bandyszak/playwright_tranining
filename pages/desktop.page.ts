import { Page } from '@playwright/test';
import { SideMenu } from '../components/side-menu.component';

export class DesktopPage {
  constructor(private page: Page) {}

  sideMenuComponent = new SideMenu(this.page);

  userNameText = this.page.getByTestId('user-name');
  transfer_reciever = this.page.locator('#widget_1_transfer_receiver');
  transfer_amount = this.page.locator('#widget_1_transfer_amount');
  transfer_title = this.page.locator('#widget_1_transfer_title');

  topup_receiver = this.page.locator('#widget_1_topup_receiver');
  topup_amount = this.page.locator('#widget_1_topup_amount');
  topup_agreement = this.page.locator('#uniform-widget_1_topup_agreement span');
  top_up = this.page.getByRole('button', { name: 'doładuj telefon' });
  execute = this.page.getByRole('button', { name: 'wykonaj' });
  show_message = this.page.locator('#show_messages');
  close_btn = this.page.getByTestId('close-button');

  async topup(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topup_receiver.selectOption(topUpReceiver);
    await this.topup_amount.fill(topUpAmount);
    await this.topup_agreement.click();
    await this.top_up.click();
    await this.close_btn.click();
  }

  async transfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transfer_reciever.selectOption(receiverId);
    await this.transfer_amount.fill(transferAmount);
    await this.transfer_title.fill(transferTitle);
    await this.execute.click();
    await this.close_btn.click();
  }
}
