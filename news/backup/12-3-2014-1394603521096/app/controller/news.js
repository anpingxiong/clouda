sumeru.router.add({
	pattern:'/news',
    action:'App.news'
});

sumeru.router.setDefault('App.news');
sumeru.controller.create(function(env,session){

	 var  news = function(){
	env.subscribe("pubext",function(newCollection){
        session.bind['newslist',{data:newCollection.extfind()}];        	
	});

	 };
	//第一个时态用来加载数据
	env.onload= function(){
		return [news];
	};		

	//第二个时态用来渲染数据
	env.onrender=function(doRender){
		doRender('news',['push','left']);
	};


});
