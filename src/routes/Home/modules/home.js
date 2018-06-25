import update from "react-addons-update";
import constants from "./actionConstants";
import { AsyncStorage } from "react-native";

//--------------------
//Constants
//--------------------
const { 
	SET_LIVE_STATS,
	SET_LIVE_STATS_SETTINGS,
	CONNECTION_STATUS,
	UPDATE_LIVE_STAT_SETTING,
	SET_SETTINGS_MODAL,
	STATE_RESET,
	SET_LOGOUT,
	SET_LAST_REFRESH,
	SET_ORDER,
	SET_SLA
} = constants;

//--------------------
//Actions
//--------------------
export function setSLA(payload) {
	return {
		type: SET_SLA,
		payload
	}
}

export function setOrder(payload) {
	return {
		type: SET_ORDER,
		payload
	}
}

export function setLastRefresh(payload) {
	return {
		type: SET_LAST_REFRESH,
		payload
	}
}

export function setLogout(payload) {
	return {
		type: SET_LOGOUT,
		payload
	}
}

export function setConnectionStatus(payload) {
	return {
		type: CONNECTION_STATUS,
		payload
	}
}

export function setLiveStats(payload) {
    return {
		type: SET_LIVE_STATS,
		payload
	}
}

export function setLiveStatsSettings(payload) {
    return {
		type: SET_LIVE_STATS_SETTINGS,
		payload
	}
}

export function updateLiveStatSetting(payload) {
	return (dispatch, store) => {
        dispatch({
			type: UPDATE_LIVE_STAT_SETTING,
			payload: payload
		});

		AsyncStorage.setItem('liveStatsSettings', JSON.stringify(store().home.liveStatsSettings));
	}
}

export function setSettingsModal(payload) {
	return {
		type: SET_SETTINGS_MODAL,
		payload
	}
}

