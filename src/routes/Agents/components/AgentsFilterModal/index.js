import React from "react";
import { Text, View, AsyncStorage, Modal } from 'react-native';
import { Content, Button, Header, Body, Left, Right, Icon, List, ListItem, Spinner } from "native-base";
import styles from "./AgentsFilterModalStyles.js";
import { Switch } from 'react-native-switch';

export const AgentsFilterModal = ({ agentsFilter, showAgentsFilterModal, setAgentsFilterModal, refreshAgentsList, agentsList }) => {
    function handleSwitchChange(value) {
        if (agentsFilter.includes(value) == true) {
            var i = agentsFilter.indexOf(value);
            if(i != -1) {
                agentsFilter.splice(i, 1);
            }
        } else {
            agentsFilter.push(value);
        }

        AsyncStorage.setItem('agentsFilter', JSON.stringify(agentsFilter));
        refreshAgentsList();
    }

    function handleRemoveStatus(val) {
        if (val) { 
            agentsFilter.push('Available','On Break','Meeting','Outgoing','Logged Out');
            AsyncStorage.setItem('agentsFilter', JSON.stringify(['Available','On Break','Meeting','Outgoing','Logged Out']));
        } else {
            agentsFilter.length = 0;
            AsyncStorage.setItem('agentsFilter', JSON.stringify(agentsFilter));
        }

        refreshAgentsList();
    }

    function handleBackPress() {
        setAgentsFilterModal(false);
    }

    return (
        <Modal
            presentationStyle={"fullScreen"}
            animationType="slide"
            transparent={false}
            visible={showAgentsFilterModal} >
                <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                    <Left>
                        <Button transparent onPress={() => handleBackPress()} >
                            <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu}/> 
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content bounces={false}> 
                    { agentsList &&
                    <View>
                        <View style={styles.switchContainer}>
                            <Text style={styles.resetText}>Select None/All</Text>
                            <Switch
                                backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                value={(agentsFilter.length > 0 ? true : false)} 
                                onValueChange={(val) => handleRemoveStatus(val)}/>
                        </View>
                        <List style={styles.listContainer}>
                            <ListItem>
                                <Left>
                                    <Text style={styles.availableText}>Available</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                        value={agentsFilter.includes("Available")} 
                                        onValueChange={() => handleSwitchChange("Available")}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.onBreakText}>On Break</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                        value={agentsFilter.includes("On Break")} 
                                        onValueChange={() => handleSwitchChange("On Break")}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.loggedOutText}>Logged Out</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                        value={agentsFilter.includes("Logged Out")} 
                                        onValueChange={() => handleSwitchChange("Logged Out")}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.meetingText}>Meeting</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                        value={agentsFilter.includes("Meeting")} 
                                        onValueChange={() => handleSwitchChange("Meeting")}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text style={styles.outgoingText}>Outgoing</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                                        value={agentsFilter.includes("Outgoing")} 
                                        onValueChange={() => handleSwitchChange("Outgoing")}
                                    />
                                </Right>
                            </ListItem>
                        </List>
                        </View>
                    ||
                    <Spinner style={{marginTop: 5}} color="#A62A7C" />
                    }
                </Content>
        </Modal>
    )
}

export default AgentsFilterModal;