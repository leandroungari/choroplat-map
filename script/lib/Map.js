class Map {

	constructor(selector, title){

		this.title = title;
		this.selector = selector;
		this.element = d3.select(selector);

		this.element
		.append("g")
		.attr('class','states');

		this.element
		.append("g")
		.attr('class','cities');
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
				.on('mouseover', () => {

					d3.select(d3.event.target)
					.style('fill', 'black');
				})
				.on('mouseout', () => {

					d3.select(d3.event.target)
					.style('fill', '#ccc');
				});

		});

	}

	loadStates(data){


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
		.style('fill', 'blue')
		.style('stroke', 'white');
	}
}