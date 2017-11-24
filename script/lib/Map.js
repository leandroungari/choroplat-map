class Map {

	constructor(selector, title){

		this.title = title;
		this.selector = selector;
		this.element = d3.select(selector);

		this.element
		.append("g")
		.attr('class','states');
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

		});

		d3.selectAll("path")
		.style('fill', '#ccc')
		.style('stroke', 'white');
	}

	processarDados(){

		var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		
			return "<strong>Frequency:</strong> <span style='color:red'>" + d+ "</span>";
		})

		d3.select('svg').call(tip);

		let req = new Request(`http://127.0.0.1:5000/states/1/2010`);
		req.open({

			attributes: ['UF', 'UFN']
		},
		(data) => {

			data.forEach((a) => {
				//group-state-br-mt
				//console.log(d3.select('.cities').select(`.group-state-br-${a[0].toLowerCase()}`))
				d3.select('.cities').select(`.group-state-br-${a[0].toLowerCase()}`)
				.attr('data-name', a[1])

				.on('click', () => {

				})
				.on('mouseover', tip.show
					/*d3.select(d3.event.target)
					.style('stroke', '#555')
					.style('z-index', 10)
					.style('stroke-width', 2);*/


				)
				.on('mouseout', tip.hide
					/*d3.select(d3.event.target)
					.style('stroke', '#fff')
					.style('z-index', 0)
					.style('stroke-width', 1);*/ );
			});
		});

		
	}

	removeStates(){
		
		d3.select('.cities').remove();
		//d3.select('.land').style('fill', '#ccc');
	}
}