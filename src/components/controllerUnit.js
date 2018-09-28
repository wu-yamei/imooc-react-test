import React, { Component } from 'react';
require('styles/App.scss');


class ControllerUnit extends Component{
	constructor(props) {
        super(props);
    }
	render(){
		 // is-center is-reverse
		 var a = this.props.arrange;
		 // console.log(a);
		 var className = 'controller-unit';
		className += a.isCenter? a.isReverse? ' is-reverse is-center' : ' is-center' : '';
		return (
			<span className={className} onClick={(e) => this.handleClick(e, this.props.index)}></span>
		);
	}
	handleClick (e, index) {
		this.props.click(index);
	}
}

export default ControllerUnit;