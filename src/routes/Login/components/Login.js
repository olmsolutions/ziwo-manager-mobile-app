import React from "react";
import {View, AsyncStorage, Platform, BackHandler, NetInfo} from "react-native";
import Instructions from "./Instructions";
import { Container, Content } from "native-base";
import { Actions } from "react-native-router-flux";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";

const ziwoMan = require("../../../assets/images/ziwo-man.webp");
const screen2 = require("../../../assets/images/launch-screen-2.webp");
const screen3 = require("../../../assets/images/launch-screen-3.webp");
const screen4 = require("../../../assets/images/launch-screen-4.webp");
const screen5 = require("../../../assets/images/launch-screen-5.webp");
const screen6 = require("../../../assets/images/launch-screen-6.webp");
const screen7 = require("../../../assets/images/launch-screen-7.webp");
const screen8 = require("../../../assets/images/launch-screen-8.webp");
const headsetIcon = require("../../../assets/images/headset-icon.png");
const dateRangeIcon = require("../../../assets/images/ic_date_range_white_3x.png");
const agentIcon = require("../../../assets/images/agent-icon-white.png");
const domainUrl = require("../../../assets/images/domain-url.webp");
const loginBackground = require("../../../assets/images/login-background.webp");
const aswatLogo = require("../../../assets/images/aswat-logo.webp");

class Login extends React.Component {
    componentDidMount() {
        console.disableYellowBox = true;
        Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        
        AsyncStorage.getItem('rememberedAccount', (err, result) => {
            var account = JSON.parse(result);
            if (result) {
                this.props.setDomain(account.domain.replace("-api.aswat.co", ""));
                this.props.setUsername(account.username);
                this.props.setPassword(account.password);
                this.props.setRememberMe(true);
            }
        });
        
        AsyncStorage.getItem('currentAccount', (err, result) => {
            var account = JSON.parse(result);
            if (result) {
                this.props.setDisplayInstruction("no");                
                this.props.setAccount(account);
                this.props.setDomain(this.props.domain + "-api.aswat.co");
                this.props.setLoginStatus(true);
            }
        });
    }

    componentWillUnmount() {
        Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate() {
        if (this.props.loginStatus) {
            Actions.home();
        }
    }

    handleBackButton() {
        return true;
    }

    handleConnectivityChange = isConnected => { 
        if (isConnected) {
            this.props.setConnectionStatus("yes");
        } else {
            this.props.setConnectionStatus("no");
        }
    };

    render() {
        return (
            <Container>
                <Content bounces={false} scrollEnabled={false} >
                    {(this.props.isInstructionDisplayed == "yes") &&
                        <View style={{flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#A62A7C'}}>
                            <Instructions ziwoMan={ziwoMan}
                                            screen2={screen2}
                                            screen3={screen3}
                                            screen4={screen4}
                                            screen5={screen5}
                                            screen6={screen6}
                                            screen7={screen7}
                                            screen8={screen8}
                                            headsetIcon={headsetIcon}
                                            dateRangeIcon={dateRangeIcon}
                                            agentIcon={agentIcon} /> 
                            <LoginButton setDisplayInstruction={this.props.setDisplayInstruction} />
                        </View>
                        ||
                        <LoginForm 
                            isInternetConnected={this.props.isInternetConnected}
                            aswatLogo={aswatLogo}
                            loginBackground={loginBackground}
                            domainUrl={domainUrl}
                            setDomain={this.props.setDomain}
                            setUsername={this.props.setUsername}
                            setPassword={this.props.setPassword}
                            domain={this.props.domain}
                            username={this.props.username}
                            password={this.props.password}
                            login={this.props.login} 
                            showLoginLoader={this.props.showLoginLoader}
                            showLoginForm={this.props.showLoginForm}
                            setLoginForm={this.props.setLoginForm}
                            showWhatsMyDomain={this.props.showWhatsMyDomain}
                            setWhatsMyDomain={this.props.setWhatsMyDomain}
                            rememberMe={this.props.rememberMe}
                            setRememberMe={this.props.setRememberMe}
                            setDisplayInstruction={this.props.setDisplayInstruction}
                        />
                    }
                </Content>
            </Container>
        );
    }
}

export default Login;