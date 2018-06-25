import React from "react";
import { Dimensions } from "react-native";
import { Text, Body, Left, Right, List, ListItem } from "native-base";
import RadioButton from 'react-native-radio-button';
const { width } = Dimensions.get("window");

var dateFormat = require('dateformat');  

// Last 30 days
var currentDate = new Date(); 
var currentDay = new Date();
var currentDayFormatted = dateFormat(currentDate, "mmm d");
var last30days = new Date(currentDate.setDate(currentDate.getDate() - 30));
var last30daysFormatted = dateFormat(last30days, "mmm d");
    
// This Month
var currentDate1 = new Date(); 
var thisMonthStart = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), 1);
var thisMonthEnd = new Date(currentDate1.getFullYear(), currentDate1.getMonth() + 1, 0);
var thisMonthStartFormatted = dateFormat(thisMonthStart, "mmm d");
var thisMonthEndFormatted = dateFormat(thisMonthEnd, "mmm d");

// Last Month
var currentDate2 = new Date(); 
var lastMonthStart = new Date(currentDate2.getFullYear() - (currentDate2.getMonth() > 0 ? 0 : 1), (currentDate2.getMonth() - 1 + 12) % 12, 1);
var lastMonthEnd = new Date(currentDate2.getFullYear(), currentDate2.getMonth(), 0);
var lastMonthStartFormatted = dateFormat(lastMonthStart, "mmm d");
var lastMonthEndFormatted = dateFormat(lastMonthEnd, "mmm d");

export const MonthComponent = ({ selectedMonthFilter, setSelectedMonthFilter, setTempSelectedDate }) => {
    function handleSetSelectedMonth(value) {
        if (value == "last30days") {
            setTempSelectedDate({fromDate: last30days, toDate: currentDay});
        } else if (value == "thisMonth") {
            setTempSelectedDate({fromDate: thisMonthStart, toDate: thisMonthEnd});
        } else {
            setTempSelectedDate({fromDate: lastMonthStart, toDate: lastMonthEnd});
        }
        
        setSelectedMonthFilter(value);
    }

    return(
        <List style={{ width }}>
            <ListItem avatar>
                <Left>
                    <RadioButton
                        size={12}
                        innerColor={"#A62A7C"}
                        outerColor={"#A62A7C"}
                        isSelected={selectedMonthFilter.last30days}
                        onPress={() => handleSetSelectedMonth("last30days")}
                    />
                </Left>
                <Body>
                    <Text>Last 30 days</Text>  
                    <Text note>{currentDayFormatted + " - " + last30daysFormatted}</Text>
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
                        isSelected={selectedMonthFilter.thisMonth}
                        onPress={() => handleSetSelectedMonth("thisMonth")}
                    />
                </Left>
                <Body>
                    <Text>This Month</Text>
                    <Text note>{thisMonthEndFormatted + " - " + thisMonthStartFormatted}</Text>
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
                        isSelected={selectedMonthFilter.lastMonth}
                        onPress={() => handleSetSelectedMonth("lastMonth")}
                    />
                </Left>
                <Body>
                    <Text>Last Month</Text>
                    <Text note>{lastMonthEndFormatted + " - " + lastMonthStartFormatted}</Text>
                </Body>
                <Right></Right>
            </ListItem>
        </List>
    )
}

export default MonthComponent;