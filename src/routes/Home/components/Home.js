import React from "react";
import { View, AsyncStorage, NetInfo, Platform, BackHandler } from "react-native";
import { Drawer, Spinner } from "native-base";
import SidebarComponent from "../../../components/SidebarComponent";
import OfflineSignComponent from "../../../components/OfflineSignComponent";
import { Actions } from "react-native-router-flux";
import LiveHeader from "./LiveHeader";
import Live from "./Live";
import SettingsModal from "./SettingsModal";
import io from 'socket.io-client';
import moment from 'moment';

const totalACDCallsIcon = require("../../../assets/kpi-icons/Total-acd-calls.webp");
const totalIVRLandedCallsIcon = require("../../../assets/kpi-icons/Total-calls-landed-in-ivr.webp");
const totalLostInIVRCallsIcon = require("../../../assets/kpi-icons/Total-Calls-Lost-in-IVR.webp");
const totalCleanCallsInIcon = require("../../../assets/kpi-icons/Total-Clean-Calls-Inbound.webp");
const totalPhantomCallsInIcon = require("../../../assets/kpi-icons/Total-Phantom-Calls-Inbound.webp");
const totalTransferredCallsIcon = require("../../../assets/kpi-icons/Total-Transferred-Calls.webp");
const totalAbandonedCallsIcon = require("../../../assets/kpi-icons/Total-Abandoned-Calls.webp");
const percentageAbandonedCallsIcon = require("../../../assets/kpi-icons/Percentage-Abandoned-Calls.webp");
const totalVoicemailsIcon = require("../../../assets/kpi-icons/Total-Voicemails.webp");
const totalQueueAnsweredCallsIcon = require("../../../assets/kpi-icons/Answered-Queue-Calls.webp");
const answerSeizureRatioIcon = require("../../../assets/kpi-icons/Answer-seizure-ratio.webp");
const averageCallsAnsweredPerAgentIcon = require("../../../assets/kpi-icons/Average-Answered-Calls-per-Agent.webp");
const averageWaitingTimeIcon = require("../../../assets/kpi-icons/average-queue-waiting-time.webp");
const averageAbandonTimeIcon = require("../../../assets/kpi-icons/Average-Abandon-Time.webp");
const averageInboundHandleTimeIcon = require("../../../assets/kpi-icons/Average-Inbound-Handling-Time.webp");
const averageInboundTalkTimeIcon = require("../../../assets/kpi-icons/Average-Inbound-Talk-Time.webp");
const averageSpeedOfAnswerIcon = require("../../../assets/kpi-icons/Average-speed-of-answering.webp");
const averageQueueTalkTimeIcon = require("../../../assets/kpi-icons/Average-Queue-Talk-Time.webp");
const totalInboundTalkTimeIcon = require("../../../assets/kpi-icons/Total-Inbound-Talk-Time.webp");
const totalOutgoingCallsIcon = require("../../../assets/kpi-icons/Total-Outgoing-Calls.webp");
const totalCleanCallsOutIcon = require("../../../assets/kpi-icons/Total-Clean-Calls-Outbound.webp");
const totalPhantomCallsOutIcon = require("../../../assets/kpi-icons/Total-Phantom-Calls-Outbound.webp");
const averageOutboundHandleTimeIcon = require("../../../assets/kpi-icons/Average-Outbound-Handling-Time.webp");
const averageOutboundTalkTimeIcon = require("../../../assets/kpi-icons/Average-outbound-Talk-Time.webp");
const totalOutboundTalkTimeIcon = require("../../../assets/kpi-icons/Total-outbound-Talk-Time.webp");
const totalAgentsLoggedInIcon = require("../../../assets/kpi-icons/Current-Agents-Logged-In.webp");
const totalAgentsOnCallIcon = require("../../../assets/kpi-icons/Current-Agents-On-Call.webp");
const totalAgentsOnAvailableStatusIcon = require("../../../assets/kpi-icons/Current-Agents-Available.webp");
const totalAgentsOnBreakStatusIcon = require("../../../assets/kpi-icons/Current-Agents-on-Break.webp");
const totalAgentsOnMeetingStatusIcon = require("../../../assets/kpi-icons/Current-Agents-in-a-Meeting.webp");
const totalAgentsOnOutgoingStatusIcon = require("../../../assets/kpi-icons/Current-Agents-set-to-Outbound.webp");
const totalHoldTimeIcon = require("../../../assets/kpi-icons/Total-On-Hold-Time.webp");
const totalAgentsIcon = require("../../../assets/kpi-icons/total-agents.webp");

