require('normalize.css/normalize.css');
require('styles/App.scss');

import React, { Component } from 'react';
//引入图片路径
var imgDatas = require('../data/imgData.json');
imgDatas = (function (imgDatas) {
	for(var i = 0; i < imgDatas.length; i++){
		imgDatas[i].imgUrl = require('../images/' + imgDatas[i].fillName);
	}
	return imgDatas;
})(imgDatas);


class AppComponent extends Component {
  render() {
    return (
      	<section className="stage">
      		<section className="img-sec"></section>
      		<nav className="controller-nav"></nav>
      	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
