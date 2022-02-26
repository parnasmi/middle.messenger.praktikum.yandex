import { Block, render } from "../../shared/utils";
import tmpl from "./navigation.tmpl.hbs";
import "../../scss/styles.scss";
import "../../scss/pages/service-page.scss";
import SignInPage from "../SignIn";
import SignUpPage from "../SignUp";
import ChatPage from "../Chat";
import ProfilePage from "../Profile";
import ProfileEdit from "../ProfileEdit";
import ProfilePasswordChange from "../ProfilePasswordChange";
import NotFound from "../404";
import ServerErrorPage from "../500";
import { Button } from "../../shared/components";

export class NavigationPage extends Block<{}> {
	constructor() {
		super("main", {
			attributes: {
				class: "flex items-center justify-center full-h-w",
			},
			signinButton: new Button({
				title: "Вход",
				events: {
					click: () => render("#root", new SignInPage()),
				},
			}),
			signupButton: new Button({
				title: "Регистрация",
				events: {
					click: () => render("#root", new SignUpPage()),
				},
			}),
			chatButton: new Button({
				title: "Страница Чат",
				events: {
					click: () => render("#root", new ChatPage()),
				},
			}),
			profileButton: new Button({
				title: "Страница Профиль",
				events: {
					click: () => render("#root", new ProfilePage()),
				},
			}),
			profileEditButton: new Button({
				title: "Страница изменение профиля",
				events: {
					click: () => render("#root", new ProfileEdit()),
				},
			}),
			profilePasswordChangeButton: new Button({
				title: "Страница изменение пароля",
				events: {
					click: () => render("#root", new ProfilePasswordChange()),
				},
			}),
			notFoundButton: new Button({
				title: "Страница 404",
				events: {
					click: () => render("#root", new NotFound()),
				},
			}),
			serverErrorButton: new Button({
				title: "Страница 500",
				events: {
					click: () => render("#root", new ServerErrorPage()),
				},
			}),
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
