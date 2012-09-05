Jx().$package("Jx.ui", function(J){
    var $D = J.dom,
        $E = J.event;
	this.ImgBg=new J.Class({
		init:function(src,imgWidth,imgHeight,width,height,el,left,right,y,bottom){
			this.imgWidth=imgWidth;
			this.imgHeight=imgHeight;
			if(!el){
				el=document.createElement('div');
				document.body.appendChild(el);
			}
			var position;
			if(el.currentStyle){
				position=el.currentStyle['position'];
			}
			else{
				var computedStyle=document.defaultView.getComputedStyle(el, null);
				position=computedStyle.getPropertyValue("position");
			}
			if(position!='absolute'){
				el.style.position='relative';
			}
			el.style.zIndex='1';
			this.width=width===null?el.offsetWidth:width;
			this.height=height===null?el.offsetHeight:height;
			this.el=el;
			this.left=left;
			this.right=right;
			this.y=y;
			this.src=src;
			this.bottom=bottom;
			var bg=document.createElement('div');
			this.el.appendChild(bg);
			var s=[];
			var imgs;
			if(J.browser.ie==6){
				var baseUrl='';
				if(this.src.indexOf('http')==-1){
					baseUrl=location.href.substr(0,location.href.lastIndexOf('/')+1);
				}
				for(var i=0;i<9;++i){
					s.push('<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=bEnabled, sizingMethod=scale, src=\'');				
					s.push(baseUrl);
					s.push(this.src);
					s.push('\')"></div>');
				}
				bg.innerHTML=s.join('');
				imgs=bg.getElementsByTagName('div');
			}
			else{
				for(var i=0;i<9;++i){
					s.push('<img src="');
					s.push(this.src);
					s.push('" border="0" />');
				}
				bg.innerHTML=s.join('');
				imgs=bg.getElementsByTagName('img');
			}
			bg.style.position='absolute';
			bg.style.left='0';
			bg.style.top='0';
			bg.style.zIndex='-1';
			bg.style.overflow='hidden';
			this.bg=bg;
			this.imgs=imgs;
			for(var i=0;i<9;++i){
				imgs[i].style.position='absolute';
			}
			if(J.browser.ie==6){
				imgs[0].style.width=imgs[2].style.width=imgs[6].style.width=imgs[8].style.width=imgWidth+'px';
				imgs[0].style.height=imgs[2].style.height=imgs[6].style.height=imgs[8].style.height=imgHeight+'px';
			}
			this.setSize();
		},
		setSize:function(width,height,left,right,y,bottom){
			width!==undefined?this.width=width:width=this.width;
			height!==undefined?this.height=height:height=this.height;
			left!==undefined?this.left=left:left=this.left;
			right!==undefined?this.right=right:right=this.right;
			y!==undefined?this.y=y:y=this.y;
			bottom!==undefined?this.bottom=bottom:bottom=this.bottom;
			var imgWidth=this.imgWidth;
			var imgHeight=this.imgHeight;
			bg=this.bg;
			bg.style.width=this.width+'px';
			bg.style.height=this.height+'px';
			var imgs=this.imgs;
			var lt=imgs[0];
			lt.style.clip='rect(0,'+left+'px,'+y+'px,0)';
			lt.style.left=lt.style.top='0';
			var mt=imgs[1];
			mt.style.top='0';
			mt.style.left=left;
			var mtWidth=width-left-right;
			var mtImgWidth=width>imgWidth?parseInt(mtWidth/(imgWidth-left-right)*imgWidth+1):imgWidth;
			mt.style.width=mtImgWidth+'px';
			mt.style.height=imgHeight+'px';
			var clipLeft=width>imgWidth?parseInt(mtImgWidth/imgWidth*left+1):left;
			//var clipRight=parseInt(mtImgWidth/imgWidth*right+1);
			var clip='rect(0,'+(clipLeft+mtWidth)+'px'+','+y+'px,'+clipLeft+'px)';
			mt.style.clip=clip;
			var offsetLeft=-clipLeft+left;
			//var offsetRight=clipRight-right;
			mt.style.left=offsetLeft+'px';
			mt.style.top='0';
			rt=imgs[2];
			rt.style.clip='rect(0,'+imgWidth+'px,'+y+'px,'+(imgWidth-right)+'px)';
			rt.style.right=0;
			rt.style.top=0;
			var lm=imgs[3];
			lm.style.left=0;
			var lmHeight=height-y-bottom;
			var lmImgHeight=height>imgHeight?parseInt(lmHeight/(imgHeight-y-bottom)*imgHeight+1):imgHeight;
			lm.style.width=imgWidth+'px';
			lm.style.height=lmImgHeight+'px';
			var clipTop=parseInt(lmImgHeight/imgHeight*y+1);
			clip='rect('+clipTop+'px,'+left+'px'+','+(clipTop+lmHeight)+'px,0)';
			lm.style.clip=clip;
			var offsetTop=y-clipTop;
			lm.style.top=offsetTop+'px';
			var mm=imgs[4];
			mm.style.width=mtImgWidth+'px';
			mm.style.height=lmImgHeight+'px';
			mm.style.left=offsetLeft+'px';
			mm.style.top=offsetTop+'px';
			var clipBottom=clipTop+lmHeight;
			clip='rect('+clipTop+'px,'+(clipLeft+mtWidth)+'px,'+clipBottom+'px,'+clipLeft+'px)';
			mm.style.clip=clip;
			var rm=imgs[5];
			rm.style.width=imgWidth+'px';
			rm.style.height=lmImgHeight+'px';
			rm.style.top=offsetTop+'px';
			rm.style.right=0;
			clip='rect('+clipTop+'px,'+imgWidth+'px,'+clipBottom+'px,'+(imgWidth-right)+'px)';
			rm.style.clip=clip;
			var lb=imgs[6];
			lb.style.left=0;
			lb.style.bottom=0;
			lb.style.clip='rect('+(imgHeight-bottom)+'px,'+left+'px,'+imgHeight+'px,0)';
			var mb=imgs[7];
			mb.style.bottom=0;
			mb.style.left=offsetLeft+'px';
			mb.style.width=mtImgWidth+'px';
			mb.style.height=imgHeight+'px';
			clip='rect('+(imgHeight-bottom)+'px,'+(clipLeft+mtWidth)+'px,'+imgHeight+'px,'+clipLeft+'px)';
			mb.style.clip=clip;
			var rb=imgs[8];
			rb.style.right=0;
			rb.style.bottom=0;
			rb.style.clip='rect('+(imgHeight-bottom)+'px,'+imgWidth+'px,'+imgHeight+'px,'+(imgWidth-right)+'px)';
		}
	});
});