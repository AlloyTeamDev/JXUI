function ToolTip(text,width,height,el){
	this.text=text;
	this.height=height;
	this.width=width;
	this.el=el;
	this.init();
}
ToolTip.prototype={
	init:function(){
		var node=document.createElement('div');
		var width=this.width;
		var height=this.height;
		var el=this.el;
		if(height){
			node.style.height=height+'px';
		}
		else{
			//node.style.height=Math.max(node.offsetHeight,100)+'px';
		}
		node.style.width=width;
		node.innerHTML=this.text;
		node.className="tooltip";
		this.node=node;
		if(el){
			el.appendChild(node);
			//var box=el.getBoundingClientRect();
			//this.setPos(box.left,box.bottom);
			//console.log(box);
		}
		else{
			document.body.appendChild(node);
		}
		var imgBg=new Jx.ui.ImgBg('images/tooltip/bubble.gif',200,150,width,null,node,90,20,30,20);
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
}