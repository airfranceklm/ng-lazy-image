[![Build Status](https://travis-ci.org/afklm/ng-lazy-image.svg)](https://travis-ci.org/afklm/ng-lazy-image)
[![Coverage Status](https://coveralls.io/repos/afklm/ng-lazy-image/badge.png?branch=master)](https://coveralls.io/r/afklm/ng-lazy-image?branch=master)
[![Sauce Test Status](https://saucelabs.com/buildstatus/afklm)](https://saucelabs.com/u/afklm)

[![NPM](https://nodei.co/npm/angular-lazy-image.png?stars=true)](https://nodei.co/npm/angular-lazy-image/)

# Angular Lazy Image directive
> Directive for loading responsive/ adaptive image when parent container (which is preventing reflow) is in viewport. Available as bower and npm component for your project. JavaScript only component.

## Demo
[Demonstration component](http://afklm.github.io/ng-lazy-image/)


## Usage
1. `npm install angular-lazy-image` or `bower install afkl-lazy-image -p` and set this script as a dependency
2. Add a dependency on `afkl.lazyImage` in your app module.
3. See the `style.css` for some classes you can use (they prevent reflow and are optional)


### Directive in html template

<pre><code>&lt;div afkl-lazy-image="//placehold.it/480x480 480w, //placehold.it/768x768 768w, //placehold.it/936x936"
    class="afkl-lazy-wrapper afkl-img-ratio-1-1 own-classname"&gt;&lt;/div&gt;
</code></pre>

The attributes are using the [srcset](http://picture.responsiveimages.org/) setup. Your window will determine which image fits best (so the rules are very dynamic using w/h/x). The image will only be set when the parent container scrolls in the viewport (lazy loading) or scrollable directive. It is also possible to set one image url only then you will not use the fully responsive option but always lazy load just one image.
During loading a class 'afkl-lazy-image-loading' is set on the container so you can give loading state feedback to your visitor. Be sure to use block level for this directive since it checks for visibility as well (inline elements have no width on start, and we check for width to determine if element is visible).


### Options
- "afkl-lazy-image": srcset string (required)
- "afkl-lazy-image-options": (optional object):
   * '{"background": true}' this will set correct background image on container, false by default
   * '{"offset": 200}' this will influence when to start loading the image, 50px by default
   * '{"nolazy": true}' this will set the image at once and only change on resize
   * '{"imgAttrs": [{"title": "your-title", "other": "add-anything"}]}' this will allow you to add other image attributes (i.e. "alt", "title", "onerror", "class") and custom angular directives
- "class" : `afkl-lazy-wrapper` will use height 0 trick, `afkl-img-ratio-1-1` sets correct aspect ratio so container is 100% responsive as well (optional, include css)
- Using directive `afkl-image-container` when you have a scrollable container, with afkl-lazy-image inside (see [example](http://afklm.github.io/ng-lazy-image/sample-scrollable.html))
- Attribute `afklLazyImageLoaded` will be set ('done'/'fail') when image for the directive is really loaded. This can be used if you want to preload every image before showing your app, make sure to set nolazy to true.



## Todo
1. Angular directives don't have any notion of style encapsulation, but Angular is expected to incorporate that functionality eventually. At the moment our optional css is delivered in an own stylesheet.
2. Check for native browser support
3. Look at sizes implementation (100vw)
4. Rewrite pixeldensity to width (new spec), making it simple [blog](http://dev.opera.com/articles/native-responsive-images/)

## Help
- Using bower on corporate network which blocks git protocol run `bash git config --global url."https://".insteadOf git://`


## Grunt tasks
Source file of this bower module is placed at '**src/lazy-image.js**'. Our bower content is also available at '**dist/**'

Prerequisites

 1. Run `npm run update-webdriver` once to get latest chrome webdriver (e2e)
 2. Install [InternetExplorerDriver](http://docs.seleniumhq.org/download)

Now we can simply run:
- `grunt sample` to see the demo offline (live reload from src)
- `grunt unit` to start unit test (report in target folder), `grunt unitBrowser` for debugging purpose
- `grunt e2e` to start our end to end test, which uses local chrome, firefox and internet explorer
- `grunt package` to make a complete package which validates everything (used when making new package)
- `grunt update` to update our Angular lib (defined in package json) and verify if module works with some versions backwards as well
- `grunt ghpages` to update our documentation page


## History
This module was made while working on our Travel Inspiration Finder at KLM.
- version 0.3.0 06-02-2015 Depricated 'afkl-lazy-image-options' for alt and className is now removed, should be set as imgAttrs in these options 
- version 0.2.4 07-01-2015 Fix for scrolling inside container bigger then window by Simon
- ~~version 0.2.3 07-11-2015 Fix by Awalker to be able to use the plugin inside a repeat where we 'misuse' rootScope~~ do not use!
- version 0.1.5 21-08-2015 Image 'src' is not always known yet, prevent having src in our html and only set when url is given
- version 0.1.4 10-06-2015 Image loaded succes and error state, so it is possible to know when images are really loaded
- version 0.1.1 10-06-2015 Make it possible to add a className to our image
- version 0.1.0 27-03-2015 Parse attributes (config), introduce loading class on element while loading
- version 0.0.11 26-02-2015 Show alt attribute
- version 0.0.9 18-10-2014 Scrollable container as option, tested for AngularJS 1.28 and 1.3
- version 0.0.6 25-08-2014 Tested on Chrome, Firefox, Safari, IE8+
- version 0.0.5 25-08-2014 Added loading feedback to enduser

## License
As AngularJS itself, this module is released under the permissive [MIT license](LICENSE.md).

Your contributions are always welcome. Feel free to ask for new features.
Contributions by: SquadraCorse, ledzep2, TimonVS, manifestinteractive, awalker, MichaelTSS, smnbbrv.
