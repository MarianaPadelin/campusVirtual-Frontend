import LoginContainer from "../components/pages/login/LoginContainer";
import LogoutContainer from "../components/pages/vistas_admin/logout/LogoutContainer";
import RegisterContainer from "../components/pages/register/RegisterContainer";
import ResetPasswordContainer from "../components/pages/resetPassword/ResetPasswordContainer";
import ResetItermedioContainer from "../components/pages/resetPassword/ResetItermedioContainer";
export const rutasPublicas = [
  {
    id: "logout",
    path: "/logout",
    Element: LogoutContainer,
  },
  {
    id: "login",
    path: "/",
    Element: LoginContainer,
  },
  {
    id: "register",
    path: "/register",
    Element: RegisterContainer,
  },
  {
    id: "intermedio",
    path: "/sendEmail",
    Element: ResetItermedioContainer,
  },
  {
    id: "reset",
    path: "/resetPassword/:token",
    Element: ResetPasswordContainer,
  },
];
