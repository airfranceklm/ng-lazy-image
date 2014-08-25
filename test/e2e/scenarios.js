/* global describe, it */
'use strict';

// //placehold.it/480x320/00a1de/ffffff 480w, //placehold.it/768x512/00a1de/ffffff 768w, //placehold.it/936x624/00a1de/ffffff

describe('Viewports:', function () {

    browser.get('index.html');

    it('Is image appended', function () {
        // Is our image actually being placed
        expect(element(by.css('img.afkl-lazy-image')).isPresent()).toBeTruthy();
    });


    it('Do we get desktop image, and does url update on resize', function () {
        browser.manage().window().setSize(1024, 768);
        expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/936x624\/00a1de\/ffffff/);
    });


    it('Do we get tablet image', function () {
        browser.manage().window().setSize(768, 768);
        expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/768x512/);
    });


    it('Do we get mobile image', function () {
        browser.manage().window().setSize(480, 768);
        expect(element(by.css('img.afkl-lazy-image')).getAttribute('src')).toMatch(/http:\/\/placehold.it\/480x320\/00a1de\/ffffff/);
    });

});
