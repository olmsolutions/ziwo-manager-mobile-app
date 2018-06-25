import React from "react";
import { View, Image, FlatList } from "react-native";
import { ListItem, Left, Body, Right, Text } from 'native-base';
import styles from "./QueuesListStyles.js";

const queueIcon = require("../../../../assets/images/queue.webp");

export const QueuesList = ({ setCurrentQueue, setQueuesModal, queuesList, assignedAndAvailableAgents }) => {
    function handleQueue(queue) {
        setCurrentQueue(queue);
        setQueuesModal(true);
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={queuesList} 
                keyExtractor={(item, index) => index}
                renderItem={({item}) => 
                        <ListItem avatar onPress={() => handleQueue(item)} style={styles.listContainer}>
                            <Left>
                                <Image source={queueIcon} style={styles.queueIcon} resizeMode={"contain"}/>
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{(assignedAndAvailableAgents && assignedAndAvailableAgents[item.id] ? assignedAndAvailableAgents[item.id][1] : 0) + " agents | " + (item.hasOwnProperty('liveCalls') ? Object.keys(item.liveCalls).length : 0) + " calls"}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
                    }
                >
            </FlatList>         
        </View>
    );
}

export default QueuesList;