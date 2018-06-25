import React from "react";
import { Image } from 'react-native';
import { Text, View, Content, Button, Header, Body, Left, Right, Icon, List, ListItem } from "native-base";
import Modal from 'react-native-modalbox';
import styles from "./QueuesModalStyles.js";

const queueIcon = require("../../../../assets/images/queue3x.webp");

export const QueuesModal = ({ currentQueue, showQueuesModal, setQueuesModal, currentCustomerWaiting, assignedAndAvailableAgents, totalCallsLandedInQueue }) => {    
    
    return (
        <Modal 
            style={[styles.modal, styles.modalContainer]} 
            position={"center"} 
            isOpen={showQueuesModal}
            swipeToClose={false}
            backdropPressToClose={false}
            coverScreen={true}
            keyboardShouldPersistTaps={'handled'}
            animationDuration={0} 
            >
                <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                    <Left>
                        <Button transparent onPress={() => setQueuesModal(false)} >
                            <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu} /> 
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content bounces={false}> 
                    <View style={styles.queueContainer}>
                        <Image source={queueIcon} resize={"contain"} style={styles.profilePicture}/>
                        <View style={styles.queueDetailsContainer}>
                            <Text>{currentQueue.name}</Text>
                            <Text note>{(currentQueue.hasOwnProperty('agents') ? Object.keys(currentQueue.agents).length : 0 ) + " agents | " + (currentQueue.hasOwnProperty('calls') ? Object.keys(data.calls).length : 0) + " calls"}</Text>
                        </View>
                    </View>
                    <List>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Current Customers Waiting</Text>
                            </Left>
                            <Right>
                                <Text style={styles.valueText}>{ currentCustomerWaiting ? currentCustomerWaiting[currentQueue.id] : 0 }</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Assigned Agents</Text>
                            </Left>
                            <Right>
                                <Text style={styles.valueText}>{ assignedAndAvailableAgents ? assignedAndAvailableAgents[currentQueue.id][0] : 0 }</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Available Assigned Agents</Text>
                            </Left>
                            <Right>
                                <Text style={styles.valueText}>{ assignedAndAvailableAgents ? assignedAndAvailableAgents[currentQueue.id][1] : 0 }</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.itemText}>Total Calls landed in Queue</Text>
                            </Left>
                            <Right>
                                <Text style={styles.valueText}>{ totalCallsLandedInQueue ? totalCallsLandedInQueue[currentQueue.id].totalQueueLandedCalls : 0 }</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
        </Modal>
    )
}

export default QueuesModal;