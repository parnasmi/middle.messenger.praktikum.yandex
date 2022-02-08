import {Block, render} from './shared/utils';
// import {Button} from "./shared/components";
// import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ChatPage from "./pages/Chat";
import ProfilePage from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import ProfilePasswordChange from './pages/ProfilePasswordChange'
import NotFound from './pages/404'
import ServerErrorPage from './pages/500'
import NavigationPage from './pages/NavigationPage'


try {
  let page:Block | null = null;

  const pathName = window.location.pathname;
  switch (pathName) {
    case '/': {
      page = new NavigationPage();
      break;
    }
    case '/sign-in': {
      page = new SignInPage();
      break;
    }
    case '/sign-up': {
      page = new SignUpPage();
      break;
    }
    case '/chat': {
      page = new ChatPage();
      break;
    }
    case '/profile': {
      page = new ProfilePage();
      break;
    }
    case '/profile-edit': {
      page = new ProfileEdit();
      break;
    }
    case '/profile-password-change': {
      page = new ProfilePasswordChange();
      break;
    }
    case '/server-error': {
      page = new ServerErrorPage();
      break;
    }
    case '/not-found': {
      page = new NotFound();
      break;
    }
  }

  if(page) render('#root', page)
  else render('#root', new NotFound())
} catch {
  render('#root', new NotFound())
}



/*
* TODO:
*  1) MAKE NAVIGATION - done
*  2) TYPE PAGES -
*  3) APPLY STYLELINT, PRETTIER, ESLINT
*  4) VALIDATION REGEX
*  5) EDIT README
*  6) inputs in edit pages must get sign_for classes
*  7) REMOVE THIS TODO
*  8) SEND TO CODE REVIEW
* */
