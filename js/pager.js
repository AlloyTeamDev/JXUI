function PagerUI(pageContainer,count,pageSize,pageHandle,prevCount,nextCount,lastCount,firstCount){
	function init(){
		var curPage=this.curPage=1;
		prevCount=prevCount===undefined?4:prevCount;
		nextCount=nextCount===undefined?4:nextCount;
		lastCount=lastCount===undefined?2:lastCount;
		firstCount=firstCount===undefined?2:firstCount;
		if(!pageContainer){
			pageContainer=document.createElement('div');
			document.body.appendChild(pageContainer);
		}
		if(pageContainer.className){
			pageContainer.className+=' pager';
		}
		else{
			pageContainer.className='pager';
		}
		this.resetPager();
		this.bindEvent();
	}
	function resetPager(_count,_pageSize){
		var curPage=this.curPage;
		count=_count=_count===undefined?count:_count;
		pageSize=_pageSize=_pageSize===undefined?pageSize:_pageSize;
		var pageCount=parseInt((count-1)/pageSize)+1;
		var s=[];
		var start=Math.max(Math.min(Math.max(curPage-prevCount,1),pageCount-prevCount-nextCount),1);
		var end=Math.min(start+prevCount+nextCount,pageCount);
		s.push('<a href="###" value="1" class="pager_first">首页</a>');
		if(curPage>1){
			s.push('<a href="###" value="');
			s.push(curPage-1);
			s.push('" class="pager_prev">上一页</a>');
		}
		else{
			s.push('<span class="pager_prev">上一页</span>');
		}
		if(start>firstCount+1){
			for(var j=1;j<=firstCount;++j){
				s.push('<a href="###" value="');
				s.push(j);
				s.push('">');
				s.push(j);
				s.push('</a>');
			}
			s.push('<span>...</span>');
		}
		else{
			for(var j=1;j<start;++j){
				s.push('<a href="###" value="');
				s.push(j);
				s.push('">');
				s.push(j);
				s.push('</a>');
			}
		}
		for(var i=start;i<curPage;++i){
			s.push('<a value="');
			s.push(i);
			s.push('" href="###">');
			s.push(i);
			s.push('</a>');
		}
		s.push('<span class="pager_cur">');
		s.push(curPage);
		s.push('</span>');
		for(var i=curPage+1;i<=end;++i){
			s.push('<a value="');
			s.push(i);
			s.push('" href="###">');
			s.push(i);
			s.push('</a>');
		}
		if(end+lastCount+1<pageCount){
			s.push('<span>...</span>');
			for(var j=lastCount-1;j>=0;--j){
				s.push('<a href="###" value="');
				s.push(pageCount-j);
				s.push('">');
				s.push(pageCount-j);
				s.push('</a>');
			}
		}
		else{
			for(var j=end+1;j<=pageCount;++j){
				s.push('<a href="###" value="');
				s.push(j);
				s.push('">');
				s.push(j);
				s.push('</a>');
			}
		}
		if(pageCount>curPage){
			s.push('<a href="###" value="');
			s.push(curPage+1);
			s.push('" class="pager_next">下一页</a>');
		}
		else{
			s.push('<span class="pager_next">下一页</span>');
		}
		s.push('<a href="###" value="');
		s.push(pageCount);
		s.push('" class="pager_last">尾页</a>');
		pageContainer.innerHTML=s.join('');
	}
	function bindEvent(){
		var context=this;
		pageContainer.onclick=function(e){
			e=e||event;
			var target=e.target||e.srcElement;
			if(target.tagName=='A'){
				context.curPage=parseInt(target.getAttribute('value'));
				pageHandle&&pageHandle(context.curPage);
				context.resetPager();
			}
			return false;
		}
	}
	function getPage(){
		return this.curPage;
	}
	this.init=init;
	this.bindEvent=bindEvent;
	this.resetPager=resetPager;
	this.init();
	this.getPage=getPage;
}