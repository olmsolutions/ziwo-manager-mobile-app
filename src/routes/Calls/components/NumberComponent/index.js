import React from "react";
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon, ListItem, Item, Input, Spinner } from "native-base";
import styles from "./NumberComponentStyles.js";
import CheckBox from 'react-native-check-box';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { Switch } from 'react-native-switch';

export const NumberComponent = ({ numbersList, setSelectedNumbers, selectedNumbers, isNumberListLoading, setSearchNumberTerm, searchNumberTerm }) => {
    function handleAddNumbers(value) {
        if (selectedNumbers.includes(value) == true) {
            var i = selectedNumbers.indexOf(value);
            if(i != -1) {
                selectedNumbers.splice(i, 1);
            }
        } else {
            selectedNumbers.push(value);
        }

        setSelectedNumbers([]);
        setSelectedNumbers(selectedNumbers);
    }
    
    function handleRemoveNumbers(val) {
        setSelectedNumbers([]);

        if (val) {
            for (i = 0; i < numbersList.length; i++) { 
                selectedNumbers.push(numbersList[i].id);
            }
            setSelectedNumbers(selectedNumbers);
        } 
    }

    function handleInput(value) {
        setSearchNumberTerm(value);
    }

    function handleRemoveText() {
        setSearchNumberTerm("");
    }

    return(
        <View style={styles.container}>
            { isNumberListLoading &&
                <Spinner color={"#A62A7C"} />
                ||
                <View>
                    <View style={styles.searchContainer}>
                        <Item>
                            <Icon active name='ios-search' />
                            <Input 
                                style={styles.searchText}
                                placeholder='Search...'
                                onChangeText={handleInput.bind(this)}
                                value={searchNumberTerm}
                                autoFocus={true} />
                            { searchNumberTerm != "" &&
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
                            value={(selectedNumbers.length > 0 ? true : false)} 
                            onValueChange={(val) => handleRemoveNumbers(val)}/>
                    </View>
                    { numbersList &&
                        <OptimizedFlatList
                            data={numbersList.filter(item => item.did.includes(searchNumberTerm) || item.didCalled.includes(searchNumberTerm))}
                            keyExtractor={(item, index) => index.toString()}
                            removeClippedSubviews={true}
                            renderItem={({item}) => 
                                <ListItem avatar style={styles.listContainer}>
                                    <View style={styles.listItemContainer}>
                                        <View style={{flex: 1, flexDirection: "column"}}>
                                            <Text style={styles.numbersText}>{item.did}</Text>
                                            <Text note>{"Caller ID: " + item.didCalled}</Text>
                                        </View>
                                        <CheckBox
                                            style={{paddingHorizontal: 5}}
                                            onClick={()=>handleAddNumbers(item.id)}
                                            isChecked={selectedNumbers.includes(item.id)}
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

export default NumberComponent;