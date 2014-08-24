/* global describe, it */
'use strict';


describe('Testing viewports', function () {

    // //placehold.it/480x320/00a1de/ffffff 480w, //placehold.it/768x512/00a1de/ffffff 768w, //placehold.it/936x624/00a1de/ffffff

    describe('Desktop view:', function () {

        beforeEach(function () {
            browser.get('/');
            browser.manage().window().setSize(1024, 768);
        });

        it('Do we get desktop image, and does url update on resize', function () {
            expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/936x624\/00a1de\/ffffff/);
 /*
            browser.manage().window().setSize(768, 768);
            waits(1000);

            expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/768x512\/00a1de\/ffffff/);
*/
        });


    });


    describe('Tablet view:', function () {

        beforeEach(function () {
            browser.get('/');
            browser.manage().window().setSize(768, 768);
        });

        it('Do we get tablet image', function () {
            expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/768x512/);
        });

    });

    describe('Mobile view:', function () {

        beforeEach(function () {
            browser.get('/');
            browser.manage().window().setSize(480, 768);
        });

        it('Do we get mobile image', function () {
            expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/480x320\/00a1de\/ffffff/);
        });

    });

});
