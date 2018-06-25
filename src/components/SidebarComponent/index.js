import React from "react";
import { Text, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Content, Thumbnail } from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./SidebarComponentStyles";

const defaultProfilePicture = require("../../assets/images/blank-profile-picture.webp");
const liveActive = require("../../assets/images/live-active.webp");
const liveInactive = require("../../assets/images/live-inactive.webp");
const callsActive = require("../../assets/images/calls-active.webp");
const callsInactive = require("../../assets/images/calls-inactive.webp");
const agentsActive = require("../../assets/images/agents-active.webp");
const agentsInactive = require("../../assets/images/agents-inactive.webp");
const logoutInactive = require("../../assets/images/logout-inactive.webp");

export const SideBar = ({ socket, domain, firstName, lastName, username, profilePicture, setLogout, currentPage, trackTimer, AudioPlayer, setCurrentCall, currentCall, timer, setAgentTimer }) => {
    
    function handlePressedButton(value) {
        if (currentPage == value) {
            this.closeDrawer();
        } else {
            if (Object.keys(socket).length != 0) {
                socket.disconnect();
            }
    
            if (currentPage == "calls") {
                if (currentCall != null) {
                    setCurrentCall(null);
                }
                
                if (trackTimer != null) {
                    clearInterval(trackTimer);
                }
    
                AudioPlayer.pause();
            }
    
            if (currentPage == "agents") {
                clearInterval(timer);
                setAgentTimer(0);
            }
    
            if (value == "home") {
                Actions.home();
            } else if (value == "calls") {
                Actions.calls();
            } else if (value == "agents") {
                Actions.agents();
            } else if (value == "queues") {
                Actions.queues();
            } else if (value == "logout") {
                AsyncStorage.setItem('currentAccount', "");
                AsyncStorage.setItem('agentsFilter', "");
                AsyncStorage.setItem('queuesFilter', "");
                setLogout(true);
            }
        }
    }
    
    return (
        <Container>
            <Content bounces={false} style={styles.sidebarContainer}>
                <View style={styles.userDetailsContainer}>
                    <View style={styles.thumbnailContainer}>
                        { profilePicture == "" &&
                            <Thumbnail source={defaultProfilePicture} />
                            ||
                            <Thumbnail source={{uri: profilePicture}} />
                        }
                    </View>
                    <View style={styles.accountContainer}>
                        <Text style={styles.userText}>{firstName + " " + lastName}</Text>
                        <Text style={styles.emailText}>{username}</Text>
                    </View>
                </View>
                <View style={styles.navigationContainer}>
                    <View style={styles.navigationRow}>
                        <TouchableOpacity style={currentPage == "home" ? styles.activeNavigationImageContainer : styles.inactiveNavigationImageContainer} onPress={() => handlePressedButton("home")}>
                            <Image source={currentPage == "home" ? liveActive : liveInactive} style={styles.navigationImage} resizeMode={"contain"} />
                            <Text style={currentPage == "home" ? styles.activeNavigationText : styles.inactiveNavigationText}>Live KPIs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={currentPage == "calls" ? styles.activeNavigationImageContainer : styles.inactiveNavigationImageContainer} onPress={() => handlePressedButton("calls")}>
                            <Image source={currentPage == "calls" ? callsActive : callsInactive} style={styles.navigationImage} resizeMode={"contain"} />
                            <Text style={currentPage == "calls" ? styles.activeNavigationText : styles.inactiveNavigationText}>Calls</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
                <View style={styles.navigationContainer}>
                    <View style={styles.navigationRow}>
                        <TouchableOpacity style={currentPage == "agents" ? styles.activeNavigationImageContainer : styles.inactiveNavigationImageContainer} onPress={() => handlePressedButton("agents")}>
                            <Image source={currentPage == "agents" ? agentsActive : agentsInactive} style={styles.navigationImage} resizeMode={"contain"} />
                            <Text style={currentPage == "agents" ? styles.activeNavigationText : styles.inactiveNavigationText}>Agents</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inactiveNavigationImageContainer} onPress={() => handlePressedButton("logout")}>
                            <Image source={logoutInactive} style={styles.navigationImage} resizeMode={"contain"} />
                            <Text style={styles.inactiveNavigationText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Content>
            <Text style={styles.domainText}><Text>Connected to </Text><Text style={styles.domainTextInner}>{domain.replace("-api", "")}</Text></Text>
            <Text style={styles.versionText}>Ziwo Manager v 1.0.0.0</Text>
        </Container>
    );
}

export default SideBar;