function reCenterMap(center) {
    'use strict';
    map.setView(center, map.getZoom());
    setTimeout(function () {map.invalidateSize(true);}, 100);
}

function SwapOrientation() {
    'use strict';
    var center = map.getCenter();

    var swapfile = document.getElementById("printpreview-swapFile");
    if($('#pp-ltr-land').prop('disabled')){
        $('#pp-ltr-port').attr('disabled','disabled');
        $('#pp-ltr-land').removeAttr('disabled');
        swapfile.children[0].className = swapfile.children[0].className.replace(/\ fa-rotate-90/g, "");
        swapfile.innerHTML = swapfile.innerHTML.replace(/Landscape/g, "Portrait");
    }
    else {
        $('#pp-ltr-port').removeAttr('disabled');
        $('#pp-ltr-land').attr('disabled','disabled');
        swapfile.children[0].className += " fa-rotate-90";
        swapfile.innerHTML = swapfile.innerHTML.replace(/Portrait/g, "Landscape");
    }

    reCenterMap(center);
}

function cancelPrintPreview() {
    'use strict';
    var center = map.getCenter();
    $('#pp-main').attr('disabled','disabled');
    $('#pp-ltr-land').attr('disabled','disabled');
    $('#pp-ltr-port').attr('disabled','disabled');
    $('#map').unwrap().unwrap();
    $('.leaflet-control-printpreview-bar').remove();
    $('#map').removeClass('previewmap');


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

    PrintPreview: function () {
        'use strict';
        var center = map.getCenter();

        //add print preview elements
        $('#map').addClass('previewmap');
        $('#map').wrap('<div class="book"><div class="page"></div></div>');
        $('#map').before('<div class="leaflet-control-printpreview-bar"><a class="leaflet-control-printpreview-btn" href="#" onclick="window.print();"><i class="fa fa-print fa-lg" aria-hidden="true"></i>&nbsp;Print</a><a id="printpreview-swapFile" class="leaflet-control-printpreview-btn" href="#" onclick="SwapOrientation();"><i class="fa fa-file-o fa-lg fa-rotate-90" aria-hidden="true"></i>&nbsp;Landscape</a><a class="leaflet-control-printpreview-btn" href="#" onclick="cancelPrintPreview();"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Cancel Preview</a></div>');
        $('#pp-main').removeAttr('disabled');
        $('#pp-ltr-port').removeAttr('disabled');

        reCenterMap(center);
    }
});

L.PrintPreview = function (options) {
    return new L.Control.PrintPreview(options);
};