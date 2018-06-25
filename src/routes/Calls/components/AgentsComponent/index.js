import React from "react";
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon, ListItem, Item, Input, Spinner } from "native-base";
import styles from "./AgentsComponentStyles.js";
import CheckBox from 'react-native-check-box';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { Switch } from 'react-native-switch';

export const AgentsComponent = ({ agentsList, setSelectedAgents, selectedAgents, isAgentListLoading, setSearchAgentTerm, searchAgentTerm }) => {
    function handleAddAgent(value) {
        if (selectedAgents.includes(value) == true) {
            var i = selectedAgents.indexOf(value);
            if(i != -1) {
                selectedAgents.splice(i, 1);
            }
        } else {
            selectedAgents.push(value);
        }

        setSelectedAgents([]);
        setSelectedAgents(selectedAgents);
    }

    function handleRemoveAgents(val) {
        setSelectedAgents([]);

        if (val) {
            for (i = 0; i < agentsList.length; i++) { 
                selectedAgents.push(agentsList[i].id);
            }
            setSelectedAgents(selectedAgents);
        }
    }

    function handleInput(value) {
        setSearchAgentTerm(value);
    }

    function handleRemoveText() {
        setSearchAgentTerm("");
    }

    return(
        <View style={styles.container}>
            {isAgentListLoading &&
                <Spinner color={"#A62A7C"} />
            ||
                <View>
                    <View style={styles.searchContainer}>
                        <Item>
                            <Icon active name='ios-search' />
                            <Input 
                                style={styles.searchText}
                                placeholder='Search by agent name or ID...'
                                onChangeText={handleInput.bind(this)}
                                value={searchAgentTerm}
                                autoFocus={true} />
                            { searchAgentTerm != "" &&
                                <TouchableOpacity onPress={() => handleRemoveText()}>
                                    <Icon active name='md-close' />
                                </TouchableOpacity>
                            }
                        </Item>
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.resetText}>Select None/All</Text>
                        <Switch 
                            backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true}
                            value={(selectedAgents.length > 0 ? true : false)} 
                            onValueChange={(val) => handleRemoveAgents(val)}/>
                    </View>
                    { agentsList &&
                        <OptimizedFlatList
                            data={agentsList.filter(item => item.ccLogin.includes(searchAgentTerm) || item.firstName.toLowerCase().includes(searchAgentTerm.toLowerCase()) || item.lastName.toLowerCase().includes(searchAgentTerm.toLowerCase()))}
                            removeClippedSubviews={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => 
                                <ListItem avatar style={styles.listContainer}>
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.agentsText}>{item.ccLogin + " | " + item.firstName + " " + item.lastName}</Text>
                                        <CheckBox
                                            style={{paddingHorizontal: 5}}
                                            onClick={()=>handleAddAgent(item.id)}
                                            isChecked={selectedAgents.includes(item.id)}
                                            checkBoxColor={"#6FCC49"} />
                                    </View>
                                </ListItem>
                            }                
                        />
                    }
                </View>
            }
        </View>
    )
}

export default AgentsComponent;