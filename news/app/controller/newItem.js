sumeru.router.add(
		{
		pattern: '/newsItem',
        action: 'App.newsItem'
	    }
);

App.newsItem=sumeru.controller.create(function(env,session,url){

	 var  news = function(){

      
		  env.subscribe('newsItem',url,function(collection){
			   var  datas   = collection.find();
			   console.log(datas);
			  session.bind('news',{data:datas});  
		  });			 
		 

	 };
	//第一个时态用来加载数据
	env.onload= function(){
		console.log("开始打印日志");

		return [news];
	};		

	//第二个时态用来渲染数据
	env.onrender=function(doRender){
		doRender('newsItems',['push','left']);
	};

});
