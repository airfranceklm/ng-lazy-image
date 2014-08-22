/* globals: beforeEach, describe, it, module, inject, expect */
describe("Lazy image", function() {

    var $document, scope;

    beforeEach(module('afkl.lazyImage'));

    beforeEach(inject(function($compile, $rootScope, _$document_) {

        scope = $rootScope.$new();
        $document = _$document_;

        el1 = angular.element('<div afkl-lazy-image="foo.png 480w"></div>');
        el2 = angular.element('<div afkl-lazy-image="foo.png 480h"></div>');
        el3 = angular.element('<div afkl-lazy-image="foo.png 1x"></div>');
        el4 = angular.element('<div afkl-lazy-image=""></div>');
        el5 = angular.element('<div afkl-lazy-image="foo.png 480w, foo.png 480w"></div>');

        $compile(el1)(scope);
        $compile(el2)(scope);
        $compile(el3)(scope);
        $compile(el4)(scope);
        $compile(el5)(scope);

        scope.$digest();

    }));

    it('Does it have image attached', function () {
        expect(el1.html()).toBe('<img alt="" class="afkl-lazy-image" src="foo.png">');
        expect(el2.html()).toBe('<img alt="" class="afkl-lazy-image" src="foo.png">');
        expect(el3.html()).toBe('<img alt="" class="afkl-lazy-image" src="foo.png">');
    });

    it('No image should be attached', function () {
        expect(el4.html()).toBe('');
    });

    it('We only have one image', function () {
        expect(el5.html()).toBe('<img alt="" class="afkl-lazy-image" src="foo.png">');
    });

    it('Should remove images when destroyed', function () {
        scope.$destroy();
        expect($document.find('img').length).toBe(0);
    });

});


describe("srcset Service", function() {

    var SrcSetService;

    beforeEach(module('afkl.lazyImage'));

    beforeEach(inject(function(afklSrcSetService) {
        SrcSetService = afklSrcSetService;
    }));


    it('Is my srcset Service available', function () {
        expect(SrcSetService).toBeDefined();
    });

    it('Simple image candidates without descriptors understood', function () {
        var s = SrcSetService.get({src: 'default.png', srcset: 'mobile.png'});
        expect(s.best.src).toBeDefined();
    });

    it('Single image declarations set to the right defaults', function () {
        var s = SrcSetService.get({srcset: 'mobile.png'});
        var best = s.best;
        expect(best.src).toBe('mobile.png');
        expect(best.x).toBe(1);
        expect(best.w).toBe(Infinity);
        expect(best.h).toBe(Infinity);
    });

    it('Complex compound image candidates understood', function () {
        var s = SrcSetService.get({srcset: 'mobile.png 720w, tablet.png 1280w, desktop.png 1x'});
        expect(s.best.src).toBeDefined();
    });


    it('Repeated values for image candidates are ignored', function () {
        var s = SrcSetService.get({srcset: 'mobile.png 720w, mobile.png 720w'});
        expect(s.candidates.length).toBe(1);
    });



});

// TODO: CORRECT IMAGE FROM MOCKED WINDOW VARS
/*
describe("Correct image", function() {

    var $window, scope, el;

    beforeEach(module('afkl.ng.lazyImage'));

    beforeEach(function () {
        angular.mock.module('afkl.ng.lazyImage', function ($provide) {
            var myMock = {
                innerHeight: 400,
                innerWidth: 500
            };
            $provide.value('$window', myMock);
        });
    });

    beforeEach(inject(function($compile, $rootScope, _$window_) {

        $window = _$window_;
        scope = $rootScope.$new();

        spyOn($window, 'resize').andCallThrough();
        spyOn($window, 'on').andCallThrough();

        el = angular.element('<div afkl-lazy-image="foo.png 480w"></div>');

        $compile(el)(scope);

        scope.$digest();

    }));

    it('does it have image attached', function () {
        $window.triggerHandler('resize');
        expect($window.on).toHaveBeenCalled();
    });

});
*/
// TODO: TRIGGER RESIZE EVENT
