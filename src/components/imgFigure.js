import React, { Component } from 'react';
require('styles/App.scss');

class ImgFigure extends Component{
	constructor(props) {
        super(props);
    }
	render(){
		var styleObj = {};
		var b = this.props.arrange;
		var className = b.isReverse? 'img-figure reverse' : 'img-figure';
		// console.log(className);
		if(b.pos){
			styleObj = b.pos;
		}
		// console.log(styleObj);
		if(b.rotate){
			(['WebkitTransForm', 'MozTransForm', 'msTransForm', 'transform']).forEach(function(val){
				styleObj[val] = 'rotate(' + b.rotate + 'deg)';
			});
		}
		if(b.isCenter){
			styleObj['zIndex'] = 11;
		}
		// console.log(styleObj);

		return (
			<figure className={className} style={styleObj} onClick={(e) => this.clickHandle(e ,this.props.index)}>
				<div className="box">
					<img src={this.props.data.imgUrl} alt={this.props.data.title}/>
					<figcaption>
						<h2 className="img-title">{this.props.data.title}</h2>
						<div className="img-back">{this.props.data.desc}</div>
					</figcaption>
				</div>
				
			</figure>
		);
	}

	clickHandle(e, index){
		// console.log(index);
		this.props.click(index);
	}
}

export default ImgFigure;