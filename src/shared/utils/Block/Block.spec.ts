//для ревьювера: не смог написать тест для Block mocha выдает ошибку при чтении hbs файла:https://gyazo.com/348e4993c91eaf909a52daf1cace8ed9


// import { expect } from "chai";
// import { Block } from "./Block";
// import {render} from "../render";
// //@ts-ignore
// import welcomeTmpl from './templates-test/welcome.tmpl.hbs'
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
//
//
// describe("Block", () => {
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
// 			it.skip('it should render propless component to root element', () => {
// 				class Welcome extends Block {
// 					constructor() {
// 						super('div');
// 					}
//
// 					render():DocumentFragment {
// 						return this.compile(welcomeTmpl, this.props)
// 					}
// 				}
// 				const welcome = new Welcome();
// 				render('#root', welcome);
//
// 				expect((document.querySelector('p') as HTMLElement).textContent).is.equal('Hello, World!')
// 			})
//
// 	});
// });
