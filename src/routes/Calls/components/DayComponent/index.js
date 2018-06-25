import React from "react";
import { Dimensions } from "react-native";
import { Text, Body, Left, Right, List, ListItem } from "native-base";
import RadioButton from 'react-native-radio-button';
const { width } = Dimensions.get("window");

var dateFormat = require('dateformat');

var today = new Date();
var todayFormatted = dateFormat(today, "dddd, mmmm d");

var yesterday = new Date();
yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
var yesterdayFormatted = dateFormat(yesterday, "dddd, mmmm d");

export const DayComponent = ({ selectedDayFilter, setSelectedDayFilter, setTempSelectedDate }) => {
    function handleSetSelectedDay(value) {
        if (value == "today") {
            setTempSelectedDate({fromDate: today, toDate: today});
        } else {
            setTempSelectedDate({fromDate: yesterday, toDate: yesterday});
        }
        
        setSelectedDayFilter(value);
    }

    return(
        <List style={{ width }}>
            <ListItem avatar>
                <Left>
                    <RadioButton
                        size={12}
                        innerColor={"#A62A7C"}
                        outerColor={"#A62A7C"}
                        isSelected={selectedDayFilter.today}
                        onPress={() => handleSetSelectedDay("today")}
                    />
                </Left>
                <Body>
                    <Text>Today</Text>  
                    <Text note>{todayFormatted}</Text>  
                </Body>
                <Right></Right>
            </ListItem>
            <ListItem avatar>
                <Left>
                    <RadioButton
                        size={12}
                        innerColor={"#A62A7C"}
                        outerColor={"#A62A7C"}
                        animation={'bounceIn'}
                        isSelected={selectedDayFilter.yesterday}
                        onPress={() => handleSetSelectedDay("yesterday")}
                    />
                </Left>
                <Body>
                    <Text>Yesterday</Text>
                    <Text note>{yesterdayFormatted}</Text>
                </Body>
                <Right></Right>
            </ListItem>
        </List>
    )
}

export default DayComponent;