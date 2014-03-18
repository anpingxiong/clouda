function runnable(){
    var htmlparser = require("htmlparser");
    var  globalurl ="http://wap.baidu.com/ssid=0/from=0/bd_page_type=1/uid=0/pu=sz%40224_220%2Cta%40middle___3_537";
	var config={};

   //这是用来抓取你传入的新闻地址的config  传入地址网页都是布局相同的，否则会出错::
	config['newsItem']={
	
	   uniqueColumn:'name',
	   fetchUrl:function(url){
		   return url.url.url;
	   
	   },
	   
        geturl:function(){
		  	
		},


	   resolve:function(originData){

		   //分析html,拿到文本内容
         var  dataFromBaidu  = originData.match(/<p style=".*/);
		var stringNew ="";
		 if(dataFromBaidu!=undefined) {
		 dataFromBaidu  = dataFromBaidu[0];
        
	     var handler = new htmlparser.DefaultHandler(function (error, dom) {
			     if (error)
			         console.log('解析出错了');
			     else{
                   //拿出所有的p  来
				   for(var i=0 ;i<dom.length;i++){
				       var  raw = dom[i].name;
					   if(raw=='p' &&  dom[i].children!=undefined){

                       
						  var  children  = dom[i].children[0];
                          
						  if(children!=undefined && children.type=='text'){
						      stringNew  = stringNew.concat('<p>');
							   stringNew  = stringNew.concat(children.data);
							   stringNew  = stringNew.concat("</p>");

						  }
						 
					   }
				   }
             
				 }
		  });

		  
          var parser = new htmlparser.Parser(handler);
		  parser.parseComplete(dataFromBaidu);
 

		}else{
		  stringNew="抱歉，没有数据";
		}
		 var  data    = [{
			  'name':'new',
			  'context':stringNew,
			  'url':'null'
			}];

		   return data;
	   }
	
	}


	//这是用来抓取指定地址的config 
	config['pubext']={
		uniqueColumn:'name',
		fetchUrl : function(){
			return 'http://wap.baidu.com/ssid=0/from=0/bd_page_type=1/uid=0/pu=sz%40224_220%2Cta%40middle___3_537/news?tn=bdwcnc&word=topnews&datano=10086&pfr=3-11-bdindex-top-7-top-';
		},
  
		 // 这是个转换模型层数据的方法
		resolve :function(originData){
		   // console.log(originData);
		   //

		    var  news   = originData.match(/<div class="list">.*/);
            var  datas=[];

             var newss = news[0].toString(); 
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
			     if (error)
			         console.log('解析出错了');
			     else{
					 var childrens  = dom[0].children;

					// console.log(childrens);

                     for(var i=0 ;i<childrens.length-1;i++){
				           	 
				   //尝试第一个list
					 var  list_item_first =  childrens[i];

				if(list_item_first.attribs.class='list-item'){
                     var  list_item_first_child=list_item_first.children;
                          //console.log(list_item_first_child);
				  //拿到了url
					 var  url  = list_item_first_child[0].attribs.href;
					      url = url.replace(/;/g,'&');
			              url  = globalurl.concat( url.substr(1));
                       
					      //console.log(url);

						  
                     var  contextNode = list_item_first_child[0].children;
		                 if(contextNode!=undefined){
						   var  context =contextNode[0].data;    
						 
					 
                     	 	 var   name  = context;
					 	    	var  data  = {
						 		'name':name,
						 		'context':context,
								 'url':url
					 		};

                        datas.push(data);
					   
                       
					      }
                      }

					  }
				 }
		 });
		 var parser = new htmlparser.Parser(handler);
		 parser.parseComplete(newss);

             
			return datas;
		}

		 
					 
	}
    return {
	   type:'external',
	   config:config
	}

}

module.exports=runnable;
