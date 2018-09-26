import React, { Component } from 'react';
require('styles/App.scss');

class ImgFigure extends Component{
	constructor(props) {
        super(props);
    }
	render(){
		var styleObj = this.props.arrange.pos;
		return (
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.imgUrl} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

export default ImgFigure;