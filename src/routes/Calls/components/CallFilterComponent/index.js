import React from "react";
import { TouchableOpacity, Text, Image } from 'react-native';
import { View, Icon } from "native-base";
import styles from "./CallFilterComponentStyles.js";

var today = new Date();
var yesterday = new Date();
yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
var dateFormat = require('dateformat');

export const CallFilterComponent = ({ dateRangeIcon, trackTimer, AudioPlayer, setCurrentCall, currentCall, getCallHistory, setTempSelectedDate, setSelectedDate, selectedDate, setCallFilterModal, setAgentsNumberModal, setPagination, setNextDateDisable, isNextDateDisable, setScrolledStatus, selectedAgents, selectedNumbers, contactNumber, setCallFilterTab, setSelectedDayFilter }) => {
    function handleDateChange(value) {
        if (isNextDateDisable == true) {
            setNextDateDisable(false);
        }

        if (currentCall != null) {
            setCurrentCall(null);
        }
        
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }
        
        AudioPlayer.pause();

        var diffDays = parseInt((selectedDate.toDate - selectedDate.fromDate) / (1000 * 60 * 60 * 24)) + 1; 

        if (value == "next") {
            var nextFromDate = new Date(selectedDate.toDate);
            var nextToDate = new Date(selectedDate.toDate);
            var nextDate = {
                    fromDate: new Date(nextFromDate.setDate(nextFromDate.getDate() + 1)),
                    toDate: new Date(nextToDate.setDate(nextToDate.getDate() + diffDays))
                }
        } else {
            var prevFromDate = new Date(selectedDate.fromDate);
            var prevToDate = new Date(selectedDate.fromDate);
            var nextDate = {
                    fromDate: new Date(prevFromDate.setDate(prevFromDate.getDate() - diffDays)),
                    toDate: new Date(prevToDate.setDate(prevToDate.getDate() - 1))
                }
        }     

        setScrolledStatus(false);

        setSelectedDate(nextDate);
        setTempSelectedDate(nextDate);
        if (dateFormat(nextDate.fromDate, "yyyy-mm-dd") == dateFormat(today, "yyyy-mm-dd") && dateFormat(nextDate.toDate, "yyyy-mm-dd") == dateFormat(today, "yyyy-mm-dd")) {
            setCallFilterTab(0);
            setSelectedDayFilter("today");
        } else if (dateFormat(nextDate.fromDate, "yyyy-mm-dd") == dateFormat(yesterday, "yyyy-mm-dd") && dateFormat(nextDate.toDate, "yyyy-mm-dd") == dateFormat(yesterday, "yyyy-mm-dd")) {
            setCallFilterTab(0);
            setSelectedDayFilter("yesterday");
        } else {
            setCallFilterTab(3);
        }

        setPagination({
            fetchStart: 1,
            fetchStop: 10
        });
        getCallHistory();
    }

    return(
        <View style={styles.filterContainer}>
            <View style={styles.dateContainer}>  
                <TouchableOpacity style={styles.dateButton} onPress={() => setCallFilterModal(true)}>
                    <Image source={dateRangeIcon} style={styles.calendarIcon} />
                    <Text style={styles.dateText}>{dateFormat(selectedDate.fromDate, "yyyy-mm-dd") == dateFormat(selectedDate.toDate, "yyyy-mm-dd") ? dateFormat(selectedDate.fromDate, "dddd, mmmm d") : dateFormat(selectedDate.toDate, "mmm d") + " - " + dateFormat(selectedDate.fromDate, "mmm d")}</Text> 
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleDateChange("previous")}>
                <Icon style={styles.iconStyle} name="ios-arrow-back-outline" />
            </TouchableOpacity>
            <TouchableOpacity disabled={isNextDateDisable} style={styles.iconButton} onPress={() => handleDateChange("next")}>
                <Icon 
                    style={isNextDateDisable ? styles.disabledIcon : styles.iconStyle} 
                    name="ios-arrow-forward-outline" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setAgentsNumberModal(true)}>
                <Icon style={(selectedAgents.length > 0 || selectedNumbers.length > 0 || contactNumber != "") || (dateFormat(selectedDate.fromDate, "yyyy-mm-dd") != dateFormat(today, "yyyy-mm-dd") || dateFormat(selectedDate.toDate, "yyyy-mm-dd") != dateFormat(today, "yyyy-mm-dd")) ? styles.funnelIcon : styles.iconStyle} name='md-funnel' />
            </TouchableOpacity>
        </View>
    )
}

export default CallFilterComponent;