class Request {

	constructor(url){

		this.url = url;
	}

	open(data, callback = null){
		
		$.ajax({
			url : this.url,
			type: 'post',
			data : {
				data: JSON.stringify(data)
			}
		})
		.done(function(data){
			
			if (callback != null) {

				callback(data);
			}
		})
		.fail(function(data){
			console.log("fail");
		}); 
	}
}


window.onload = () => {

	let map = new Map(".map", "Mapa do Brasil");

	map.initialize(data['brazil']);
	//map.loadStates(data['states']);

	let req = new Request("http://127.0.0.1:5000/states");
	
	req.open({
		attributes: ['UFN','IDHM', 'IDHM_E']
	},
	(data) => {

		console.log(data);
	})
}