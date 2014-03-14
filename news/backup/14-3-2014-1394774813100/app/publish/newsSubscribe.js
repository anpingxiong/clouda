
module.exports = function(fw){
       
	    fw.publish('new','pubext',function(callback){

			    var collection = this;
			      collection.extfind('pubext',callback);
			});

}
