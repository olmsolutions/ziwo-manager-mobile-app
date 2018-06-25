import { connect } from "react-redux";
import Queues from "../components/Queues";
import {
    setConnectionStatus,
    setQueueList,
    setQueueFilterList,
    setQueuesModal,
    setCurrentQueue,
    setCurrentCustomerWaiting,
    setAssignedAndAvailableAgents,
    setTotalCallsLandedInQueue,
    setQueuesFilterModal,
    setQueuesFilter,
    clearState,
    setLogout
} from "../modules/queues";

const mapStateToProps = (state) => ({  
    account: state.login.account || {},
    domain: state.login.domain || "",
    isInternetConnected: state.home.isInternetConnected || "yes", 
    queuesList: state.queues.queuesList,
    showQueuesModal: state.queues.showQueuesModal || false,
    showQueuesFilterModal: state.queues.showQueuesFilterModal || false,
    currentQueue: state.queues.currentQueue,
    currentCustomerWaiting: state.queues.currentCustomerWaiting,
    assignedAndAvailableAgents: state.queues.assignedAndAvailableAgents,
    totalCallsLandedInQueue: state.queues.totalCallsLandedInQueue,
    queuesFilter: state.queues.queuesFilter || [],
    queuesFilterList: state.queues.queuesFilterList,
    isLogout: state.home.isLogout || false
});

const mapActionCreators = {
    setConnectionStatus,
    setQueueList,
    setQueueFilterList,
    setQueuesModal,
    setCurrentQueue,
    setCurrentCustomerWaiting,
    setAssignedAndAvailableAgents,
    setTotalCallsLandedInQueue,
    setQueuesFilterModal,
    setQueuesFilter,
    clearState,
    setLogout
};

export default connect(mapStateToProps, mapActionCreators)(Queues);
