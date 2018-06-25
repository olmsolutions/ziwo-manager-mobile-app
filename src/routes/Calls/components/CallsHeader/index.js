import React from "react";
import { Text, View } from "react-native";
import { Header, Left, Body, Right, Drawer, Icon, Button } from "native-base";
import styles from "./CallsHeaderStyles";

export const CallsHeader = ({ callHistoryLength }) => {
    return (
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left style={{flex: 0}}>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon ios='md-menu' android='md-menu' style={styles.menu} /> 
                </Button>
            </Left>
            <Body>
                <View style={styles.headerBody}>
                    <Text><Text style={styles.headerText}>Calls </Text><Text style={styles.refreshText}>Currently Displayed: {callHistoryLength} of many</Text></Text>
                </View>
            </Body>
            <Right style={{flex: 0}}>
                <Icon ios='md-menu' android='md-menu' style={{color: "#A62A7C"}} />
            </Right>
        </Header>
    );
}

export default CallsHeader;