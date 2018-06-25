import React from "react";
import { AsyncStorage, FlatList } from 'react-native';
import { Text, Content, Button, Header, Body, Left, Right, Icon, ListItem } from "native-base";
import Modal from 'react-native-modalbox';
import styles from "./QueuesFilterModalStyles.js";
import { Switch } from 'react-native-switch';

export const QueuesFilterModal = ({ queuesFilter, setQueuesFilter, showQueuesFilterModal, setQueuesFilterModal, queuesFilterList }) => {
    function handleSwitchChange(value) {
        if (queuesFilter.includes(value) == true) {
            var i = queuesFilter.indexOf(value);
            if(i != -1) {
                queuesFilter.splice(i, 1);
            }
        } else {
            queuesFilter.push(value);
        }

        setQueuesFilter(queuesFilter);
        AsyncStorage.setItem('queuesFilter', JSON.stringify(queuesFilter));
    }

    function handleBackPress() {
        setQueuesFilterModal(false);
    }

    return (
        <Modal 
            style={[styles.modal, styles.modalContainer]} 
            position={"center"} 
            isOpen={showQueuesFilterModal}
            swipeToClose={false}
            backdropPressToClose={false}
            coverScreen={true}
            keyboardShouldPersistTaps={'handled'}
            animationDuration={0} 
            >
                <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                    <Left>
                        <Button transparent onPress={() => handleBackPress()} >
                            <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu} /> 
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content bounces={false}> 
                    <FlatList style={styles.listContainer}
                        data={queuesFilterList} 
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => 
                            <ListItem>
                                <Left>
                                    <Text>{item.name}</Text>
                                </Left>
                                <Right>
                                    <Switch 
                                        circleSize={20} circleBorderWidth={0} activeText={''} inActiveText={''} backgroundActive={'#CF8CB3'} backgroundInactive={'#CFCFCF'} circleActiveColor={'#ad3278'} circleInActiveColor={'#F5F5F5'}
                                        value={!queuesFilter.includes(item.name)} 
                                        onValueChange={(val) => handleSwitchChange(item.name)}
                                    />
                                </Right>
                            </ListItem>
                        }
                        >
                    </FlatList>        
                </Content>
        </Modal>
    )
}

export default QueuesFilterModal;