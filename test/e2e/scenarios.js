/* global describe, it */
'use strict';

// //placehold.it/480x320/00a1de/ffffff 480w, //placehold.it/768x512/00a1de/ffffff 768w, //placehold.it/936x624/00a1de/ffffff

describe('Viewports:', function () {

    var IMAGE = '.demo-e2e-image .afkl-lazy-image';
    var runOnce = true;


    beforeEach(function() {
        if (runOnce) {
            runOnce = false;
            browser.get('index.html');
        }
    });
    

    it('Is image appended', function () {
        // Is our image actually being placed
        expect(element(by.css(IMAGE)).isPresent()).toBeTruthy();
    });


    it('Do we get desktop image, and does url update on resize', function () {
        browser.manage().window().setSize(1024, 768);
        expect(element(by.css(IMAGE)).getAttribute('src')).toMatch(/http:\/\/placehold.it\/936x624\/00a1de\/ffffff/);
    });


    it('Do we get tablet image', function () {
        browser.manage().window().setSize(768, 768);
        expect(element(by.css(IMAGE)).getAttribute('src')).toMatch(/http:\/\/placehold.it\/768x512/);
    });


    it('Do we get mobile image', function () {
        browser.manage().window().setSize(480, 768);
        expect(element(by.css(IMAGE)).getAttribute('src')).toMatch(/http:\/\/placehold.it\/480x320\/00a1de\/ffffff/);
    });

});
