describe("NavBar", function () {
    beforeAll(function () {
        var fixture = '<div id="hamburger">' +
            '<a href="#"></a>' +
            '</div>' +
            '<nav id="navBar">' +
            '</nav>';

        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    it("should respond if navbar exist", function (done) {
        //not functions to test
        done();
    });
});