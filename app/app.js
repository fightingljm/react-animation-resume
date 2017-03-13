import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";
import co from "co";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# 刘金萌

### 基本信息

* 个人信息: 刘金萌 / 女 / 22岁
* 毕业院校:长春工业大学
* 个人专业:计算机网络技术
* 应聘岗位:Web前端工程师
* 现居住地:河北 秦皇岛

### 联系方式

* 联系电话: 15133124782
* 联系微信: 15133124782
* 联系QQ: 1321839748
* 联系邮箱: 1321839748@qq.com

### 主要技能

* HTML
* CSS
* Javascript
* jQuery
* Bootstrap
* React
* Node.js

### 技能详解

> HTML / CSS
> 能够编写语义化的HTML，熟练运用div+css 浮动布局，flexbox 弹性布局。
> 熟悉SASS书写，gulp webpack自动化工具的运用， autoprefixer imagemin 等后处理工具的使用。
> Javascript
> 熟悉原生的Javascript，对原型，原型链，对象，闭包等都有一些了解。能脱离jQuery等库编写一些常见的功能，如轮播图，计算器，购物车等等。
> jQuery
> 熟悉jQ的用法，能使用jQuery快速完成常见功能的开发。
> Bootstrap
> 能使用Bootstrap框架，完成页面的开发，并且能使用一些常用的组件，如轮播，响应式导航条等常见的功能。
> React
> 熟练使用 react webpack node 完成个人博客的制作,轮播图,todomvc等

### 自我评价

* 我是一名三年都在专注  C 和 java 编程刚毕业的大学生，在即将毕业的招聘会上果断转行前端
* 不过我并不后悔，因为前端真的很有意思！
* 做自己喜欢的事，人生能有多少机会这么不顾一切呢？
* 本人强迫症晚期，不能忍受界面一个像素的偏差，同样不能忍受代码格式一个空格的偏差
* 学习能力强，以上绝大多数的技能都是毕业前夕自学修得的
* Everyone will lose, why me? Everyone can win, why not me?

** Blog: **http://www.cnblogs.com/ljm-fight/
** Github: **https://github.com/fightingljm
** My Blog: **https://fightingljm.github.io/myblg
** Markdown: https://fightingljm.github.io/**

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/fightingljm/react-animation-resume)，打造你自己的简历！`;

		this.styleEditorContent = [`/*
* Inspired by http://strml.net/
*
* Hello, 我是刘金萌
*
* 最近看到了 饥人谷 做的动态的简历，感觉很有意思，所以我也用 React 做了一份简易的动态简历
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .3s;
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: #888; background: rgb(222,222,222);
}
/* 文字直接显示在页面上，没有任何装饰，真的人反人类呢！所以我们来给文字加点装饰吧~~ */
.styleEditor {
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 作为一个程序员，我们不可以太沉闷哦~~，给自己的代码加一点色彩吧 */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* 加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
	margin-top: 50px;
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotate(-10deg) translateZ(-100px) ;
          transform: rotate(-10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: 1.5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
	-webkit-transform: rotate(10deg) translateZ(-100px) ;
          transform: rotate(10deg) translateZ(-100px) ;
}

/* 好了，我开始写简历了 */
`,
`
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 *           3
 *           2
 *           1
 *         啦啦啦！
 */
`,
`
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
	overflow: scroll;
}
/*
* 我是一名三年都在专注  C 和 java 编程刚毕业的大学生，在即将毕业的招聘会上果断转行前端
* 不过我并不后悔，因为前端真的很有意思！
* 做自己喜欢的事，人生能有多少机会这么不顾一切呢？
* 本人强迫症晚期，不能忍受界面一个像素的偏差，同样不能忍受代码格式一个空格的偏差
* 学习能力强，以上绝大多数的技能都是毕业前夕自学修得的
* Everyone will lose, why me? Everyone can win, why not me?
*/
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceStyleEditorContent() {

	}

	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		});
	}

	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
		console.log(111);
		// this.refs.StyleEditor.replaceContent(this.content[0]);
		// this.replaceStyle(this.content[0]);
		// this.refs.ResumeEditor.replaceContent("");
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));
