/* global angular */
angular.module('afkl.ng.lazyImage', [])
    .service('srcSetService', ['$window', function($window) {
        'use strict';

        /**
         * For other applications wanting the srccset/best image approach it is possible to use this module only
         * Loosely based on https://raw.github.com/borismus/srcset-polyfill/master/js/srcset-info.js
         */
        var INT_REGEXP = /^[0-9]+$/;

        // SRCSET IMG OBJECT
        function ImageInfo(options) {
            this.src = options.src;
            this.w = options.w || Infinity;
            this.h = options.h || Infinity;
            this.x = options.x || 1;
        }

        /**
         * Parse srcset rules
         * @param  {string} descString Containing all srcset rules
         * @return {object}            Srcset rules
         */
        var _parseDescriptors = function (descString) {

            var descriptors = descString.split(/\s/);
            var out = {};

            for (var i = 0, l = descriptors.length; i < l; i++) {

                var desc = descriptors[i];

                if (desc.length > 0) {

                    var lastChar = desc.slice(-1);
                    var value = desc.substring(0, desc.length - 1);
                    var intVal = parseInt(value, 10);
                    var floatVal = parseFloat(value);

                    if (value.match(INT_REGEXP) && lastChar === 'w') {
                        out[lastChar] = intVal;
                    } else if (value.match(INT_REGEXP) && lastChar === 'h') {
                        out[lastChar] = intVal;
                    } else if (!isNaN(floatVal) && lastChar === 'x') {
                        out[lastChar] = floatVal;
                    } 

                }
            }

            return out;

        };

        /**
         * Returns best candidate under given circumstances
         * @param  {object} images     Candidate image
         * @param  {function} criteriaFn Rule
         * @return {object}            Returns best candidate under given criteria
         */
        var _getBestCandidateIf = function (images, criteriaFn) {

            var bestCandidate = images[0];

            for (var i = 0, l = images.length; i < l; i++) {
                var candidate = images[i];
                if (criteriaFn(candidate, bestCandidate)) {
                    bestCandidate = candidate;
                }
            }

            return bestCandidate;

        };

        /**
         * Remove candidate under given circumstances
         * @param  {object} images     Candidate image
         * @param  {function} criteriaFn Rule
         * @return {object}            Removes images from global image collection (candidates)
         */
        var _removeCandidatesIf = function (images, criteriaFn) {

            for (var i = images.length - 1; i >= 0; i--) {
                var candidate = images[i];
                if (criteriaFn(candidate)) {
                    images.splice(i, 1); // remove it
                }
            }

            return images;

        };
      
        /**
        * Direct implementation of "processing the image candidates":
        * http://www.whatwg.org/specs/web-apps/current-work/multipage/embedded-content-1.html#processing-the-image-candidates
        *
        * @returns {ImageInfo} The best image of the possible candidates.
        */
        var getBestImage = function (imageCandidates) {

            if (!imageCandidates) { return; }

            var images = imageCandidates.slice(0);

            // OUR VIEWPORT
            var view = {
                'w' : $window.innerWidth || document.documentElement.clientWidth,
                'h' : $window.innerHeight || document.documentElement.clientHeight,
                'x' : $window.devicePixelRatio
            };

            /* LARGEST */
            // Width
            var largestWidth = _getBestCandidateIf(images, function (a, b) { return a.w > b.w; });
            // Less than client width.
            _removeCandidatesIf(images, (function () { return function (a) { return a.w < view.w; }; })(this));
            // If none are left, keep the one with largest width.
            if (images.length === 0) { images = [largestWidth]; }


            // Height
            var largestHeight = _getBestCandidateIf(images, function (a, b) { return a.h > b.h; });
            // Less than client height.
            _removeCandidatesIf(images, (function () { return function (a) { return a.h < view.h; }; })(this));
            // If none are left, keep one with largest height.
            if (images.length === 0) { images = [largestHeight]; }

            // Pixel density.
            var largestPxDensity = _getBestCandidateIf(images, function (a, b) { return a.x > b.x; });
            // Remove all candidates with pxdensity less than client pxdensity.
            _removeCandidatesIf(images, (function () { return function (a) { return a.x < view.x; }; })(this));
            // If none are left, keep one with largest pixel density.
            if (images.length === 0) { images = [largestPxDensity]; }


            /* SMALLEST */
            // Width
            var smallestWidth = _getBestCandidateIf(images, function (a, b) { return a.w < b.w; });
            // Remove all candidates with width greater than it.
            _removeCandidatesIf(images, function (a) { return a.w > smallestWidth.w; });

            // Height
            var smallestHeight = _getBestCandidateIf(images, function (a, b) { return a.h < b.h; });
            // Remove all candidates with height greater than it.
            _removeCandidatesIf(images, function (a) { return a.h > smallestHeight.h; });

            // Pixel density
            var smallestPxDensity = _getBestCandidateIf(images, function (a, b) { return a.x < b.x; });
            // Remove all candidates with pixel density less than smallest px density.
            _removeCandidatesIf(images, function (a) { return a.x > smallestPxDensity.x; });

            return images[0];

        };



        // MODULE
        // options {src: null/string, srcset: string}
        // options.src    normal url or null
        // options.srcset 997-s.jpg 480w, 997-m.jpg 768w, 997-xl.jpg 1x
        var getSrcset = function (options) {

            var imageCandidates = [];

            var srcValue = options.src;
            var srcsetValue = options.srcset;

            if (!srcsetValue) { return; }

            /* PUSH CANDIDATE [{src: _, x: _, w: _, h:_}, ...] */
            var _addCandidate = function (img) {

                for (var j = 0, ln = imageCandidates.length; j < ln; j++) {
                    var existingCandidate = imageCandidates[j];

                    // DUPLICATE
                    if (existingCandidate.x === img.x &&
                        existingCandidate.w === img.w &&
                        existingCandidate.h === img.h) { return; }
                }

                imageCandidates.push(img);

            };


            var _parse = function () {

                var input = srcsetValue,
                position = 0,
                rawCandidates = [],
                url,
                descriptors;

                while (input !== '') {

                    while (input.charAt(0) === ' ') {
                        input = input.slice(1);
                    }

                    position = input.indexOf(' ');

                    if (position !== -1) {

                        url = input.slice(0, position);

                        if (url === '') { break; }

                        input = input.slice(position + 1);

                        position = input.indexOf(',');

                        if (position === -1) {
                            descriptors = input;
                            input = '';
                        } else {
                            descriptors =  input.slice(0, position);
                            input = input.slice(position + 1);
                        }

                        rawCandidates.push({
                            url: url,
                            descriptors: descriptors
                        });

                    } else {

                        rawCandidates.push({
                            url: input,
                            descriptors: ''
                        });
                        input = '';
                    }

                }

                // FROM RAW CANDIDATES PUSH IMAGES TO COMPLETE SET
                for (var i = 0, l = rawCandidates.length; i < l; i++) {

                    var candidate = rawCandidates[i],
                    desc = _parseDescriptors(candidate.descriptors);

                    _addCandidate(new ImageInfo({
                        src: candidate.url,
                        x: desc.x,
                        w: desc.w,
                        h: desc.h
                    }));

                }

                if (srcValue) {
                    _addCandidate(new ImageInfo({src: srcValue}));
                }

            };

            _parse();


            // RETURN BEST IMAGE FROM COMPLETE SET
            var bestImage = getBestImage(imageCandidates);

            /**
             * Object returning best match at moment, and total collection of candidates (so 'image' API can be used by consumer)
             * @type {Object}
             */
            var object = {
                'best': bestImage,              // IMAGE INFORMATION WHICH FITS BEST WHEN API IS REQUESTED
                'candidates': imageCandidates   // ALL IMAGE CANDIDATES BY GIVEN SRCSET ATTRIBUTES
            };


            // empty collection
            imageCandidates = null;

            // pass best match and candidates
            return object;

        };



        /**
         * PUBLIC API
         */
        return {
            get: getSrcset,         // RETURNS BEST IMAGE AND IMAGE CANDIDATES
            image: getBestImage    // RETURNS BEST IMAGE WITH GIVEN CANDIDATES
        };


    }])
    .directive('afklLazyImage', ['$window', 'srcSetService', function ($window, srcSetService) {
        'use strict';

        var bestImage = function (images) {
            var image = srcSetService.get({srcset: images});
            var sourceUrl;
            if (image) {
                sourceUrl = image.best.src;
            }
            return sourceUrl;
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // CONFIGURATION VARS
                $window = angular.element($window);

                var loaded = false;

                var img; // Angular element to image which will be placed
                var images = attrs.afklLazyImage; // srcset attributes
                var currentImage = null; // current image url
                var offset = 50;

                // ON SCROLL, CHECK IF ELEMENT IS IN VIEWPORT
                var _onScroll = function () {
                    // LOCAL CONFIG VARS
                    var elementTop, remaining, shouldLoad, windowBottom;

                    // var offsetElement = element[0].offsetParent ? element[0].offsetParent.offsetTop : 0;
                    var offsetElement = element[0].getBoundingClientRect().top;

                    windowBottom = $window[0].innerHeight + $window[0].scrollY;
                    elementTop = offsetElement;
                    remaining = elementTop - windowBottom;

                    // DO WE ACTUALLY NEED TO SET THE IMAGE TAG AND FORCE LOADING IMAGE
                    shouldLoad = remaining <= offset;

                    // DO IT ONCE
                    if (shouldLoad && !loaded) {

                        loaded = true;
                        // SET NEW IMAGE
                        currentImage = bestImage(images);

                        if (currentImage) {
                            img = angular.element('<img alt="" class="afkl-lazy-image" src="' + currentImage + '" />');
                            element.append(img);
                        }

                        // ELEMENT WILL NOT HAVE TO LISTEN TO SCROLL ANYMORE
                        $window.off('scroll', _onScroll);
                    }

                };

                var _onResize = function () {
                    if (loaded) {
                        var newImage = bestImage(images);
                        if (newImage !== currentImage) {
                            currentImage = newImage;
                            img[0].src = newImage;
                        }
                    }
                };

                // SET HANDLER ON SCROLL
                $window.on('scroll', _onScroll);
                $window.on('resize', _onResize);

                var _eventsOff = function() {
                    $window.off('scroll', _onScroll);
                    $window.off('resize', _onResize);

                    img = null;
                };

                // WHEN SCOPE IS DESTROYED REMOVE HANDLER
                scope.$on('$destroy', function () {
                    return _eventsOff();
                });

                return _onScroll();

            }
        };

}]);
