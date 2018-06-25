import update from "react-addons-update";
import constants from "./actionConstants";
import request from "../../../util/request";
var dateFormat = require('dateformat');

//--------------------
//Constants
//--------------------
const { 
	CONNECTION_STATUS,
	SET_CALL_HISTORY_LOADING_STATUS,
	SET_CALL_HISTORY,
	SET_CURRENT_CALL,
	SET_CALL_LOADER,
	SET_FILTER_BY,
	SET_SELECTED_DATE,
	SET_CALL_FILTER_MODAL,
	SET_SELECTED_DAY_FILTER,
	SET_SELECTED_WEEK_FILTER,
	SET_SELECTED_MONTH_FILTER,
	SET_TEMP_SELECTED_DATE,
	SET_AGENTS_NUMBER_MODAL,
	SET_AGENTS_LIST,
	SET_NUMBERS_LIST,
	SET_SELECTED_AGENTS,
	SET_SELECTED_NUMBERS,
	SET_AGENT_LIST_LOADING,
	SET_NUMBER_LIST_LOADING,
	SET_CONTACT_TAB,
	SET_CALL_FILTER_TAB,
	SET_SEARCH_AGENT_TERM,
	SET_SEARCH_NUMBER_TERM,
	SET_PAGINATION,
	SET_INFINITE_SCROLL_LOADING,
	SET_CONTACT_NUMBER,
	SET_TEMP_CONTACT_NUMBER,
	SET_TRACK_TIMER,
	SET_NEXT_DATE_DISABLE,
	STATE_RESET,
	SET_LOGOUT,
	SET_SCROLLED_STATUS,
	SET_CALL_HISTORY_LENGTH
} = constants;

