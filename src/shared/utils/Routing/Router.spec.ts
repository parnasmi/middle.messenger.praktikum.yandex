import { expect } from "chai";
import { Block } from "../Block";
import { Router } from "./Router";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Router", () => {
	beforeEach(() => {
		const dom = new JSDOM(
			'<!DOCTYPE html><head></head><body><div id="root"></div></body>',
			{
				url: "http://localhost:3000",
			},
		);

		(global as any).window = dom.window;
		(global as any).document = dom.window.document;
	});

	describe(".go", () => {
		beforeEach(() => {
			class MyBlock {
				getContent() {
					const div = document.createElement("div");
					div.id = "test-div";
					return div;
				}
			}

			const router = new Router("#root");
			router.use("/settings", MyBlock as any);
			router.go("/settings");
		});


		it("should change location", () => {
			expect(document.location.pathname).to.eq("/settings");
		});
		it("should render a new block", () => {
			expect(document.getElementById("test-div")).not.to.be.null;
		});
	});

	describe(".use", () => {
		it("it should return Router instance", () => {
			const router = new Router("#root");
			const result = router.use("/settings", class {} as unknown as typeof Block);
			expect(result).to.eq(router);
		});
	});

	describe('Router instance', () => {
		it("should be singleton", () => {
			const router = new Router("#root");
			expect(new Router("#root")).to.eq(router);
		});
	})

});
