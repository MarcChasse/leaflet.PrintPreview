(function() {
    //the jQueryfied objects
    var $map;
    var $main;
    var $landscape;
    var $portrait;
    //other globals
    var toggle;
    
    /**
     * Hides and shows objects when preview mode is triggered
     */
    function toggleObjects() {
        $(toggle).each(function(i, e) {
            $(e).toggle();
        });
    }
    
    function reCenterMap(center) {
        'use strict';
        map.setView(center, map.getZoom());
        setTimeout(function () {map.invalidateSize(true);}, 100);
    }

    function SwapOrientation() {
        'use strict';
        var center = map.getCenter();

        var swapfile = document.getElementById("printpreview-swapFile");
        if($landscape.prop('disabled')){
            $portrait.attr('disabled','disabled');
            $landscape.removeAttr('disabled');
            swapfile.children[0].className = swapfile.children[0].className.replace(/\ fa-rotate-90/g, "");
            swapfile.innerHTML = swapfile.innerHTML.replace(/Landscape/g, "Portrait");
        }
        else {
            $portrait.removeAttr('disabled');
            $landscape.attr('disabled','disabled');
            swapfile.children[0].className += " fa-rotate-90";
            swapfile.innerHTML = swapfile.innerHTML.replace(/Portrait/g, "Landscape");
        }

        reCenterMap(center);
    }

    function cancelPrintPreview() {
        'use strict';
        var center = map.getCenter();
        $main.attr('disabled','disabled');
        $landscape.attr('disabled','disabled');
        $portrait.attr('disabled','disabled');
        $map.unwrap().unwrap();
        $('.leaflet-control-printpreview-bar').remove();
        $map.removeClass('previewmap');
        
        //toggle all invisible and invisible object
        toggleObjects();
            
        reCenterMap(center);
    }

    L.Control.PrintPreview = L.Control.extend({
        options: {
            title: 'Print preview',
            position: 'topleft'
        },

        onAdd: function () {
            'use strict';
            //create button and setup click listner
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            this.link = L.DomUtil.create('a', 'leaflet-control-PrintPreview-button leaflet-bar-part', container);
            L.DomUtil.create('i', 'fa fa-print fa-lg', this.link);
            this.link.title = this.options.title;

            L.DomEvent.addListener(this.link, 'click', this.PrintPreview, this.options);
            return container;
        },

        PrintPreview: function (options) {
            'use strict';
            //set the map id but assume #map for backwards compatibility
            var center = map.getCenter();
            //add print preview elements
            $map.addClass('previewmap');
            $map.wrap('<div class="book"><div class="page"></div></div>');
            $map.before(
                '<div class="leaflet-control-printpreview-bar">'+
                    '<a class="leaflet-control-printpreview-btn" href="#" onclick="window.print();">'+
                        '<i class="fa fa-print fa-lg" aria-hidden="true"></i>&nbsp;Print'+
                    '</a>'+
                    '<a id="printpreview-swapFile" class="leaflet-control-printpreview-btn" href="javascript:void(0)">'+
                        '<i class="fa fa-file-o fa-lg fa-rotate-90" aria-hidden="true"></i>&nbsp;Portrait'+
                    '</a>'+
                    '<a id="cancel-preview" class="leaflet-control-printpreview-btn" href="javascript:void(0)">'+
                        '<i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Cancel Preview'+
                    '</a>'+
                '</div>'
            );
            $main.removeAttr('disabled');
            $landscape.removeAttr('disabled');
            
            //toggle all invisible and invisible object
            toggleObjects();
            
            reCenterMap(center);
        }
    });

    L.PrintPreview = function (options) {
        options = options || {}; //default to blank object
        //grab the map, main, landscape, and portrait and store them
        $map = $(options.mapID || '#map');
        $main = $(options.mainID || '#pp-main').attr('disabled','disabled');
        $landscape = $(options.landscapeID || '#pp-ltr-land').attr('disabled','disabled');
        $portrait = $(options.portraitID || '#pp-ltr-port').attr('disabled','disabled');
        
        //grab the objects that get toggled with preview
        toggle = options.toggle || [];
        
        //bind the preview window buttons
        $('body').on('click', '#printpreview-swapFile', SwapOrientation);
        $('body').on('click', '#cancel-preview', cancelPrintPreview);
        
        //Launch
        return new L.Control.PrintPreview(options);
    };
})();