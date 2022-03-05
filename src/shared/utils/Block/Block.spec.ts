// // для ревьювера: не смог написать тест для Block mocha выдает ошибку при чтении hbs файла:https://gyazo.com/348e4993c91eaf909a52daf1cace8ed9
//
// import { expect } from "chai";
// import { Block } from "./Block";
// // import {render} from "../render";
// //@ts-ignore
// const Handlebars = require("handlebars");
// const welcomeSource = "<p>Hello, World!</p>";
// const welcomeTmpl = Handlebars.compile(welcomeSource);
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
//
//
// describe.only("Block", () => {
// 	beforeEach("Before running every Block test", () => {
// 		const dom = new JSDOM(
// 			'<!DOCTYPE html><head></head><body><div id="root"></div></body>',
// 			{
// 				url: "http://localhost:3000",
// 			},
// 		);
//
// 		(global as any).window = dom.window;
// 		(global as any).document = dom.window.document;
// 	});
// 	describe("Append block to root Element", () => {
// 			it('it should render propless component to root element', () => {
// 				// class Welcome extends Block {
// 				// 	constructor() {
// 				// 		super('div');
// 				// 	}
// 				//
// 				// 	render():DocumentFragment {
// 				// 		return this.compile(welcomeTmpl, this.props)
// 				// 	}
// 				// }
// 				console.log("Block", { Block, welcomeTmpl });
// 				// const welcome = new Welcome();
// 				// console.log('welcome',welcome)
// 				// render('#root', welcome);
//         // console.log('document', welcome.getContent());
//
// 				// expect((document.querySelector('p') as HTMLElement).textContent).is.equal('Hello, World!')
// 				expect('hello').to.equal('hello');
// 			})
//
// 	});
// });
