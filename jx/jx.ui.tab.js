Jx().$package("Jx.ui", function(J){
    var $D = J.dom,
        $E = J.event;
	this.Tab=new J.Class({
		init:function(tabList,contentList,handle){
			this.tabList=tabList;
			this.contentList=contentList;
			this.handle=handle;
			var tabList=this.tabList;
			var contentList=this.contentList;
			var index=this.index=0;
			for(var i=0;i<tabList.length;++i){
				tabList[i].setAttribute('index',i);
			}
			for(var i=0;i<contentList.length;++i){
				contentList[i].style.display='none';
			}
			contentList[index].style.display='block';
			this.bindEvent();
		},
		bindEvent:function(){
			var tabList=this.tabList;
			var contentList=this.contentList;
			var context=this;
			function clickHandle(){
				var index=this.getAttribute('index');
				context.selectTab(index);
				return false;
			}
			for(var i=0;i<tabList.length;++i){
				tabList[i].onclick=clickHandle;
			}
		},
		selectTab:function(index){
			if(index==this.index){
				return;
			}
			var tabList=this.tabList;
			var handle=this.handle;
			handle&&handle(tabList[index],tabList[this.index],this.index);
			var contentList=this.contentList;
			contentList[this.index].style.display='none';
			this.index=index;
			contentList[index].style.display='block';
		}
	})
});