import { CscPage } from './app.po';

describe('csc App', () => {
  let page: CscPage;

  beforeEach(() => {
    page = new CscPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to csc!');
  });
});
