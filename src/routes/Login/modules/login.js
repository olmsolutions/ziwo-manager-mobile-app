import update from "react-addons-update";
import constants from "./actionConstants";
import request from "../../../util/request";
import { Alert, AsyncStorage } from "react-native";

//--------------------
//Constants
//--------------------
const { 
    SET_DISPLAY_INSTRUCTIONS,
    SET_DOMAIN,
    SET_USERNAME,
    SET_PASSWORD,
    SET_USERNAME_ERROR,
    SET_PASSWORD_ERROR,
    SET_LOGIN_LOADER,
    SET_LOGIN_STATUS,
    SET_ACCOUNT,
    SET_LOGIN_FORM,
    SET_WHATS_MY_DOMAIN,
    SET_REMEMBER_ME,
    CONNECTION_STATUS
} = constants;

//--------------------
//Actions
//--------------------
export function setAccount(payload) {
    return {
        type: SET_ACCOUNT,
        payload
    }
}

export function setLoginStatus(payload) {
    return {
        type: SET_LOGIN_STATUS,
        payload
    }
}

export function setDisplayInstruction(payload) {
    return {
        type: SET_DISPLAY_INSTRUCTIONS,
        payload
    }
}

export function setRememberMe(payload) {
    return {
        type: SET_REMEMBER_ME,
        payload
    }
}

export function setDomain(payload) {
    return {
        type: SET_DOMAIN,
        payload
    }
}

export function setUsername(payload) {
    return {
        type: SET_USERNAME,
        payload
    }
}

export function setUsernameError(payload) {
    return {
        type: SET_USERNAME_ERROR,
        payload
    }
}

export function setPassword(payload) {
    return {
        type: SET_PASSWORD,
        payload
    }
}

export function setPasswordError(payload) {
    return {
        type: SET_PASSWORD_ERROR,
        payload
    }
}

export function setLoginForm(payload) {
    return {
        type: SET_LOGIN_FORM,
        payload
    }
}

export function setWhatsMyDomain(payload) {
    return {
        type: SET_WHATS_MY_DOMAIN,
        payload
    }
}

export function login(payload) {
	return (dispatch, store) => {
        if(store().login.isInternetConnected == "yes") {
            if (store().login.rememberMe) {
                var data = {domain: store().login.domain,
                            username: store().login.username,
                            password: store().login.password};
                AsyncStorage.setItem('rememberedAccount', JSON.stringify(data));
            }
            
            var CryptoJS = require("crypto-js");
            var hash = CryptoJS.HmacSHA256(store().login.username + store().login.password, store().login.password);
            var encryptedPassword = hash.toString(CryptoJS.enc.Base64);

            const payload = {
                username: store().login.username,
                password: encryptedPassword,
                type: "user",
                remember: "true"
            };

            dispatch({
                type: SET_LOGIN_LOADER,
                payload: true
            });
            
            request.post("https://"+store().login.domain+"/auth/login")
            .send(payload)
            .finish((error, res)=>{
                dispatch({
                    type: SET_LOGIN_LOADER,
                    payload: false
                });

                if (error) {
                    Alert.alert('Oops!', "Sorry, an error occured.");
                } else {
                    if (res.body.result == true) {
                        dispatch({
                            type: SET_ACCOUNT,
                            payload: res.body.content
                        });

                        dispatch({
                            type: SET_LOGIN_STATUS,
                            payload: true
                        }); 

                        if (store().login.rememberMe) {                            
                            AsyncStorage.setItem('currentAccount', JSON.stringify(res.body.content));
                        }
                    } else {
                        Alert.alert('Error', res.body.error.message);
                    }
                }
            });
        } else {
            Alert.alert('Error', "Please connect to the internet");
        }
	}
}

export function setConnectionStatus(payload) {
	return {
		type: CONNECTION_STATUS,
		payload
	}
}

//--------------------
//Action Handlers
//--------------------
function handleConnectionStatus(state, action) {
	return update(state, {
		isInternetConnected:{
			$set:action.payload
		}
	});
}

function handleSetDisplayInstruction(state, action) {
	return update(state, {
		isInstructionDisplayed:{
			$set:action.payload
		}
	});
}

function handleSetDomain(state, action) {
    return update(state, {
		domain:{
			$set:action.payload
		}
	});
}

function handleSetUsername(state, action) {
    return update(state, {
		username:{
			$set:action.payload
        },
        isUsernameError:{
			$set:false
		}
	});
}

function handleSetUsernameError(state, action) {
    return update(state, {
		isUsernameError:{
			$set:action.payload
		}
	});
}

function handleSetPassword(state, action) {
    return update(state, {
		password:{
			$set:action.payload
		},
        isPasswordError:{
			$set:false
		}
	});
}

function handleSetPasswordError(state, action) {
    return update(state, {
	    isPasswordError:{
			$set:action.payload
		}
	});
}

function handleSetLoginLoader(state, action) {
    return update(state, {
	    showLoginLoader:{
			$set:action.payload
		}
	});
}

function handleSetLoginStatus(state, action) {
    return update(state, {
	    loginStatus:{
			$set:action.payload
		}
	});
}

function handleSetAccount(state, action) {
    return update(state, {
	    account:{
			$set:action.payload
		}
	});
}

function handleSetLoginForm(state, action) {
    return update(state, {
	    showLoginForm:{
			$set:action.payload
		}
	});
}

function handleSetWhatsMyDomain(state, action) {
    return update(state, {
	    showWhatsMyDomain:{
			$set:action.payload
		}
	});
}

function handleSetRememberMe(state, action) {
    return update(state, {
	    rememberMe:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
    CONNECTION_STATUS: handleConnectionStatus,
    SET_DISPLAY_INSTRUCTIONS: handleSetDisplayInstruction,
    SET_DOMAIN: handleSetDomain,
    SET_USERNAME: handleSetUsername,
    SET_PASSWORD: handleSetPassword,
    SET_LOGIN_LOADER: handleSetLoginLoader,
    SET_LOGIN_STATUS: handleSetLoginStatus,
    SET_ACCOUNT: handleSetAccount,
    SET_LOGIN_FORM: handleSetLoginForm,
    SET_WHATS_MY_DOMAIN: handleSetWhatsMyDomain,
    SET_REMEMBER_ME: handleSetRememberMe
}

const initialState = {
    isInternetConnected: "yes",
    isInstructionDisplayed: "yes",
    domain: "",
    username: "",
    password: "",
    isUsernameError: false,
    isPasswordError: false,
    showLoginLoader: false,
    loginStatus: false,
    showLoginForm: "no",
    showWhatsMyDomain: false
};

export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}