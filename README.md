[![Build Status](https://travis-ci.org/afklm/ng-lazy-image.svg)](https://travis-ci.org/afklm/ng-lazy-image) 
[![Coverage Status](https://coveralls.io/repos/afklm/ng-lazy-image/badge.png?branch=master)](https://coveralls.io/r/afklm/ng-lazy-image?branch=master) 

# Angular Lazy Image
> Directive for loading responsive image when container (which is preventing reflow) is in viewport. Available as bower component.

## Demo
[Demonstration](http://afklm.github.io/ng-lazy-image/)


## Usage 
1. `bower install afkl-lazy-image -p`
2. Add a dependency on `afkl.lazyImage` in your app module.
3. See the `style.css` for some classes you can use (optional)


### Directive in html template

``` html
    <div afkl-lazy-image="//placehold.it/480x480 480w, //placehold.it/768x768 768w, //placehold.it/936x936" class="afkl-lazy-wrapper afkl-img-ratio-1-1 demo-image"></div>
```

The attributes are using the srcset setup. Your window will determine which image fits best (so the rules are very dynamic using w/h/x). The image will only be set when the parent container is in the viewport (lazy loading). During loading a class 'afkl-lazy-image-loading' is set on the container.


### Options
- "afkl-lazy-image": srcset string (required)
- "afkl-lazy-image-options": (optional):
   * '{"background": true}' this will set correct background image on container, false by default
   * '{"offset": 200}' this will influence when to start loading the image, 50px by default
- "class" : `afkl-lazy-wrapper` will use height 0 trick, `afkl-img-ratio-1-1` sets correct aspect ratio so container is 100% responsive as well (optional, include css)


## Todo
1. Angular directives don't have any notion of style encapsulation, but Angular is expected to incorporate that functionality eventually. At the moment our optional css is delivered in an own stylesheet.


## Help
- Using bower on corporate network which blocks git protocol run `bash git config --global url."https://".insteadOf git://`

## Grunt tasks when cloned
- src file is 'src/lazy-image.js'
- run `npm run update-webdriver' to get latest webdriver (e2e)
- run `grunt sample` to see the demo offline
- run `grunt test` to see the unit test report in target, `grunt testBrowser` to (debug) unit test using Chrome
- run `grunt package` to make complete package
- run `grunt update` to update our Angular lib

## History
This module was made while working on our Travel Inspiration Finder at KLM. 
- version 0.0.5 25-08-2014 Added loading feedback to enduser

## License
As AngularJS itself, this module is released under the permissive [MIT license](LICENSE.md). Your contributions are always welcome.
