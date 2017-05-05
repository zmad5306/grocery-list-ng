import { GroceryListNgPage } from './app.po';

describe('grocery-list-ng App', () => {
  let page: GroceryListNgPage;

  beforeEach(() => {
    page = new GroceryListNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
