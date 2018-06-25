import React from "react";
import { Text, View, Modal, Image } from 'react-native';
import { Content, Button, Header, Body, Left, Right, Icon } from "native-base";
import styles from "./CallFilterModalStyles.js";
import DayComponent from "../DayComponent";
import WeekComponent from "../WeekComponent";
import MonthComponent from "../MonthComponent";
import CustomComponent from "../CustomComponent";
import SegmentedControlTab from 'react-native-segmented-control-tab'

var today = new Date();
var dateFormat = require('dateformat');

export const CallFilterModal = ({ backupRestoreIcon, getCallHistory, selectedCallFilterTab, setCallFilterTab, setCallFilterModal, showCallFilterModal, selectedDayFilter, selectedWeekFilter, selectedMonthFilter, setSelectedDayFilter, setSelectedWeekFilter, setSelectedMonthFilter, selectedDate, setSelectedDate, setTempSelectedDate, tempSelectedDate, setPagination, setNextDateDisable, trackTimer, AudioPlayer, setCurrentCall, currentCall, setScrolledStatus }) => {

    function handleResetAllFilters() {
        setCallFilterTab(0);
        setSelectedDayFilter("today");
        setSelectedWeekFilter("last7days");
        setSelectedMonthFilter("last30days");
        setTempSelectedDate({fromDate: today, toDate: today});
        setSelectedDate({fromDate: today, toDate: today});

        if (currentCall != null) {
            setCurrentCall(null);
        }
        
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }

        AudioPlayer.pause();
        
        setScrolledStatus(false);
        setPagination({
            fetchStart: 1,
            fetchStop: 10
        });

        setCallFilterModal(false);
        getCallHistory();
        setNextDateDisable(false);
    }

    function handleSaveButton() {
        if (currentCall != null) {
            setCurrentCall(null);
        }
        
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }

        AudioPlayer.pause();
        
        setScrolledStatus(false);
        setPagination({
            fetchStart: 1,
            fetchStop: 10
        });
        setSelectedDate(tempSelectedDate);
        setCallFilterModal(false);
        getCallHistory();
        setNextDateDisable(false);
    }

    handleIndexChange = (index) => {
        setCallFilterTab(index);
        
        if (index == 0) {
            var today = new Date();

            var yesterday = new Date();
            yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));

            if (selectedDayFilter.today == true) {
                setTempSelectedDate({fromDate: today, toDate: today});
            } else {
                setTempSelectedDate({fromDate: yesterday, toDate: yesterday});
            }
        } else if (index == 1) {
            var currentDate = new Date();
            var last7days = new Date(); 
            last7days = new Date(last7days.setDate(last7days.getDate() - 7));
                
            // This week
            var currentDate1 = new Date();
            var day = currentDate1.getDay();        
            var diff = currentDate1.getDate() - day + (day == 0 ? -6:1); // 0 for sunday
            var thisWeekStart = new Date(currentDate1.setDate(diff));
            var thisWeekEnd  = new Date(currentDate1.setDate(currentDate1.getDate() + 6));                

            // Last Week
            var currentDate2 = new Date();
            var lastWeekStart = new Date(currentDate2.setDate(diff));;
            var lastWeekEnd = new Date(currentDate2.setDate(currentDate2.getDate() + 6));
            lastWeekStart = new Date(lastWeekStart.setDate(lastWeekStart.getDate() - 7));
            lastWeekEnd = new Date(lastWeekEnd.setDate(lastWeekEnd.getDate() - 7));

            if (selectedWeekFilter.last7days == true) {
                setTempSelectedDate({fromDate: last7days, toDate: currentDate});
            } else if (selectedWeekFilter.thisWeek == true) {
                setTempSelectedDate({fromDate: thisWeekStart, toDate: thisWeekEnd});
            } else {
                setTempSelectedDate({fromDate: lastWeekStart, toDate: lastWeekEnd});
            }
        } else if (index == 2) {
            // Last 30 days
            var currentDate = new Date(); 
            var currentDay = new Date();
            var last30days = new Date(currentDate.setDate(currentDate.getDate() - 30));
                
            // This Month
            var currentDate1 = new Date(); 
            var thisMonthStart = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), 1);
            var thisMonthEnd = new Date(currentDate1.getFullYear(), currentDate1.getMonth() + 1, 0);

            // Last Month
            var currentDate2 = new Date(); 
            var lastMonthStart = new Date(currentDate2.getFullYear() - (currentDate2.getMonth() > 0 ? 0 : 1), (currentDate2.getMonth() - 1 + 12) % 12, 1);
            var lastMonthEnd = new Date(currentDate2.getFullYear(), currentDate2.getMonth(), 0);

            if (selectedMonthFilter.last30days == true) {
                setTempSelectedDate({fromDate: last30days, toDate: currentDay});
            } else if (selectedMonthFilter.thisMonth == true) {
                setTempSelectedDate({fromDate: thisMonthStart, toDate: thisMonthEnd});
            } else {
                setTempSelectedDate({fromDate: lastMonthStart, toDate: lastMonthEnd});
            }
        }
    }

    return(
        <Modal
            presentationStyle={"fullScreen"}
            animationType="slide"
            transparent={false}
            visible={showCallFilterModal}
            hardwareAccelerated={true} >
            <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                <Left style={{flex: 0}}>
                    <Button transparent onPress={() => setCallFilterModal(false)}>
                        <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu}/> 
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerText}>Date Settings</Text>
                </Body>
                <Right style={{flex: 0}}>  
                    <Button transparent onPress={() => handleSaveButton()}>
                        <Text style={styles.saveText}>SAVE</Text>
                    </Button>
                    { (dateFormat(selectedDate.fromDate, "yyyy-mm-dd") != dateFormat(today, "yyyy-mm-dd") || dateFormat(selectedDate.toDate, "yyyy-mm-dd") != dateFormat(today, "yyyy-mm-dd")) &&
                        <Button transparent onPress={() => handleResetAllFilters()}>
                            <Image source={backupRestoreIcon} resizeMode={"contain"} style={styles.resetIcon}/>
                        </Button>
                    }
                </Right>
            </Header>
            <View style={styles.segmentContainer}>
                <SegmentedControlTab
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    values={['Day', 'Week', 'Month', 'Custom']}
                    selectedIndex={selectedCallFilterTab}
                    onTabPress= {this.handleIndexChange}
                />
            </View>
            <Content bounces={false}>   
                { selectedCallFilterTab == 0 && 
                    <DayComponent selectedDayFilter={selectedDayFilter} setSelectedDayFilter={setSelectedDayFilter} setTempSelectedDate={setTempSelectedDate} />
                }

                { selectedCallFilterTab == 1 && 
                    <WeekComponent selectedWeekFilter={selectedWeekFilter} setSelectedWeekFilter={setSelectedWeekFilter} setTempSelectedDate={setTempSelectedDate} />
                }

                { selectedCallFilterTab == 2 && 
                    <MonthComponent selectedMonthFilter={selectedMonthFilter} setSelectedMonthFilter={setSelectedMonthFilter} setTempSelectedDate={setTempSelectedDate} />
                }

                { selectedCallFilterTab == 3 && 
                    <CustomComponent setTempSelectedDate={setTempSelectedDate} tempSelectedDate={tempSelectedDate} />
                }
            </Content>
        </Modal>
    )
}

export default CallFilterModal;