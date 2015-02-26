function dir(o) {
    for (var i in o) console.log(i);
}

/* globals: beforeEach, describe, it, module, inject, expect */
describe("Lazy image:", function() {

    var $document, scope, $compile;

    beforeEach(module('afkl.lazyImage'));

    beforeEach(inject(['$compile', '$rootScope', '$document',
        function(_$compile_, $rootScope, _$document_) {

            scope = $rootScope.$new();
            $document = _$document_;
            $compile = _$compile_;

        }
    ]));

    it('Does it have image attached', function() {

        var el = angular.element('<div afkl-lazy-image="img/foo.png 480w" afkl-lazy-image-options=\'{"nolazy": true}\'></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
    });

    it('Do we have loading class correctly set/unset', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png 340h"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.hasClass('afkl-lazy-image-loading')).toBeDefined();

        window.setTimeout(function() {
            expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
            expect(el.hasClass('afkl-lazy-image-loading')).toBe(false);
        }, 300);
    });

    it('Does it have an image as background set', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png 1x" afkl-lazy-image-options=\'{"background": true}\'></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.backgroundImage).toBeDefined();
    });

    it('Do we have alt set on our image', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png" afkl-lazy-image-options=\'{"alt": "blue bird"}\'></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('<img alt="blue bird" class="afkl-lazy-image" src="img/foo.png">');
    });

    it('No image should be attached', function() {
        var el = angular.element('<div afkl-lazy-image=""></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('');
    });

    it('We only have one image', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png 480w, img/foo.png 480w"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
    });


    it('Does image change after loaded', function() {

        var el = angular.element('<div afkl-lazy-image="{{url}}" afkl-lazy-image-options=\'{"nolazy": true}\'></div>');
        scope.url = "img/foo.png 480w";
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
        scope.url = "img/bar.png 960w";
        scope.$digest();

        expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/bar.png">');
    });

    it('Should remove image when scope is destroyed', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png 480w" afkl-lazy-image-options=\'{"offset": 200}\'></div>');
        $compile(el)(scope);
        scope.$digest();

        scope.$destroy();
        expect($document.find('img').length).toBe(0);
    });

});


describe("srcset Service:", function() {

    var SrcSetService;

    beforeEach(module('afkl.lazyImage'));

    beforeEach(inject(function(afklSrcSetService) {
        SrcSetService = afklSrcSetService;
    }));


    it('Is my srcset Service available', function() {
        expect(SrcSetService).toBeDefined();
    });

    it('Simple image candidates without descriptors understood', function() {
        var s = SrcSetService.get({
            src: 'default.png',
            srcset: 'mobile.png'
        });
        expect(s.best.src).toBeDefined();
    });

    it('Single image declarations set to the right defaults', function() {
        var s = SrcSetService.get({
            srcset: 'mobile.png'
        });
        var best = s.best;
        expect(best.src).toBe('mobile.png');
        expect(best.x).toBe(1);
        expect(best.w).toBe(Infinity);
        expect(best.h).toBe(Infinity);
    });

    it('Complex compound image candidates understood', function() {
        var s = SrcSetService.get({
            srcset: 'mobile.png 720w, tablet.png 1280w, desktop.png 1x'
        });
        expect(s.best.src).toBeDefined();
    });

    it('Repeated values for image candidates are ignored', function() {
        var s = SrcSetService.get({
            srcset: 'mobile.png 720w, mobile.png 720w'
        });
        expect(s.candidates.length).toBe(1);
    });


    it('Select correct image according to window size', function() {
        var imageObject = SrcSetService.get({
            srcset: 'mobile.png 720w, tablet.png 1280w, desktop.png 1x'
        });
        expect(imageObject.candidates.length).toBe(3);

        var view = {
            'w': 1024,
            'h': Infinity,
            'x': 1
        };

        var imageTablet = SrcSetService.image(imageObject.candidates, view);

        expect(imageTablet).toBeDefined();

        expect(imageTablet.src).toBe('tablet.png');

        view.w = 480;

        var imageMobile = SrcSetService.image(imageObject.candidates, view);

        expect(imageMobile.src).toBe('mobile.png');

    });

    it('Keep best available one if not complient (w)', function() {
        var imageObject = SrcSetService.get({
            srcset: 'mobile.png 480w'
        });
        var view = {
            'w': 1024,
            'h': Infinity,
            'x': 1
        };
        var image = SrcSetService.image(imageObject.candidates, view);
        expect(image.src).toBe('mobile.png');
    });

    it('Keep best available one if not complient (h)', function() {
        var imageObject = SrcSetService.get({
            srcset: 'mobile.png 240h'
        });
        var view = {
            'w': 1024,
            'h': 600,
            'x': 1
        };
        var image = SrcSetService.image(imageObject.candidates, view);
        expect(image.src).toBe('mobile.png');
    });

    it('Keep best available one if not complient (x)', function() {
        var imageObject = SrcSetService.get({
            srcset: 'mobile.png 1x'
        });
        var view = {
            'w': 1024,
            'h': Infinity,
            'x': 2
        };
        var image = SrcSetService.image(imageObject.candidates, view);
        expect(image.src).toBe('mobile.png');
    });


    it('Pixeldensity not a number', function() {
        var imageObject = SrcSetService.get({
            srcset: 'mobile.png wwx'
        });
        expect(imageObject.best.src).toBe('mobile.png');
    });

    it('No image should be given back', function() {
        var image = SrcSetService.image();
        expect(image).toBe(undefined);
    });


});

