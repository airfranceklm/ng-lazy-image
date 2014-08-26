[![Build Status](https://travis-ci.org/afklm/ng-lazy-image.svg)](https://travis-ci.org/afklm/ng-lazy-image) 
[![Coverage Status](https://coveralls.io/repos/afklm/ng-lazy-image/badge.png?branch=master)](https://coveralls.io/r/afklm/ng-lazy-image?branch=master) 

# Angular Lazy Image
> Directive for loading responsive/ adaptive image when parent container (which is preventing reflow) is in viewport. Available as bower component for your project.

## Demo
[Demonstration component](http://afklm.github.io/ng-lazy-image/)


## Usage 
1. `bower install afkl-lazy-image -p`
2. Add a dependency on `afkl.lazyImage` in your app module.
3. See the `style.css` for some classes you can use (optional)


### Directive in html template

<pre><code>&lt;div afkl-lazy-image="//placehold.it/480x480 480w, //placehold.it/768x768 768w, //placehold.it/936x936" 
    class="afkl-lazy-wrapper afkl-img-ratio-1-1 demo-image"&gt;&lt;/div&gt;
</code></pre>

The attributes are using the [srcset](http://picture.responsiveimages.org/) setup. Your window will determine which image fits best (so the rules are very dynamic using w/h/x). The image will only be set when the parent container scrolls in the viewport (lazy loading). During loading a class 'afkl-lazy-image-loading' is set on the container so you can give loading state feedback to visitor.


### Options
- "afkl-lazy-image": srcset string (required)
- "afkl-lazy-image-options": (optional):
   * '{"background": true}' this will set correct background image on container, false by default
   * '{"offset": 200}' this will influence when to start loading the image, 50px by default
- "class" : `afkl-lazy-wrapper` will use height 0 trick, `afkl-img-ratio-1-1` sets correct aspect ratio so container is 100% responsive as well (optional, include css)


## Todo
1. Angular directives don't have any notion of style encapsulation, but Angular is expected to incorporate that functionality eventually. At the moment our optional css is delivered in an own stylesheet.
2. Check for native browser support
3. Look at sizes implementation (100vw)
4. Rewrite pixeldensity to width (new spec)
5. Making non lazy load optional (so it sets picture/img element)

## Help
- Using bower on corporate network which blocks git protocol run `bash git config --global url."https://".insteadOf git://`


## Grunt tasks
Source file of this bower module is placed at '**src/lazy-image.js**'. Our bower content is also available '**dist/**'

Prerequisites

 1. Run `npm run update-webdriver` once to get latest chrome webdriver (e2e)
 2. Install [InternetExplorerDriver](http://docs.seleniumhq.org/download)

Now we can simply run:
- `grunt sample` to see the demo offline
- `grunt unit` to start unit test (report in target folder), `grunt unitBrowser` for debugging purpose
- `grunt e2e` to start our end to end test, which uses local chrome, firefox and internet explorer
- `grunt package` to make a complete package which validates everything (used when making new package)
- `grunt update` to update our Angular lib and verify if module works with some versions backwards as well


## History
This module was made while working on our Travel Inspiration Finder at KLM.
- version 0.0.6 25-08-2014 Tested on Chrome, Firefox, Safari, IE8+
- version 0.0.5 25-08-2014 Added loading feedback to enduser

## License
As AngularJS itself, this module is released under the permissive [MIT license](LICENSE.md).

Your contributions are always welcome. Feel free to ask for new features.
