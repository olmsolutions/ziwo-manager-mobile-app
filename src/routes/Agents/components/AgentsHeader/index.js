import React from "react";
import { Text } from "react-native";
import { Header, Left, Body, Right, Icon, Button } from "native-base";
import styles from "./AgentsHeaderStyles";

export const AgentsHeader = ({ setAgentsFilterModal }) => {
    return (
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon ios='md-menu' android='md-menu' style={styles.menuLeft} /> 
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Agents</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => setAgentsFilterModal(true)}>
                    <Icon ios='md-settings' android='md-settings' style={styles.menuRight} /> 
                </Button>
            </Right>
        </Header>
    );
}

export default AgentsHeader;