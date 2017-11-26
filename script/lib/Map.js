class Map {

	constructor(selector, title){

		this.title = title;
		this.selector = selector;
		this.element = d3.select(selector);

		this.element
		.append("g")
		.attr('class','states');

		this.zoom = () => {

			d3.select('svg.map').attr("transform", d3.event.transform);
		}

		this.zoomAction = d3.zoom()
		.scaleExtent([0.5, 8])
		.on('zoom', this.zoom);
		
		let dx = 0, dy = 0;

		this.element.call(d3.drag()
			.on('start', function () {

				if (d3.select(this).attr('transform') != null) {
					let text = d3.select(this).attr('transform');
					text = text.substring(10, text.length-1);					
					let coord = text.split(',');

					dx = d3.event.x - Number.parseFloat(coord[0]); dy = d3.event.y - Number.parseFloat(coord[1]);
				}
				else {

					dx = d3.event.x; dy = d3.event.y;	
				}

				
				d3.select(this).style('cursor', 'move');
			})
			.on('drag', function () {

				d3.select(this).attr('transform', `translate(${d3.event.x - dx},${d3.event.y - dy})`);
			})
			.on('end', function () {

				d3.select(this).style('cursor', 'normal');
			})
		);

		this.element.call(this.zoomAction);

		this.element.on("dblclick.zoom", null);
	}

	initialize(data){

		data.states.forEach((e) => {

			this.element
			.select('g')
			.append('g')
			.attr('class', `state-${e.id.toLowerCase()}`)
			.append("path")
			.attr("class", "land")
			.attr("title", e.title)
			.attr("d", e.d)
			.attr("id", e.id)
				/*.on('mouseover', () => {

					d3.select(d3.event.target)
					.style('fill', 'black');
				})
				.on('mouseout', () => {

					d3.select(d3.event.target)
					.style('fill', '#ccc');
				})*/;

			});

	}

	loadStates(data){

		if (this.element.selectAll('.cities')._groups[0].length != 0) return;

		this.element
		.append("g")
		.attr('class','cities');

		data.forEach((a) => {
			
			if (a.class != 'state-br-df') {

				let inicial = d3.select('.states').select(`.${a.class}`).node().getBBox();

				d3.select('.cities')
				.append('g')
				.attr('class',`group-${a.class}`)
				.attr('transform',`translate(${inicial.x - a.dx},${inicial.y - a.dy})`);

				let selection = d3.select('.cities').select(`.group-${a.class}`);
				selection
				.html(selection.html() + a.content);

				let novo = selection.node().getBBox();

				d3.select('.cities').select(`.${a.class}`)
				.attr('transform', `scale(${inicial.width/novo.width})`)
			}
			

		});

		d3.selectAll("path")
		.style('fill', '#ccc')
		.style('stroke', 'white');
	}

	processarDadosEstados(){

		var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			let target = d3.select(d3.event.target);

			return `<strong>Nome:</strong> ${target.attr('data-name')} <br><strong>Valor:</strong> ${target.attr('data-value') != null ? target.attr('data-value') : ' --- '}`;
		})

		d3.select('svg').call(tip);

		let req = new Request(`http://127.0.0.1:5000/states/1/2010`);
		req.open({

			attributes: ['UF', 'UFN']
		},
		(data) => {

			data.forEach((a) => {

				d3.select('.states').select(`#BR-${a[0]}`)
				.attr('data-name', a[1])
				.on('mouseover', () => {
					tip.show();
				})
				.on('mouseout', () => {
					tip.hide(); 
				});
			})
		});
	}

	processarDadosCidades(){
		
		var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function() {

			let target = d3.select(d3.event.target);
			return `<strong>Nome:</strong> ${target.attr('data-name')} <br>Valor: ${(target.attr('data-value') != null ? target.attr('data-value') : ' --- ')}`;
		})

		d3.select('svg').call(tip);

		let req = new Request(`http://127.0.0.1:5000/cities/1/2010`);
		req.open({

			attributes: ['Municipio','UF']
		},
		(data) => {

			let selection = d3.select('.cities');
			data.forEach((a) => {
				
				selection.select(`.state-br-${a[1].toLowerCase()}`).selectAll(`[data-slug="${Text.removerAcentos(a[0])}"]`)
				.attr('data-name', a[0].toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
					return letter.toUpperCase();
				}))
				.on('mouseover', () => {
					tip.show();
				})
				.on('mouseout', () => {
					tip.hide();
				});
			})
		});
		
		
	}

	removeStates(){
		
		d3.select('.cities').remove();
		//d3.select('.land').style('fill', '#ccc');
	}
}