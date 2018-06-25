import React from "react";
import { Dimensions } from "react-native";
import { Text, View, List, ListItem } from "native-base";
import DatePicker from 'react-native-datepicker';
const { width } = Dimensions.get("window");

var dateFormat = require('dateformat');

var yesterday = new Date();
yesterday = dateFormat(yesterday.setDate(yesterday.getDate() - 1), "dddd, mmmm d");

export const CustomComponent = ({ setTempSelectedDate, tempSelectedDate }) => {
    function handleDateChange(type, value) {
        if (type == "from") {
            setTempSelectedDate({fromDate: new Date(value), toDate: tempSelectedDate.toDate});
        } else {
            setTempSelectedDate({fromDate: tempSelectedDate.fromDate, toDate: new Date(value)});
        }
    }

    return(
        <List style={{ width }}>
            <ListItem>
                <View style={{flexDirection: "column"}}>
                    <Text>Start Date</Text>
                    <DatePicker
                        date={tempSelectedDate.fromDate}
                        mode="date"
                        placeholder="select date"
                        format="ddd, MMM D, YYYY"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => {handleDateChange("from", date)}}
                        />
                </View>
            </ListItem>
            <ListItem>
                <View style={{flexDirection: "column"}}>
                    <Text>End Date</Text>
                    <DatePicker
                        date={tempSelectedDate.toDate}
                        mode="date"
                        placeholder="select date"
                        format="ddd, MMM D, YYYY"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => {handleDateChange("to", date)}}
                        />
                </View>
            </ListItem>
        </List>
    )
}

export default CustomComponent;