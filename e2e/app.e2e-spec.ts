import { SagoMiniPage } from './app.po';

describe('sago-mini App', function() {
  let page: SagoMiniPage;

  beforeEach(() => {
    page = new SagoMiniPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
