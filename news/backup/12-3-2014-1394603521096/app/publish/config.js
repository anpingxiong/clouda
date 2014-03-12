function runnable(){
	var config={};
	config['pubext']={
		uniqueColumn:'name',
		fetchUrl : function(){
			return 'http://www.baidu.com';
		},
  
		 // 这是个转换模型层数据的方法
		resolve :function(originData){
		   var j = JSON.parse(originData);
		   var resolved = j;
			return resolved;
		}

		 
					 
	}
    return {
	   type:'external',
	   config:config
	}

}

module.exports=runnable;
