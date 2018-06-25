import React from "react";
import { View, NetInfo } from "react-native";
import { Container, Drawer, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import OfflineSignComponent from "../../../components/OfflineSignComponent";
import SidebarComponent from "../../../components/SidebarComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import CallsHeader from "./CallsHeader";
import CallHistoryList from "./CallHistoryList";
import CallFilterModal from "./CallFilterModal";
import CallFilterComponent from "./CallFilterComponent";
import AgentsNumberModal from "./AgentsNumberModal";
import AudioPlayer from 'react-native-play-audio';

const incomingIcon = require("../../../assets/images/incoming.webp");
const outgoingIcon = require("../../../assets/images/outgoing.webp");
const internalIcon = require("../../../assets/images/internal.webp");
const serviceIcon = require("../../../assets/images/service.webp");
const dateRangeIcon = require("../../../assets/images/date_range.png");
const backupRestoreIcon = require("../../../assets/images/backup_restore.png");

var dateFormat = require('dateformat');

class Calls extends React.Component {
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.props.setPagination({
            fetchStart: 1,
            fetchStop: 10
        });

        if (this.props.isInternetConnected == "yes") {
            this.props.getCallHistory();
        }

        this.props.setScrolledStatus(false);        
        this.checkNextDate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.showAgentsNumberModal != this.props.showAgentsNumberModal) {
            if (this.props.showAgentsNumberModal == true) {
                if (this.props.selectedContactTab == 1) {
                    this.props.getNumbersList();
                } else if (this.props.selectedContactTab == 2) {
                    this.props.getAgentsList();
                }
            }
        }

        if (prevProps.selectedDate != this.props.selectedDate) {
            this.checkNextDate();
        }

        if (this.props.isLogout) {
            this.props.clearState();
            Actions.login();
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        AudioPlayer.pause();
    }

    checkNextDate() {
        var diffDays = parseInt((this.props.selectedDate.toDate - this.props.selectedDate.fromDate) / (1000 * 60 * 60 * 24)) + 1; 
        var nextFromDate = new Date(this.props.selectedDate.fromDate);
        var nextToDate = new Date(this.props.selectedDate.toDate);

        nextFromDate = new Date(nextFromDate.setDate(nextFromDate.getDate() + 1));
        nextToDate = new Date(nextToDate.setDate(nextToDate.getDate() + diffDays));

        if (dateFormat(this.props.selectedDate.toDate, "yyyy-mm-dd") >= dateFormat(new Date(), "yyyy-mm-dd")) {
            this.props.setNextDateDisable(true);
        } else if (dateFormat(nextToDate, "yyyy-mm-dd") >= new Date()) {
            if (dateFormat(nextFromDate, "yyyy-mm-dd") >= dateFormat(new Date(), "yyyy-mm-dd")) {
                this.props.setNextDateDisable(true);
            } 
        }
    }

    handleConnectivityChange = isConnected => { 
        if (isConnected) {
            this.props.setConnectionStatus("yes");

            if (!this.props.callHistory) { 
                this.props.getCallHistory();
            }
        } else {
            this.props.setConnectionStatus("no");
        }
    };

    render() {
        const { firstName, lastName, username } = this.props.account;

        closeDrawer = () => {
            this.drawer._root.close()
        };
        
        openDrawer = () => {
            this.drawer._root.open()
        };

        return (
            <View style={{flex: 1}}>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SidebarComponent 
                                navigator={this.navigator} 
                                socket={{}}
                                domain={this.props.domain}
                                firstName={firstName}
                                lastName={lastName}
                                username={username}
                                profilePicture={this.props.account.photo ? "https://"+this.props.domain+"/storage/"+this.props.account.photo : ""}
                                setLogout={this.props.setLogout}
                                currentPage={"calls"}
                                trackTimer={this.props.trackTimer}
                                AudioPlayer={AudioPlayer} 
                                setCurrentCall={this.props.setCurrentCall}
                                currentCall={this.props.currentCall} />}
                                onClose={() => closeDrawer()} 
                            >
                    <Container>
                        <View style={{flex:1}}>
                            <CallsHeader 
                                callHistoryLength={this.props.callHistoryLength} />
                            { (this.props.isInternetConnected == "no") && 
                                <OfflineSignComponent />
                            }
                            <CallFilterComponent
                                dateRangeIcon={dateRangeIcon} 
                                trackTimer={this.props.trackTimer}
                                AudioPlayer={AudioPlayer} 
                                setCurrentCall={this.props.setCurrentCall}
                                currentCall={this.props.currentCall}
                                getCallHistory={this.props.getCallHistory}
                                setTempSelectedDate={this.props.setTempSelectedDate}
                                setSelectedDate={this.props.setSelectedDate}
                                selectedDate={this.props.selectedDate}
                                setCallFilterModal={this.props.setCallFilterModal}
                                setAgentsNumberModal={this.props.setAgentsNumberModal}
                                setPagination={this.props.setPagination}
                                setNextDateDisable={this.props.setNextDateDisable}
                                isNextDateDisable={this.props.isNextDateDisable}
                                setScrolledStatus={this.props.setScrolledStatus}
                                selectedAgents={this.props.selectedAgents}
                                selectedNumbers={this.props.selectedNumbers}
                                contactNumber={this.props.contactNumber}
                                setCallFilterTab={this.props.setCallFilterTab}
                                setSelectedDayFilter={this.props.setSelectedDayFilter} />
                                <View style={{flex: 1}}>
                                    { this.props.callHistory &&
                                        <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                                            { (this.props.callHistory.length == 0) && 
                                                <Text>No records found</Text>
                                                ||
                                                <CallHistoryList 
                                                    setTrackTimer={this.props.setTrackTimer}
                                                    trackTimer={this.props.trackTimer}
                                                    AudioPlayer={AudioPlayer}
                                                    incomingIcon={incomingIcon}
                                                    outgoingIcon={outgoingIcon}
                                                    internalIcon={internalIcon}
                                                    serviceIcon={serviceIcon}
                                                    domain={this.props.domain}
                                                    callHistory={this.props.callHistory}
                                                    currentCall={this.props.currentCall}
                                                    setCurrentCall={this.props.setCurrentCall}
                                                    setCallLoader={this.props.setCallLoader}
                                                    isCallLoading={this.props.isCallLoading}
                                                    setPagination={this.props.setPagination}
                                                    pagination={this.props.pagination}
                                                    getCallHistory={this.props.getCallHistory}
                                                    isInfiniteScrollLoading={this.props.isInfiniteScrollLoading}
                                                    setScrolledStatus={this.props.setScrolledStatus}
                                                    isListScrolled={this.props.isListScrolled} />
                                            }
                                        </View>
                                    }
                                </View>
                        </View>
                        <CallFilterModal 
                            backupRestoreIcon={backupRestoreIcon}
                            getCallHistory={this.props.getCallHistory}
                            selectedCallFilterTab={this.props.selectedCallFilterTab}
                            setCallFilterTab={this.props.setCallFilterTab}
                            setCallFilterModal={this.props.setCallFilterModal}
                            showCallFilterModal={this.props.showCallFilterModal}
                            selectedDayFilter={this.props.selectedDayFilter}
                            selectedWeekFilter={this.props.selectedWeekFilter}
                            selectedMonthFilter={this.props.selectedMonthFilter}
                            setSelectedDayFilter={this.props.setSelectedDayFilter}
                            setSelectedWeekFilter={this.props.setSelectedWeekFilter}
                            setSelectedMonthFilter={this.props.setSelectedMonthFilter}
                            selectedDate={this.props.selectedDate}
                            setSelectedDate={this.props.setSelectedDate}
                            setTempSelectedDate={this.props.setTempSelectedDate}
                            tempSelectedDate={this.props.tempSelectedDate}
                            setPagination={this.props.setPagination}
                            setNextDateDisable={this.props.setNextDateDisable}
                            trackTimer={this.props.trackTimer}
                            AudioPlayer={AudioPlayer} 
                            setCurrentCall={this.props.setCurrentCall}
                            currentCall={this.props.currentCall}
                            setScrolledStatus={this.props.setScrolledStatus} />
                        <AgentsNumberModal
                            backupRestoreIcon={backupRestoreIcon}
                            getCallHistory={this.props.getCallHistory}
                            getAgentsList={this.props.getAgentsList}
                            agentsList={this.props.agentsList}
                            getNumbersList={this.props.getNumbersList}
                            numbersList={this.props.numbersList}
                            setContactTab={this.props.setContactTab}
                            selectedContactTab={this.props.selectedContactTab}
                            setAgentsNumberModal={this.props.setAgentsNumberModal}
                            showAgentsNumberModal={this.props.showAgentsNumberModal}
                            setSelectedAgents={this.props.setSelectedAgents}
                            selectedAgents={this.props.selectedAgents}
                            setSelectedNumbers={this.props.setSelectedNumbers}
                            selectedNumbers={this.props.selectedNumbers}
                            isAgentListLoading={this.props.isAgentListLoading} 
                            isNumberListLoading={this.props.isNumberListLoading}
                            setSearchAgentTerm={this.props.setSearchAgentTerm}
                            searchAgentTerm={this.props.searchAgentTerm}
                            setSearchNumberTerm={this.props.setSearchNumberTerm}
                            searchNumberTerm={this.props.searchNumberTerm}
                            setPagination={this.props.setPagination}
                            setContactNumber={this.props.setContactNumber}
                            contactNumber={this.props.contactNumber}
                            setTempContactNumber={this.props.setTempContactNumber}
                            tempContactNumber={this.props.tempContactNumber}
                            trackTimer={this.props.trackTimer}
                            AudioPlayer={AudioPlayer} 
                            setCurrentCall={this.props.setCurrentCall}
                            currentCall={this.props.currentCall}
                            setScrolledStatus={this.props.setScrolledStatus} />
                    </Container>
                </Drawer>
                {this.props.isCallHistoryLoading &&
                    <LoadingComponent />
                }
            </View>
        );
    }
}

export default Calls;