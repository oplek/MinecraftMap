
/*
	To create a new biome texture/color:
	
	1) Add in the texture, using the machine name, in canvas.vars.terrainTexture
	2) Add in a representative average color in map.drawBGTerrain()
	3) Add in the texture renderer (or color) in map.drawBGTerrainLine_old()
	4) Basically, make the same change in map.drawBGTerrainLine()
	5) Add in an official label in var "labels", at the bottom
*/


// Drawing Object
var canvas = {
	vars: {
		initialized: false,	//Has canvas been initialized yet?
		c: false,			//The actual canvas element
		ctx: false,			//The canvas context
		scale: cLoadInt('scale',5),			//Scale of drawing
		photoCache: {},		//Already loaded photos
		terrainTexture: {
			"desert": [
					["#ffe595","#ecedbe","#ffe595","#ffe595","#ffe595","#ffe595"],
					["#ffe595","#ffe595","#ffe595","#ffe595","#ffe595","#ffe595"],
					["#ffe595","#ffe595","#ffe595","#ffe595","#fcedbe","#ffe595"],
					["#ffe595","#ffe595","#fcedbe","#ffe595","#ffe595","#ffe595"]
				],
			"ocean": [
					["#98eaff","#98eaff","#98eaff","#98eaff","#c1f2ff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#c1f2ff","#c1f2ff","#98eaff","#c1f2ff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"],
					["#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff","#98eaff"]
				],
				
			"plains": [
					["#d4ff88","#b9eb62","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
					["#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
					["#d4ff88","#d4ff88","#d4ff88","#b9eb62","#d4ff88","#d4ff88"],
					["#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"]
			],				
			"mesa": [
					["#D96C00","#FFB973","#663300","#FFB973","#FFB973","#B38600"],
					["#FFB973","#FF5C26","#FFB973","#B38600","#FFB973","#FFB973"],
					["#FFB973","#FFB973","#FFB973","#FFB973","#D96C00","#FFB973"],
					["#FFB973","#FFB973","#FFB973","#FFB973","#D96C00","#FFB973"]
			],
			"roofed forest": [
				["#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#FFA64C","#00B300"],
				["#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300"],
				["#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300"],
				["#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300"],
				["#D90000","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300"],
				["#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300","#00B300"]
			],
			"swamp": [
					["#60f96b","#60f96b","#98eaff","#98eaff","#98eaff","#60f96b","#60f96b","#60f96b"],
					["#60f96b","#98eaff","#98eaff","#98eaff","#98eaff","#60f96b","#60f96b","#60f96b"],
					["#60f96b","#60f96b","#98eaff","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b"],
					["#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b"],
					["#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#98eaff","#60f96b"],
					["#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b"]
			],
			"extremeHills": [ //9cff79
					["#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79"],
					["#8aad8c","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#8aad8c","#9cff79"],
					["#9cff79","#9cff79","#9cff79","#8aad8c","#9cff79","#9cff79","#9cff79","#9cff79"],
					["#9cff79","#9cff79","#8aad8c","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79"],
					["#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#8aad8c","#9cff79","#9cff79"],
					["#8aad8c","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79","#9cff79"]
			],
			"cherry blossom grove": [
				["#FF73FF","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#FF73FF","#d4ff88","#d4ff88"],
				["#d4ff88","#d4ff88","#FF73FF","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
				["#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
				["#d4ff88","#d4ff88","#d4ff88","#FF73FF","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
				["#d4ff88","#FF73FF","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"],
				["#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88","#d4ff88"]
			],
			"birch forest": [
				["#60f96b","#60f96b","#60f96b","#d4ff88","#60f96b","#d4ff88","#d4ff88","#F0F0E1"],
				["#F0F0E1","#60f96b","#F0F0E1","#60f96b","#60f96b","#F0F0E1","#60f96b","#60f96b"],
				["#60f96b","#60f96b","#d4ff88","#60f96b","#60f96b","#60f96b","#60f96b","#60f96b"],
				["#60f96b","#d4ff88","#60f96b","#d4ff88","#60f96b","#F0F0E1","#60f96b","#d4ff88"],
				["#F0F0E1","#60f96b","#60f96b","#F0F0E1","#d4ff88","#60f96b","#60f96b","#F0F0E1"],
				["#60f96b","#60f96b","#60f96b","#d4ff88","#d4ff88","#60f96b","#d4ff88","#d4ff88"]
			],
			"canyon": [
				["#00D96C","#868695","#868695","#868695","#868695","#868695","#868695","#868695"],
				["#868695","#868695","#868695","#868695","#868695","#868695","#868695","#00D96C"],
				["#868695","#868695","#868695","#868695","#868695","#868695","#868695","#868695"],
				["#868695","#868695","#868695","#00D96C","#868695","#868695","#868695","#868695"],
				["#868695","#868695","#868695","#868695","#868695","#868695","#868695","#868695"],
				["#868695","#868695","#868695","#868695","#868695","#868695","#868695","#868695"]
			]			,
			"pasture": [
				["#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26"],
				["#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#D9D900"],
				["#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26"],
				["#FFFF26","#FFFF26","#FFFF26","#D9D900","#FFFF26","#FFFF26","#FFFF26","#FFFF26"],
				["#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26"],
				["#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26","#FFFF26"]
			]			
		}
	},

	//Figure out the map scale
	calcScale: function() {
		//scale down
		var ar = canvas.vars.c.width / canvas.vars.c.height;
		var scale = 1;
		if ( ar > 1 ) { 
			scale = canvas.vars.c.height / map.vars.viewArea.height;
		}
		else { 
			scale = canvas.vars.c.width / map.vars.viewArea.width;
		}
		map.vars.mapScale = scale;
	},
	
	//Resets the map
	reset: function() {
		canvas.clear();
		canvas.calcScale();
	},
	
	//If window is resized
	resize: function() {
		if ( canvas.vars.c ) {
			canvas.calcScale();
		
			canvas.vars.c.width = $(window).width();
			canvas.vars.c.height = $(window).height();
			
			canvas.vars.c_bg.width = $(window).width();
			canvas.vars.c_bg.height = $(window).height();
			
			
			canvas.reset();
			map.redraw();
			setTimeout(map.updateBGIncrementReset,100);
		}
	},

	//Initialize canvas
	init: function() {
		try {
			canvas.vars.c = document.getElementById("canvas");
			canvas.vars.ctx = canvas.vars.c.getContext("2d");
			canvas.vars.c_bg = document.getElementById("canvasbg");
			canvas.vars.ctx_bg = canvas.vars.c_bg.getContext("2d");
			
			if ( canvas.vars.ctx && canvas.vars.ctx_bg ) {
				canvas.resize();
				canvas.reset(); //Draw everything
				window.onresize = canvas.resize;
				canvas.vars.initialized = true;
				
				$("#canvas")
					.bind("mousewheel DOMMouseScroll",map.mouseWheel)
					.bind("mousedown",map.mouseDown)
					.bind("mouseup",map.mouseUp)
					.bind("mouseout",map.mouseOut)
					.bind("mousemove", map.mouseMove);
					
				
			} else {
			}
		}catch(e) {
			console.log("Error initializing canvas: " + e.message);
		}
		
		setInterval(canvas.updatePhotoViewer,500);
	},
	
	//Basic Draw Functions
	
	//Clear canvas
	clear: function() {
		if ( canvas.vars.initialized ) {
			canvas.vars.ctx.clearRect(0,0,canvas.vars.c.width,canvas.vars.c.height);
		}
	},
	
	//Draw a sqare
	square: function(x,y,s,col,bg) {
		
		if ( canvas.vars.initialized ) {
			if ( bg ) {
				canvas.vars.ctx_bg.fillStyle=col;
				canvas.vars.ctx_bg.fillRect(x,y,s,s);
			} else {
				canvas.vars.ctx.fillStyle=col;
				canvas.vars.ctx.fillRect(x,y,s,s);
			}
		}
	},
	
	//Draw text at a coordinate
	text: function(x,y,label) {
		if ( canvas.vars.initialized ) {
			canvas.vars.ctx.lineWidth=1;
			canvas.vars.ctx.fillStyle = "#ffffff";
			canvas.vars.ctx.lineStyle = "#ffffff";
			canvas.vars.ctx.font = "12pt courier";
			canvas.vars.ctx.fillText(label,x,y);
		}
	},
	
	//Draw a line from A to B
	line: function(x,y,x2,y2,col,thickness) {
		if ( canvas.vars.initialized ) {
			canvas.vars.ctx.lineWidth = thickness
			canvas.vars.ctx.strokeStyle = col;
			canvas.vars.ctx.beginPath();
			canvas.vars.ctx.moveTo(x,y);
			canvas.vars.ctx.lineTo(x2,y2);
			canvas.vars.ctx.stroke();
		}
	},
	
	//Draw dark background behind words
	textRect: function(x,y,words) {
		var width = words.length * 10;
		var height = 18;
		
		if ( canvas.vars.initialized ) {
				canvas.vars.ctx.fillStyle="rgba(0,0,0,0.7)";
				canvas.vars.ctx.fillRect(x-4,y-13,width+4,height);
		}
	},
		
	//Draw the crosshairs for origin
	drawOrigin: function(x,y,brief) {
		if ( brief ) {
			var cw2 = canvas.vars.c.width/2;
			var ch2 = canvas.vars.c.height/2;
		
			canvas.line(x-15,y,x+15,y,"red",1);
			canvas.line(x,y-15,x,y+15,"red",1);
		} else {
			canvas.line(0,y,canvas.vars.c.width,y,"blue",1);
			canvas.line(x,0,x,canvas.vars.c.height,"blue",1);			
		}
	},
	
	//Draw a grid of squares, align bottom, center middle
	squareGrid: function(x,y,squares) {

		for(var ey = 0; ey < squares.length; ey++) {
			var row = squares[ey];
			for(var ex = 0; ex < row.length; ex++) {
				if ( row[ex] ) {
					canvas.square(
						x - canvas.vars.scale * (ex - row.length/2),
						y + canvas.vars.scale * (ey - squares.length/2),
						canvas.vars.scale,row[ex]
					);
				}
			}
		}
	},

	
	//   |
	// ####
	// #  #
	// #  #
	// #  #
	// #### --
	drawPortal: function(x,y,label) {
		
		canvas.squareGrid(x,y,[
			["black","black","black","black"],
			["black","purple","purple","black"],
			["black","purple","purple","black"],
			["black","purple","purple","black"],
			["black","black","black","black"],
		]);
		if ( label ) {
			canvas.textRect((x+canvas.vars.scale*4),(y-canvas.vars.scale*2),label);
			canvas.text((x+canvas.vars.scale*4),(y-canvas.vars.scale*2),label);
		}
		
	},

	
	//  # 
	//  #
	//  ##
	//  ###
 	// ####
	drawCastle: function(x,y,label) {
		
		canvas.squareGrid(x,y,[
			[false,"#444444",false,false],
			[false,"#444444",false,false],
			[false,"#444444","#444444",false],
			[false,"#444444","#444444","#444444"],
			["#444444","#444444","#444444","#444444"],
		]);
		if ( label ) {
			canvas.textRect((x+canvas.vars.scale*4),(y-canvas.vars.scale*2),label);
			canvas.text((x+canvas.vars.scale*4),(y-canvas.vars.scale*2),label);
		}
		
	},	
	
	// #  #
	//  ##
	// #  #
	drawInterest: function(x,y,label) {
		
		canvas.squareGrid(x,y,[
			["green",false,false,"green"],
			[false,"green","green",false],
			[false,"green","green",false],
			["green",false,false,"green"],
		]);
		if ( label ) {
			canvas.textRect((x+canvas.vars.scale*4),(y-canvas.vars.scale*1),label);
			canvas.text((x+canvas.vars.scale*4),(y-canvas.vars.scale*1),label);
		}
		
	},
	
	// ##
	// ##
	drawMinor: function(x,y,label) {
		
		canvas.squareGrid(x,y,[
			["blue","blue"],
			["blue","blue"]
		]);
		if ( label ) {
			canvas.textRect((x+canvas.vars.scale*3),(y-canvas.vars.scale*1),label);
			canvas.text((x+canvas.vars.scale*3),(y-canvas.vars.scale*1),label);
		}
		
	},
	
	// #
	drawSample: function(x,y) {
		
		canvas.squareGrid(x,y,[
			["rgba(50,50,50,0.3)"]
		]);
		
	},	
	
	//Background things
	
	//Draw solid background color
	drawBGBase: function(color) {
		if ( canvas.vars.ctx_bg ) {
			canvas.vars.ctx_bg.fillStyle=color;
			canvas.vars.ctx_bg.fillRect(0,0,canvas.vars.c_bg.width,canvas.vars.c_bg.height);
		}
	},
	
	//Drag colored blob
	dragBGblob: function(x,y,r,color) {
		var grd = canvas.vars.ctx_bg.createRadialGradient(r,y,r,x,y,r*1.5);
		grd.addColorStop(0,color);
		grd.addColorStop(1,"white");

		// Fill with gradient
		canvas.vars.ctx_bg.fillStyle=grd;
		canvas.vars.ctx_bg.fillRect(x-r/2,y-r/2,r,r);
	},
	
	color_to_array: function(code) {
		//console.log("----------");
		var m;
		if ( code ) {
			
			code = code.toLowerCase();
			//console.log("Got",code);
			//Detect rgba() 
			m = code.match(/^rgba\((\d+),(\d+),(\d+),/);
			if ( m ) {
				//console.log("first",m);
				return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
			} else { //Try rgb()
				
				m = code.match(/^rgb\((\d+),(\d+),(\d+)\)/);
				
				if ( m ) {
					//console.log("second",m);
					return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
				} else { //try hex
		
					code = code.replace(/[^0-9abcdef]+/,"");
					m = code.match(/^(..)(..)(..)$/);
						//console.log("third",m);
					if ( m ) {
						return [parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)];
					} else { //Match failed
						return [0,0,0];
					}
				}
			}
			
		} else {
			return [0,0,0];
		}
	},
	
	desaturate: function (r,g,b) {
		//console.log("first",r,g,b);
	  //var intensity = 0.3 * r + 0.59 * g + 0.11 * b;
	  var intensity = 0.3 * r + 0.59 * g + 0.11 * b;
	  var k = 1;
	  r = Math.floor(0.7 * (intensity * k + r * (1.1 - k)));
	  g = Math.floor(0.7 * (intensity * k + g * (1 - k)));
	  b = Math.floor(0.7 * (intensity * k + b * (1 - k)));
		//console.log("second",r,g,b);
	  return [r, g, b];
	},
	
	//Attempt to start a slideshow
	showPhotos: function(images) {
		px = map.vars.px;
		py = map.vars.py;
		canvas.vars.is_loading = true;
		canvas.vars.side = 0; //left
		if ( px > canvas.vars.c.width / 2 ) { canvas.vars.side = 1; /* right */ }

		for(var i = 0; i < images.length; i++) {
			$("#photoViewer").append("<img alt='' id='ph_" + i + "' src='" + images[i].file + "' style='opacity: 0;filter: alpha(opacity="+(i==0?'1':'0')+"); width:"+images[i].w+"px;height:"+images[i].h+"px' />");
		}
		
		$("#photoViewer img:first").clearQueue().fadeTo(333,1).addClass('current');
			canvas.vars.slideIndex = 0;
			canvas.vars.slideTID = setTimeout(canvas.photoSlidenext,4000);
		canvas.updatePhotoViewer();	
		canvas.photoSet(800,600);
	},
	
	photoSet: function(w,h) {
		
	
		var pw = canvas.vars.c.width/2 - 100;
		var ph = canvas.vars.c.height - 100;
		
		if ( w > pw ) { w = pw; }
		if ( h > ph ) { h = ph; }
	
		l = canvas.vars.side == 1 ? 50 : (canvas.vars.c.width/2 + 50);
		t = canvas.vars.c.height/2 - h/2;
	
	
		$("#photoViewer").css({width:w,height:h,left:l,top:t}).show();

		
	},
	
	updatePhotoViewer: function() {
		for(var i = 0; i < $("#photoViewer img").length; i++) {
			var vw = $("#photoViewer").width();
			var vh = $("#photoViewer").height();
			var arv = vw / vh;

			var photo = $("#ph_" + i);
			var ar = $(photo).width() / $(photo).height();
			if ( ar > arv ) {
				if ( $(photo).width() > vw ) {
					$(photo).width(vw);
				} 
			} else {
				if ( $(photo).height() > vh ) {
					$(photo).height(vh);
				}
			}
			
			if ( $(photo).width() < 5 || $(photo).height() < 5 ) {
				$(photo).css("left","0px");
				$(photo).css("top","0px");
			
			} else { 
				$(photo).css("left",((vw-$(photo).width())/2) + "px");
				$(photo).css("top",((vh-$(photo).height())/2) + "px");
			}
		}
	
	},
	
	hidePhotos: function() {
		$("#photoViewer").hide();
		$("#photoViewer").html("");
		clearTimeout(canvas.vars.slideTID);
	},
		
	photoSlidenext: function() {
		//console.log("photoSlidenext");
		$("#photoViewer img.current").clearQueue().fadeTo(333,0).removeClass('current');
		canvas.vars.slideIndex++;
		if ( canvas.vars.slideIndex >= $("#photoViewer img").length ) { canvas.vars.slideIndex = 0; }
		$("#photoViewer img:eq(" + canvas.vars.slideIndex + ")").clearQueue().fadeTo(333,1).addClass('current');
		canvas.vars.slideTID = setTimeout(canvas.photoSlidenext,4000);
	}
	
};




// Map management object
var map = {
	vars: {
		viewArea: {width:5000,height:5000}, //How many meters from origin are we mapping?
		viewCenter: {x: 0, y: 0},			//What coordinate are we pointing at?
		world: ["overworld","netherworld"],	//Available worlds
		world_index: 0,						//Which world are we looking at?
		dragCount: 0,						//Increment which iteration of mouse-dragging we're on
		bgScale: cLoadInt('bgScale',50),		//Gow big are the bg square renderings?
		bgRenderLine: 0,					//Incremental rendering - starting
		fuzzy: cLoadInt('fuzzy',100),			//how many meters (game world) will borders be blended
		range: cLoadInt('range',1500),			//How many meters for a biome point to be relevant
		pwidth: cLoadInt('pwidth',3),			//Long render pixel width
		lineDelay: cLoadInt('lineDelay',20),	//Line render delay (ms)
		aa:	cLoadInt('aa',0),					//Anti-aliasing radius
		pointCache: false,					//Localized cache of biomes
		pointCacheLim: 1500,				//How many pixels before the pointCache resets,
		origin: {x:136,z:172}
	},

	
	//Preprocess data - add in inferences
	peprocessData: function() {
				
		//Determine terrain points
		data.terrain = {overworld:[]};
		for(var i in data.overworld) {
			var entry = data.overworld[i];
			if ( entry.biome ) {
				//Figure out which other points are "within range", for streamlining

			
				data.terrain.overworld.push({x: entry.coords.x, z: entry.coords.z, type: entry.biome});
			}
		}
		
		//Determine interactable entries
		data.interactive = {overworld:[],netherworld:[]};
		for(var i in data.overworld) {
			var entry = data.overworld[i];
			if ( entry.photos && entry.photos.length > 0 ) {
				data.interactive.overworld.push(entry);
			}
		}
		for(var i in data.netherworld) {
			var entry = data.netherworld[i];
			if ( entry.photos && entry.photos.length > 0 ) {
				data.interactive.netherworld.push(entry);
			}
		}		
		
		//y-sort points
		var temp = [];
		var flag = true;
		while(flag) {
			var min = 1000000000;
			var mini = -1;
			var cnt = 0;
			for(var i2 = 0; i2 < data.overworld.length; i2++) {
				if ( !data.overworld[i2].scanned && data.overworld[i2].coords.z < min ) {
					min = data.overworld[i2].coords.z;
					mini = i2;
				}
				if ( data.overworld[i2].scanned ) { cnt++; }
			}
			if ( mini >= 0 ) { 
				temp.push(data.overworld[mini]);
				data.overworld[mini].scanned = true;
			} 
			if ( cnt >= data.overworld.length) { flag = false; }
		}
		data.overworld = temp; 
		
		
	},	
	
	//Redraw map from data
	redraw: function(omitMinor) {
		canvas.reset();
		var netherScale = (map.vars.world_index == 1 ? 1/8 : 1);
		//Draw origin
			
		var coords = map.map_to_canvas(map.vars.origin.x,map.vars.origin.z);
		var ox = coords.x;
		var oy = coords.y;	
			
		var zoom = ((map.vars.viewArea.width + map.vars.viewArea.height)/2);
		
		var textLevel = 1;
		if ( zoom > 3000 ) { textLevel = 1; }
		else if ( zoom > 2200 ) { textLevel = 2; }
		else if ( zoom > 600 ) { textLevel = 3; }
			
		canvas.drawOrigin(ox,oy);
		
		coords = map.map_to_canvas(0,0);
		canvas.drawOrigin(coords.x,coords.y,true);
				
		//Draw objects
		for(var i in data[map.vars.world[map.vars.world_index]]) {
			var entry = data[map.vars.world[map.vars.world_index]][i];
			
			//Determine location
				//... raw position
			
				var coords = map.map_to_canvas(entry.coords.x/netherScale,entry.coords.z/netherScale);
				var x = coords.x;
				var y = coords.y;
		
			var hasPortal = entry.portal == "1" ? " [P]" : "";
			switch(entry.type) {
				case "castle":
					canvas.drawCastle(x,y,(entry.name ? entry.name + hasPortal : "Castle" + hasPortal));
				break;
				case "portal":
					if ( !entry.ownedBy ) {
						canvas.drawPortal(x,y,textLevel >= 2 ? (entry.name ? entry.name : "Portal") : false);
					}
				break;
				case "minor":
					if ( !omitMinor ) {
						if ( entry.sample ) {
							canvas.drawSample(x,y);
						} else {
							canvas.drawMinor(x,y,textLevel >= 3 ? (entry.name ? entry.name : "Portal") : false);
						}
					}
				break;
				default:
					canvas.drawInterest(x,y,textLevel >= 2 ? (entry.name ? entry.name + hasPortal : "Castle" + hasPortal) : false);
				break;
			}
			
		}		
		
		//Drag BG
		clearTimeout(map.vars.update_timer_id);
		if ( map.vars.world_index == 0 ) {
			canvas.drawBGBase("black");//"#aaffae");

			map.drawBGTerrain();
			
			
			map.updateBGIncrementReset();
		} else {
			canvas.drawBGBase("#fdc8ff");
		}
		
		
	},
	
	//Look at preprocessed terrain and figure out terrain
	//Experimental main version
	drawBGTerrain: function(spre) {
		
		
		var s = spre ? spre : map.vars.bgScale;

		var coords,col,e,dist,min,min_index,biome;
		for(var ex = 0; ex < canvas.vars.c_bg.width ; ex += s) {
			for(var ey = 0; ey < canvas.vars.c_bg.height; ey += s) {
				
				col = [170,255,174];
				coords = map.canvas_to_map(ex,ey);
				
				//Determine which terrain point is closest
				min = 100000000;
				min_index = -1;
				
				for(var i = 0; i < data.terrain.overworld.length; i++) {
					e = data.terrain.overworld[i];
					dist = map.distSqr(e.x,e.z,coords.x,coords.y);
					//console.log(i,dist,min);
					if ( dist < map.vars.range * map.vars.range && dist < min ) {
						min = dist;
						min_index = i;
						biome = e.type;
					}
				}
				
				//console.log(min,min_index,biome);
				
				if ( min_index >= 0 ) {
					//Color square
					switch(biome) {
						case "canyon":
							canvas.square(ex,ey,s,"#868695",true);
						break;
						case "beach":
						case "desertHills":
						case "desert":
							canvas.square(ex,ey,s,"#ffe595",true);
						break;
						case "kelp forest":
						case "island":
						case "ocean":
							canvas.square(ex,ey,s,"#98eaff",true);
						break;
						case "swamp":
							canvas.square(ex,ey,s,"#60f96b",true);
						break;						
						case "mesa":
						case "mesa plateau":
							canvas.square(ex,ey,s,"#FFB973",true);
						break;
						case 'stone beach':
						case "mountain":
						case "hillyForest":
						case "taiga":
						case "forest":
						case "swamp":
						case "jungle":
						case "extremeHills":
							canvas.square(ex,ey,s,"#9cff79",true);
						break;
						case "roofed forest":
						case "birch forest":
							canvas.square(ex,ey,s,"#60f96b",true);
						break;
						case "pasture":
							canvas.square(ex,ey,s,"#FFFF26",true);
						break;
						case "glacier":
						case "snowy dead forest":
						case "ice":
							canvas.square(ex,ey,s,"#ffffff",true);					
						break;
						default:
							canvas.square(ex,ey,s,"#d4ff88",true);					
						break;
					}
				}
			}
		}
		
	},
	
	
	//Look at preprocessed terrain and figure out terrain
	//Main renderer
	drawBGTerrainLine_old: function(line) {
	
		var mr2 = map.vars.range * map.vars.range;
		
		var s = map.vars.pwidth;
		var coords,col,e,dist,min,min_index,biome;
		for(var ex = 0; ex < canvas.vars.c_bg.width ; ex += s) {
			ey = line;	
				
				//Anti-aliasing
					coords = map.canvas_to_map(ex,ey);
				
					//Determine which terrain point is closest
					min = 10000000000;
					min_index = -1;
					
					var r = map.vars.fuzzy;
					for(var i = 0; i < data.terrain.overworld.length; i++) {
						e = data.terrain.overworld[i];
						dist = map.distSqr(e.x,e.z,coords.x,coords.y);
						//console.log(i,dist,min);
						
						//var n = map.vars.perlin.noise(ex/10,ey/10,0);
						
						var rand = Math.random() * map.vars.fuzzy;

						if ( dist < mr2 && dist + rand < min) {
							min = dist;
							min_index = i;
							biome = e.type;
						}
					}
					
					//console.log(min,min_index,biome);
					var col;
					if ( min_index >= 0 ) {
						//Color square
						switch(biome) {
							case "cherry blossom grove":
								col = pick(canvas.vars.terrainTexture["cherry blossom grove"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "birch forest":
								col = pick(canvas.vars.terrainTexture["birch forest"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "canyon":
								col = pick(canvas.vars.terrainTexture["canyon"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "beach":
							case "desertHills":
							case "desert":
								col = pick(canvas.vars.terrainTexture.desert,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "kelp forest":
							case "island":
							case "ocean":
								col = pick(canvas.vars.terrainTexture.ocean,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "swamp":
								col = pick(canvas.vars.terrainTexture.swamp,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case 'stone beach':
							case "mountain":
							case "extremeHills":
								col = pick(canvas.vars.terrainTexture.extremeHills,Math.round((ex)/s),Math.round((ey)/s));
							break;							
							case "mesa":
							case "mesa plateau":
								col = pick(canvas.vars.terrainTexture.mesa,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "pasture":
								col = pick(canvas.vars.terrainTexture.pasture,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "roofed forest":
								col = pick(canvas.vars.terrainTexture["roofed forest"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "bamboo forest":
							case "hillyForest":
							case "taiga":
							case "forest":
							case "jungle":
								col = "#9cff79";
							break;
							case "glacier":
							case "snowy dead forest":
							case "ice":
								col = "#ffffff";					
							break;
							default:
								col = pick(canvas.vars.terrainTexture.plains,Math.round((ex)/s),Math.round((ey)/s));	
							break;
						}
					} else {
						col = "#333333";	
					}
					
				var c = canvas.color_to_array(col);
				
				if ( map.vars.world_index == 1 ) {	
					c = canvas.desaturate(c[0],c[1],c[2]);
				}

				col = "rgb(" + c.join(',') + ")";

				col = map.drawSection(coords,col);
				canvas.square(ex,ey,s,col,true);
		}
	},
	
	
	
	//Look at preprocessed terrain and figure out terrain
	//Anti-Alias version
	drawBGTerrainLine: function(line) {
		var s = map.vars.pwidth;
		var coords,col,e,dist,min,min_index,biome;
		for(var ex = 0; ex < canvas.vars.c_bg.width ; ex += s) {
			ey = line;	
				cols = [];
				
				//Anti-aliasing
				for(var ix = -map.vars.aa; ix < map.vars.aa; ix++) {
				for(var iy = -map.vars.aa; iy < map.vars.aa; iy++) {
					coords = map.canvas_to_map(ex+ix,ey+iy);
				
					//Determine which terrain point is closest
					min = 10000000000;
					min_index = -1;
					
					var r = map.vars.fuzzy;
					for(var i = 0; i < data.terrain.overworld.length; i++) {
						e = data.terrain.overworld[i];
						dist = map.distSqr(e.x,e.z,coords.x,coords.y);
						//console.log(i,dist,min);
						var rand = (Math.random() * r*r) - (r*r/4);
						if ( dist < map.vars.range * map.vars.range && dist + rand < min) {
							min = dist;
							min_index = i;
							biome = e.type;
						}
					}
					
					//console.log(min,min_index,biome);
					var col;
					if ( min_index >= 0 ) { 
						//Color square
						switch(biome) {
							case "cherry blossom grove":
								col = pick(canvas.vars.terrainTexture["cherry blossom grove"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "birch forest":
								col = pick(canvas.vars.terrainTexture["birch forest"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "canyon":
								col = pick(canvas.vars.terrainTexture["canyon"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "beach":
							case "desertHills":
							case "desert":
								col = pick(canvas.vars.terrainTexture.desert,Math.round((ex+ix)/s),Math.round((ey+iy)/s));
							break;
							case "kelp forest":
							case "island":
							case "ocean":
								col = pick(canvas.vars.terrainTexture.ocean,Math.round((ex+ix)/s),Math.round((ey+iy)/s));
							break;
							case "swamp":
								col = pick(canvas.vars.terrainTexture.swamp,Math.round((ex+ix)/s),Math.round((ey+iy)/s));
							break;
							case "mesa":
							case "mesa plateau":
								col = pick(canvas.vars.terrainTexture.mesa,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case 'stone beach':
							case "mountain":
							case "extremeHills":
								col = pick(canvas.vars.terrainTexture.extremeHills,Math.round((ex+ix)/s),Math.round((ey+iy)/s));
							break;
							case "pasture":
								col = pick(canvas.vars.terrainTexture.pasture,Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "roofed forest":
								col = pick(canvas.vars.terrainTexture["roofed forest"],Math.round((ex)/s),Math.round((ey)/s));
							break;
							case "bamboo forest":
							case "hillyForest":
							case "taiga":
							case "forest":
							case "jungle":
								col = "#9cff79";
							break;
							case "glacier":
							case "snowy dead forest":
							case "ice":
								col = "#ffffff";					
							break;
							default:
								col = pick(canvas.vars.terrainTexture.plains,Math.round((ex+ix)/s),Math.round((ey+iy)/s));	
							break;
						}
					} else {
						col = "#000000";	
					}
				
				    
				
					cols.push(canvas.color_to_array(col));
				
				}}
				
				//Average colors
				//console.log(cols);
				var newcol = [0,0,0];
				for(var i = 0; i < cols.length; i++) {
					newcol[0] += cols[i][0];
					newcol[1] += cols[i][1];
					newcol[2] += cols[i][2];
				}
				newcol[0] = Math.floor(newcol[0] / cols.length);
				newcol[1] = Math.floor(newcol[1] / cols.length);
				newcol[2] = Math.floor(newcol[2] / cols.length);
				
				if ( map.vars.world_index == 1 ) {	
					var c = canvas.desaturate(newcol[0],newcol[1],newcol[2]);
					newcol = c;
				}
				
				newcol = map.drawSection(coords,newcol);	
				
				canvas.square(ex,ey,s,"rgb(" + newcol.join(',') + ")",true);
		}
	},
	
	//Draw the region sections
	drawSection: function(coords,col) {
		var type = typeof(col);
		var c = col;
		if ( type == "string" ) {
		    c = canvas.color_to_array(c);
		}
		
		var pi2 = Math.PI*2;
		
		//map.vars.origin.x,map.vars.origin.z
		
		//Calculate the coord range and angle
		var dx = coords.x - map.vars.origin.x;
		var dy = coords.y - map.vars.origin.z;
		var dx2 = dx * dx;
		var dy2 = dy * dy;
		var angle = Math.atan2(dy,dx);
		var dist = Math.sqrt(dx2 + dy2)
		
		if ( angle < 0 ) { angle += pi2; }
		angle = angle % pi2; 
		
		var flag = false;
		if (dist > 50 && dist < 250) { flag = 1; }
		if (dist > 1500 && dist < 30000000) { flag = 2; }
		
		//First, check distances
		var offset = 0;//Math.PI / 8;
		if ( flag ) { 
		    var dt, df;
		
		    //Second, check spokes
			for(var r = offset; r < pi2 + offset; r += pi2 / 8) {
				dt = r - angle; //angle difference
				df = dist * Math.sin(dt); // distance from spoke

				if ( Math.abs(df) > (flag == 1 ? 7 : 200) ) {
					
					var blend = 20;
					//gradient away
					//blend = map.blendAverage(blend,dist,[100,500,1500,700]);
					
				    //change color
				    c[0] = Math.floor((255 + c[0]*blend) / (blend+1));
				    c[1] = Math.floor((255 + c[1]*blend) / (blend+1));
				    c[2] = Math.floor((255 + c[2]*blend) / (blend+1));

				} else {
				    return col;
				}
			}
		
		} else {
			return col;
		}
		
		if ( type == "string" ) {
		    c = "rgb(" + c.join(',') + ")";
		}
		
		return c;
	},
	
	//increase blend facter the further we are from these values
	blendAverage: function(blend,dist,dists) {
		
		var min = 1000000;
		for(var i in dists) {
			var v = Math.abs(dists[i]-dist);
			if ( v < min ) { min = v; }			
		}
		
		return (blend + (v / 10)) / 2;		
	},

	//Look at preprocessed terrain and figure out terrain
	//* Currently Unused
	drawBGTerrainLine2: function(line) {
		map.vars.pointCache = false;
		map.vars.pointCachePx = 0;
		
	
		var s = map.vars.pwidth;
		var coords,col,e,dist,min,min_index,biome;
		for(var ex = 0; ex < canvas.vars.c_bg.width ; ex += s) {
			ey = line;	

			coords = map.canvas_to_map(ex,ey);
			
			//Determine which terrain point is closest
			min = 10000000000;
			min_index = -1;
			
			if ( map.vars.pointCache == false || map.vars.pointCachePx > map.vars.pointCacheLim ) {
				map.vars.pointCache = [];
				
				for(var i = 0; i < data.terrain.overworld.length; i++) {
					e = data.terrain.overworld[i];
				
					//Remember
					if ( 
						 //e.x > coords.x - map.vars.range &&
						// e.x < coords.x + map.vars.range + map.vars.pointCacheLim &&
						 e.z > coords.y - map.vars.range &&
						 e.z < coords.y + map.vars.range ) 
					{
						map.vars.pointCache.push(e);
					}
					
				}
				
				map.vars.pointCachePx = 0;
				
			} 
				
			map.vars.pointCachePx += s;
			
			for(var i = 0; i < map.vars.pointCache.length; i++) {
				e = map.vars.pointCache[i];
				dist = map.distSqr(e.x,e.z,coords.x,coords.y);
			
				if ( dist < map.vars.range * map.vars.range && dist < min) {
					min = dist;
					min_index = i;
					biome = e.type;
				}
			}
			
			
			//console.log(min,min_index,biome);
			var col;
			if ( min_index >= 0 ) {
				//Color square
				switch(biome) {
					case "beach":
					case "desertHills":
					case "canyon":
						col = pick(canvas.vars.terrainTexture["canyon"],Math.round((ex)/s),Math.round((ey)/s));
					break;
					case "desert":
						col = pick(canvas.vars.terrainTexture.desert,Math.round((ex)/s),Math.round((ey)/s));

					break;
					case "kelp forest":
					case "island":
					case "ocean":
						col = pick(canvas.vars.terrainTexture.ocean,Math.round((ex)/s),Math.round((ey)/s));
					break;
					case "swamp":
						col = pick(canvas.vars.terrainTexture.swamp,Math.round((ex)/s),Math.round((ey)/s));
					break;
					case "mountain":
					case "extremeHills":
						col = pick(canvas.vars.terrainTexture.extremeHills,Math.round((ex)/s),Math.round((ey)/s));
					break;
					case "bamboo forest":
					case "hillyForest":
					case "forest":
					
					case "jungle":
						col = "#9cff79";
					break;
					case "glacier":
					case "snowy dead forest":
					case "taiga":
					case "ice":
						col = "#ffffff";					
					break;
					case 'chaparral':
					case 'highland':
					default:
						col = pick(canvas.vars.terrainTexture.plains,Math.round((ex)/s),Math.round((ey)/s));	
					break;
				}
			} else {
				col = "#333333";	
			}
			
			
			//col = map.drawSection(coords,col);
			
			canvas.square(ex,ey,s,col,true);
		}
	},
	
	//ResetUpdate
	updateBGIncrementReset: function() {
		map.vars.bgRenderLine = 0;
		clearTimeout(map.vars.update_timer_id);
		//if ( map.vars.world_index == 0 ) {
			
			map.vars.update_timer_id = setTimeout(map.updateBgIncrementally,map.vars.lineDelay);
		//}
	},
	
	//Incrementally update background if not moving
	updateBgIncrementally: function() {
		
		if (map.vars.aa > 0 ) {
			map.drawBGTerrainLine(map.vars.bgRenderLine);
		} else {
			if ( map.vars.newline ) {
				map.drawBGTerrainLine2(map.vars.bgRenderLine);		
			} else {
				map.drawBGTerrainLine_old(map.vars.bgRenderLine);		
			
			}
		}
		map.vars.bgRenderLine += map.vars.pwidth;
		
		if ( map.vars.bgRenderLine < canvas.vars.c_bg.height  ) { 
			map.vars.update_timer_id = setTimeout(map.updateBgIncrementally,map.vars.lineDelay);
		}
	},
	
	//Reset map to default
	reset: function() {
		map.vars.viewArea = {width: 5000, height:5000};
		map.vars.viewCenter = {x:0, y:0};
		map.redraw();
		map.vars.rangePixels = map.vars.range * map.vars.mapScale;		
	},
	
	//Toggles whether map is viewing overworld or netherworld
	toggleWorld: function() {
		if ( map.vars.world_index == 0 ) {
			map.vars.world_index = 1;
			
			$("#toggleButton").html("Switch to Overworld");
		} else {
			map.vars.world_index = 0;
			
			$("#toggleButton").html("Switch to Netherworld");
		}
		if ( map.vars.world_index == 0 ) {
			map.addHotspots();
		}
		map.redraw();
		setTimeout(map.updateBGIncrementReset,100);

	},
	
	//Zooom in/out
	zoomIn: function() {
		map.vars.viewArea.width *= 0.75;
		map.vars.viewArea.height *= 0.75;
		map.redraw();
		map.updateBGIncrementReset();
		$("#hovers").html("");
		map.addHotspots();
		map.vars.rangePixels = map.vars.range * map.vars.mapScale;
	},
	zoomOut: function() {
		map.vars.viewArea.width *= 1.25;
		map.vars.viewArea.height *= 1.25;
		map.redraw();	
		map.updateBGIncrementReset();
		$("#hovers").html("");
		map.addHotspots();
		map.vars.rangePixels = map.vars.range * map.vars.mapScale;
	},
	
	//Mouse wheel zoom in/out
	mouseWheel: function(event) {
	
		event.preventDefault();
		//var delta = event.wheelDelta || event.detail < 0 || event.originalEvent.detail < 0 ;
		//console.log(event.wheelDelta , event.detail, event.originalEvent.detail);
		
		var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
				
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        } else if ( event.originalEvent.detail ) {
			delta = -event.originalEvent.detail/3;
		} else if ( event.originalEvent.wheelDelta ) {
			delta = event.originalEvent.wheelDelta/3;
		}
	
	
	//for (var i in event.originalEvent) { console.log(i + ": " + event.originalEvent[i]); }
		
		if ( delta > 0 ) {
			map.zoomIn();
		} else {
			map.zoomOut();
		}

	},
	
	//Mouse down
	mouseDown: function(e) {
		clearTimeout(map.vars.update_timer_id);
		map.vars.isDragging 
		map.vars.isDragging = true;
		map.vars.startX = e.pageX ? e.pageX : e.screenX;
		map.vars.startY = e.pageY ? e.pageY : e.screenY;
		map.vars.viewStart = {x:map.vars.viewCenter.x, y:map.vars.viewCenter.y};
		$("#hovers").html("");
	},
	//Mouse out
	mouseOut: function(e) {
		map.vars.isDragging = false;
	},
	//Mouse Up
	mouseUp: function(e) {
		map.vars.isDragging = false;
		map.vars.bgScaleInc = 30;
		map.redraw();	
		map.updateBGIncrementReset();
		map.addHotspots();
	},
	
	addHotspots: function() {
		for(var i = 0; i < data.interactive[map.vars.world[map.vars.world_index]].length; i++) {
			var entry = data.interactive[map.vars.world[map.vars.world_index]][i];
			var coords = map.map_to_canvas(entry.coords.x,entry.coords.z);
			var entries = [];
			for(var i2 = 0; i2 < entry.photos.length; i2++) {
				entries.push("{file:'" + entry.photos[i2].file + "',w:'" + entry.photos[i2].w + "',h:'" + entry.photos[i2].h + "'}");
			}
			var photos = entries.join(", "); 
			$("#hovers").append("<div class='hover' style=\"left:"+(coords.x-10)+"px;top:"+(coords.y-10)+"px\" onmouseover=\"canvas.showPhotos(["+photos+"])\" onmouseout=\"canvas.hidePhotos()\"><!--e--></div></div>");
		}
	},
	
	
	//Mouse move
	mouseMove: function(e) {
		
		e.preventDefault();
		var px =  (e.pageX ? e.pageX : e.screenX) - 8;
		var py =  (e.pageY ? e.pageY : e.screenY) - 8;
		
		if ( map.vars.isDragging ) {
			//map.vars.dragCount++;
			//if ( map.vars.dragCount % 5 == 0 ) { //Give comp some breathing room
				var dx = px - map.vars.startX;
				var dy = py - map.vars.startY;
				
				map.vars.viewCenter.x = map.vars.viewStart.x - dx/map.vars.mapScale;
				map.vars.viewCenter.y = map.vars.viewStart.y - dy/map.vars.mapScale;
			//}
			
			//Disable update-over-time
			if ( map.vars.update_timer_id ) {
				clearTimeout(map.vars.update_timer_id);
				map.vars.update_timer_id = false;
				canvas.hidePhotos();
			}
		}

		
		map.udpateCursorPosition(px,py);
		map.vars.px = px;
		map.vars.py = py;
		
		
		
	},
	
	//Object is interacted with
	/*mouseObjectInteract: function() {
		//console.log(map.vars.mouseObject);
		map.vars.mouseObjectTID = false;
		
		canvas.showPhotos(map.vars.mouseObject.photos,map.vars.px,map.vars.py);
		
	},*/

	
	//If mouse dragging, update map position
	updateMapCycle: function() {
		if ( map.vars.isDragging ) {
			map.redraw(true);	
		}
				
	},
	
	//Update the display of the cursor coordinates on the bottom-right
	udpateCursorPosition: function(x,y) {
		var netherScale = (map.vars.world_index == 1 ? 1/8 : 1);
		//Offset from center
		var coords = map.canvas_to_map(x,y);
		x = coords.x*netherScale;
		y = coords.y*netherScale;

		$("#xpos").html("X: " + Math.round(x));
		$("#zpos").html("Z: " + Math.round(y));
		
		//Look up biome
		var biome = map.findClosestBiome(x/netherScale,y/netherScale);
		$("#biome").html(biome ? (labels[biome] ? labels[biome] : biome) : '----');
	},
	
	findClosestBiome: function(x, y) {
		
		//Determine which terrain point is closest
		min = 10000000000;
		min_index = -1;
		
		var r = map.vars.fuzzy;
		for(var i = 0; i < data.terrain.overworld.length; i++) {
			e = data.terrain.overworld[i];
			dist = map.distSqr(e.x,e.z,x,y);
			
			//var n = map.vars.perlin.noise(x/10,y/10,0);
			//var rand = (n+1) * r*r/10;
						
			if ( dist < map.vars.range * map.vars.range) {
				min = dist;
				min_index = i;
				biome = e.type;
			}
		}
		
		return min_index >= 0 ? biome : false;
		
	},
	
	//Interpolate between two values
	interp: function(x1,y1,x2,y2,x) {
		var dx = x2-x1;
		var dy = y2-y1;
		var angle = Math.atan2(dy,dx);
		var dist = Math.sqrt(dx*dx + dy*dy);
		var ratio = (x2 - x) / (x2 - x1);
		return y1 + Math.sin(angle) * ratio * dist;
	},
	
	//Convert map coordinates to canvas
	map_to_canvas: function(x,y) {
	
		x -= (map.vars.viewCenter.x);
		y -= (map.vars.viewCenter.y);	
		
		x *= map.vars.mapScale;
		y *= map.vars.mapScale;
		
		x += (canvas.vars.c.width/2);
		y += (canvas.vars.c.height/2);
		
		return {x: x, y: y};
	},
	
	//Convert canvas coordinates to map
	canvas_to_map: function(x,y) {
		x -= (canvas.vars.c.width/2);
		y -= (canvas.vars.c.height/2);
		
		x /= map.vars.mapScale;
		y /= map.vars.mapScale;
	
		x += (map.vars.viewCenter.x);
		y += (map.vars.viewCenter.y);

		return {x: x, y: y};		
	},
	
	//Return distance-squared between two coordinates
	distSqr: function(x1,y1,x2,y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return dx*dx + dy*dy;
	},
	
	init: function() {
		map.peprocessData();
		canvas.init();
		map.redraw();
		setInterval(map.updateMapCycle,30);
		map.vars.rangePixels = map.vars.range * map.vars.mapScale;
		map.updateBGIncrementReset();
		
		//Setup option values
		$("#var_range").val(map.vars.range);
		$("#var_pwidth").val(map.vars.pwidth);
		$("#var_fuzzy").val(map.vars.fuzzy);
		$("#var_lineDelay").val(map.vars.lineDelay);
		$("#var_aa").val(map.vars.aa);
		map.addHotspots();
	},
	
	updateVar: function(name,value,type) {
		if ( type == "uint_1" ) { 
			value = Math.floor(value);
			if ( value < 1 ) { value = 1; }
		}
		map.vars[name] = value;
		setCookie(name,value,3000);
		map.redraw();
	
	}
}

$(document).ready(map.init);



function pickRandom(list) {
	var index = Math.floor(Math.random()*list.length);
	return list[index];
}

function pick(list,x,y) {
	
	var ix = ((x % list[0].length) + list[0].length) % list[0].length;
	var iy = ((y % list.length) + list.length) % list.length;
	if ( ix >= 0 && iy >= 0 ) {
		return list[iy][ix];
	} else {
		return false;
	}
}

function cLoadInt(name,def) {
	var val = getCookie(name);
	if ( !val || val == "null" || val == "" || isNaN(parseInt(val)) ) {
		setCookie(name,def,3000);
		return def;
	} else {
		return parseInt(val);
	}
}


function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
		c_value = null;
	}
	else
	{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)
		{
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

var labels = {
	"desert":"Desert",
	"ocean":"Ocean",
	"river":"River",
	"swamp":"Swamp",
	"jungle":"Jungle",
	"plains":"Plains",
	"beach":"Beach",
	"forest":"Forest",
	"taiga":"Taiga",
	"desertHills":"Desert Hills",
	"hillyForest":"Hilly forest",
	"extremeHills":"Extreme Hills",
	"alps":"Alps",
	"arctic":"Arctic",
	"badlands":"Badlands",
	"bamboo forest":"Bamboo Forest",
	"bayou":"Bayou",
	"birch forest":"Birch Forest",
	"bog":"Bog",
	"boneyard":"Boneyard",
	"boreal forest":"Boreal Forest",
	"brushland":"Brushland",
	"canyon":"Canyon",
	"chaparral":"Chaparral",
	"cherry blossom grove":"Cherry Blossom Grove",
	"coniferous forest":"Coniferous Forest",
	"corrupted sands":"Corrupted Sands",
	"crag":"Crag",
	"dead forest":"Dead Forest",
	"deadlands":"Deadlands",
	"dead swamp":"Dead Swamp",
	"deciduous forest":"Deciduous Forest",
	"dunes":"Dunes",
	"fen":"Fen",
	"field":"Field",
	"frost forest":"Frost Forest",
	"fungi forest":"Fungi Forest",
	"garden":"Garden",
	"glacier":"Glacier",
	"grassland":"Grassland",
	"gravel beach":"Gravel Beach",
	"grove":"Grove",
	"heathland":"Heathland",
	"highland":"Highland",
	"hot springs":"Hot Springs",
	"icy hills":"Icy Hills",
	"jade cliffs":"Jade Cliffs",
	"kelp forest":"Kelp Forest",
	"lush desert":"Lush Desert",
	"lush swamp":"Lush Swamp",
	"mangrove":"Mangrove",
	"maple woods":"Maple Woods",
	"marsh":"Marsh",
	"meadow":"Meadow",
	"mesa":"Mesa",
	"moor":"Moor",
	"mountain":"Mountain",
	"mystic grove":"Mystic Grove",
	"oasis":"Oasis",
	"ominous woods":"Ominous Woods",
	"orchard":"Orchard",
	"origin valley":"Origin Valley",
	"outback":"Outback",
	"pasture":"Pasture",
	"phantasmagoric inferno":"Phantasmagoric Inferno",
	"polar":"Polar",
	"prairie":"Prairie",
	"promised land":"Promised Land",
	"quagmire":"Quagmire",
	"rainforest":"Rainforest",
	"redwood forest":"Redwood Forest",
	"roofed forest":"Roofed Forest",
	"sacred springs":"Sacred Springs",
	"savanna":"Savanna",
	"scrubland":"Scrubland",
	"seasonal forest":"Seasonal Forest",
	"shrubland":"Shrubland",
	"shield":"Shield",
	"sludgepit":"Sludgepit",
	"snowy coniferous forest":"Snowy Coniferous Forest",
	"snowy dead forest":"Snowy Dead Forest",
	"spruce woods":"Spruce Woods",
	"steppe":"Steppe",
	"temperate rainforest":"Temperate Rainforest",
	"thicket":"Thicket",
	"timber":"Timber",
	"tropical rainforest":"Tropical Rainforest",
	"tropics":"Tropics",
	"tundra":"Tundra",
	"undergarden":"Undergarden",
	"volcano":"Volcano",
	"wasteland":"Wasteland",
	"wetland":"Wetland",
	"woodland":"Woodland",
	"canyon ravine":"Canyon Ravine",
	"meadow forest":"Meadow Forest",
	"thick ominous woods":"Thick Ominous Woods",
	"pasture meadow":"Pasture Meadow",
	"thinned pasture":"Thinned Pasture",
	"thick shrubland":"Thick Shrubland",
	"thinned timber":"Thinned Timber"
};
