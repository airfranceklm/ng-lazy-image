[![Build Status](https://travis-ci.org/afklm/ng-directive-lazy-image.svg)](https://travis-ci.org/afklm/ng-directive-lazy-image) 
[![Coverage Status](https://coveralls.io/repos/afklm/ng-directive-lazy-image/badge.png?branch=master)](https://coveralls.io/r/afklm/ng-directive-lazy-image?branch=master) 

# Angular Lazy Image
> Directive for loading responsive image when container (which is preventing reflow) is in viewport.

## Demo
[Demonstration](http://afklm.github.io/ng-directive-lazy-image/)


## Installation 
1. `bower install ng-directive-lazy-image`
2. Add a dependency on `afkl.lazyImage` in your app module.
3. See the `style.css` for some classes you can use (will add more aspect ratio's later)


### Usage

``` html
    <div afkl-lazy-image="//placehold.it/480x480 480w, //placehold.it/768x768 768w, //placehold.it/936x936" class="afkl-lazy-wrapper afkl-img-ratio-1-1 demo-image"></div>
```

The attributes are using the srcset setup. Your window will determine which image fits best (so the rules are very dynamic). The image will only be set when the parent container is in the viewport (lazy loading).


### Options
- "afkl-lazy-image": srcset string (required)
- "class" : `afkl-lazy-wrapper` will use height 0 trick, `afkl-img-ratio-1-1` sets correct aspect ratio (optional, include css)

## Todo
- Option to set background-image as well.
- Angular directives don't have any notion of style encapsulation, but Angular is expected to incorporate that functionality eventually. At the moment our optional css is delivered in an own stylesheet.


## Help
- Using bower on corporate network which blocks git protocol run `bash git config --global url."https://".insteadOf git://`

## License
As AngularJS itself, this module is released under the permissive [MIT license](LICENSE.md). Your contributions are always welcome.
