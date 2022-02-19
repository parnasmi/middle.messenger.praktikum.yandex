import { Router } from "./shared/utils";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";

import { HTTPTransport } from "./shared/utils";
import {AuthController} from "./shared/modules/auth";

const router = new Router("#root");
const indexHttpInstance = new HTTPTransport({ endPoint: "/auth" });
const authController = new AuthController()
// authController.logout();

export function privateRoutes() {
  router
    .use('/',Chat)
    .use('/chat',Chat)
    .start()
}
export function publicRoutes() {
  router
    .use('/',SignIn)
    .use('/sign-up',SignUp)
    .start()
}

indexHttpInstance.get("/user")
  .then(() => {
    privateRoutes();
    router.go('/chat');
  })
  .catch(() => {
    publicRoutes();
    router.go('/')
  });

