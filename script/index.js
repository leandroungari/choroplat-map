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

class Text {

	static removerAcentos( text ) {
		text = text.toLowerCase();                                                         
		text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
		text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
		text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
		text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
		text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
		text = text.replace(new RegExp('[Ç]','gi'), 'c');
		text = text.replace(new RegExp('[ ]', 'g'),'-');
		text = text.replace(new RegExp('[\']', 'g'),'');
		return text;
	}
}

class Color {

	static hexToRgb(hex){
		
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return [(c>>16)&255, (c>>8)&255, c&255];
		}

		throw new Error('Bad Hex');
	}
}

class Visualization {

	static processarCidades(opcaoAtual, anoAtual, numOpcoes){

		let req = new Request(`http://127.0.0.1:5000/cities/${opcaoAtual}/${anoAtual}`);

		switch(opcaoAtual){
				//IDHM Municipal
				case numOpcoes+1:

				req.open(

				{
					attributes: ['Municipio','IDHM', 'UF']
				},
				(data) => {

					Visualization.mostrarCidades(data);
				}
				);
				break;
			//IDHM Municipal - Educacao
			case numOpcoes+2:

			req.open(

			{
				attributes: ['Municipio','IDHM_E', 'UF']
			},
			(data) => {

				Visualization.mostrarCidades(data);
			}
			);
			break;
			//IDHM Municipal Longevidade
			case numOpcoes+3:

			req.open(

			{
				attributes: ['Municipio','IDHM_L', 'UF']
			},
			(data) => {

				Visualization.mostrarCidades(data);
			}
			);
			break;
			//IDHM Municipal Renda
			case numOpcoes+4:

			req.open(

			{
				attributes: ['Municipio', 'IDHM_R', 'UF']
			},
			(data) => {

				Visualization.mostrarCidades(data);
			}
			);
			break;
		}
	}

	static processarEstados(opcaoAtual, anoAtual){

		let req = new Request(`http://127.0.0.1:5000/states/${opcaoAtual}/${anoAtual}`);

		switch(opcaoAtual){
				//IDHM Estadual
				case 1:

				req.open(

				{
					attributes: ['UF', 'IDHM']
				},
				(data) => {

					Visualization.mostrarEstados(data);
				}
				);
				break;
			//IDHM Estadual - Educacao
			case 2:

			req.open(

			{
				attributes: ['UF','IDHM_E']
			},
			(data) => {

				Visualization.mostrarEstados(data);
			}
			);
			break;
			//IDHM Estadual Longevidade
			case 3:

			req.open(

			{
				attributes: ['UF','IDHM_L']
			},
			(data) => {

				Visualization.mostrarEstados(data);
			}
			);
			break;
			//IDHM Estadual Renda
			case 4:

			req.open(

			{
				attributes: ['UF','IDHM_R']
			},
			(data) => {

				Visualization.mostrarEstados(data);
			}
			);
			break;
		}

	}

	static mostrarEstados(data){

		let corInicial = Color.hexToRgb(document.querySelector('[name="corInicial"]').value);
		let corFinal = Color.hexToRgb(document.querySelector('[name="corFinal"]').value);

		data.forEach((a) => {

			d3.select('.states').select(`#BR-${a[0]}`)
			.style('fill', `rgb(
				${Number.parseInt(corInicial[0]*(1-Number.parseFloat(a[1])) + corFinal[0]*Number.parseFloat(a[1]))},
				${Number.parseInt(corInicial[1]*(1-Number.parseFloat(a[1])) + corFinal[1]*Number.parseFloat(a[1]))},
				${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`
				)
			.attr('data-value', a[1]);

		});
	}

	static mostrarCidades(data){

		let corInicial = Color.hexToRgb(document.querySelector('[name="corInicial"]').value);
		let corFinal = Color.hexToRgb(document.querySelector('[name="corFinal"]').value);

		let selection = d3.select('.cities');
		let df = `.state-br-df`;
		data.forEach((a) => {
			
			
			if (df == `.state-br-${a[2].toLowerCase()}`) {
				d3.select('.states').select(`#BR-DF`)
				.style('fill', `rgb(
					${Number.parseInt(corInicial[0]*(1-Number.parseFloat(a[1])) + corFinal[0]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[1]*(1-Number.parseFloat(a[1])) + corFinal[1]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`
					)
				.attr('data-value', a[1]);

			}
			else{
				selection.select(`.state-br-${a[2].toLowerCase()}`).selectAll(`[data-slug="${Text.removerAcentos(a[0])}"]`)
				.style('fill', `rgb(
					${Number.parseInt(corInicial[0]*(1-Number.parseFloat(a[1])) + corFinal[0]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[1]*(1-Number.parseFloat(a[1])) + corFinal[1]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`
					)
				.attr('data-value', a[1]);
			}
			

		});
	}
}


window.onload = () => {

	let anoAtual = 2010;
	let opcaoAtual = 1;

	let numOpcoes = 4;

	let map = new Map(".map", "Mapa do Brasil");
	map.initialize(data['brazil']);
	map.processarDadosEstados();


	let selectVisualizacao = document.querySelector('[name="visualizacao"]');
	let selectAno = document.querySelector('[name="ano-realizacao"]');

	document.querySelector('.gerar').addEventListener('click', () => {

		let anoAtual = Number.parseInt(selectAno.options[selectAno.selectedIndex].value)

		
		if (opcaoAtual <= numOpcoes) {

			Visualization.processarEstados(opcaoAtual, anoAtual);
		}
		else{

			Visualization.processarCidades(opcaoAtual, anoAtual, numOpcoes);
		}


	});

	selectVisualizacao.addEventListener('change', () => {

		opcaoAtual = Number.parseInt(selectVisualizacao.options[selectVisualizacao.selectedIndex].value);

		if (opcaoAtual > numOpcoes) {
			map.loadStates(data['states']);
			map.processarDadosCidades();
		}
		else{

			map.removeStates();
			map.processarDadosEstados();
		}
	});
}