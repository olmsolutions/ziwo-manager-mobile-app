import update from "react-addons-update";
import constants from "./actionConstants";
import request from "../../../util/request";

//--------------------
//Constants
//--------------------
const { 
	CONNECTION_STATUS,
    SET_AGENTS_LIST,
    SET_AGENTS_MODAL,
	SET_CURRENT_AGENT,
	SET_AGENT_LIVE_STATISTICS,
	SET_AGENT_TOTAL_TIME_SPENT,
	SET_AGENTS_FILTER_MODAL,
	SET_AGENTS_FILTER,
	STATE_RESET,
	SET_LOGOUT,
	SET_AGENT_TIMER,
	SET_ALL_AGENTS_LIST
} = constants;

//--------------------
//Actions
//--------------------
export function setAllAgentsList(payload) {
	return {
		type: SET_ALL_AGENTS_LIST,
		payload
	}
}

export function setAgentTimer(payload) {
	return {
		type: SET_AGENT_TIMER,
		payload
	}
}

export function setAgentList(payload) {
	return {
		type: SET_AGENTS_LIST,
		payload
	}
}

export function clearState(payload) {
	return {
		type: STATE_RESET,
		payload
	}
}

export function setLogout(payload) {
	return {
		type: SET_LOGOUT,
		payload
	}
}

export function setAgentsFilter(payload) {
	return {
		type: SET_AGENTS_FILTER,
		payload
	}
}

export function setAgentsFilterModal(payload) {
	return {
		type: SET_AGENTS_FILTER_MODAL,
		payload
	}
}

export function setCurrentAgent(payload) {
	return {
		type: SET_CURRENT_AGENT,
		payload
	}
}

export function setConnectionStatus(payload) {
	return {
		type: CONNECTION_STATUS,
		payload
	}
}

export function setAgentsModal(payload) {
	return {
		type: SET_AGENTS_MODAL,
		payload
	}
}

export function setAgentTotalTimeSpent(payload) {
	return {
		type: SET_AGENT_TOTAL_TIME_SPENT,
		payload
	}
}

export function setAgentLiveStatistics(payload) {
	return {
		type: SET_AGENT_LIVE_STATISTICS,
		payload
	}
}

export function getAgentTotalTimeSpent() {
	return(dispatch, store) => {
		if(store().agents.isInternetConnected == "yes") {	
			request.get("https://"+store().login.domain+"/statistics/resources/agents/by/agents?rollingDate=today")
			.set({'access_token': store().login.account.access_token,
					'cache-control': 'no-cache'})
			.finish((error, res)=>{			
				if (!error) {
					var objAgents = res.body.content;
					for (var key in objAgents) if (objAgents.hasOwnProperty(key)) {
						var value = objAgents[key];
						if (key == store().agents.currentAgent.id) {
							var lastTime = {
											"oncall": 0,
											"onbreak": value["On Break"],
											"loggedin": value.All
											}

							dispatch({
								type: SET_AGENT_TOTAL_TIME_SPENT,
								payload: lastTime
							});
						}
					}
				}
			});
		}
	}
}

//--------------------
//Action Handlers
//--------------------
function handleConnectionStatus(state, action) {
	return update(state, {
		isInternetConnected:{
			$set:action.payload
		}
	});
}

function handleSetAgentsList(state, action) {
	return update(state, {
		agentsList:{
			$set:action.payload
		}
	});
}

function handleSetAgentsModal(state, action) {
	return update(state, {
		showAgentsModal:{
			$set:action.payload
		}
	});
}

function handleSetCurrentAgent(state, action) {
	return update(state, {
		currentAgent:{
			$set:action.payload
		}
	});
}

function handleSetAgentLiveStatistics(state, action) {
	return update(state, {
		agentLiveStatistics:{
			$set:action.payload
		}
	});
}

function handleSetAgentsFilterModal(state, action) {
	return update(state, {
		showAgentsFilterModal:{
			$set:action.payload
		}
	});
}

function handleSetAgentsFilter(state, action) {
	return update(state, {
		agentsFilter:{
			$set:action.payload
		}
	});
}

function handleSetLogout(state, action) {
	return update(state, {
		isLogout:{
			$set:action.payload
		}
	});
}

function handleSetAgentTotalTimeSpent(state, action) {
	return update(state, {
		agentTotalTimeSpent:{
			$set:action.payload
		}
	});
}

function handleSetAgentTimer(state, action) {
	return update(state, {
		agentTimer:{
			$set:action.payload
		}
	});
}

function handleSetAllAgentsList(state, action) {
	return update(state, {
		allAgentsList:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
	CONNECTION_STATUS: handleConnectionStatus,
    SET_AGENTS_LIST: handleSetAgentsList,
    SET_AGENTS_MODAL: handleSetAgentsModal,
	SET_CURRENT_AGENT: handleSetCurrentAgent,
	SET_AGENT_LIVE_STATISTICS: handleSetAgentLiveStatistics,
	SET_AGENT_TOTAL_TIME_SPENT: handleSetAgentTotalTimeSpent,
	SET_AGENTS_FILTER_MODAL: handleSetAgentsFilterModal,
	SET_AGENTS_FILTER: handleSetAgentsFilter,
	SET_LOGOUT: handleSetLogout,
	SET_AGENT_TIMER: handleSetAgentTimer,
	SET_ALL_AGENTS_LIST: handleSetAllAgentsList
}

const initialState = {
	isInternetConnected: "yes",
	showAgentsModal: false,
	showAgentsFilterModal: false,
	agentsFilter: ['Available','On Break','Meeting','Outgoing','Logged Out'],
	isLogout: false,
	agentTimer: 0,
	allAgentsList: []
};

export function AgentsReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}