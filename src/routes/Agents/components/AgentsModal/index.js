import React from "react";
import { Text, View, Image, Modal } from 'react-native';
import { Content, Button, Header, Body, Left, Right, Icon, List, ListItem, Thumbnail } from "native-base";
import styles from "./AgentsModalStyles.js";

const available = require("../../../../assets/images/available3x.webp");
const loggedout = require("../../../../assets/images/loggedout3x.webp");
const meeting = require("../../../../assets/images/meeting3x.webp");
const onbreak = require("../../../../assets/images/onbreak3x.webp");
const outgoing = require("../../../../assets/images/outgoing-13x.webp");

export const AgentsModal = ({ domain, currentAgent, showAgentsModal, setAgentsModal, agentLiveStatistics, agentTimer }) => {
    function getAgentContainerStyle(value) {
        if (value == "On Break") {
            return styles.agentOnBreakContainer;
        } else if (value == "Available") {
            return styles.agentAvailableContainer;
        } else if (value == "Meeting") {
            return styles.agentMeetingContainer;
        } else if (value == "Outgoing") {
            return styles.agentOutgoingContainer;
        } else {
            return styles.agentloggedOutContainer;
        }
    }

    function getIcon(status) {
        if (status == "On Break") {
            return onbreak;
        } else if (status == "Available") {
            return available;
        } else if (status == "Meeting") {
            return meeting;
        } else if (status == "Outgoing") {
            return outgoing;
        } else {
            return loggedout;
        }
    }

    function convertToTime(totalSeconds) {
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        seconds = Math.round(seconds * 100) / 100

        var result = (hours > 0 ? (hours < 10 ? "0" + hours + "h " : hours + "h ") : "");
            result += (minutes < 10 ? "0" + minutes+"m " : minutes+"m ");
            result += (seconds  < 10 ? "0" + seconds+"s" : seconds+"s");
            
        return result;
    }

    return (
        <Modal
            presentationStyle={"fullScreen"}
            animationType="slide"
            transparent={false}
            visible={showAgentsModal} >
                <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                    <Left>
                        <Button transparent onPress={() => setAgentsModal(false)} >
                            <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu} /> 
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content bounces={false}> 
                    <View style={getAgentContainerStyle(currentAgent.liveInfo.status)}>
                        { currentAgent.photo &&
                            <Thumbnail source={{uri: "https://"+domain+"/storage/"+currentAgent.photo}} large style={{marginLeft: 20}} />
                            ||
                            <Image source={getIcon(currentAgent.liveInfo.status)} resize={"contain"} style={styles.profilePicture}/>
                        }
                        <View style={styles.agentDetailsContainer}>
                            <Text>{currentAgent.ccLogin + " | " + currentAgent.firstName + " " + currentAgent.lastName}</Text>
                            <Text note>{Object.keys(currentAgent.liveInfo).length > 0 ? currentAgent.liveInfo.status : "Logged out"}</Text>
                        </View>
                    </View>
                    <List>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Calls Answered Today</Text>
                            </Left>
                            <Right>
                                { agentLiveStatistics && 
                                    <Text style={styles.valueText}>{agentLiveStatistics[currentAgent.id].totalInboundCalls}</Text>
                                    ||
                                    <Text style={styles.valueText}>0</Text>
                                }
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Queue Calls Answered Today</Text>
                            </Left>
                            <Right>
                                { agentLiveStatistics && 
                                    <Text style={styles.valueText}>{agentLiveStatistics[currentAgent.id].totalQueueAnsweredCalls}</Text>
                                    ||
                                    <Text style={styles.valueText}>0</Text>
                                }
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>On Break</Text>
                            </Left>
                            <Right>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.onBreakText}>{convertToTime(currentAgent.liveInfo.status == "On Break" ? agentTimer : 0)}</Text>
                                </View>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>On Call</Text>
                            </Left>
                            <Right>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.callText}>{convertToTime(agentLiveStatistics ? agentLiveStatistics[currentAgent.id].totalInboundDuration : 0)}</Text>
                                </View>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Logged In</Text>
                            </Left>
                            <Right>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.loggedInText}>{convertToTime(currentAgent.liveInfo.status == "Available" || currentAgent.liveInfo.status == "Meeting" || currentAgent.liveInfo.status == "Outgoing" ? agentTimer : 0)}</Text>
                                </View>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
        </Modal>
    )
}

export default AgentsModal;