export function clearState(payload) {
	return {
		type: STATE_RESET,
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

function handleSetLiveStats(state, action) {
    return update(state, {
	    liveStats:{
			$set:action.payload
		}
	});
}

function handleSetLiveStatsSettings(state, action) {
    return update(state, {
	    liveStatsSettings:{
			$set:action.payload
		}
	});
}

function handleUpdateLiveStatSetting(state, action) {
	const { setting, value } = action.payload;

	if (setting == "totalACDCalls") {
		return update(state, {
			liveStatsSettings: {
				totalACDCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalCleanCallsIn") {
		return update(state, {
			liveStatsSettings: {
				totalCleanCallsIn: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalIVRLandedCalls") {
		return update(state, {
			liveStatsSettings: {
				totalIVRLandedCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalTransferredCalls") {
		return update(state, {
			liveStatsSettings: {
				totalTransferredCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalLostInIVRCalls") {
		return update(state, {
			liveStatsSettings: {
				totalLostInIVRCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalPhantomCallsIn") {
		return update(state, {
			liveStatsSettings: {
				totalPhantomCallsIn: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAbandonedCalls") {
		return update(state, {
			liveStatsSettings: {
				totalAbandonedCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "percentageAbandonedCalls") {
		return update(state, {
			liveStatsSettings: {
				percentageAbandonedCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalVoicemails") {
		return update(state, {
			liveStatsSettings: {
				totalVoicemails: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalQueueAnsweredCalls") {
		return update(state, {
			liveStatsSettings: {
				totalQueueAnsweredCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "answerSeizureRatio") {
		return update(state, {
			liveStatsSettings: {
				answerSeizureRatio: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageCallsAnsweredPerAgent") {
		return update(state, {
			liveStatsSettings: {
				averageCallsAnsweredPerAgent: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageWaitingTime") {
		return update(state, {
			liveStatsSettings: {
				averageWaitingTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageAbandonTime") {
		return update(state, {
			liveStatsSettings: {
				averageAbandonTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageInboundHandleTime") {
		return update(state, {
			liveStatsSettings: {
				averageInboundHandleTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageInboundTalkTime") {
		return update(state, {
			liveStatsSettings: {
				averageInboundTalkTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageSpeedOfAnswer") {
		return update(state, {
			liveStatsSettings: {
				averageSpeedOfAnswer: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageQueueTalkTime") {
		return update(state, {
			liveStatsSettings: {
				averageQueueTalkTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalInboundTalkTime") {
		return update(state, {
			liveStatsSettings: {
				totalInboundTalkTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsOnAvailableStatus") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsOnAvailableStatus: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalOutgoingCalls") {
		return update(state, {
			liveStatsSettings: {
				totalOutgoingCalls: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalCleanCallsOut") {
		return update(state, {
			liveStatsSettings: {
				totalCleanCallsOut: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalPhantomCallsOut") {
		return update(state, {
			liveStatsSettings: {
				totalPhantomCallsOut: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageOutboundHandleTime") {
		return update(state, {
			liveStatsSettings: {
				averageOutboundHandleTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "averageOutboundTalkTime") {
		return update(state, {
			liveStatsSettings: {
				averageOutboundTalkTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalOutboundTalkTime") {
		return update(state, {
			liveStatsSettings: {
				totalOutboundTalkTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsLoggedIn") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsLoggedIn: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsOnCall") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsOnCall: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsOnBreakStatus") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsOnBreakStatus: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsOnMeetingStatus") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsOnMeetingStatus: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgentsOnOutgoingStatus") {
		return update(state, {
			liveStatsSettings: {
				totalAgentsOnOutgoingStatus: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalHoldTime") {
		return update(state, {
			liveStatsSettings: {
				totalHoldTime: {
					$set: value,
				}
			}
		});
	} else if (setting == "totalAgents") {
		return update(state, {
			liveStatsSettings: {
				totalAgents: {
					$set: value,
				}
			}
		});
	} else if (setting == "all") {
		return update(state, {
			liveStatsSettings: {
				totalACDCalls: {
					$set: value,
				},
				totalCleanCallsIn: {
					$set: value,
				},
				totalIVRLandedCalls: {
					$set: value,
				},
				totalTransferredCalls: {
					$set: value,
				},
				totalLostInIVRCalls: {
					$set: value,
				},
				totalPhantomCallsIn: {
					$set: value,
				},
				totalAbandonedCalls: {
					$set: value,
				},
				percentageAbandonedCalls: {
					$set: value,
				},
				totalVoicemails: {
					$set: value,
				},
				totalQueueAnsweredCalls: {
					$set: value,
				},
				answerSeizureRatio: {
					$set: value,
				},
				averageCallsAnsweredPerAgent: {
					$set: value,
				},
				averageWaitingTime: {
					$set: value,
				},
				averageAbandonTime: {
					$set: value,
				},
				averageInboundHandleTime: {
					$set: value,
				},
				averageInboundTalkTime: {
					$set: value,
				},
				averageSpeedOfAnswer: {
					$set: value,
				},
				averageQueueTalkTime: {
					$set: value,
				},
				totalInboundTalkTime: {
					$set: value,
				},
				totalAgentsOnAvailableStatus: {
					$set: value,
				},
				totalOutgoingCalls: {
					$set: value,
				},
				totalCleanCallsOut: {
					$set: value,
				},
				totalPhantomCallsOut: {
					$set: value,
				},
				averageOutboundHandleTime: {
					$set: value,
				},
				averageOutboundTalkTime: {
					$set: value,
				},
				totalOutboundTalkTime: {
					$set: value,
				},
				totalAgentsLoggedIn: {
					$set: value,
				},
				totalAgentsOnCall: {
					$set: value,
				},
				totalAgentsOnBreakStatus: {
					$set: value,
				},
				totalAgentsOnMeetingStatus: {
					$set: value,
				},
				totalAgentsOnOutgoingStatus: {
					$set: value,
				},
				totalHoldTime: {
					$set: value,
				},
				totalAgents: {
					$set: value,
				}
			}
		});
	} else {
		return update(state, {
			liveStatsSettings:{
				$set:initialState.liveStatsSettings
			}
		});
	}
}

function handleSetSettingsModal(state, action) {
	return update(state, {
		showSettingsModal:{
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

function handleSetLastRefresh(state, action) {
	return update(state, {
		lastRefresh:{
			$set:action.payload
		}
	});
}

function handleSetOrder(state, action) {
	return update(state, {
		order:{
			$set:action.payload
		}
	});
}

function handleSetSLA(state, action) {
	return update(state, {
		sla:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
	CONNECTION_STATUS: handleConnectionStatus,
	SET_LIVE_STATS: handleSetLiveStats,
	SET_LIVE_STATS_SETTINGS: handleSetLiveStatsSettings,
	UPDATE_LIVE_STAT_SETTING: handleUpdateLiveStatSetting,
	SET_SETTINGS_MODAL: handleSetSettingsModal,
	SET_LOGOUT: handleSetLogout,
	SET_LAST_REFRESH: handleSetLastRefresh,
	SET_ORDER: handleSetOrder,
	SET_SLA: handleSetSLA
}

const initialState = {
	order: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"],
	lastRefresh: "",
	isLogout: false,
	showSettingsModal: false,
	isInternetConnected: "yes",
	liveStatsSettings: {
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
};

export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}