import React from "react";
import { Dimensions } from "react-native";
import { Text, Body, Left, Right, List, ListItem } from "native-base";
import RadioButton from 'react-native-radio-button';
const { width } = Dimensions.get("window");

var dateFormat = require('dateformat');
 
// Last 7 days
var currentDate = new Date();
var currentDateFormatted = dateFormat(currentDate, "mmm d");
var last7days = new Date(); 
last7days = new Date(last7days.setDate(last7days.getDate() - 7));
var last7daysFormatted = dateFormat(last7days, "mmm d");
    
// This week
var currentDate1 = new Date();
var day = currentDate1.getDay();        
var diff = currentDate1.getDate() - day + (day == 0 ? -6:1);
var thisWeekStart = new Date(currentDate1.setDate(diff));
var thisWeekEnd  = new Date(currentDate1.setDate(currentDate1.getDate() + 6)); 
var thisWeekStartFormatted = dateFormat(thisWeekStart, "mmm d");                
var thisWeekEndFormatted = dateFormat(thisWeekEnd, "mmm d");

// Last Week
var currentDate2 = new Date();
var lastWeekStart = new Date(currentDate2.setDate(diff));;
var lastWeekEnd = new Date(currentDate2.setDate(currentDate2.getDate() + 6));
lastWeekStart = new Date(lastWeekStart.setDate(lastWeekStart.getDate() - 7));
lastWeekEnd = new Date(lastWeekEnd.setDate(lastWeekEnd.getDate() - 7));
var lastWeekStartFormatted = dateFormat(lastWeekStart, "mmm d");
var lastWeekEndFormatted = dateFormat(lastWeekEnd, "mmm d");

export const WeekComponent = ({ selectedWeekFilter, setSelectedWeekFilter, setTempSelectedDate }) => {
    function handleSetSelectedWeek(value) {
        if (value == "last7days") {
            setTempSelectedDate({fromDate: last7days, toDate: currentDate});
        } else if (value == "thisWeek") {
            setTempSelectedDate({fromDate: thisWeekStart, toDate: thisWeekEnd});
        } else {
            setTempSelectedDate({fromDate: lastWeekStart, toDate: lastWeekEnd});
        }
        
        setSelectedWeekFilter(value);
    }

    return(
        <List style={{ width }}>
            <ListItem avatar>
                <Left>
                    <RadioButton
                        size={12}
                        innerColor={"#A62A7C"}
                        outerColor={"#A62A7C"}
                        isSelected={selectedWeekFilter.last7days}
                        onPress={() => handleSetSelectedWeek("last7days")}
                    />
                </Left>
                <Body>
                    <Text>Last 7 days</Text>  
                    <Text note>{currentDateFormatted + " - " + last7daysFormatted}</Text>
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
                        isSelected={selectedWeekFilter.thisWeek}
                        onPress={() => handleSetSelectedWeek("thisWeek")}
                    />
                </Left>
                <Body>
                    <Text>This Week</Text>
                    <Text note>{thisWeekEndFormatted + " - " + thisWeekStartFormatted}</Text>
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
                        isSelected={selectedWeekFilter.lastWeek}
                        onPress={() => handleSetSelectedWeek("lastWeek")}
                    />
                </Left>
                <Body>
                    <Text>Last Week</Text>
                    <Text note>{lastWeekEndFormatted + " - " + lastWeekStartFormatted}</Text>
                </Body>
                <Right></Right>
            </ListItem>
        </List>
    )
}

export default WeekComponent;