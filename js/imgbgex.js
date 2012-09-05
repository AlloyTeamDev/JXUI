function ImgBgEx(src,width,height,el,left,right,y,bottom,onReady){
	var img=new Image();
	var context=this;
	img.onload=function(){
		context.imgWidth=img.width;//imgWidth;
		context.imgHeight=img.height;//imgHeight;
		if(!el){
			el=document.createElement('div');
			document.body.appendChild(el);
		}
		context.width=width===null?el.offsetWidth:width;
		context.height=height===null?el.offsetHeight:height;
		context.el=el;
		context.left=left;
		context.right=right;
		context.y=y;
		context.src=src;
		context.bottom=bottom;
		context.init();
		onReady&&onReady();
	}
	img.src=src;
}
ImgBgEx.prototype={
	init:function(){
		var bg=document.createElement('div');
		this.el.appendChild(bg);
		this.bg=bg;
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
		var bg=this.bg;
		var s=[];
		var ie6=!-[1,]&&!window.XMLHttpRequest;
		var imgs;
		var xrepeatn=parseInt((width-left-right-1)/(imgWidth-left-right))+1;
		var yrepeatn=parseInt((height-y-bottom-1)/(imgHeight-y-bottom))+1;
		var l=(xrepeatn+2)*(yrepeatn+2);
		console.log(xrepeatn+','+yrepeatn);
		if(ie6){
			var baseUrl='';
			if(this.src.indexOf('http')==-1){
				baseUrl=location.href.substr(0,location.href.lastIndexOf('/')+1);
			}
			for(var i=0;i<l;++i){
				s.push('<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=bEnabled, sizingMethod=scale, src=\'');				
				s.push(baseUrl);
				s.push(this.src);
				s.push('\')"></div>');
			}
			bg.innerHTML=s.join('');
			imgs=bg.getElementsByTagName('div');
		}
		else{
			for(var i=0;i<l;++i){
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
		this.imgs=imgs;
		for(var i=0;i<l;++i){
			imgs[i].style.position='absolute';
			imgs[i].style.width=this.imgWidth+'px';
			imgs[i].style.height=this.imgHeight+'px';
		}
		bg=this.bg;
		bg.style.width=this.width+'px';
		bg.style.height=this.height+'px';
		var imgs=this.imgs;
		var lt=imgs[0];
		lt.style.clip='rect(0,'+left+'px,'+y+'px,0)';
		lt.style.left=lt.style.top='0';
		rt=imgs[1];
		rt.style.clip='rect(0,'+imgWidth+'px,'+y+'px,'+(imgWidth-right)+'px)';
		rt.style.right=0;
		rt.style.top=0;
		var lb=imgs[2];
		lb.style.left=0;
		lb.style.bottom=0;
		lb.style.clip='rect('+(imgHeight-bottom)+'px,'+left+'px,'+imgHeight+'px,0)';
		var rb=imgs[3];
		rb.style.right=0;
		rb.style.bottom=0;
		rb.style.clip='rect('+(imgHeight-bottom)+'px,'+imgWidth+'px,'+imgHeight+'px,'+(imgWidth-right)+'px)';
		var w=imgWidth-left-right,h=imgHeight-y-bottom;
		var k=4,endIndex=4+xrepeatn-1;
		var makeClipStyle=this.makeClipStyle;
		var clip=makeClipStyle(0,imgWidth-right,y,left);
		var y1=(yrepeatn-1)*h;
		var resth=height-bottom-y1;
		var x1=(xrepeatn-1)*w;
		var restw=width-right-x1;
		for(var i=0;i<xrepeatn-1;++i){
			imgs[k].style.clip=clip;
			imgs[k].style.left=i*w+'px';
			imgs[k].style.top=0;
			++k;
		}
		imgs[k].style.clip=makeClipStyle(0,restw,y,left);
		imgs[k].style.left=x1+'px';
		imgs[k].style.top=0;
		++k;
		clip=makeClipStyle(y,left,imgHeight-bottom,0);
		for(var i=0;i<yrepeatn-1;++i){
			imgs[k].style.clip=clip;
			imgs[k].style.top=i*h+'px';
			imgs[k].style.left=0;
			++k;
		}
		imgs[k].style.clip=makeClipStyle(y,left,resth,0);
		imgs[k].style.left=0;
		imgs[k].style.top=y1+'px';
		++k;
		clip=makeClipStyle(y,imgWidth,imgHeight-bottom,imgWidth-right);
		for(var i=0;i<yrepeatn-1;++i){
			imgs[k].style.clip=clip;
			imgs[k].style.top=i*h+'px';
			imgs[k].style.right=0;
			++k;
		}
		imgs[k].style.clip=makeClipStyle(y,imgWidth,resth,imgWidth-right);
		imgs[k].style.right=0;
		imgs[k].style.top=y1+'px';
		++k;
		clip=makeClipStyle(imgHeight-bottom,imgWidth-right,imgHeight,left);
		for(var i=0;i<xrepeatn-1;++i){
			imgs[k].style.clip=clip;
			imgs[k].style.left=i*w+'px';
			imgs[k].style.bottom=0;
			++k;
		}
		imgs[k].style.clip=makeClipStyle(imgHeight-bottom,restw,imgHeight,left);
		imgs[k].style.left=x1+'px';
		imgs[k].style.bottom=0;
		++k;
		clip=makeClipStyle(y,imgWidth-right,imgHeight-bottom,left);
		for(var i=0;i<xrepeatn-1;++i){
			for(var j=0;j<yrepeatn-1;++j){
				imgs[k].style.clip=clip;
				imgs[k].style.left=i*w+'px';
				imgs[k].style.top=j*h+'px';
				++k;
			}
		}
		clip=makeClipStyle(y,imgWidth-right,resth,left);
		for(var i=0;i<xrepeatn-1;++i){
			imgs[k].style.left=i*w+'px';
			imgs[k].style.top=y1+'px';
			imgs[k].style.clip=clip;
			++k;
		}
		clip=makeClipStyle(y,restw,imgHeight-bottom,left);
		for(var i=0;i<yrepeatn-1;++i){
			imgs[k].style.left=x1+'px';
			imgs[k].style.top=i*h+'px';
			imgs[k].style.clip=clip;
			++k;
		}
		clip=makeClipStyle(y,restw,resth,left);
		imgs[k].style.left=x1+'px';
		imgs[k].style.top=y1+'px';
		imgs[k].style.clip=clip;
	},
	makeClipStyle:function(t,r,b,l){
		console.log('rect('+t+'px,'+r+'px,'+b+'px,'+l+'px)');
		return 'rect('+t+'px,'+r+'px,'+b+'px,'+l+'px)';
	}
}
/*#sp_${name}_outer {
    height: ${height}px;
    width: ${width}px;
    overflow: hidden;
}
#sp_${name} {
    background: url(../${spritepath}) -${hor}px -${ver}px no-repeat;
    width: 100%;
    height: 100%;
    _background: none;
    _padding-left: ${hor}px;
    _margin-left: -${hor}px;
    _padding-top: ${ver}px;
    _margin-top: -${ver}px;
    _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src='$abspath');
}*/