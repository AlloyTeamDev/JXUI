function ImgAnimate(imgSrc,singleWidth,width,height,duration,el){
	this.imgSrc=imgSrc;
	this.singleWidth=singleWidth;
	this.width=width;
	if(!el){
		el=document.createElement('el');
		el.style.width=singleWidth+'px';
		el.style.height=height+'px';
	}
	this.duration=duration;
	this.el=el;
	this.init();
}
ImgAnimate.prototype={
	init:function(){
		var el=this.el;
		var imgSrc=this.imgSrc;
		var node=document.createElement('div');
		var width=this.width;
		var height=this.height;
		el.style.overflow='hidden';
		node.style.zIndex='0';
		node.style.left=node.style.top=0;
		this.node=node;
		el.appendChild(node);
		var ie6=!-[1,]&&!window.XMLHttpRequest;
		this.ie6=ie6;
		node.style.height=height?(height+'px'):'100%';
		if(ie6){
			var baseUrl='';
			node.style.width=width+'px';
			if(imgSrc.indexOf('http')==-1){
				baseUrl=location.href.substr(0,location.href.lastIndexOf('/')+1);
			}
			node.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=bEnabled, sizingMethod=crop, src=\''+baseUrl+imgSrc+'\')';
		}
		else{
			//node.style.position='relative';
			//node.style.width=width+'px';
			node.style.background='url('+imgSrc+') 0 0 no-repeat';
			node.style.width=width+'px';
		}
		this.start();
	},
	stop:function(){
		this.timeId&&clearInterval(this.timeId);
		this.timeId=0;
	},
	start:function(){
		var duration=this.duration;
		var width=this.width;
		var i=1;
		var node=this.node;
		var singleWidth=this.singleWidth;
		var n=parseInt(width/singleWidth);
		var id=setInterval(function(){
			//if(ie6){
			node.style.marginLeft='-'+i*singleWidth+'px';
			//node.style.paddingLeft=i*singleWidth+'px';
			//}
			//else{
				//node.style.left='-'+i*singleWidth+'px';
			//}
			++i;
			if(i>=n){
				i=0;
			}
		}, duration);
		this.timeId=id;
	},
	hide:function(){
		this.el.style.display='none';
	},
	show:function(){
		this.el.style.display='block';
	}
}

