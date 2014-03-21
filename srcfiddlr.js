/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);


var SrcFiddlr = (function (window, document, undefined) {

    function SrcFiddlr (options) {
        options = options || {namedQueries: {}};

        this.namedQueries = {
        'default': options.namedQueries.default     ||  'only screen and (min-width: 1px)',
        small: options.namedQueries.small           ||  'only screen and (min-width: 479px)',
        medium: options.namedQueries.medium         ||  'only screen and (min-width: 767px)',
        large: options.namedQueries.large           ||  'only screen and (min-width: 1023px)',
        landscape: options.namedQueries.landscape   ||  'only screen and (orientation: portrait)',
        portrait: options.namedQueries.portrait     ||  'only screen and (orientation: portrait)',
        retina: options.namedQueries.retina         ||  'only screen and (-webkit-min-device-pixel-ratio: 2),' + 
                                                        'only screen and (min--moz-device-pixel-ratio: 2),' + 
                                                        'only screen and (-o-min-device-pixel-ratio: 2/1),' + 
                                                        'only screen and (min-device-pixel-ratio: 2),' + 
                                                        'only screen and (min-resolution: 192dpi),' + 
                                                        'only screen and (min-resolution: 2dppx)'
        }

        this.events();
        this.update();
    }

    SrcFiddlr.prototype.events = function (){
      var doit,
          _this = this;
      if(window.addEventListener){
          window.addEventListener( "resize", function () {
            clearTimeout(doit);
            doit = setTimeout(function () {
                _this.update();
            }, 100);
          }, false );
      }
    }


    SrcFiddlr.prototype.update = function(scope){
        var images = document.getElementsByTagName('img'),
          imgLen =  images.length,
          i = 0,
          j = 0,
          imgAttr,
          mqMetaArr,
          mqMetaArrLength,
          query,
          imgSrc,
          applyImgSrc;

        for (i = 0; i < imgLen; i += 1) {
            imgAttr = images[i].getAttribute('data-srcset');
            if (imgAttr !== null) {
                mqMetaArr = imgAttr.match(/[^[\]]+(?=])/g);
                mqMetaArrLength = mqMetaArr.length;

                for(j = 0; j < mqMetaArrLength; j += 1){
                    imgSrc = mqMetaArr[j].split(',')[0];
                    query = mqMetaArr[j].split(',')[1];

                    //trim whitespace
                    query = query.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

                    if(this.namedQueries.hasOwnProperty(query)){
                        query = this.namedQueries[query];
                    }

                    if(window.matchMedia(query).matches){
                      applyImgSrc = imgSrc;
                    }
                }
                images[i].src = applyImgSrc;
            }
        }
    }

    var instance;

    var _static = {
        name: 'SrcFiddler',

        init: function(options){
            if(instance === undefined) {
                instance = new SrcFiddlr(options);
            }

            return instance;
        },

        update: function(){
            this.update();
        }
    };

    return _static;


})(window, document, undefined);
