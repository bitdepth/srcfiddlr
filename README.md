SrcFiddlr
=========

SrcFiddlr uses media queries to load the images that are appropriate for a user's browsers, making responsive images a breeze.

The SrcFiddlr component uses the data-srcset attribute for specifying media queries and the image src attributes. Each rule is comma delimited and wrapped in square brackets. The first parameter is the image path and the second parameter is the media query. The last rule that evaluates to true will be the image that gets loaded.

```html
<img data-srcset="
[./images/smallest.jpg, default], 
[./images/small.jpg, only screen and (min-width: 768px)], 
[./images/med.jpg, medium], 
[./images/large.jpg, large]" src="./images/small.jpg">
```
Named queries
------

| Name | media query |
|------|------------ |
| default | only screen and (min-width: 1px) |
| small | only screen and (min-width: 479px) |
| medium | only screen and (min-width: 767px) |
| large | only screen and (min-width: 1023px) |
| landscape | only screen and (orientation: landscape) |
| portrait | only screen and (orientation: portrait) |
| retina | only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)|

To use named queries just pass in the name where you would normally specify your query.

```html
data-srcset="[image_path, large], [image_path, landscape]"
```

Custom named queries
------
Custom queries can be defined during initialization and are an easy way to make your queries more readable. You can also override the default queries in this way:
```javascript
var srcFiddlrInstance = SrcFiddlr.init({
	namedQueries: {
		myCustomQuery: 'only screen and (max-width: 200px)'
	}
});
```
Adding new images after page load
------
If you add new images after the page has been loaded, you will need to trigger the update() function of your SrcFiddlr instance.
```javascript
var srcFiddlrInstance = SrcFiddlr.init({
	namedQueries: {
		myCustomQuery: 'only screen and (max-width: 200px)'
	}
});
 
srcFiddlrInstance.update();
```

See more documentation and a demo example [here](http://mooklateer.github.io/srcfiddlr/)
