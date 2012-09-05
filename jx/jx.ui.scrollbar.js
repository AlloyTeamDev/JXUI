Jx().$package("Jx.ui", function(J){
    var $D = J.dom,
        $E = J.event;
	var eventSwitch={"mousemove":"touchmove","mousedown":"touchstart","mouseup":"touchend"}
	function drag(el, e, direction, upHandle, box, downHandle, moveHandle, dragEl) {
		var style = el.style;
		style.position = "absolute";
		dragEl = dragEl || el;
		var mousedownHandle = function(e) {
			function selectHandle(e){
				//e.stopPropagation();
				e.preventDefault();
			}
			$E.on(document,'selectstart',selectHandle);
			downHandle && downHandle();
			if (box) {
				minX = box.left;
				minY = box.top;
				maxX = box.right - el.offsetWidth;
				maxY = box.bottom - el.offsetHeight
			}
			e = e || event;
			var i = e.clientX - el.offsetLeft;
			var j = e.clientY - el.offsetTop;
			function mousemoveHandle(e) {
				var n = e.clientX - i, o = e.clientY - j;
				if (box) {
					if (n < minX)
						n = minX;
					else if (n > maxX)
						n = maxX;
					if (o < minY)
						o = minY;
					else if (o > maxY)
						o = maxY
				}
				if (direction == 0) {
					style.left = n + "px";
					style.top = o + "px"
				} else if (direction == 1)
					style.left = n + "px";
				else
					style.top = o + "px";
				moveHandle && moveHandle(e,{left:n,top:o})
			}
			function keydownHandle(e) {
				var x=parseInt(el.style.left);
				var y=parseInt(el.style.top);
				switch (e.keyCode) {
					case 37:
						--x;
						break;
					case 38:
						--y;
						break;
					case 39:
						++x;
						break;
					case 40:
						++y;
				}
				if (box) {
					if (x < minX)
						x = minX;
					else if (x > maxX)
						x = maxX;
					if (y < minY)
						y = minY;
					else if (y > maxY)
						y = maxY
				}
				el.style.left=x+'px';
				el.style.top=y+'px';
				moveHandle && moveHandle(e,{left:x,top:y})
		    }
			function mouseupHandle(){
				if(!J.platform.iPad){
					$E.off(document,'mousemove',mousemoveHandle);
					$E.off(document,'mouseup',mouseupHandle);
				}
				else{
					$E.off(document,'touchmove',mousemoveHandle);
					$E.off(document,'touchend',mouseupHandle);
				}
				upHandle && typeof upHandle == "function" && upHandle(e);
				$E.off(document,'selectstart',selectHandle);
			}
			if(!J.platform.iPad){
				$E.on(document,'mousemove',mousemoveHandle);
				$E.on(document,'mouseup',mouseupHandle);
			}
			else{
				$E.on(document,'touchmove',mousemoveHandle);
				$E.on(document,'touchend',mouseupHandle);
			}
			$E.on(document,'keydown',keydownHandle);
		};
		e && mousedownHandle(e);
		this.startDrag = mousedownHandle;
		if(!J.platform.iPad){
			$E.on(dragEl,'mousedown',mousedownHandle);
		}
		else{
			$E.on(dragEl,'touchstart',mousedownHandle);
		}
	};
	this.ScrollBar=new J.Class({
		init:function(el){
			var container=document.createElement('div');
			container.innerHTML='<div class="scroll_bar"><div class="scroll_slider"><div class="scroll_slider_top"></div><div class="scroll_slider_middle"></div><div class="scroll_slider_bottom"></div></div><div class="scroll_cube"><div class="scroll_cube_top"></div><div class="scroll_cube_middle"><div class="scroll_cube_texture"></div></div><div class="scroll_cube_bottom"></div></div><div class="up_arrow"></div><div class="down_arrow"></div></div>';
			container.className='scroll_container';
			var padding=0;
			var position;
			var float,margin,left,top,right,bottom;
			if(el.currentStyle){
				var paddingLeft=el.currentStyle['paddingLeft'];
				var paddingRight=el.currentStyle['paddingRight'];
				padding=parseInt(paddingLeft.substr(0,paddingLeft.length-2))+parseInt(paddingRight.substr(0,paddingRight.length-2));
				position=el.currentStyle['position'];
				float=el.currentStyle['float'];
				margin=el.currentStyle['margin'];
				left=el.currentStyle['left'];
				top=el.currentStyle['top'];
				right=el.currentStyle['right'];
				bottom=el.currentStyle['bottom'];
			}
			else{
				var computedStyle=document.defaultView.getComputedStyle(el, null);
				var paddingLeft=computedStyle.getPropertyValue("padding-left");
				var paddingRight=computedStyle.getPropertyValue("padding-right");
				padding=parseInt(paddingLeft.substr(0,paddingLeft.length-2))+parseInt(paddingRight.substr(0,paddingRight.length-2));
				position=computedStyle.getPropertyValue("position");
				float=computedStyle.getPropertyValue('float');
				margin=computedStyle.getPropertyValue('margin');
				left=computedStyle.getPropertyValue('left');
				top=computedStyle.getPropertyValue('top');
				right=computedStyle.getPropertyValue('right');
				bottom=computedStyle.getPropertyValue('bottom');
			}
			if(position=='absolute'||position=='relative'){
				container.style.position=position;
				container.style.bottom=bottom;
				container.style.right=right;
				container.style.left=left;
				container.style.top=top;
			}
			el.style.left=el.style.top='0';
			container.style.float=float;
			container.style.margin=margin;
			el.style.margin='0';
			container.style.visibility='hidden';
			el.parentNode.insertBefore(container, el);
			container.appendChild(el);
			this.bar=container.firstChild;
			var scrollBarWidth=this.bar.offsetWidth;
			el.style.width=el.offsetWidth-scrollBarWidth-padding+'px';
			el.style.position='relative';
			container.style.width=el.offsetWidth+'px';
			container.style.paddingRight=scrollBarWidth+'px';
			if(!el.style.overflow){
				el.style.overflow='hidden';
			}
			container.style.height=el.offsetHeight+'px';
			container.className='scroll_container';
			el.style.overflow='visible';
			this.el=el;
			this.container=container;
			this.cube=this.bar.childNodes[1];
			this.bindEvent();
			setTimeout(function(){container.style.visibility='';},100);
		},
		bindEvent:function(){
			var childNodes=this.bar.childNodes;
			var el=this.el;
			this.upArrow=childNodes[2];
			this.downArrow=childNodes[3];
			var scrollUpArrowHeight=this.scrollUpArrowHeight=this.upArrow.offsetHeight;
			var scrollDownArrowHeight=this.scrollDownArrowHeight=this.downArrow.offsetHeight;
			var sliderHeight=this.sliderHeight=this.container.offsetHeight-scrollUpArrowHeight-scrollDownArrowHeight;
			var cubeHeight=parseInt(this.container.offsetHeight/el.scrollHeight*sliderHeight);
			var cubeChildNodes=this.cube.childNodes;
			var scrollCubeMinHeight=this.scrollCubeMinHeight=cubeChildNodes[0].offsetHeight+cubeChildNodes[1].offsetHeight+cubeChildNodes[2].offsetHeight;
			if(cubeHeight<scrollCubeMinHeight){
				cubeHeight=scrollCubeMinHeight;
			}
			this.cube.style.height=cubeHeight+'px';
			this.cube.style.top=scrollUpArrowHeight+'px';
			var context=this;
			drag(this.cube,null,null,null,{left:0,top:scrollUpArrowHeight,right:20,bottom:this.container.offsetHeight-scrollDownArrowHeight},null,
				function(e,data){
					context.scrollToY(data.top);
				}
			);
			var childNodes=this.bar.childNodes;
			var cubeMiddle=this.cube.childNodes[1];
			var slider=this.slider=childNodes[0];
			var sliderMiddle=slider.childNodes[1];
			cubeMiddle.firstChild.style.height=cubeMiddle.style.height=cubeHeight-cubeChildNodes[0].offsetHeight-cubeChildNodes[2].offsetHeight+1+'px';
			sliderMiddle.style.height=sliderHeight+'px';
			var context=this;
			function upDownHandle(){
				context.up();
				var id=setInterval(function(){context.up()},100);
				function mouseupHandle(e){
					clearInterval(id);
					if(!J.platform.iPad){
						$E.off(document,'mouseup',mouseupHandle);
					}
					else{
						$E.off(document,'touchend',mouseupHandle);
					}
				}
				if(!J.platform.iPad){
					$E.on(document,'mouseup',mouseupHandle);
				}
				else{
					$E.on(document,'touchend',mouseupHandle);
				}
			}
			function downDownHandle(){
				context.down();
				function mouseupHandle(e){
					clearInterval(id);
					if(!J.platform.iPad){
						$E.off(document,'mouseup',mouseupHandle);
					}
					else{
						$E.off(document,'touchend',mouseupHandle);
					}
				}
				var id=setInterval(function(){context.down()},100);
				if(!J.platform.iPad){
					$E.on(document,'mouseup',mouseupHandle);
				}
				else{
					$E.on(document,'touchend',mouseupHandle);
				}
			}
			function sliderDownHandle(e){
				var id;
				var mouseY=e.clientY;
				function isUp(){
					var rect=context.cube.getBoundingClientRect();
					var y=rect.top;
					if(y>mouseY){
						context.up();
						id||(id=setInterval(function(){isUp(y);},100));
						return true;
					}
					else{
						id&&clearInterval(id);
						id=0;
						return false;
					}
				}
				function isDown(){
					var rect=context.cube.getBoundingClientRect();
					var y=rect.top;
					if(rect.bottom<mouseY){
						context.down();
						id||(id=setInterval(function(){isDown(y)},100));
						return true;
					}
					else{
						id&&clearInterval(id);
						id=0;
						return false;
					}
				}
				isUp()||isDown();
				function mouseupHandle(e){
					id&&clearInterval(id);
					id=0;
					if(!J.platform.iPad){
						$E.off(document,'mouseup',mouseupHandle);
					}
					else{
						$E.off(document,'touchend',mouseupHandle);
					}
				}
				if(!J.platform.iPad){
					$E.on(document,'mouseup',mouseupHandle);
				}
				else{
					$E.on(document,'touchend',mouseupHandle);
				}
			}
			function wheelHandle(e){
				if (e.wheelDelta >= 120){
					context.up(); 
				}
				else if (event.wheelDelta <= -120){
					context.down();
				}
			}
			if(!J.platform.iPad){
				$E.on(this.upArrow,'mousedown',upDownHandle);
				$E.on(this.downArrow,'mousedown',downDownHandle);
				$E.on(slider,'mousedown',sliderDownHandle);
				$E.on(this.container,'mousewheel',wheelHandle);
			}
			else{
				$E.on(this.upArrow,'touchstart',upDownHandle);
				$E.on(this.downArrow,'touchend',downDownHandle);
				$E.on(slider,'touchstart',sliderDownHandle);
			}
		},
		update:function(){
			var el=this.el;
			var cubeHeight=parseInt(this.container.offsetHeight/el.scrollHeight*this.sliderHeight);
			var cubeChildNodes=this.cube.childNodes;
			if(cubeHeight<this.scrollCubeMinHeight){
				cubeHeight=this.scrollCubeMinHeight;
			}
			this.cube.style.height=cubeHeight+'px';
			var cubeMiddle=this.cube.childNodes[1];
			cubeMiddle.firstChild.style.height=cubeMiddle.style.height=cubeHeight-cubeChildNodes[0].offsetHeight-cubeChildNodes[2].offsetHeight+1+'px';
		},
		up:function(){
			var y=this.cube.offsetTop;
			if(y>this.scrollUpArrowHeight+10){
				y-=10;
			}
			else{
				y=this.scrollUpArrowHeight;
			}
			this.cube.style.top=y+'px';
			this.scrollToY(y);
		},
		down:function(){
			var y=this.cube.offsetTop;
			if(y+10<this.container.offsetHeight-this.scrollUpArrowHeight-this.cube.offsetHeight){
				y+=10;
			}
			else{
				y=this.sliderHeight+this.scrollUpArrowHeight-this.cube.offsetHeight;
			}
			this.cube.style.top=y+'px';
			this.scrollToY(y);
		},
		scrollToPercent:function(percent){
		},
		scrollToY:function(y){
			var el=this.el;
			var cubeHeight=this.cube.offsetHeight;
			el.style.top=-parseInt((y-this.scrollUpArrowHeight)/(this.sliderHeight-cubeHeight)*(el.scrollHeight-this.container.offsetHeight))+'px';
		}
	})
});