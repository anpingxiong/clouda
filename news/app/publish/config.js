function runnable(){
	var config={};
	config['pubext']={
		uniqueColumn:'name',
		fetchUrl : function(){
			return 'http://wap.baidu.com/ssid=0/from=0/bd_page_type=1/uid=0/pu=sz%40224_220%2Cta%40middle___3_537/news?tn=bdwcnc&word=topnews&datano=10086&pfr=3-11-bdindex-top-7-top-';
		},
  
		 // 这是个转换模型层数据的方法
		resolve :function(originData){
		    console.log(originData);
			
			var datas=[{
			'name':'anping',
			'context':'wocaiciai',
			'url':'http://www.baidu.com'
			},{
			
			'name':'aaa',
			'context':'assdsd',
			'url':'http://ssssss'

			}] ;
			return datas;
		}

		 
					 
	}
    return {
	   type:'external',
	   config:config
	}

}

module.exports=runnable;
