class Map {

	constructor(selector, title){

		this.title = title;
		this.selector = selector;
		this.element = d3.select(selector);

		this.element.append("g");
	}

	initialize(data){

		data.states.forEach((e) => {

			this.element
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
}