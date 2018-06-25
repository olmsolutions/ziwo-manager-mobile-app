import React from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from "react-native";
import { Item, Input, Icon, Spinner } from 'native-base';
import WhatsMyDomainModal from "../WhatsMyDomainModal";
import OfflineSignComponent from "../../../../components/OfflineSignComponent";
import CheckBox from 'react-native-check-box';
import styles from "./LoginFormStyles.js";

export const LoginForm = ({ isInternetConnected, aswatLogo, loginBackground, domainUrl, setDomain, setUsername, setPassword, domain, username, password, login, showLoginLoader, showLoginForm, setLoginForm, showWhatsMyDomain, setWhatsMyDomain, rememberMe, setRememberMe, setDisplayInstruction }) => {
    
    function handleSetLoginFormButton(value) {
        if (value == "yes") {
            setDomain(domain + "-api.aswat.co");
        } else {
            setDomain(domain.replace("-api.aswat.co", ""));
        }
        
        setLoginForm(value);
    }

    function handleDomainInput(value) {
        setDomain(value);
    }

    function handleUsernameInput(value) {
        setUsername(value);
    }

    function handlePasswordInput(value) {
        setPassword(value);
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.loginFormContainer}>
            { (isInternetConnected == "no") && 
                <OfflineSignComponent />
            }
            <ImageBackground style={styles.imageBackground} source={loginBackground}>
                <Image source={aswatLogo} style={styles.aswatLogo} resizeMode={"contain"} />
                    { (showLoginForm == "no") && 
                        <View style={styles.formBoxContainer}>       
                            <View style={styles.domainContainer}>            
                                <Text><Text style={styles.formText}>Enter your </Text><Text style={{color:"#A62A7C"}}>ZIWO </Text><Text style={styles.formText}>domain</Text></Text>
                                <Item last> 
                                    <Input 
                                        placeholder="yourdomain" 
                                        placeholderTextColor={"#A62A7C"} 
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={false}
                                        style={styles.inputText}
                                        onChangeText={handleDomainInput.bind(this)}
                                        value={domain} />
                                </Item>
                                <TouchableOpacity style={styles.myDomainsButton} 
                                                    onPress={() => setWhatsMyDomain(true)}>
                                    <Text style={styles.myDomainsText}>What's my domain?</Text>
                                </TouchableOpacity> 
                                <View style={styles.backButtonContainer}>
                                    <TouchableOpacity 
                                        style={styles.backButton}
                                        onPress={() => setDisplayInstruction("yes")}>
                                        <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color: "#A62A7C"}} />
                                    </TouchableOpacity>   
                                </View>
                            </View>                
                            <TouchableOpacity 
                                style={styles.domainButton}
                                onPress={() => handleSetLoginFormButton("yes")}>
                                <Icon ios='md-arrow-forward' android="md-arrow-forward" style={{color: "#fff"}} />
                            </TouchableOpacity>  
                        </View>
                        ||
                        <View style={styles.formBoxContainer}>
                            <View style={styles.loginContainer}>
                                <Item> 
                                    <Input 
                                        disabled={(showLoginLoader ? true : false)}
                                        value={username}
                                        placeholder="Email" 
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoFocus={true}
                                        underlineColorAndroid='transparent'
                                        style={styles.loginText}
                                        onChangeText={handleUsernameInput.bind(this)}
                                        returnKeyType="next"
                                        onSubmitEditing={(event) => this._passwordInput._root.focus()} />
                                </Item>               
                                <Item last>
                                    <Input 
                                        disabled={(showLoginLoader ? true : false)}
                                        placeholder="Password" 
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        underlineColorAndroid='transparent'
                                        style={styles.loginText}
                                        onChangeText={handlePasswordInput.bind(this)}
                                        value={password}
                                        secureTextEntry
                                        returnKeyType="go"
                                        ref={(input) => this._passwordInput = input}/>
                                </Item>   
                                <Item style={{borderBottomWidth: 0}}>
                                    <CheckBox
                                        disabled={(showLoginLoader ? true : false)}
                                        style={{flex: 1, paddingTop: 15}}
                                        checkBoxColor={"#7F807F"}
                                        onClick={()=>setRememberMe(!rememberMe)}
                                        isChecked={rememberMe}
                                        rightText={"Remember me"}
                                    />
                                </Item>
                                <View style={styles.backButtonContainer}>
                                    <TouchableOpacity 
                                        disabled={(showLoginLoader ? true : false)}
                                        style={styles.backButton}
                                        onPress={() => handleSetLoginFormButton("no")}>
                                        <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color: "#A62A7C"}} />
                                    </TouchableOpacity>   
                                </View>      
                            </View>
                            <TouchableOpacity 
                                disabled={(showLoginLoader ? true : false)}
                                style={styles.loginButton}
                                onPress={() => login()}>
                                {showLoginLoader &&
                                    <Spinner color='#fff'/>
                                    ||
                                    <Icon ios='md-arrow-forward' android="md-arrow-forward" style={{color: "#fff"}} />
                                }
                            </TouchableOpacity>
                        </View>
                    }
                </ImageBackground>
            <WhatsMyDomainModal showWhatsMyDomain={showWhatsMyDomain}
                                setWhatsMyDomain={setWhatsMyDomain}
                                domainUrl={domainUrl} />
        </KeyboardAvoidingView>
    );     
}

export default LoginForm;