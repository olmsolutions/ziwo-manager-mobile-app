import { connect } from "react-redux";
import Calls from "../components/Calls";
import {
    setConnectionStatus,
    getCallHistory,
    setCurrentCall,
    setCallLoader,
    setFilterBy,
    setSelectedDate,
    setCallFilterModal,
    setSelectedDayFilter,
    setSelectedWeekFilter,
    setSelectedMonthFilter,
    setTempSelectedDate,
    setAgentsNumberModal,
    setCallFilterTab,
    setContactTab,
    getAgentsList,
    getNumbersList,
    setSelectedAgents,
    setSelectedNumbers,
    setSearchAgentTerm,
    setSearchNumberTerm,
    setPagination,
    setContactNumber,
    setTempContactNumber,
    setTrackTimer,
    setNextDateDisable,
    clearState,
    setLogout,
    setScrolledStatus
} from "../modules/calls";

const mapStateToProps = (state) => ({   
    account: state.login.account || {},
    domain: state.login.domain || "",
    isInternetConnected: state.calls.isInternetConnected || "yes",
    isCallHistoryLoading: state.calls.isCallHistoryLoading || false,
    callHistory: state.calls.callHistory,
    agentsList: state.calls.agentsList,
    numbersList: state.calls.numbersList,
    isCallLoading: state.calls.isCallLoading || false,
    filterBy: state.calls.filterBy || "day",
    showCallFilterModal: state.calls.showCallFilterModal || false,
    selectedDayFilter: state.calls.selectedDayFilter || { today: true, yesterday: false },
    selectedWeekFilter: state.calls.selectedWeekFilter || { last7days: true, thisWeek: false, lastWeek: false },
    selectedMonthFilter: state.calls.selectedMonthFilter || { last30days: true, thisMonth: false, lastMonth: false },
    showAgentsNumberModal: state.calls.showAgentsNumberModal || false,
    selectedAgents: state.calls.selectedAgents || [],
    selectedNumbers: state.calls.selectedNumbers || [],
    selectedCallFilterTab: state.calls.selectedCallFilterTab || 0,
    selectedContactTab: state.calls.selectedContactTab || 0,
    currentCall: state.calls.currentCall ||  null,
    isAgentListLoading: state.calls.isAgentListLoading || false,
    isNumberListLoading: state.calls.isNumberListLoading || false,
    searchAgentTerm: state.calls.searchAgentTerm || "",
    searchNumberTerm: state.calls.searchNumberTerm || "",
    selectedDate: state.calls.selectedDate || {
        fromDate: new Date(),
        toDate: new Date()
    },
    tempSelectedDate: state.calls.tempSelectedDate  || {
        fromDate: new Date(),
        toDate: new Date()
    },
    pagination: state.calls.pagination || { fetchStart: 1, fetchStop: 10 },
    isInfiniteScrollLoading: state.calls.isInfiniteScrollLoading || false,
    contactNumber: state.calls.contactNumber || "",
    tempContactNumber: state.calls.tempContactNumber || "",
    trackTimer: state.calls.trackTimer || "",
    isNextDateDisable: state.calls.isNextDateDisable || false,
    isLogout: state.home.isLogout || false,
    isListScrolled: state.calls.isListScrolled || false,
    callHistoryLength: state.calls.callHistoryLength || 0
});

const mapActionCreators = {
    setConnectionStatus,
    getCallHistory,
    setCurrentCall,
    setCallLoader,
    setFilterBy,
    setSelectedDate,
    setCallFilterModal,
    setSelectedDayFilter,
    setSelectedWeekFilter,
    setSelectedMonthFilter,
    setTempSelectedDate,
    setAgentsNumberModal,
    setCallFilterTab,
    setContactTab,
    getAgentsList,
    getNumbersList,
    setSelectedAgents,
    setSelectedNumbers,
    setSearchAgentTerm,
    setSearchNumberTerm,
    setPagination,
    setContactNumber,
    setTempContactNumber,
    setTrackTimer,
    setNextDateDisable,
    clearState,
    setLogout,
    setScrolledStatus
};

export default connect(mapStateToProps, mapActionCreators)(Calls);
