Jx().$package("Jx.ui", function(J){
    var $D = J.dom,
        $E = J.event;
	this.ToolTip=new J.Class({
		init:function(text,width,height,el,imgSrc){
			this.text=text;
			this.height=height;
			this.width=width;
			this.el=el;
			var node=document.createElement('div');
			if(height){
				node.style.height=height+'px';
			}
			else{
				//node.style.height=Math.max(node.offsetHeight,100)+'px';
			}
			node.style.width=width;
			node.innerHTML=text;
			node.className="tooltip";
			this.node=node;
			if(el){
				el.appendChild(node);
			}
			else{
				document.body.appendChild(node);
			}
			var imgBg=new Jx.ui.ImgBg(imgSrc||'images/tooltip/bubble.gif',200,150,width,null,node,90,20,30,20);
		},
		setPos:function(x,y){
			var node=this.node;
			node.style.left=x+'px';
			node.style.top=y+'px';
		},
		hide:function(){
			var node=this.node;
			node.style.display='none';
		}
	});
});