import React from "react";
import { TouchableOpacity } from 'react-native';
import { View, Icon, Item, Input } from "native-base";
import styles from "./CallerCalledComponentStyles.js";

export const CallerCalledComponent = ({ setTempContactNumber, tempContactNumber }) => {
    function handleInput(value) {
        setTempContactNumber(value);
    }

    function handleRemoveText() {
        setTempContactNumber("");
    }

    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Item>
                    <Icon active name='ios-search' />
                    <Input 
                        style={styles.searchText}
                        placeholder={"Search for country code (971) or phone number..."}
                        onChangeText={handleInput.bind(this)}
                        value={tempContactNumber}
                        autoFocus={true} />                
                    { tempContactNumber != "" &&
                        <TouchableOpacity onPress={() => handleRemoveText()}>
                            <Icon active name='md-close' />
                        </TouchableOpacity>
                    }
                </Item>
            </View>
        </View>
    )
}

export default CallerCalledComponent;