describe("Image container and window scroll:", function() {

    var $document, scope, $compile, $window;

    function scrollEvent(e) {
        if (document.createEvent) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent('scroll', true, true);
            e.dispatchEvent(ev);
        } else {
            var ev = document.createEventObject();
            if (e === $window) {
                document.documentElement.fireEvent('onscroll', ev);
            } else {
                e.fireEvent('onscroll', ev);
            }
        }
    }

    beforeEach(module('afkl.lazyImage'));

    beforeEach(inject(['$compile', '$rootScope', '$document', '$window',
        function(_$compile_, $rootScope, _$document_, _$window_) {

            scope = $rootScope.$new();
            $document = _$document_;
            $compile = _$compile_;
            $window = _$window_;

        }
    ]));

    it('Does lazy image work with custom image container', function() {
        var el = angular.element('<div afkl-image-container class="dd"><p></p><div afkl-lazy-image="img/foo.png 480w"></div></div>');
        var div = el.find('div'),
            p = el.find('p');

        angular.element($document[0].body).append(el);
        el[0].style.height = '200px';
        el[0].style.overflowY = 'scroll';
        p[0].style.height = '400px';
        $compile(el)(scope);
        scope.$digest();

        expect(div.html()).toBe('');

        el[0].scrollTop = 400;
        scrollEvent(el[0]);
        scope.$digest();

        expect(div.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
        el.remove();
    });

/*
    TODO: classes and attributes are different per browser so need to think other test

    it('Does lazy image work with custom image container with positioned images', function() {
        var el = angular.element('<div afkl-image-container class="dd">' +
        '<p></p>' +
        '<div style="position: relative; height: 400px;"><div afkl-lazy-image="img/foo.png 480w" style="position: absolute; height: 400px;"></div></div>' +
        '<div style="position: relative; height: 400px;"><div afkl-lazy-image="img/foo.png 480w" style="position: absolute; height: 400px;"></div></div>' +
        '</div>');
        var div = el.find('div'),
            p = el.find('p');

        angular.element($document[0].body).append(el);
        el[0].style.height = '200px';
        el[0].style.overflowY = 'scroll';
        p[0].style.height = '400px';
        $compile(el)(scope);
        scope.$digest();

        expect(div.html()).toBe('<div afkl-lazy-image="img/foo.png 480w" style="position: absolute; height: 400px;"></div>');

        el[0].scrollTop = 400;
        scrollEvent(el[0]);
        scope.$digest();

        expect(el.html()).toBe('<p style="height: 400px; "></p><div style="position: relative; height: 400px;"><div afkl-lazy-image="img/foo.png 480w" style="position: absolute; height: 400px;" class="afkl-lazy-image-loading"><img alt="" class="afkl-lazy-image" src="img/foo.png"></div></div><div style="position: relative; height: 400px;"><div afkl-lazy-image="img/foo.png 480w" style="position: absolute; height: 400px;" class="afkl-lazy-image-loading"><img alt="" class="afkl-lazy-image" src="img/foo.png"></div></div>');
        el.remove();
    });
*/
    // TODO: this case doesn't work in IE8, due to window scroll event isn't properly fired
    it('Does lazy image work with window', function() {
        var el = angular.element('<div afkl-lazy-image="img/foo.png 480w"></div>');
        var p = angular.element('<p></p>');
        var body = $document[0].body;
        //dir($window);

        angular.element(body).append(p);
        angular.element(body).append(el);
        var height = $window.innerHeight || $window.document.documentElement.clientHeight;
        p[0].style.height = height + 100 + 'px';
        $compile(el)(scope);
        scope.$digest();

        expect(el.html()).toBe('');

        $window.scrollTo ? $window.scrollTo(0, height) : document.documentElement.scrollTo(0, height);
        scrollEvent($window);
        scope.$digest();

        expect(el.html()).toBe('<img alt="" class="afkl-lazy-image" src="img/foo.png">');
    });
});

// TODO: TRIGGER RESIZE EVENT
