class Request {

	
	
	constructor(url) {

		this.url = url;
	}

	open(data, callback = null) {

		$.ajax({
				url: this.url,
				type: 'post',
				data: {
					data: JSON.stringify(data)
				}
			})
			.done(function (data) {

				if (callback != null) {

					callback(data);
				}
			})
			.fail(function (data) {
				console.log("fail");
			});

	}
}

class Text {

	static removerAcentos(text) {
		text = text.toLowerCase();
		text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
		text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
		text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
		text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
		text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
		text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
		text = text.replace(new RegExp('[ ]', 'g'), '-');
		text = text.replace(new RegExp('[\']', 'g'), '');
		return text;
	}
}

class Color {

	static hexToRgb(hex) {

		var c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
		}

		throw new Error('Bad Hex');
	}
}

class Visualization {

	static processarCidades(opcaoAtual, anoAtual, numOpcoes) {

		let req;

		if (opcaoAtual <= numOpcoes) {
			req = new Request(`http://127.0.0.1:5000/states/${opcaoAtual}/${anoAtual}`);
		} else {

			if (opcaoAtual == 17 || opcaoAtual == 18) req = new Request(`http://127.0.0.1:5000/qualidadevida/${anoAtual}`);
			else if (opcaoAtual == 19 || opcaoAtual == 20) req = new Request(`http://127.0.0.1:5000/evolucao`);
			else req = new Request(`http://127.0.0.1:5000/cities/${opcaoAtual}/${anoAtual}`);
		}

		switch (opcaoAtual) {
			//IDHM Municipal
			case numOpcoes + 1:

				req.open({
						attributes: ['Municipio', 'IDHM', 'UF']
					},
					(data) => {

						Visualization.mostrarCidades(data);
					}
				);
				break;

				//IDHM Municipal (Ampliado)
			case numOpcoes + 2:

				req.open({
						attributes: ['Municipio', 'IDHM', 'UF']
					},
					(data) => {

						let minIDHM = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHM = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHM - minIDHM)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHM) / (div[0]),
								a[2]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;


				//IDHM Municipal - Educacao 
			case numOpcoes + 3:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_E', 'UF']
					},
					(data) => {

						Visualization.mostrarCidades(data);
					}
				);
				break;