let socketConfig = {};
let socket = {};

class Home extends React.Component {
    componentDidMount() {
        Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        if (this.props.isInternetConnected == "yes") {
            this.handleSocketConnection();
        }

        AsyncStorage.getItem('order', (err, result) => {
            if (result) {
                this.props.setOrder(JSON.parse(result));
            }
        });
    }

    componentWillUnmount() {
        Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);

        if (Object.keys(socket).length != 0) {
            socket.disconnect();
        }
    }

    handleBackButton() {
        return true;
    }

    handleConnectivityChange = isConnected => { 
        if (isConnected) {
            this.props.setConnectionStatus("yes");
            this.handleSocketConnection();
        } else {
            this.props.setConnectionStatus("no");
        }
    };

    convertToTime(totalSeconds){
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        seconds = Math.round(seconds * 100) / 100

        var result = (hours > 0 ? (hours < 10 ? "0" + hours + ":" : hours + ":") : "");
            result += (minutes < 10 ? "0" + minutes : minutes);
            result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
            
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.liveStatsSettings != this.props.liveStatsSettings) {
            if (this.props.liveStats) {
                this.props.setLiveStats({     
                    0: {
                        key: "0",
                        type: "",
                        icon: "",
                        parameter: "sla",
                        currentSetting: true,
                        description: "SLA",
                        value: this.props.liveStats[0].value
                    },  
                    1: {
                        key: "1",
                        type: "inbound",
                        icon: totalACDCallsIcon,
                        parameter: "totalACDCalls",
                        currentSetting: this.props.liveStatsSettings.totalACDCalls,
                        description: "Total ACD Calls",
                        value: this.props.liveStats[1].value
                    },
                    2: {
                        key: "2",
                        type: "inbound",
                        icon: totalIVRLandedCallsIcon,
                        parameter: "totalIVRLandedCalls",
                        currentSetting: this.props.liveStatsSettings.totalIVRLandedCalls,
                        description: "Total Calls landed in IVR",
                        value: this.props.liveStats[2].value
                    },
                    3: {
                        key: "3",
                        type: "inbound",
                        icon: totalLostInIVRCallsIcon,
                        parameter: "totalLostInIVRCalls",
                        currentSetting: this.props.liveStatsSettings.totalLostInIVRCalls,
                        description: "Total Calls Lost In IVR",
                        value: this.props.liveStats[3].value
                    },
                    4: {
                        key: "4",
                        type: "inbound",
                        icon: totalCleanCallsInIcon,
                        parameter: "totalCleanCallsIn",
                        currentSetting: this.props.liveStatsSettings.totalCleanCallsIn,
                        description: "Total Clean Calls Inbound",
                        value: this.props.liveStats[4].value
                    },
                    5: {
                        key: "5",
                        type: "inbound",
                        icon: totalPhantomCallsInIcon,
                        parameter: "totalPhantomCallsIn",
                        currentSetting: this.props.liveStatsSettings.totalPhantomCallsIn,
                        description: "Total Phantom Calls Inbound",
                        value: this.props.liveStats[5].value
                    },
                    6: {
                        key: "6",
                        type: "inbound",
                        icon: totalTransferredCallsIcon,
                        parameter: "totalTransferredCalls",
                        currentSetting: this.props.liveStatsSettings.totalTransferredCalls,
                        description: "Total Transferred Calls",
                        value: this.props.liveStats[6].value
                    },
                    7: {
                        key: "7",
                        type: "inbound",
                        icon: totalAbandonedCallsIcon,
                        parameter: "totalAbandonedCalls",
                        currentSetting: this.props.liveStatsSettings.totalAbandonedCalls,
                        description: "Total Abandoned Calls",
                        value: this.props.liveStats[7].value
                    },
                    8: {
                        key: "8",
                        type: "inbound",
                        icon: percentageAbandonedCallsIcon,
                        parameter: "percentageAbandonedCalls",
                        currentSetting: this.props.liveStatsSettings.percentageAbandonedCalls,
                        description: "Percentage Abandoned Calls",
                        value: this.props.liveStats[8].value
                    },
                    9: {
                        key: "9",
                        type: "inbound",
                        icon: totalVoicemailsIcon,
                        parameter: "totalVoicemails",
                        currentSetting: this.props.liveStatsSettings.totalVoicemails,
                        description: "Total Voicemails",
                        value: this.props.liveStats[9].value
                    },
                    10: {
                        key: "10",
                        type: "inbound",
                        icon: totalQueueAnsweredCallsIcon,
                        parameter: "totalQueueAnsweredCalls",
                        currentSetting: this.props.liveStatsSettings.totalQueueAnsweredCalls,
                        description: "Total Answered Queues Calls",
                        value: this.props.liveStats[10].value
                    },
                    11: {
                        key: "11",
                        type: "inbound",
                        icon: answerSeizureRatioIcon,
                        parameter: "answerSeizureRatio",
                        currentSetting: this.props.liveStatsSettings.answerSeizureRatio,
                        description: "Answer-seizure Ratio",
                        value: this.props.liveStats[11].value
                    },
                    12: {
                        key: "12",
                        type: "inbound",
                        icon: averageCallsAnsweredPerAgentIcon,
                        parameter: "averageCallsAnsweredPerAgent",
                        currentSetting: this.props.liveStatsSettings.averageCallsAnsweredPerAgent,
                        description: "Average Answered Calls per Agent",
                        value: this.props.liveStats[12].value
                    },
                    13: {
                        key: "13",
                        type: "inbound",
                        icon: averageWaitingTimeIcon,
                        parameter: "averageWaitingTime",
                        currentSetting: this.props.liveStatsSettings.averageWaitingTime,
                        description: "Average Queue Waiting Time",
                        value: this.props.liveStats[13].value
                    },
                    14: {
                        key: "14",
                        type: "inbound",
                        icon: averageAbandonTimeIcon,
                        parameter: "averageAbandonTime",
                        currentSetting: this.props.liveStatsSettings.averageAbandonTime,
                        description: "Average Abandon Time",
                        value: this.props.liveStats[14].value
                    },
                    15: {
                        key: "15",
                        type: "inbound",
                        icon: averageInboundHandleTimeIcon,
                        parameter: "averageInboundHandleTime",
                        currentSetting: this.props.liveStatsSettings.averageInboundHandleTime,
                        description: "Average Inbound Handling Time",
                        value: this.props.liveStats[15].value
                    },
                    16: {
                        key: "16",
                        type: "inbound",
                        icon: averageInboundTalkTimeIcon,
                        parameter: "averageInboundTalkTime",
                        currentSetting: this.props.liveStatsSettings.averageInboundTalkTime,
                        description: "Average Inbound Talk Time",
                        value: this.props.liveStats[16].value
                    },
                    17: {
                        key: "17",
                        type: "inbound",
                        icon: averageSpeedOfAnswerIcon,
                        parameter: "averageSpeedOfAnswer",
                        currentSetting: this.props.liveStatsSettings.averageSpeedOfAnswer,
                        description: "Average Speed of Answer",
                        value: this.props.liveStats[17].value
                    },
                    18: {
                        key: "18",
                        type: "inbound",
                        icon: averageQueueTalkTimeIcon,
                        parameter: "averageQueueTalkTime",
                        currentSetting: this.props.liveStatsSettings.averageQueueTalkTime,
                        description: "Average Talk Time for Queue Calls",
                        value: this.props.liveStats[18].value
                    },
                    19: {
                        key: "19",
                        type: "inbound",
                        icon: totalInboundTalkTimeIcon,
                        parameter: "totalInboundTalkTime",
                        currentSetting: this.props.liveStatsSettings.totalInboundTalkTime,
                        description: "Total Inbound Talk Time",
                        value: this.props.liveStats[19].value
                    },
                    20: {
                        key: "20",
                        type: "outbound",
                        icon: totalOutgoingCallsIcon,
                        parameter: "totalOutgoingCalls",
                        currentSetting: this.props.liveStatsSettings.totalOutgoingCalls,
                        description: "Total Outgoing Calls",
                        value: this.props.liveStats[20].value
                    },
                    21: {
                        key: "21",
                        type: "outbound",
                        icon: totalCleanCallsOutIcon,
                        parameter: "totalCleanCallsOut",
                        currentSetting: this.props.liveStatsSettings.totalCleanCallsOut,
                        description: "Total Clean Calls Outbound",
                        value: this.props.liveStats[21].value
                    },
                    22: {
                        key: "22",
                        type: "outbound",
                        icon: totalPhantomCallsOutIcon,
                        parameter: "totalPhantomCallsOut",
                        currentSetting: this.props.liveStatsSettings.totalPhantomCallsOut,
                        description: "Total Phantom Calls Outbound",
                        value: this.props.liveStats[22].value
                    },
                    23: {
                        key: "23",
                        type: "outbound",
                        icon: averageOutboundHandleTimeIcon,
                        parameter: "averageOutboundHandleTime",
                        currentSetting: this.props.liveStatsSettings.averageOutboundHandleTime,
                        description: "Average Outbound Handling Time",
                        value: this.props.liveStats[23].value
                    },
                    24: {
                        key: "24",
                        type: "outbound",
                        icon: averageOutboundTalkTimeIcon,
                        parameter: "averageOutboundTalkTime",
                        currentSetting: this.props.liveStatsSettings.averageOutboundTalkTime,
                        description: "Average Outbound Talk Time",
                        value: this.props.liveStats[24].value
                    },
                    25: {
                        key: "25",
                        type: "outbound",
                        icon: totalOutboundTalkTimeIcon,
                        parameter: "totalOutboundTalkTime",
                        currentSetting: this.props.liveStatsSettings.totalOutboundTalkTime,
                        description: "Total Outbound Talk Time",
                        value: this.props.liveStats[25].value
                    },
                    26: {
                        key: "26",
                        type: "performance",
                        icon: totalAgentsLoggedInIcon,
                        parameter: "totalAgentsLoggedIn",
                        currentSetting: this.props.liveStatsSettings.totalAgentsLoggedIn,
                        description: "Current Agents Logged In",
                        value: this.props.liveStats[26].value
                    },
                    27: {
                        key: "27",
                        type: "performance",
                        icon: totalAgentsOnCallIcon,
                        parameter: "totalAgentsOnCall",
                        currentSetting: this.props.liveStatsSettings.totalAgentsOnCall,
                        description: "Current Agents On Call",
                        value: this.props.liveStats[27].value
                    },
                    28: {
                        key: "28",
                        type: "performance",
                        icon: totalAgentsOnAvailableStatusIcon,
                        parameter: "totalAgentsOnAvailableStatus",
                        currentSetting: this.props.liveStatsSettings.totalAgentsOnAvailableStatus,
                        description: "Current Agents Available",
                        value: this.props.liveStats[28].value
                    },
                    29: {
                        key: "29",
                        type: "performance",
                        icon: totalAgentsOnBreakStatusIcon,
                        parameter: "totalAgentsOnBreakStatus",
                        currentSetting: this.props.liveStatsSettings.totalAgentsOnBreakStatus,
                        description: "Current Agents on Break",
                        value: this.props.liveStats[29].value
                    },
                    30: {
                        key: "30",
                        type: "performance",
                        icon: totalAgentsOnMeetingStatusIcon,
                        parameter: "totalAgentsOnMeetingStatus",
                        currentSetting: this.props.liveStatsSettings.totalAgentsOnMeetingStatus,
                        description: "Current Agents in a Meeting",
                        value: this.props.liveStats[30].value
                    },
                    31: {
                        key: "31",
                        type: "performance",
                        icon: totalAgentsOnOutgoingStatusIcon,
                        parameter: "totalAgentsOnOutgoingStatus",
                        currentSetting: this.props.liveStatsSettings.totalAgentsOnOutgoingStatus,
                        description: "Current Agents set to Outbound",
                        value: this.props.liveStats[31].value
                    },
                    32: {
                        key: "32",
                        type: "performance",
                        icon: totalHoldTimeIcon,
                        parameter: "totalHoldTime",
                        currentSetting: this.props.liveStatsSettings.totalHoldTime,
                        description: "Total On Hold Time",
                        value: this.props.liveStats[32].value
                    },
                    33: {
                        key: "33",
                        type: "performance",
                        icon: totalAgentsIcon,
                        parameter: "totalAgents",
                        currentSetting: this.props.liveStatsSettings.totalAgents,
                        description: "Total Agents",
                        value: this.props.liveStats[33].value
                    }
                });
            }
        }

        if (this.props.isLogout) {            
            this.props.clearState();
            Actions.login();
        }
    }

    handleSocketConnection = () => {
        AsyncStorage.getItem('liveStatsSettings', (err, result) => {           
            if (result) {
                this.props.setLiveStatsSettings(JSON.parse(result));
            }

            socketConfig = {
                query: 'access_token='+this.props.account.access_token, 
                path: '/socket', 
                transports: ['websocket']
            };
            
            socket = io('https://'+this.props.domain, socketConfig);

            if (socket) {
                var rx = this;
                socket.on('connect', () => {
                    socket.emit('GET /live/stats', {});
                    socket.on('GET /live/stats', function(data){ 
                        if (data.result == true) {
                            rx.props.setLastRefresh(moment().startOf('minute').fromNow());
                            rx.props.setSLA(data.content.SLA);
                            rx.props.setLiveStats({     
                                0: {
                                    key: "0",
                                    type: "",
                                    icon: "",
                                    parameter: "sla",
                                    currentSetting: true,
                                    description: "SLA",
                                    value: data.content.SLA
                                },    
                                1: {
                                    key: "1",
                                    type: "inbound",
                                    icon: totalACDCallsIcon,
                                    parameter: "totalACDCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalACDCalls,
                                    description: "Total ACD Calls",
                                    value: data.content.totalACDCalls
                                },
                                2: {
                                    key: "2",
                                    type: "inbound",
                                    icon: totalIVRLandedCallsIcon,
                                    parameter: "totalIVRLandedCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalIVRLandedCalls,
                                    description: "Total Calls landed in IVR",
                                    value: data.content.totalIVRLandedCalls
                                },
                                3: {
                                    key: "3",
                                    type: "inbound",
                                    icon: totalLostInIVRCallsIcon,
                                    parameter: "totalLostInIVRCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalLostInIVRCalls,
                                    description: "Total Calls Lost In IVR",
                                    value: data.content.totalLostInIVRCalls
                                },
                                4: {
                                    key: "4",
                                    type: "inbound",
                                    icon: totalCleanCallsInIcon,
                                    parameter: "totalCleanCallsIn",
                                    currentSetting: rx.props.liveStatsSettings.totalCleanCallsIn,
                                    description: "Total Clean Calls Inbound",
                                    value: data.content.totalCleanCallsIn
                                },
                                5: {
                                    key: "5",
                                    type: "inbound",
                                    icon: totalPhantomCallsInIcon,
                                    parameter: "totalPhantomCallsIn",
                                    currentSetting: rx.props.liveStatsSettings.totalPhantomCallsIn,
                                    description: "Total Phantom Calls Inbound",
                                    value: data.content.totalPhantomCallsIn
                                },
                                6: {
                                    key: "6",
                                    type: "inbound",
                                    icon: totalTransferredCallsIcon,
                                    parameter: "totalTransferredCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalTransferredCalls,
                                    description: "Total Transferred Calls",
                                    value: data.content.totalTransferredCalls
                                },
                                7: {
                                    key: "7",
                                    type: "inbound",
                                    icon: totalAbandonedCallsIcon,
                                    parameter: "totalAbandonedCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalAbandonedCalls,
                                    description: "Total Abandoned Calls",
                                    value: data.content.totalAbandonedCalls
                                },
                                8: {
                                    key: "8",
                                    type: "inbound",
                                    icon: percentageAbandonedCallsIcon,
                                    parameter: "percentageAbandonedCalls",
                                    currentSetting: rx.props.liveStatsSettings.percentageAbandonedCalls,
                                    description: "Percentage Abandoned Calls",
                                    value: data.content.percentageAbandonedCalls
                                },
                                9: {
                                    key: "9",
                                    type: "inbound",
                                    icon: totalVoicemailsIcon,
                                    parameter: "totalVoicemails",
                                    currentSetting: rx.props.liveStatsSettings.totalVoicemails,
                                    description: "Total Voicemails",
                                    value: data.content.totalVoicemails
                                },
                                10: {
                                    key: "10",
                                    type: "inbound",
                                    icon: totalQueueAnsweredCallsIcon,
                                    parameter: "totalQueueAnsweredCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalQueueAnsweredCalls,
                                    description: "Total Answered Queues Calls",
                                    value: data.content.totalQueueAnsweredCalls
                                },
                                11: {
                                    key: "11",
                                    type: "inbound",
                                    icon: answerSeizureRatioIcon,
                                    parameter: "answerSeizureRatio",
                                    currentSetting: rx.props.liveStatsSettings.answerSeizureRatio,
                                    description: "Answer-seizure Ratio",
                                    value: data.content.answerSeizureRatio
                                },
                                12: {
                                    key: "12",
                                    type: "inbound",
                                    icon: averageCallsAnsweredPerAgentIcon,
                                    parameter: "averageCallsAnsweredPerAgent",
                                    currentSetting: rx.props.liveStatsSettings.averageCallsAnsweredPerAgent,
                                    description: "Average Answered Calls per Agent",
                                    value: data.content.averageCallsAnsweredPerAgent
                                },
                                13: {
                                    key: "13",
                                    type: "inbound",
                                    icon: averageWaitingTimeIcon,
                                    parameter: "averageWaitingTime",
                                    currentSetting: rx.props.liveStatsSettings.averageWaitingTime,
                                    description: "Average Queue Waiting Time",
                                    value: rx.convertToTime(data.content.averageWaitingTime)
                                },
                                14: {
                                    key: "14",
                                    type: "inbound",
                                    icon: averageAbandonTimeIcon,
                                    parameter: "averageAbandonTime",
                                    currentSetting: rx.props.liveStatsSettings.averageAbandonTime,
                                    description: "Average Abandon Time",
                                    value: rx.convertToTime(data.content.averageAbandonTime)
                                },
                                15: {
                                    key: "15",
                                    type: "inbound",
                                    icon: averageInboundHandleTimeIcon,
                                    parameter: "averageInboundHandleTime",
                                    currentSetting: rx.props.liveStatsSettings.averageInboundHandleTime,
                                    description: "Average Inbound Handling Time",
                                    value: rx.convertToTime(data.content.averageInboundHandleTime)
                                },
                                16: {
                                    key: "16",
                                    type: "inbound",
                                    icon: averageInboundTalkTimeIcon,
                                    parameter: "averageInboundTalkTime",
                                    currentSetting: rx.props.liveStatsSettings.averageInboundTalkTime,
                                    description: "Average Inbound Talk Time",
                                    value: rx.convertToTime(data.content.averageInboundTalkTime)
                                },
                                17: {
                                    key: "17",
                                    type: "inbound",
                                    icon: averageSpeedOfAnswerIcon,
                                    parameter: "averageSpeedOfAnswer",
                                    currentSetting: rx.props.liveStatsSettings.averageSpeedOfAnswer,
                                    description: "Average Speed of Answer",
                                    value: rx.convertToTime(data.content.averageSpeedOfAnswer)
                                },
                                18: {
                                    key: "18",
                                    type: "inbound",
                                    icon: averageQueueTalkTimeIcon,
                                    parameter: "averageQueueTalkTime",
                                    currentSetting: rx.props.liveStatsSettings.averageQueueTalkTime,
                                    description: "Average Talk Time for Queue Calls",
                                    value: rx.convertToTime(data.content.averageQueueTalkTime)
                                },
                                19: {
                                    key: "19",
                                    type: "inbound",
                                    icon: totalInboundTalkTimeIcon,
                                    parameter: "totalInboundTalkTime",
                                    currentSetting: rx.props.liveStatsSettings.totalInboundTalkTime,
                                    description: "Total Inbound Talk Time",
                                    value: rx.convertToTime(data.content.totalInboundTalkTime)
                                },
                                20: {
                                    key: "20",
                                    type: "outbound",
                                    icon: totalOutgoingCallsIcon,
                                    parameter: "totalOutgoingCalls",
                                    currentSetting: rx.props.liveStatsSettings.totalOutgoingCalls,
                                    description: "Total Outgoing Calls",
                                    value: data.content.totalOutgoingCalls
                                },
                                21: {
                                    key: "21",
                                    type: "outbound",
                                    icon: totalCleanCallsOutIcon,
                                    parameter: "totalCleanCallsOut",
                                    currentSetting: rx.props.liveStatsSettings.totalCleanCallsOut,
                                    description: "Total Clean Calls Outbound",
                                    value: data.content.totalCleanCallsOut
                                },
                                22: {
                                    key: "22",
                                    type: "outbound",
                                    icon: totalPhantomCallsOutIcon,
                                    parameter: "totalPhantomCallsOut",
                                    currentSetting: rx.props.liveStatsSettings.totalPhantomCallsOut,
                                    description: "Total Phantom Calls Outbound",
                                    value: data.content.totalPhantomCallsOut
                                },
                                23: {
                                    key: "23",
                                    type: "outbound",
                                    icon: averageOutboundHandleTimeIcon,
                                    parameter: "averageOutboundHandleTime",
                                    currentSetting: rx.props.liveStatsSettings.averageOutboundHandleTime,
                                    description: "Average Outbound Handling Time",
                                    value: rx.convertToTime(data.content.averageOutboundHandleTime)
                                },
                                24: {
                                    key: "24",
                                    type: "outbound",
                                    icon: averageOutboundTalkTimeIcon,
                                    parameter: "averageOutboundTalkTime",
                                    currentSetting: rx.props.liveStatsSettings.averageOutboundTalkTime,
                                    description: "Average Outbound Talk Time",
                                    value: rx.convertToTime(data.content.averageOutboundTalkTime)
                                },
                                25: {
                                    key: "25",
                                    type: "outbound",
                                    icon: totalOutboundTalkTimeIcon,
                                    parameter: "totalOutboundTalkTime",
                                    currentSetting: rx.props.liveStatsSettings.totalOutboundTalkTime,
                                    description: "Total Outbound Talk Time",
                                    value: rx.convertToTime(data.content.totalOutboundTalkTime)
                                },
                                26: {
                                    key: "26",
                                    type: "performance",
                                    icon: totalAgentsLoggedInIcon,
                                    parameter: "totalAgentsLoggedIn",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsLoggedIn,
                                    description: "Current Agents Logged In",
                                    value: data.content.totalAgentsLoggedIn
                                },
                                27: {
                                    key: "27",
                                    type: "performance",
                                    icon: totalAgentsOnCallIcon,
                                    parameter: "totalAgentsOnCall",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsOnCall,
                                    description: "Current Agents On Call",
                                    value: data.content.totalAgentsOnCall
                                },
                                28: {
                                    key: "28",
                                    type: "performance",
                                    icon: totalAgentsOnAvailableStatusIcon,
                                    parameter: "totalAgentsOnAvailableStatus",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsOnAvailableStatus,
                                    description: "Current Agents Available",
                                    value: data.content.totalAgentsOnAvailableStatus
                                },
                                29: {
                                    key: "29",
                                    type: "performance",
                                    icon: totalAgentsOnBreakStatusIcon,
                                    parameter: "totalAgentsOnBreakStatus",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsOnBreakStatus,
                                    description: "Current Agents on Break",
                                    value: data.content.totalAgentsOnBreakStatus
                                },
                                30: {
                                    key: "30",
                                    type: "performance",
                                    icon: totalAgentsOnMeetingStatusIcon,
                                    parameter: "totalAgentsOnMeetingStatus",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsOnMeetingStatus,
                                    description: "Current Agents in a Meeting",
                                    value: data.content.totalAgentsOnMeetingStatus
                                },
                                31: {
                                    key: "31",
                                    type: "performance",
                                    icon: totalAgentsOnOutgoingStatusIcon,
                                    parameter: "totalAgentsOnOutgoingStatus",
                                    currentSetting: rx.props.liveStatsSettings.totalAgentsOnOutgoingStatus,
                                    description: "Current Agents set to Outbound",
                                    value: data.content.totalAgentsOnOutgoingStatus
                                },
                                32: {
                                    key: "32",
                                    type: "performance",
                                    icon: totalHoldTimeIcon,
                                    parameter: "totalHoldTime",
                                    currentSetting: rx.props.liveStatsSettings.totalHoldTime,
                                    description: "Total On Hold Time",
                                    value: rx.convertToTime(data.content.totalHoldTime)
                                },
                                33: {
                                    key: "33",
                                    type: "performance",
                                    icon: totalAgentsIcon,
                                    parameter: "totalAgents",
                                    currentSetting: rx.props.liveStatsSettings.totalAgents,
                                    description: "Total Agents",
                                    value: data.content.totalAgents
                                }
                            });
                        }
                    });
                });
            } else {
                AsyncStorage.removeItem('currentAccount');
                Actions.login();
            }
        }); 
    }

    render() {
        const { firstName, lastName, username } = this.props.account;

        closeDrawer = () => {
            this.drawer._root.close()
        };
        
        openDrawer = () => {
            this.drawer._root.open()
        }; 

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SidebarComponent 
                            navigator={this.navigator} 
                            socket={socket}
                            domain={this.props.domain}
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            profilePicture={this.props.account.photo ? "https://"+this.props.domain+"/storage/"+this.props.account.photo : ""}
                            setLogout={this.props.setLogout}
                            currentPage={"home"} />}
                onClose={() => closeDrawer()} >
                <View style={{flex:1}}>
                    <LiveHeader title={"Live KPIs"}
                                setSettingsModal={this.props.setSettingsModal}
                                lastRefresh={this.props.lastRefresh} />
                    { (this.props.isInternetConnected == "no") && 
                        <OfflineSignComponent />
                    }
                    {this.props.liveStats &&
                        <Live 
                            liveStats={this.props.liveStats}                                            
                            order={this.props.order}
                            setOrder={this.props.setOrder}
                            updateLiveStatSetting={this.props.updateLiveStatSetting} 
                        />
                        ||
                        <Spinner color='#A62A7C' />
                    }
                </View>
                <SettingsModal
                    setSettingsModal={this.props.setSettingsModal}
                    showSettingsModal={this.props.showSettingsModal}
                    liveStatsSettings={this.props.liveStatsSettings}
                    updateLiveStatSetting={this.props.updateLiveStatSetting}
                    totalACDCallsIcon={totalACDCallsIcon}
                    totalIVRLandedCallsIcon={totalIVRLandedCallsIcon}
                    totalLostInIVRCallsIcon={totalLostInIVRCallsIcon}
                    totalCleanCallsInIcon={totalCleanCallsInIcon}
                    totalPhantomCallsInIcon={totalPhantomCallsInIcon}
                    totalTransferredCallsIcon={totalTransferredCallsIcon}
                    totalAbandonedCallsIcon={totalAbandonedCallsIcon}
                    percentageAbandonedCallsIcon={percentageAbandonedCallsIcon}
                    totalVoicemailsIcon={totalVoicemailsIcon}
                    totalQueueAnsweredCallsIcon={totalQueueAnsweredCallsIcon}
                    answerSeizureRatioIcon={answerSeizureRatioIcon}
                    averageCallsAnsweredPerAgentIcon={averageCallsAnsweredPerAgentIcon}
                    averageWaitingTimeIcon={averageWaitingTimeIcon}
                    averageAbandonTimeIcon={averageAbandonTimeIcon}
                    averageInboundHandleTimeIcon={averageInboundHandleTimeIcon}
                    averageInboundTalkTimeIcon={averageInboundTalkTimeIcon}
                    averageSpeedOfAnswerIcon={averageSpeedOfAnswerIcon}
                    averageQueueTalkTimeIcon={averageQueueTalkTimeIcon}
                    totalInboundTalkTimeIcon={totalInboundTalkTimeIcon}
                    totalOutgoingCallsIcon={totalOutgoingCallsIcon}
                    totalCleanCallsOutIcon={totalCleanCallsOutIcon}
                    totalPhantomCallsOutIcon={totalPhantomCallsOutIcon}
                    averageOutboundHandleTimeIcon={averageOutboundHandleTimeIcon}
                    averageOutboundTalkTimeIcon={averageOutboundTalkTimeIcon}
                    totalOutboundTalkTimeIcon={totalOutboundTalkTimeIcon}
                    totalAgentsLoggedInIcon={totalAgentsLoggedInIcon}
                    totalAgentsOnCallIcon={totalAgentsOnCallIcon}
                    totalAgentsOnAvailableStatusIcon={totalAgentsOnAvailableStatusIcon}
                    totalAgentsOnBreakStatusIcon={totalAgentsOnBreakStatusIcon}
                    totalAgentsOnMeetingStatusIcon={totalAgentsOnMeetingStatusIcon}
                    totalAgentsOnOutgoingStatusIcon={totalAgentsOnOutgoingStatusIcon}
                    totalHoldTimeIcon={totalHoldTimeIcon}
                    totalAgentsIcon={totalAgentsIcon} />
            </Drawer>
        );
    }
}

export default Home;