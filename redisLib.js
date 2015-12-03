var redis		= require('redis');
var async   	= require('async'); // asynchronous functions

var opt = {
	max_attempts : 1
};
var port = 6379;
var host = '127.0.0.1';
var client = redis.createClient(port, host, opt);


client.on("error", function(){
	console.log('Error Redis');
});

client.on("connect", function () {
	console.log('info', "Redis Reader: connected to database at port: "+port+ ", host: "+host);	
});


function getRedis(key, prefix, callback){
		if(client.connected == true){
			client.get(prefix+"_"+key, function(err, reply) {
				console.log("#getRedis");
				console.log(reply);
				if(err){
					callback(err, null);
				}else{
					callback(null, reply);
				}
			});		
		}else{	
			console.log("Redis disconnected. Couldn't get");
			client = redis.createClient(port, host, opt);
			client.get(prefix+"_"+key, function(err, reply) {
				console.log("#getRedis");
				console.log(reply);
				if(err){
					callback(err, null);
				}else{
					callback(null, reply);
				}
			});		
   			//callback(null, null);
		}
}

function getByPrefix(prefix, callback){
	var values = [];
	if(client.connected == true){
		client.keys(prefix+"_*", function(err, reply) {
			console.log("#getRedis");
			console.log(reply);
			if(err){
				callback(err, null);
			}else{
				callback(null, reply);
			}
		});		
	}else{	
		console.log("Redis disconnected. Reconnecting");
		client = redis.createClient(port, host, opt);
		client.keys(prefix+"_*", function(err, reply) {
			console.log("#getRedis");
			console.log(reply);
			if(err){
				callback(err, null);
			}else{
				async.eachSeries(reply, function(value, next){
					client.get(value, function(err, rep){
						if(err){
							console.log(err);

						}else{
							values.push(rep);
							next(null);
						}
					});
		        }, function(err){ // series - end
					callback(null, values);
		        });
			}
		});		
			//callback(null, null);
	}
}

function insertRedis(key, prefix, value, callback){
		if(client.connected == true){
			if(key != undefined && prefix != undefined ){
				client.set(prefix+"_"+key, value, function(err, reply) {
					if(err){
						callback(err);
					}else{
						callback(null, reply);
					}
				});
			}else{
				callback(null, null);
			}
		}else{	
			console.log("Redis disconnected. Reconnecting");
			client = redis.createClient(port, host, opt);
			if(key != undefined && prefix != undefined ){
				client.set(prefix+"_"+key, value, function(err, reply) {
					if(err){
						callback(err);
					}else{
						callback(null, reply);
					}
				});
			}else{
				callback(null, null);
			}
			
		}
}

function deleteRedis(key, prefix, callback){
		if(client.connected == true){		
			client.del(prefix+"_"+key, function(err, reply) {
				if(err){
					callback(err);
				}else{
					callback(null, reply);
				}
			});

		}else{
			console.log("Redis disconnected. Reconnecting");
			client = redis.createClient(port, host, opt);
			if(key != undefined && prefix != undefined){
				client.del(prefix+"_"+key, function(err, reply) {
					if(err){
						callback(err);
					}else{
						callback(null, reply);
					}
			});
			}
		
		}
}


module.exports = {

	getRedis: getRedis,

	insertRedis: insertRedis,

	deleteRedis : deleteRedis,

	getByPrefix : getByPrefix,

}