import React, { Component } from 'react';
require('styles/App.scss');


class ControllerUnit extends Component{
	constructor(props) {
        super(props);
    }
	render(){
		return (
			<span className="controller-unit is-center is-reverse" onClick={this.handleClick}></span>
		);
	}
	handleClick(){

	}
}

export default ControllerUnit;