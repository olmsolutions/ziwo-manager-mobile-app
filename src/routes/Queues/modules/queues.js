import update from "react-addons-update";
import constants from "./actionConstants";

//--------------------
//Constants
//--------------------
const { 
	CONNECTION_STATUS,
    SET_QUEUES_LIST,
    SET_QUEUES_MODAL,
	SET_CURRENT_QUEUE,
	SET_CURRENT_CUSTOMER_WAITING,
	SET_ASSIGNED_AND_AVAILABLE_AGENTS,
	SET_TOTAL_CALLS_LANDED_IN_QUEUE,
	SET_QUEUES_FILTER_MODAL,
	SET_QUEUES_FILTER,
	SET_QUEUES_FILTER_LIST,
	STATE_RESET,
	SET_LOGOUT
} = constants;

//--------------------
//Actions
//--------------------
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

export function setQueuesFilter(payload) {
	return {
		type: SET_QUEUES_FILTER,
		payload
	}
}

export function setQueuesFilterModal(payload) {
	return {
		type: SET_QUEUES_FILTER_MODAL,
		payload
	}
}

export function setCurrentQueue(payload) {
	return {
		type: SET_CURRENT_QUEUE,
		payload
	}
}

export function setConnectionStatus(payload) {
	return {
		type: CONNECTION_STATUS,
		payload
	}
}

export function setQueuesModal(payload) {
	return {
		type: SET_QUEUES_MODAL,
		payload
	}
}

export function setAssignedAndAvailableAgents(payload) {
	return {
		type: SET_ASSIGNED_AND_AVAILABLE_AGENTS,
		payload
	}
}

export function setCurrentCustomerWaiting(payload) {
	return {
		type: SET_CURRENT_CUSTOMER_WAITING,
		payload
	}
}

export function setQueueFilterList(payload) {
	return {
		type: SET_QUEUES_FILTER_LIST,
		payload
	}
}

export function setQueueList(payload) {
	return {
		type: SET_QUEUES_LIST,
		payload
	}
}

export function setTotalCallsLandedInQueue(payload) {
	return {
		type: SET_TOTAL_CALLS_LANDED_IN_QUEUE,
		payload
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

function handleSetQueuesList(state, action) {
	return update(state, {
		queuesList:{
			$set:action.payload
		}
	});
}

function handleSetQueuesModal(state, action) {
	return update(state, {
		showQueuesModal:{
			$set:action.payload
		}
	});
}

function handleSetCurrentQueue(state, action) {
	return update(state, {
		currentQueue:{
			$set:action.payload
		}
	});
}

function handleSetCurrentCustomerWaiting(state, action) {
	return update(state, {
		currentCustomerWaiting:{
			$set:action.payload
		}
	});
}

function handleSetAssignedAndAvailableAgents(state, action) {
	return update(state, {
		assignedAndAvailableAgents:{
			$set:action.payload
		}
	});
}

function handleSetTotalCallsLandedInQueue(state, action) {
	return update(state, {
		totalCallsLandedInQueue:{
			$set:action.payload
		}
	});
}

function handleSetQueuesFilterModal(state, action) {
	return update(state, {
		showQueuesFilterModal:{
			$set:action.payload
		}
	});
}

function handleSetQueuesFilter(state, action) {
	return update(state, {
		queuesFilter:{
			$set:action.payload
		}
	});
}

function handleSetQueuesFilterList(state, action) {
	return update(state, {
		queuesFilterList:{
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

const ACTION_HANDLERS = {
	CONNECTION_STATUS: handleConnectionStatus, 
    SET_QUEUES_LIST: handleSetQueuesList,
    SET_QUEUES_MODAL: handleSetQueuesModal,
	SET_CURRENT_QUEUE: handleSetCurrentQueue,
	SET_CURRENT_CUSTOMER_WAITING: handleSetCurrentCustomerWaiting,
	SET_ASSIGNED_AND_AVAILABLE_AGENTS: handleSetAssignedAndAvailableAgents,
	SET_TOTAL_CALLS_LANDED_IN_QUEUE: handleSetTotalCallsLandedInQueue,
	SET_QUEUES_FILTER_MODAL: handleSetQueuesFilterModal,
	SET_QUEUES_FILTER: handleSetQueuesFilter,
	SET_QUEUES_FILTER_LIST: handleSetQueuesFilterList,
	SET_LOGOUT: handleSetLogout
}

const initialState = {
	isInternetConnected: "yes",
	showQueuesModal: false,
	showQueuesFilterModal: false,
	queuesFilter: [],
	isLogout: false
};

export function QueuesReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}