function ScrollUI(el){
	function init(){
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
		this.container=container;
		this.cube=this.bar.childNodes[1];
		this.bindEvent();
		setTimeout(function(){container.style.visibility='';},100);
	}
	function bindEvent(){
		var childNodes=this.bar.childNodes;
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
		cubeMiddle.style.height=cubeHeight-cubeChildNodes[0].offsetHeight-cubeChildNodes[2].offsetHeight+1+'px';
		sliderMiddle.style.height=sliderHeight+'px';
		var context=this;
		this.upArrow.onmousedown=function(){
			context.up();
			var id=setInterval(function(){context.up()},100);
			document.onmouseup=function(){clearInterval(id);document.onmouseup=null;}
		}
		this.downArrow.onmousedown=function(){
			context.down();
			var id=setInterval(function(){context.down()},100);
			document.onmouseup=function(){clearInterval(id);document.onmouseup=null;}
		}
		slider.onmousedown=function(e){
			e=e||event;
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
			document.onmouseup=function(){
				id&&clearInterval(id);
				id=0;
				document.onmouseup=null;
			}
		}
		this.container.onmousewheel=function(e){
			e=e||event;
			if (e.wheelDelta >= 120){
				context.up(); 
			}
			else if (event.wheelDelta <= -120){
				context.down();
			}
		}
	}
	function update(){
		var cubeHeight=parseInt(this.container.offsetHeight/el.scrollHeight*this.sliderHeight);
		var cubeChildNodes=this.cube.childNodes;
		if(cubeHeight<this.scrollCubeMinHeight){
			cubeHeight=this.scrollCubeMinHeight;
		}
		this.cube.style.height=cubeHeight+'px';
		var cubeMiddle=this.cube.childNodes[1];
		cubeMiddle.style.height=cubeHeight-cubeChildNodes[0].offsetHeight-cubeChildNodes[2].offsetHeight+1+'px';
	}
	function up(){
		var y=this.cube.offsetTop;
		if(y>this.scrollUpArrowHeight+10){
			y-=10;
		}
		else{
			y=this.scrollUpArrowHeight;
		}
		this.cube.style.top=y+'px';
		this.scrollToY(y);
	}
	function down(){
		var y=this.cube.offsetTop;
		if(y+10<this.container.offsetHeight-this.scrollUpArrowHeight-this.cube.offsetHeight){
			y+=10;
		}
		else{
			y=this.sliderHeight+this.scrollUpArrowHeight-this.cube.offsetHeight;
		}
		this.cube.style.top=y+'px';
		this.scrollToY(y);
	}
	function scrollToPercent(percent){
	}
	function scrollToY(y){
		var cubeHeight=this.cube.offsetHeight;
		el.style.top=-parseInt((y-this.scrollUpArrowHeight)/(this.sliderHeight-cubeHeight)*(el.scrollHeight-this.container.offsetHeight))+'px';
	}
	this.init=init;
	this.bindEvent=bindEvent;
	this.scrollToY=scrollToY;
	this.down=down;
	this.up=up;
	this.init();
	this.update=update;
	this.update();
}
