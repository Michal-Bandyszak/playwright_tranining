export class SideMenu {
    constructor(private page) {}
    paymentLink = this.page.getByRole('link', { name: 'płatności'})
    
}