				//IDHM Municipal - Educacao (Ampliado)
			case numOpcoes + 4:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_E', 'UF']
					},
					(data) => {

						let minIDHME = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHME = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHME - minIDHME)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHME) / (div[0]),
								a[2]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;


				//IDHM Municipal Longevidade
			case numOpcoes + 5:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_L', 'UF']
					},
					(data) => {

						Visualization.mostrarCidades(data);
					}
				);
				break;

				//IDHM Municipal Longevidade
			case numOpcoes + 6:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_L', 'UF']
					},
					(data) => {

						let minIDHML = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHML = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHML - minIDHML)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHML) / (div[0]),
								a[2]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;

				//IDHM Municipal Renda
			case numOpcoes + 7:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_R', 'UF']
					},
					(data) => {

						Visualization.mostrarCidades(data);
					}
				);
				break;

				//IDHM Municipal Renda (Ampliado)
			case numOpcoes + 8:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_R', 'UF']
					},
					(data) => {

						let minIDHMR = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHMR = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHMR - minIDHMR)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHMR) / (div[0]),
								a[2]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;

				//Qualidade de vida
			case numOpcoes + 9:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_E', 'RDPC', 'T_DES', 'T_ATIV', 'ESPVIDA', 'UF']
					},
					(data) => {
						//console.log(data);
						let maxIDHME = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));
						let maxRDPC = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[2]);
						}));
						let maxTDES = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[3]);
						}));
						let maxTATIV = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[4]);
						}));
						let maxESPVIDA = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[5]);
						}));

						let value = [];

						data.forEach((a) => {

							let item = [
								a[0],
								Number.parseFloat(a[1]) / (maxIDHME * 5) +
								Number.parseFloat(a[2]) / (maxRDPC * 5) +
								Number.parseFloat(a[3]) / (maxTDES * 5) +
								Number.parseFloat(a[4]) / (maxTATIV * 5) +
								Number.parseFloat(a[5]) / (maxESPVIDA * 5),
								a[6]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;

				//Qualidade de vida
			case numOpcoes + 10:

				req.open(

					{
						attributes: ['Municipio', 'IDHM_E', 'RDPC', 'T_DES', 'T_ATIV', 'ESPVIDA', 'UF']
					},
					(data) => {
						//console.log(data);
						let minIDHME = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));
						let minRDPC = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[2]);
						}));
						let minTDES = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[3]);
						}));
						let minTATIV = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[4]);
						}));
						let minESPVIDA = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[5]);
						}));

						let maxIDHME = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));
						let maxRDPC = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[2]);
						}));
						let maxTDES = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[3]);
						}));
						let maxTATIV = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[4]);
						}));
						let maxESPVIDA = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[5]);
						}));

						let value = [];
						let div = [
							(maxIDHME - minIDHME),
							(maxRDPC - minRDPC),
							(maxTDES - minTDES),
							(maxTATIV - minTATIV),
							(maxESPVIDA - minESPVIDA)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHME) / (div[0] * 5) +
								(Number.parseFloat(a[2]) - minRDPC) / (div[1] * 5) +
								(Number.parseFloat(a[3]) - minTDES) / (div[2] * 5) +
								(Number.parseFloat(a[4]) - minTATIV) / (div[3] * 5) +
								(Number.parseFloat(a[5]) - minESPVIDA) / (div[4] * 5),
								a[6]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;

				//IDHM Municipal
			case numOpcoes + 11:

				req.open({
						attributes: ['Municipio', 'IDHM', 'UF']
					},
					(data) => {

						Visualization.mostrarCidades(data);
					}
				);
				break;

				//IDHM Municipal (Ampliado)
			case numOpcoes + 12:

				req.open({
						attributes: ['Municipio', 'IDHM', 'UF']
					},
					(data) => {

						let minIDHM = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHM = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHM - minIDHM)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHM) / (div[0]),
								a[2]
							];

							value.push(item);
						});

						Visualization.mostrarCidades(value);
					}
				);
				break;
		}
	}

	static processarEstados(opcaoAtual, anoAtual) {

		let req = new Request(`http://127.0.0.1:5000/states/${opcaoAtual}/${anoAtual}`);

		switch (opcaoAtual) {
			//IDHM Estadual
			case 1:

				req.open(

					{
						attributes: ['UF', 'IDHM']
					},
					(data) => {

						Visualization.mostrarEstados(data);
					});
				break;

				//IDHM Estadual Ampliado
			case 2:

				req.open(

					{
						attributes: ['UF', 'IDHM']
					},
					(data) => {

						let minIDHM = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHM = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHM - minIDHM)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHM) / (div[0]),
							];

							value.push(item);
						});

						Visualization.mostrarEstados(value);
					});
				break;

				//IDHM Estadual - Educacao
			case 3:

				req.open(

					{
						attributes: ['UF', 'IDHM_E']
					},
					(data) => {

						Visualization.mostrarEstados(data);
					}
				);
				break;

				//IDHM Estadual - Educacao Ampliado
			case 4:

				req.open(

					{
						attributes: ['UF', 'IDHM_E']
					},
					(data) => {

						let minIDHME = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHME = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHME - minIDHME)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHME) / (div[0]),
							];

							value.push(item);
						});

						Visualization.mostrarEstados(value);
					}
				);
				break;
				//IDHM Estadual Longevidade
			case 5:

				req.open(

					{
						attributes: ['UF', 'IDHM_L']
					},
					(data) => {

						Visualization.mostrarEstados(data);
					}
				);
				break;

				//IDHM Estadual Longevidade
			case 6:

				req.open(

					{
						attributes: ['UF', 'IDHM_L']
					},
					(data) => {

						let minIDHML = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHML = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHML - minIDHML)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHML) / (div[0]),
							];

							value.push(item);
						});

						Visualization.mostrarEstados(value);
					}
				);
				break;
				//IDHM Estadual Renda
			case 7:

				req.open(

					{
						attributes: ['UF', 'IDHM_R']
					},
					(data) => {

						Visualization.mostrarEstados(data);
					}
				);
				break;

				//IDHM Estadual Renda
			case 8:

				req.open(

					{
						attributes: ['UF', 'IDHM_R']
					},
					(data) => {

						let minIDHMR = Math.min.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let maxIDHMR = Math.max.apply(Math, data.map((u) => {
							return Number.parseFloat(u[1]);
						}));

						let value = [];
						let div = [
							(maxIDHMR - minIDHMR)
						];

						data.forEach((a) => {

							let item = [
								a[0],
								(Number.parseFloat(a[1]) - minIDHMR) / (div[0]),
							];

							value.push(item);
						});

						Visualization.mostrarEstados(value);
					}
				);
				break;
		}

	}

	static mostrarEstados(data) {

		let corInicial = Color.hexToRgb(document.querySelector('[name="corInicial"]').value);
		let corFinal = Color.hexToRgb(document.querySelector('[name="corFinal"]').value);

		data.forEach((a) => {

			d3.select('.states').select(`#BR-${a[0]}`)
				.style('fill', `rgb(
				${Number.parseInt(corInicial[0]*(1-Number.parseFloat(a[1])) + corFinal[0]*Number.parseFloat(a[1]))},
				${Number.parseInt(corInicial[1]*(1-Number.parseFloat(a[1])) + corFinal[1]*Number.parseFloat(a[1]))},
				${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`)
				.attr('data-value', a[1]);

		});
	}

	static mostrarCidades(data) {

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
					${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`)
					.attr('data-value', a[1]);

			} else {
				selection.select(`.state-br-${a[2].toLowerCase()}`).selectAll(`[data-slug="${Text.removerAcentos(a[0])}"]`)
					.style('fill', `rgb(
					${Number.parseInt(corInicial[0]*(1-Number.parseFloat(a[1])) + corFinal[0]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[1]*(1-Number.parseFloat(a[1])) + corFinal[1]*Number.parseFloat(a[1]))},
					${Number.parseInt(corInicial[2]*(1-Number.parseFloat(a[1])) + corFinal[2]*Number.parseFloat(a[1]))}`)
					.attr('data-value', a[1]);
			}


		});
	}
}


window.onload = () => {

	let anoAtual = 2010;
	let opcaoAtual = 1;

	let numOpcoes = 8;

	let map = new Map(".map", "Mapa do Brasil");
	map.initialize(data['brazil']);
	map.processarDadosEstados();


	let selectVisualizacao = document.querySelector('[name="visualizacao"]');
	let selectAno = document.querySelector('[name="ano-realizacao"]');

	document.querySelector('.gerar').addEventListener('click', () => {

		let anoAtual = Number.parseInt(selectAno.options[selectAno.selectedIndex].value)


		if (opcaoAtual <= numOpcoes) {

			Visualization.processarEstados(opcaoAtual, anoAtual);
		} else {

			Visualization.processarCidades(opcaoAtual, anoAtual, numOpcoes);
		}


	});

	selectVisualizacao.addEventListener('change', () => {

		opcaoAtual = Number.parseInt(selectVisualizacao.options[selectVisualizacao.selectedIndex].value);

		if (opcaoAtual > numOpcoes) {
			map.loadStates(data['states']);
			map.processarDadosCidades();
		} else {

			map.removeStates();
			map.processarDadosEstados();
		}
	});

	document.querySelector('[name="button-salvar"]').addEventListener('click', () => {

		let select = document.querySelector('[name="selecao-salvar"]');
		let valor = select.options[select.selectedIndex].value;

		let chave;

		if (opcaoAtual <= numOpcoes) {
			//somente estados
			if (valor == 'br') chave = ".states";
			else chave = `.state-br-${valor}`;
		} else {
			//estados e cidades
			if (valor == 'br') chave = '.cities';
			else chave = `.group-state-br-${valor}`;
		}

		let adicional = "";
		if (valor == 'br' || valor == 'df') {

			adicional = document.querySelector('.state-br-df').outerHTML;
		}

		let width = document.querySelector(chave).getBBox().width;
		let height = document.querySelector(chave).getBBox().height;

		let dx = -document.querySelector(chave).getBBox().x;
		let dy = -document.querySelector(chave).getBBox().y;

		var node = document.querySelector(chave).cloneNode(true);
		node.setAttribute('transform', `translate(${dx},${dy})`)
		let content = `
		<svg width="${width}" height="${height}" class="map">
		${node.outerHTML}
		${adicional}
		</svg>
		`;

		saveAs(new Blob([content]), "image.svg");
	});
}