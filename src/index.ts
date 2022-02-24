import { Router } from "./shared/utils";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ProfilePasswordChange from "./pages/ProfilePasswordChange";
import NotFoundPage from "./pages/404";
import { AuthController } from "./shared/modules/auth";
import store from "./shared/store";

const router = new Router("#root");
const authController = new AuthController();

// authController.logout();

export function initializePrivateRoutes() {
	router
		.use("/messenger", Chat)
		.use("/profile", Profile)
		.use("/profile-update", ProfileEdit)
		.use("/password-change", ProfilePasswordChange)
		.use("/not-found", NotFoundPage)
		.start();
}

export function initializePublicRoutes() {
	router.use("/", SignIn).use("/sign-up", SignUp).start();
}

authController
	.getUser()
	.then(() => {
		initializePrivateRoutes();
		router.go(document.location.pathname);
		console.log("store", store.getState());
	})
	.catch(() => {
		initializePublicRoutes();
		router.go(document.location.pathname);
	});
