
module.exports = function(fw){
       

	//指定抓取某一个网页
	    fw.publish('new','pubext',function(callback){

			    var collection = this;
			      collection.extfind('pubext',callback);
			});

       
		//抓取某一个新闻  需要传入参数
		fw.publish('new','newsItem',function(url,callback){
			var  collection = this;
                //clouda 官网不完善
			collection.extfind('newsItem',{'url':url},callback);
		});

	

}
