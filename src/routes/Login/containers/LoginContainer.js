import { connect } from "react-redux";
import Login from "../components/Login";
import {
    setConnectionStatus,
    setDisplayInstruction,
    setDomain,
    setUsername,
    setPassword,
    setUsernameError,
    setPasswordError,
    login,
    setLoginForm,
    setWhatsMyDomain,
    setRememberMe,
    setAccount,
    setLoginStatus
} from "../modules/login";

const mapStateToProps = (state) => ({   
    isInstructionDisplayed: state.login.isInstructionDisplayed || "yes",
    domain: state.login.domain || "",
    username: state.login.username || "",
    password: state.login.password || "",
    isUsernameError: state.login.isUsernameError || false,
    isPasswordError: state.login.isPasswordError || false,
    showLoginLoader: state.login.showLoginLoader || false,
    loginStatus: state.login.loginStatus || false,
    account: state.login.account,
    showLoginForm: state.login.showLoginForm || "no",
    showWhatsMyDomain: state.login.showWhatsMyDomain || false,
    rememberMe: state.login.rememberMe || false,
    isInternetConnected: state.home.isInternetConnected || "yes",
});

const mapActionCreators = {
    setConnectionStatus,
    setDisplayInstruction,
    setDomain,
    setUsername,
    setPassword,
    setUsernameError,
    setPasswordError,
    login,
    setLoginForm,
    setWhatsMyDomain,
    setRememberMe,
    setAccount,
    setLoginStatus
};

export default connect(mapStateToProps, mapActionCreators)(Login);
