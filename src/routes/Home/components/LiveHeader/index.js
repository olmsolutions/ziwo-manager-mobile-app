import React from "react";
import { View, Text } from "react-native";
import { Header, Icon, Button, Left, Body, Right } from "native-base";
import styles from "./LiveHeaderStyles";

export const LiveHeader = ({title, setSettingsModal, lastRefresh}) => {
    showSettingsModal = () => {
        setSettingsModal(true);
    };
    
    return (
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left style={{flex: 0}}>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon ios='md-menu' android='md-menu' style={styles.menuLeft} /> 
                </Button>
            </Left>
            <Body>
                <View style={styles.headerBody}>
                    <Text><Text style={styles.headerText}>{title} </Text><Text style={styles.refreshText}>{lastRefresh != "" ? "from " + lastRefresh : "" }</Text></Text>
                </View>
            </Body>
            <Right style={{flex: 0}}>
                <Button transparent onPress={() => showSettingsModal()}>
                    <Icon ios='md-settings' android='md-settings' style={styles.menuRight} /> 
                </Button>     
            </Right>
        </Header>
    );
}

export default LiveHeader;