import { browser, by, element } from 'protractor';

export class CscPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('csc-root h1')).getText();
  }
}
