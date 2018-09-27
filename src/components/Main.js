require('normalize.css/normalize.css');
require('styles/App.scss');

import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import ImgFigure from './imgFigure.js';

//引入图片路径
var imgDatas = require('../data/imgData.json');
imgDatas = (function (imgDatas) {
	for(var i = 0; i < imgDatas.length; i++){
		imgDatas[i].imgUrl = require('../images/' + imgDatas[i].fillName);
	}
	return imgDatas;
})(imgDatas);

//生成最大值，最小值之间的随机数
function getRandom(low, high){
	return Math.ceil(Math.random() * (high - low) + low);
}

class AppComponent extends Component {
	constructor(){
		super()
		this.state = {
			imgArrageArr: [] // 保存初始化位置信息 {pos: {left: 0, right: 0}}
		}
		this.imgFigures = [];
		this.controllerUnits = [];
	}
	//常量
	Constant: {
		centerPos: {left: 0, top: 0},
		hPosRange: {//水平方向取值范围
			leftSecX: [0, 0], //左半部分 x轴取值
			rightSecX: [0, 0], //右半部分 x轴取值
			y: [0, 0]
		},
		vPosRange: {//垂直方向取值范围
			x: [0, 0],
			topY: [0, 0]
		}
	}
	
	//指定图片位置， 传入居中图片index
	rearrange(centerIndex){
		var a = this.state.imgArrageArr;
		var b = this.Constant;
		// console.log(b);

		//居中图片
		var imgCenterArr = a.splice(centerIndex, 1); //splice 数组切割返回被删除的对象， 会修改原数组， 第二个参数为个数
		imgCenterArr[0].pos = b.centerPos;
		// console.log(imgCenterArr[0]);

		//上侧图片
		var topImgNum = Math.ceil(Math.random() * 2); // top 图片个数
		var topSliceIndex = Math.ceil(Math.random() * (a.length - topImgNum));
		var imgTopArr = a.splice(topSliceIndex, topImgNum);
		imgTopArr.forEach(function(val ,index){
			imgTopArr[index].pos = {
				left: getRandom(b.vPosRange.x[0], b.vPosRange.x[1]),
				top: getRandom(b.vPosRange.topY[0], b.vPosRange.topY[1])
			}
		});
		// console.log(imgTopArr);
		//两侧图片
		for(var i = 0, j = a.length, k = j / 2; i < j; i++){
			var pos = null;
			if(i < k){
				pos = b.hPosRange.leftSecX;
			}else{
				pos = b.hPosRange.rightSecX;
			}
			a[i].pos = {
				left: getRandom(pos[0], pos[1]),
				top: getRandom(b.hPosRange.y[0], b.hPosRange.y[1])
			};
		}

		if(imgTopArr && imgTopArr[0]){
			a.splice(topSliceIndex, 0, imgTopArr[0]);
			if(imgTopArr[1]){
				a.splice(topSliceIndex + 1, 0, imgTopArr[1]);
			}
		}
		a.splice(centerIndex, 0, imgCenterArr[0]);

		this.setState({
			imgArrageArr: a
		});
		// console.log(this.state.imgArrageArr);
		this.initImgFigures();
	}

	//组件加载完，计算图片位置范围
	componentDidMount (){
		var w = window.innerWidth,
			h = window.innerHeight,
			halfW = Math.ceil(w / 2),
			halfH = Math.ceil(h / 2),
			imgW = Math.ceil(w / 5), 
			imgH = Math.ceil(h / 4),
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
			// console.log(w, h ,halfW, halfH, imgW, imgH, halfImgW, halfImgH);
		this.Constant = {
			centerPos: {
				left: halfW - halfImgW, 
				top: halfH - halfImgH
			},
			hPosRange: {
				leftSecX: [-halfImgW, halfW - halfImgW * 3],
				rightSecX: [halfW + halfImgW, w - halfImgW],
				y: [-halfImgH, h - halfImgH]
			},
			vPosRange: {
				x: [halfW - imgW, halfW],
				topY: [-halfImgH, halfH - halfImgH * 3]
			}
		}

		this.rearrange(0);
	}
	initImgFigures(){
		var controllerUnits = [], imgFigures = [];
		imgDatas.forEach(function(val, index){
			if(!this.state.imgArrageArr[index]){
				var a = this.state.imgArrageArr;
				a[index] = {pos: {left: 0, top: 0}}
				this.setState({
					imgArrageArr: a
				});
			}
			imgFigures.push(<ImgFigure data={val} arrange={this.state.imgArrageArr[index]} key={index}/>);
		}.bind(this));
		this.imgFigures = imgFigures;
		this.controllerUnits = controllerUnits;
	}
	componentWillMount(){
		this.initImgFigures();
	}
	render() {
	    return (
	      	<section className="stage" ref="stage">
	      		<section className="img-sec">{this.imgFigures}</section>
	      		<nav className="controller-nav">{this.controllerUnits}</nav>
	      	</section>
	    );
	}
}


export default AppComponent;
