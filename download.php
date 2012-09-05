<?php
	/*
	 * Created on 2011-1-12
	 *
	 * To change the template for this generated file go to
	 * Window - Preferences - PHPeclipse - PHP - Code Templates
	 */

	//参数说明：
	//file_dir:文件所在目录
	//file_name:文件名
	function download($file_dir,$file_name)
	{
	     $file_dir=chop($file_dir);
	   //去掉路径中多余的空格
	   //得出要下载的文件的路径
		$pos=strrpos($file_name,'.');
		$file_ext=substr($file_name,$pos+1);
	   //if(substr($file_name,strlen($file_name)-3)!='zip'){
		   //return false;
	   //}
	   $flag=false;
	   $ext_array=array('js','png','css','zip','jpg','gif');
	   foreach ($ext_array as $value)
		{
			if($value==$file_ext){
				$flag=true;
				break;
			}
		}
		if(!$flag){
			return false;
		}
	   if($file_dir!="")
	   {
	       $file_path=$file_dir;
	       if(substr($file_dir,strlen($file_dir)-1,strlen($file_dir))!="/")
	           $file_path.='/';
	       $file_path.=$file_name;
	   }
	   else{
	       $file_path=$file_name;
	   }

	   //判断要下载的文件是否存在
	   if(!file_exists($file_path))
	   {
	       echo "对不起,你要下载的文件不存在。";
	       return false;
	   }

	   $file_size=filesize($file_path);

	   header("Content-type:application/octet-stream");
	   header("Accept-Ranges:bytes");
	   header("Accept-Length:$file_size");
	   header("Content-Disposition:attachment;filename=".$file_name);

	   $fp=fopen($file_path,"r");
	   $buffer_size=1024;
	   $cur_pos=0;

	   while(!feof($fp)&&$file_size-$cur_pos>$buffer_size)
	   {
	       $buffer=fread($fp,$buffer_size);
	       echo$buffer;
	       $cur_pos+=$buffer_size;
	   }

	   $buffer=fread($fp,$file_size-$cur_pos);
	   echo$buffer;
	   fclose($fp);
	   return true;
	}
	$filename=$_GET['f'];
	$pos=strrpos($filename,'/');
	$file_path=substr($filename,0,$pos);
	$file_name=substr($filename,$pos+1);
	//echo $file_path;
	//echo ',';
	//echo $file_name;
	download($file_path,$file_name);
?>