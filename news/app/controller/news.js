sumeru.router.add({
	pattern:'/news',
    action:'App.news'
});

sumeru.router.setDefault('App.news');
App.news = sumeru.controller.create(function(env,session){

	 var  news = function(){
           console.log('进入抓取网页');
		   env.subscribe("pubext",function(newCollection){
			   session.bind('newsList',{data:newCollection.find()});        	
			   });

	 };
	//第一个时态用来加载数据
	env.onload= function(){
		console.log("开始打印日志");

		return [news];
	};		

	//第二个时态用来渲染数据
	env.onrender=function(doRender){
		doRender('news',['push','left']);
	};
  
	//第三个时态用来绑定事件
	env.onready=function(){
          session.event('newsList',function(){
              $('#showNewsDiv').click(function(event){
                  var  target  = event.target;
				  if(target.localName=='li'){
                     var href = target.children[0].href;
					 console.log(href);

					 env.redirect('/newsItem',{'url':href});
				  }
			  }); 	
		  });	
	};

});
