import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Icon } from "native-base";
import styles from "./QueuesHeaderStyles";

export const QueuesHeader = ({ setQueuesFilterModal }) => {
    return (
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left>
                <TouchableOpacity transparent onPress={() => this.openDrawer()} style={{paddingRight: 30}}>
                    <Icon ios='md-menu' android='md-menu' style={styles.menu} /> 
                </TouchableOpacity>
            </Left>
            <Body>
                <Text style={styles.headerText}>Queues</Text>
            </Body>
            <Right>
                <TouchableOpacity transparent onPress={() => setQueuesFilterModal(true)} style={{paddingLeft: 30}}>
                    <Icon ios='md-settings' android='md-settings' style={styles.menu} /> 
                </TouchableOpacity>
            </Right>
        </Header>
    );
}

export default QueuesHeader;