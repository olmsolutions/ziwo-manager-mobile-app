import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Icon } from "native-base";
import styles from "./HeaderComponentStyles";

export const HeaderComponent = ({title}) => {
    return (
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left>
                <TouchableOpacity transparent onPress={() => this.openDrawer()}>
                    <Icon ios='md-menu' android='md-menu' style={styles.menu} /> 
                </TouchableOpacity>
            </Left>
            <Body>
                <Text style={styles.headerText}>{title}</Text>
            </Body>
            <Right>
            </Right>
        </Header>
    );
}

export default HeaderComponent;