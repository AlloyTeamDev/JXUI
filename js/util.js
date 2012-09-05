function $(id) {
    return document.getElementById(id);
};
var Ajax = function(option) {
    var request;
    var CreateRquest = function() {
        var httpRequest;
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
                httpRequest = new XMLHttpRequest();
            }
        }
        return httpRequest;
    }
    var SendRequest = function() {
        request = CreateRquest();
        request.open(option.Method||"GET", option.Url, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = ResponseRequest;
        request.send(option.Param);
    }
    var ResponseRequest = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                option.Success(request);
            }
            else {
                option.Failure(request);
            }
        }
    }
    SendRequest();
}
function drag(el, e, direction, upHandler, box, downHandler, moveHandle, dragEl) {
	var l= el.style, i, j, m = document;
    l.position = "absolute";
    dragEl = dragEl || el;
    var q = function(p) {
		m.onselectstart = function() {
			return false
		};
        downHandler && downHandler();
        if (box) {
            minX = box.left;
            minY = box.top;
            maxX = box.right - el.offsetWidth;
            maxY = box.bottom - el.offsetHeight
        }
        p = p || event;
        i = p.clientX - el.offsetLeft;
        j = p.clientY - el.offsetTop;
        m.onmousemove = function(k) {
            k = k || event;
            var n = k.clientX - i, o = k.clientY - j;
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
                l.left = n + "px";
                l.top = o + "px"
            } else if (direction == 1)
                l.left = n + "px";
            else
                l.top = o + "px";
            moveHandle && moveHandle(k,{left:n,top:o})
        };
        m.onkeydown = function(k) {
            k = k || event;
			var x=parseInt(el.style.left);
			var y=parseInt(el.style.top);
            switch (k.keyCode) {
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
            moveHandle && moveHandle(k,{left:x,top:y})
       };
        m.onmouseup = function(k) {
            k = k || event;
            m.onmouseup = "";
            m.onmousemove = "";
            upHandler && typeof upHandler == "function" && upHandler(k);
			m.onselectstart=null;
        }
    };
    e && q(e);
    this.startDrag = q;
    dragEl.onmousedown = q
};

/*
 * 函数功能：从href获得参数
 * sArgName : arg1, arg2
 * return :   the value of arg. d, re
 */
function getArg(sArgName)
{
   var sHref = window.document.location.href;
   var args   = sHref.split("?");
   var retval = "";

   if(args[0] == sHref) /* 参数为空 */
   {
      return retval;
      /* 无需做任何处理 */
   }
   var str = args[1];
   args = str.split("&");
   for(var i = 0; i < args.length; i ++ )
   {
      str = args[i];
      var arg = str.split("=");
      if(arg.length <= 1) continue;
      if(arg[0] == sArgName) retval = arg[1];
   }
   return retval;
}

function HTMLDecode(str) 
{ 
	var s = ""; 
	 if    (str.length    ==    0)    return    "";   
	 s    =    str.replace(/&gt;/g,    "&");   
	 s    =    s.replace(/&lt;/g,        "<");   
	 s    =    s.replace(/&gt;/g,        ">");   
	 s    =    s.replace(/&nbsp;/g,        "    ");   
	 //s    =    s.replace(/'/g,      "\'");   
	 s    =    s.replace(/&quot;/g,      "\"");   
	 //s    =    s.replace(/<br>/g,      "\n");   
 	return s; 
}
var ie = !-[1,];
var currentStyle;
if(ie){
	currentStyle=function(el,property){
		var index=property.indexOf('-');
		if(index!='-1'){
			property=property.substr(0,index)+property.substr(index+1,1).toUpperCase()+property.substr(index+2);
		}
		return el.currentStyle[property];
	}
}
else{
	currentStyle=function(el,property){
		var computedStyle=document.defaultView.getComputedStyle(el, null);
		return computedStyle.getPropertyValue(property);
	}
}
function trace(a){
	$('traceTxt').value+=a+'\n';
}
function getChildNodesByTagName(el,tag){
	var childNodes=el.childNodes;
	var a=[];
	for(var i=0;i<childNodes.length;++i){
		if(childNodes[i].tagName==tag.toUpperCase()){
			a.push(childNodes[i]);
		}
	}
	return a;
}