//--------------------
//Actions
//--------------------
export function setScrolledStatus(payload) {
	return {
		type: SET_SCROLLED_STATUS,
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

export function setNextDateDisable(payload) {
	return {
		type: SET_NEXT_DATE_DISABLE,
		payload
	}
}

export function setTrackTimer(payload) {
	return {
		type: SET_TRACK_TIMER,
		payload
	}
}

export function setContactNumber(payload) {
	return {
		type: SET_CONTACT_NUMBER,
		payload
	}
}

export function setTempContactNumber(payload) {
	return {
		type: SET_TEMP_CONTACT_NUMBER,
		payload
	}
}

export function setPagination(payload) {
	return {
		type: SET_PAGINATION,
		payload
	}
}

export function setSearchAgentTerm(payload) {
	return {
		type: SET_SEARCH_AGENT_TERM,
		payload
	}
}

export function setSearchNumberTerm(payload) {
	return {
		type: SET_SEARCH_NUMBER_TERM,
		payload
	}
}

export function setSelectedAgents(payload) {
	return {
		type: SET_SELECTED_AGENTS,
		payload
	}
}

export function setSelectedNumbers(payload) {
	return {
		type: SET_SELECTED_NUMBERS,
		payload
	}
}

export function setAgentsNumberModal(payload) {
	return {
		type: SET_AGENTS_NUMBER_MODAL,
		payload
	}
}

export function setTempSelectedDate(payload) {
	return {
		type: SET_TEMP_SELECTED_DATE,
		payload
	}
}

export function setSelectedDayFilter(payload) {
	return {
		type: SET_SELECTED_DAY_FILTER,
		payload
	}
}

export function setSelectedWeekFilter(payload) {
	return {
		type: SET_SELECTED_WEEK_FILTER,
		payload
	}
}

export function setSelectedMonthFilter(payload) {
	return {
		type: SET_SELECTED_MONTH_FILTER,
		payload
	}
}

export function setContactTab(payload) {
	return {
		type: SET_CONTACT_TAB,
		payload
	}
}

export function setCallFilterTab(payload) {
	return {
		type: SET_CALL_FILTER_TAB,
		payload
	}
}

export function setCallFilterModal(payload) {
	return {
		type: SET_CALL_FILTER_MODAL,
		payload
	}
}

export function setSelectedDate(payload) {
	return {
		type: SET_SELECTED_DATE,
		payload
	}
}

export function setFilterBy(payload) {
	return {
		type: SET_FILTER_BY,
		payload
	}
}

export function setCallLoader(payload) {
	return {
		type: SET_CALL_LOADER,
		payload
	}
}

export function setConnectionStatus(payload) {
	return {
		type: CONNECTION_STATUS,
		payload
	}
}

export function setCurrentCall(payload) {
	return {
		type: SET_CURRENT_CALL,
		payload
	}
}

export function getCallHistory() {
	return(dispatch, store) => {
		if(store().calls.isInternetConnected == "yes") {	
			if (store().calls.pagination.fetchStart == 1) {
				dispatch({
					type: SET_CALL_HISTORY_LENGTH,
					payload: 0
				});
				
				dispatch({
					type: SET_CALL_HISTORY,
					payload: []
				});

				if (store().calls.isInfiniteScrollLoading) {
					dispatch({
						type: SET_INFINITE_SCROLL_LOADING,
						payload: false
					});
				}

				dispatch({
					type: SET_CALL_HISTORY_LOADING_STATUS,
					payload: true
				});
			} else {
				dispatch({
					type: SET_INFINITE_SCROLL_LOADING,
					payload: true
				});
			}
			
			var url = "https://"+store().login.domain+"/callHistory/";
			var query = "fetchStart="+store().calls.pagination.fetchStart+"&fetchStop="+store().calls.pagination.fetchStop;

			if (store().calls.selectedDate.fromDate != "") {
				query = query + "&fromDate="+dateFormat(store().calls.selectedDate.fromDate, "yyyy-mm-dd");
			}

			if (store().calls.selectedDate.toDate != "") {
				query = query + "&toDate="+dateFormat(store().calls.selectedDate.toDate, "yyyy-mm-dd");
			}	

			if (store().calls.selectedAgents.length > 0) {
				query = query + "&agents="+store().calls.selectedAgents;
			}

			if (store().calls.selectedNumbers.length > 0) {
				query = query + "&numbers="+store().calls.selectedNumbers;
			}

			if (store().calls.contactNumber != "") {
				query = query + "&contactNumber="+store().calls.contactNumber;
			}

			request.get(url + (query != "" ? "?"+query : ""))
			.set({'access_token': store().login.account.access_token,
					'cache-control': 'no-cache'})
			.finish((error, res)=>{
				if (store().calls.pagination.fetchStart == 1) {
					dispatch({
						type: SET_CALL_HISTORY_LOADING_STATUS,
						payload: false
					});
				} else {
					dispatch({
						type: SET_INFINITE_SCROLL_LOADING,
						payload: false
					});
				}

				if (!error) {
					if (store().calls.pagination.fetchStart == 1) {
						dispatch({
							type: SET_CALL_HISTORY,
							payload: res.body.content
						});
					} else {
						var callHistory = store().calls.callHistory;
						for (i = 0; i < res.body.content.length; i++) { 
							callHistory.push(res.body.content[i]);
						}

						dispatch({
							type: SET_CALL_HISTORY,
							payload: callHistory
						});
					}

					dispatch({
						type: SET_CALL_HISTORY_LENGTH,
						payload: store().calls.callHistory.length
					});
				}
			});
		}
	}
}

export function getAgentsList() {
	return(dispatch, store) => {
		if(store().calls.isInternetConnected == "yes") {
			dispatch({
				type: SET_AGENT_LIST_LOADING,
				payload: true
			});
			
			var url = "https://"+store().login.domain+"/admin/agents/";

			request.get(url)
			.set({'access_token': store().login.account.access_token,
					'cache-control': 'no-cache'})
			.finish((error, res)=>{
				dispatch({
					type: SET_AGENT_LIST_LOADING,
					payload: false
				});

				if (!error) {
					dispatch({
						type: SET_AGENTS_LIST,
						payload: res.body.content						
					});
				}
			});
		}
	}
}

export function getNumbersList() {
	return(dispatch, store) => {
		if(store().calls.isInternetConnected == "yes") {
			dispatch({
				type: SET_NUMBER_LIST_LOADING,
				payload: true
			});
			
			var url = "https://"+store().login.domain+"/admin/numbers/";
			request.get(url)
			.set({'access_token': store().login.account.access_token,
					'cache-control': 'no-cache'})
			.finish((error, res)=>{
				dispatch({
					type: SET_NUMBER_LIST_LOADING,
					payload: false
				});

				if (!error) {
					dispatch({
						type: SET_NUMBERS_LIST,
						payload: res.body.content
					});
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

function handleSetCallHistoryLoadingStatus(state, action) {
	return update(state, {
		isCallHistoryLoading:{
			$set:action.payload
		}
	});
}

function handleSetCallHistory(state, action) {
	return update(state, {
		callHistory:{
			$set:action.payload
		}
	});
}

function handleSetCurrentCall(state, action) {
	return update(state, {
		currentCall:{
			$set:action.payload
		}
	});
}

function handleSetCallLoader(state, action) {
	return update(state, {
		isCallLoading:{
			$set:action.payload
		}
	});
}

function handleSetFilterBy(state, action) {
	return update(state, {
		filterBy:{
			$set:action.payload
		}
	});
}

function handleSetSelectedDate(state, action) {
	return update(state, {
		selectedDate:{
			$set:action.payload
		}
	});
}

function handleSetTempSelectedDate(state, action) {
	return update(state, {
		tempSelectedDate:{
			$set:action.payload
		}
	});
}

function handleSetCallFilterModal(state, action) {
	return update(state, {
		showCallFilterModal:{
			$set:action.payload
		}
	});
}

function handleSetContactTab(state, action) {
	return update(state, {
		selectedContactTab:{
			$set:action.payload
		}
	});
}

function handleSetCallFilterTab(state, action) {
	return update(state, {
		selectedCallFilterTab:{
			$set:action.payload
		}
	});
}

function handleSetSelectedDayFilter(state, action) {
	if (action.payload == "today") {
		return update(state, {
			selectedDayFilter:{
				$set:{ today: true, yesterday: false }
			}
		});
	} else {
		return update(state, {
			selectedDayFilter:{
				$set:{ today: false, yesterday: true }
			}
		});
	}
}

function handleSetSelectedWeekFilter(state, action) {
	if (action.payload == "last7days") {
		return update(state, {
			selectedWeekFilter:{
				$set:{ last7days: true, thisWeek: false, lastWeek: false }
			}
		});
	} else if (action.payload == "thisWeek") {
		return update(state, {
			selectedWeekFilter:{
				$set:{ last7days: false, thisWeek: true, lastWeek: false }
			}
		});
	} else {
		return update(state, {
			selectedWeekFilter:{
				$set:{ last7days: false, thisWeek: false, lastWeek: true }
			}
		});
	}
}

function handleSetSelectedMonthFilter(state, action) {
	if (action.payload == "last30days") {
		return update(state, {
			selectedMonthFilter:{
				$set:{ last30days: true, thisMonth: false, lastMonth: false }
			}
		});
	} else if (action.payload == "thisMonth") {
		return update(state, {
			selectedMonthFilter:{
				$set:{ last30days: false, thisMonth: true, lastMonth: false }
			}
		});
	} else {
		return update(state, {
			selectedMonthFilter:{
				$set:{ last30days: false, thisMonth: false, lastMonth: true }
			}
		});
	}
}

function handleSetAgentsNumberModal(state, action) {
	return update(state, {
		showAgentsNumberModal:{
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

function handleSetAgentLoadingStatus(state, action) {
	return update(state, {
		isAgentsListLoading:{
			$set:action.payload
		}
	});
}

function handleSetNumbersList(state, action) {
	return update(state, {
		numbersList:{
			$set:action.payload
		}
	});
}

function handleSetNumberLoadingStatus(state, action) {
	return update(state, {
		isNumberListLoading:{
			$set:action.payload
		}
	});
}

function handleSetSelectedAgents(state, action) {
	return update(state, {
		selectedAgents:{
			$set:action.payload
		}
	});
}

function handleSetSelectedNumbers(state, action) {
	return update(state, {
		selectedNumbers:{
			$set:action.payload
		}
	});
}

function handleSetAgentListLoading(state, action) {
	return update(state, {
		isAgentListLoading:{
			$set:action.payload
		}
	});
}

function handleSetNumberListLoading(state, action) {
	return update(state, {
		isNumberListLoading:{
			$set:action.payload
		}
	});
}

function handleSetSearchAgentTerm(state, action) {
	return update(state, {
		searchAgentTerm:{
			$set:action.payload
		}
	});
}

function handleSetSearchNumberTerm(state, action) {
	return update(state, {
		searchNumberTerm:{
			$set:action.payload
		}
	});
}

function handleSetPagination(state, action) {
	return update(state, {
		pagination:{
			$set:action.payload
		}
	});
}

function handleInfiniteScrollLoading(state, action) {
	return update(state, {
		isInfiniteScrollLoading:{
			$set:action.payload
		}
	});
}

function handleSetContactNumber(state, action) {
	return update(state, {
		contactNumber:{
			$set:action.payload
		}
	});
}

function handleSetTempContactNumber(state, action) {
	return update(state, {
		tempContactNumber:{
			$set:action.payload
		}
	});
}

function handleSetTrackTimer(state, action) {
	return update(state, {
		trackTimer:{
			$set:action.payload
		}
	});
}

function handleSetNextDateDisable(state, action) {
	return update(state, {
		isNextDateDisable:{
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

function handleSetScrolledStatus(state, action) {
	return update(state, {
		isListScrolled:{
			$set:action.payload
		}
	});
}

function handleSetCallHistoryLength(state, action) {
	return update(state, {
		callHistoryLength:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
	CONNECTION_STATUS: handleConnectionStatus,
	SET_CALL_HISTORY_LOADING_STATUS: handleSetCallHistoryLoadingStatus,
	SET_CALL_HISTORY: handleSetCallHistory,
	SET_CURRENT_CALL: handleSetCurrentCall,
	SET_CALL_LOADER: handleSetCallLoader,
	SET_FILTER_BY: handleSetFilterBy,
	SET_SELECTED_DATE: handleSetSelectedDate,
	SET_CALL_FILTER_MODAL: handleSetCallFilterModal,
	SET_SELECTED_DAY_FILTER: handleSetSelectedDayFilter,
	SET_SELECTED_WEEK_FILTER: handleSetSelectedWeekFilter,
	SET_SELECTED_MONTH_FILTER: handleSetSelectedMonthFilter,
	SET_TEMP_SELECTED_DATE: handleSetTempSelectedDate,
	SET_AGENTS_NUMBER_MODAL: handleSetAgentsNumberModal,
	SET_CONTACT_TAB: handleSetContactTab,
	SET_CALL_FILTER_TAB: handleSetCallFilterTab,
	SET_AGENTS_LIST: handleSetAgentsList,
	SET_NUMBERS_LIST: handleSetNumbersList,	
	SET_SELECTED_AGENTS: handleSetSelectedAgents,
	SET_SELECTED_NUMBERS: handleSetSelectedNumbers,
	SET_AGENT_LIST_LOADING: handleSetAgentListLoading,
	SET_NUMBER_LIST_LOADING: handleSetNumberListLoading,
	SET_SEARCH_AGENT_TERM: handleSetSearchAgentTerm,
	SET_SEARCH_NUMBER_TERM: handleSetSearchNumberTerm,
	SET_PAGINATION: handleSetPagination,
	SET_INFINITE_SCROLL_LOADING: handleInfiniteScrollLoading,
	SET_CONTACT_NUMBER: handleSetContactNumber,
	SET_TEMP_CONTACT_NUMBER: handleSetTempContactNumber,
	SET_TRACK_TIMER: handleSetTrackTimer,
	SET_NEXT_DATE_DISABLE: handleSetNextDateDisable,
	SET_LOGOUT: handleSetLogout,
	SET_SCROLLED_STATUS: handleSetScrolledStatus,
	SET_CALL_HISTORY_LENGTH: handleSetCallHistoryLength
}

const initialState = {
	isInternetConnected: "yes",
	isCallHistoryLoading: false,
	isAgentListLoading: false,
	isNumberListLoading: false,
	isCallLoading: false,
	filterBy: "day",
	showCallFilterModal: false,
	selectedDayFilter: { today: true, yesterday: false },
	selectedWeekFilter: { last7days: true, thisWeek: false, lastWeek: false },
	selectedMonthFilter: { last30days: true, thisMonth: false, lastMonth: false },
	selectedAgents: [],
	selectedNumbers: [],
	currentCall: null,
	selectedCallFilterTab: 0,
	selectedContactTab: 0,
	searchAgentTerm: "",
	searchNumberTerm: "",
	selectedDate: {
		fromDate: new Date(),
		toDate: new Date()
	},
	pagination: { fetchStart: 1, fetchStop: 10 },
	isInfiniteScrollLoading: false,
	contactNumber: "",
	setContactNumber: "",
	trackTimer: "",
	isNextDateDisable: false,
	isLogout: false,
	callHistoryLength: 0
};

export function CallsReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}