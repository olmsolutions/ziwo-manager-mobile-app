import { connect } from "react-redux";
import Home from "../components/Home";
import {
    setConnectionStatus,
    setLiveStats,
    setLiveStatsSettings,
    updateLiveStatSetting,
    setSettingsModal,
    clearState,
    setLogout,
    setLastRefresh,
    setOrder,
    setSLA
} from "../modules/home";

const mapStateToProps = (state) => ({  
    sla: state.home.sla || 0,
    order: state.home.order || ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"],
    lastRefresh: state.home.lastRefresh || "",
    isLogout: state.home.isLogout || false, 
    isInternetConnected: state.home.isInternetConnected || "yes", 
    account: state.login.account || {},
    accessToken: state.login.accessToken || "",
    domain: state.login.domain || "",
    liveStats: state.home.liveStats,
    showSettingsModal: state.home.showSettingsModal || false,
    liveStatsSettings: state.home.liveStatsSettings || {
                                                            SLA: true,
                                                            totalACDCalls: true, //Inbound
                                                            totalIVRLandedCalls: true, //Inbound	
                                                            totalLostInIVRCalls: true, //Inbound
                                                            totalCleanCallsIn: false, //Inbound
                                                            totalPhantomCallsIn: false, //Inbound
                                                            totalTransferredCalls: false, //Inbound
                                                            totalAbandonedCalls: false, //Inbound
                                                            percentageAbandonedCalls: false, //Inbound
                                                            totalVoicemails: false, //Inbound
                                                            totalQueueAnsweredCalls: false, //Inbound
                                                            answerSeizureRatio: false, //Inbound
                                                            averageCallsAnsweredPerAgent: false, //Inbound
                                                            averageWaitingTime: false, //Inbound
                                                            averageAbandonTime: false, //Inbound
                                                            averageInboundHandleTime: false, //Inbound
                                                            averageInboundTalkTime: false, //Inbound
                                                            averageSpeedOfAnswer: false, //Inbound
                                                            averageQueueTalkTime: false, //Inbound
                                                            totalInboundTalkTime: false, //Inbound
                                                            totalOutgoingCalls: true, //Outbound
                                                            totalCleanCallsOut: true, //Outbound
                                                            totalPhantomCallsOut: true, //Outbound
                                                            averageOutboundHandleTime: false, //Outbound
                                                            averageOutboundTalkTime: false, //Outbound
                                                            totalOutboundTalkTime: false, //Outbound
                                                            totalAgentsLoggedIn: true, //Performance
                                                            totalAgentsOnCall: true, //Performance
                                                            totalAgentsOnAvailableStatus: true, //Performance
                                                            totalAgentsOnBreakStatus: false, //Performance
                                                            totalAgentsOnMeetingStatus: false, //Performance
                                                            totalAgentsOnOutgoingStatus: false, //Performance
                                                            totalHoldTime: false, //Performance
                                                            totalAgents: false, //Performance
                                                        }
});

const mapActionCreators = {
    setConnectionStatus,
    setLiveStats,
    setLiveStatsSettings,
    updateLiveStatSetting,
    setSettingsModal,
    clearState,
    setLogout,
    setLastRefresh,
    setOrder,
    setSLA
};

export default connect(mapStateToProps, mapActionCreators)(Home);
