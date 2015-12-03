var redislib = require(process.cwd()+ '/redisLib.js')

redislib.getByPrefix('7801', function(error, response){
	if(error){
		console.log(error);
	}
	else{
		console.log("OK");
		console.log(response);



	}
});