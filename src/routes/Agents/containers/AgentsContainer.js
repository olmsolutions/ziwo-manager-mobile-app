import { connect } from "react-redux";
import Agents from "../components/Agents";
import {
    setConnectionStatus,
    setAgentList,
    setAgentsModal,
    setCurrentAgent,
    setAgentLiveStatistics,
    getAgentTotalTimeSpent,
    setAgentTotalTimeSpent,
    setAgentsFilterModal,
    setAgentsFilter,
    clearState,
    setLogout,
    setAgentTimer,
    setAllAgentsList
} from "../modules/agents";

const mapStateToProps = (state) => ({  
    account: state.login.account || {},
    domain: state.login.domain || "",
    isInternetConnected: state.home.isInternetConnected || "yes", 
    agentsList: state.agents.agentsList,
    allAgentsList: state.agents.allAgentsList || [],
    showAgentsModal: state.agents.showAgentsModal || false,
    showAgentsFilterModal: state.agents.showAgentsFilterModal || false,
    currentAgent: state.agents.currentAgent,
    agentLiveStatistics: state.agents.agentLiveStatistics,
    agentTotalTimeSpent: state.agents.agentTotalTimeSpent,
    agentsFilter: state.agents.agentsFilter || ['Available','On Break','Meeting','Outgoing','Logged Out'],
    isLogout: state.home.isLogout || false,
    agentTimer: state.agents.agentTimer || 0
});

const mapActionCreators = {
    setConnectionStatus,
    setAgentList,
    setAgentsModal,
    setCurrentAgent,
    setAgentLiveStatistics,
    getAgentTotalTimeSpent,
    setAgentTotalTimeSpent,
    setAgentsFilterModal,
    setAgentsFilter,
    clearState,
    setLogout,
    setAgentTimer,
    setAllAgentsList
};

export default connect(mapStateToProps, mapActionCreators)(Agents);
