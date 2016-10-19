describe('liftit applicants_test navbar', function () {
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:3000');

        //wait until xhr are being donewait until "xhr" calls are being done
        browser.sleep(500);
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Liftit Test');
    });

    it('should have 7 children', function () {
        var liList = element.all(by.css('#navBar>ul>li'));
        expect(liList.count()).toEqual(7);
    });

    it('should have a work menu item', function () {
        var liList = element.all(by.css('#navBar>ul>li span'));
        expect(liList.get(0).getText()).toEqual('Work');
    });
});