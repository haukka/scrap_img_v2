var Xray = require("x-ray");
var fs = require('fs');
var Download = require('download');

var xray = new Xray();
var url = process.argv[2]
var select_undef = Boolean(process.argv[3]) || true;
var width_def = process.argv[4] || 0;
var height_def = process.argv[5] || 0;

if (url)
{
    xray(url, 'img',
	 [{
	     img: '',
	     src: '@src',
	     width: '@width',
	     height: '@height'
	 }])
    (function(err, res) {
	var ddl = new Download();
	res.forEach(function(img){
	    if ((img.width >= width_def && img.height >= height_def))
		ddl.get(img.src);
	    else if ((img.width === undefined || img.height === undefined) && select_undef == true)
		ddl.get(img.src);
	});
	ddl.dest('./image');
	ddl.run();
    });
} else {
    console.log("node scrap.js (url) [img_undefined : true/false] [width] [height]");
}
