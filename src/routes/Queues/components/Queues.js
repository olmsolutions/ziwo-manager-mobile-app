import React from "react";
import {View, Text, NetInfo, AsyncStorage } from "react-native";
import { Container, Content, Drawer, Spinner } from "native-base";
import { Actions } from "react-native-router-flux";

import OfflineSignComponent from "../../../components/OfflineSignComponent";
import SidebarComponent from "../../../components/SidebarComponent";
import QueuesList from "./QueuesList";
import QueuesHeader from "./QueuesHeader";
import QueuesModal from "./QueuesModal";
import QueuesFilterModal from "./QueuesFilterModal";

import io from 'socket.io-client';

const profilePicture = require("../../../assets/images/blank-profile-picture.webp");

let socketConfig = {};
let socket = {};

class Queues extends React.Component {
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        if (this.props.isInternetConnected == "yes") {
            socketConfig = {
                query: 'access_token='+this.props.account.access_token, 
                path: '/socket', 
                transports: ['websocket']
            };
    
            socket = io('https://'+this.props.domain, socketConfig);
    
            socket.on('connect', () => {
                var rx = this;

                socket.emit('GET /live/queues', {});
                socket.on('GET /live/queues', function(data){ 
                    var arrQueues = [];
                    var queueLiveCalls = [];

                    var objQueues = data.content;
                    for (var key in objQueues) if (objQueues.hasOwnProperty(key)) {
                        var value = objQueues[key];	
                        var currentCustomerWaiting = 0;					
                        
                        if (!rx.props.queuesFilter.includes(value.name)) {
                            arrQueues.push(value);

                            if (value.liveCalls.length > 0) {
                                for (var i = 0; i < value.liveCalls.length; i++) {
                                    if (value.liveCalls[i].state == "Waiting") {
                                        currentCustomerWaiting = currentCustomerWaiting + 1;
                                    }
                                }
                            }
        
                            queueLiveCalls[value.id] = currentCustomerWaiting;
                        }
                    }
                    
                    if (rx.props.queuesList != arrQueues) {
                        rx.props.setQueueList(arrQueues);
                    }

                    if (rx.props.queuesFilterList != data.content) {
                        rx.props.setQueueFilterList(data.content);
                    }

                    if (rx.props.currentCustomerWaiting != queueLiveCalls) {
                        rx.props.setCurrentCustomerWaiting(queueLiveCalls);
                    }
                });

                socket.emit('GET /live/statistics/channels/calls/by/queues', {});
                socket.on('GET /live/statistics/channels/calls/by/queues', function(data){ 
                    rx.props.setTotalCallsLandedInQueue(data.content);
                });

                socket.emit('GET /live/agents', {});
                socket.on('GET /live/agents', function(data){ 
                    var objAgents = data.content;
                    var queueAgents = [];

                    if (rx.props.queuesList) {
                        for (var q = 0; q < rx.props.queuesList.length; q++) {
                            var assignedAgents = 0;
                            var availableAssignedAgents = 0;

                            for (var key in objAgents) if (objAgents.hasOwnProperty(key)) {
                                var agent = objAgents[key];
                                var agentQueues = agent.queues;
                                
                                if (agentQueues.length > 0) {
                                    for (var i = 0; i < agentQueues.length; i++) {
                                        if (agentQueues[i].id == rx.props.queuesList[q].id) {
                                            assignedAgents = assignedAgents + 1;
            
                                            if (agent.liveInfo.length > 0) {
                                                if (agent.liveInfo.status == "Available") {
                                                    availableAssignedAgents = availableAssignedAgents + 1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            queueAgents[rx.props.queuesList[q].id] = [assignedAgents, availableAssignedAgents];
                        }

                        rx.props.setAssignedAndAvailableAgents(queueAgents);
                    }
                });
            });
        }

        AsyncStorage.getItem('queuesFilter', (err, result) => {
            if (result) {
                this.props.setQueuesFilter(JSON.parse(result));
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.showQueuesModal != this.props.showQueuesModal) {
            socket.emit('GET /live/queues', {});
        }

        if (prevProps.showQueuesFilterModal != this.props.showQueuesFilterModal) {
            if (this.props.showQueuesFilterModal == false) {
                socket.emit('GET /live/queues', {});
            }
        }

        if (this.props.isLogout) {
            this.props.clearState();
            Actions.login();
        }
    }

    handleConnectivityChange = isConnected => { 
        if (isConnected) {
            this.props.setConnectionStatus("yes");
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
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SidebarComponent 
                            navigator={this.navigator} 
                            socket={socket}
                            domain={this.props.domain}
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            profilePicture={profilePicture}
                            setLogout={this.props.setLogout}
                            currentPage={"queues"} />}
                            onClose={() => closeDrawer()} 
                        >
                <Container>
                    <QueuesHeader setQueuesFilterModal={this.props.setQueuesFilterModal} />
                    <Content bounces={false} >
                        { (this.props.isInternetConnected == "no") && 
                            <OfflineSignComponent />
                        }
                        <View>
                            { this.props.queuesList &&
                                <View>
                                    { this.props.queuesList.length > 0 &&
                                        <QueuesList
                                            setCurrentQueue={this.props.setCurrentQueue}
                                            setQueuesModal={this.props.setQueuesModal}
                                            queuesList={this.props.queuesList}
                                            assignedAndAvailableAgents={this.props.assignedAndAvailableAgents} />    
                                        ||
                                        <View style={{flex: 1, paddingTop: 20}}>
                                            <Text style={{alignSelf: "center"}}>No records found</Text>
                                        </View>
                                    }
                                </View>
                                ||
                                <Spinner style={{marginTop: 5}} color="#A62A7C" />
                            }
                        </View>
                        { this.props.currentQueue &&
                            <QueuesModal 
                                currentQueue={this.props.currentQueue}
                                showQueuesModal={this.props.showQueuesModal}
                                setQueuesModal={this.props.setQueuesModal}
                                currentCustomerWaiting={this.props.currentCustomerWaiting}
                                assignedAndAvailableAgents={this.props.assignedAndAvailableAgents}
                                totalCallsLandedInQueue={this.props.totalCallsLandedInQueue} />
                        }

                        <QueuesFilterModal 
                                queuesFilter={this.props.queuesFilter}
                                setQueuesFilter={this.props.setQueuesFilter}
                                showQueuesFilterModal={this.props.showQueuesFilterModal}
                                setQueuesFilterModal={this.props.setQueuesFilterModal}
                                queuesFilterList={this.props.queuesFilterList} />
                    </Content>
                </Container>
            </Drawer>
        );
    }
}

export default Queues;