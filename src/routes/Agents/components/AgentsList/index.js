import React from "react";
import { View, Image } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import styles from "./AgentsListStyles.js";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

const available = require("../../../../assets/images/available.webp");
const loggedout = require("../../../../assets/images/loggedout.webp");
const meeting = require("../../../../assets/images/meeting.webp");
const onbreak = require("../../../../assets/images/onbreak.webp");
const outgoing = require("../../../../assets/images/outgoing-1.webp");

export const AgentsList = ({ domain, setCurrentAgent, setAgentsModal, agentsList }) => {
    function getListStyle(value) {
        if (value == "On Break") {
            return styles.onBreakContainer;
        } else if (value == "Available") {
            return styles.availableContainer;
        } else if (value == "Meeting") {
            return styles.meetingContainer;
        } else if (value == "Outgoing") {
            return styles.outgoingContainer;
        } else {
            return styles.loggedOutContainer;
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

    function handleAgent(agent) {
        if (Object.keys(agent.liveInfo).length > 0) {
            setCurrentAgent(agent);
            setAgentsModal(true);
        } else {
            return true;
        }
    }

    return (
        <View style={{flex: 1}}>
            <OptimizedFlatList
                data={agentsList} 
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                renderItem={({item}) => 
                        <ListItem avatar onPress={() => handleAgent(item)} style={getListStyle(item.liveInfo.status)}>
                            <Left>
                                { item.photo &&
                                    <Thumbnail small source={{uri: "https://"+domain+"/storage/"+item.photo}} />
                                    ||
                                    <Image source={getIcon(item.liveInfo.status)} style={styles.agentIcon} resizeMode={"contain"} />
                                }
                            </Left>
                            <Body>
                                <Text>{item.ccLogin + " | " + item.firstName + " " + item.lastName}</Text>
                                <Text note>{Object.keys(item.liveInfo).length > 0 ? item.liveInfo.status : "Logged out"}</Text>
                            </Body>
                            <Right style={{justifyContent: "center"}}>
                                <Icon name="ios-arrow-forward" style={styles.rightIcon}/>
                            </Right>
                        </ListItem>
                    }
                >
            </OptimizedFlatList>         
        </View>
    );
}

export default AgentsList;