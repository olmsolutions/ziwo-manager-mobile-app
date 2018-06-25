import React from "react";
import {View, Text, NetInfo, AsyncStorage } from "react-native";
import { Container, Content, Drawer, Spinner } from "native-base";
import { Actions } from "react-native-router-flux";
import OfflineSignComponent from "../../../components/OfflineSignComponent";
import SidebarComponent from "../../../components/SidebarComponent";
import AgentsList from "./AgentsList";
import AgentsHeader from "./AgentsHeader";
import AgentsModal from "./AgentsModal";
import AgentsFilterModal from "./AgentsFilterModal";
import io from 'socket.io-client';

var timer = null;

let socketConfig = {};
let socket = {};

class Agents extends React.Component {
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        
        timer = setInterval(() => {
            this.props.setAgentTimer(this.props.agentTimer + 1);
        }, 1000);

        if (this.props.isInternetConnected == "yes") {
            socketConfig = {
                query: 'access_token='+this.props.account.access_token, 
                path: '/socket', 
                transports: ['websocket']
            };
    
            socket = io('https://'+this.props.domain, socketConfig);
    
            socket.on('connect', () => {
                var rx = this;
                socket.emit('GET /live/agents', {});
                socket.on('GET /live/agents', function(data) { 
                    var arrAgents = [];
                    var arrAllAgents = [];

                    var objAgents = data.content;
                    for (var key in objAgents) if (objAgents.hasOwnProperty(key)) {
                        var value = objAgents[key];
                        var status = Object.keys(value.liveInfo).length > 0 ? value.liveInfo.status : "Logged Out";

                        arrAllAgents.push(value);
                        
                        if (rx.props.agentsFilter.includes(status)) {
                            arrAgents.push(value);
                        }                        
                    }

                    if (rx.props.allAgentsList != arrAllAgents) {
                        rx.props.setAllAgentsList(arrAllAgents);
                    }

                    if (rx.props.agentsList != arrAgents) {
                        rx.props.setAgentList(arrAgents);
                    }

                    if (rx.props.showAgentsModal == true) {
                        rx.props.getAgentTotalTimeSpent();
                    }
                });

                socket.emit('GET /live/statistics/channels/calls/by/agents', {});
                socket.on('GET /live/statistics/channels/calls/by/agents', function(data){ 
                    rx.props.setAgentLiveStatistics(data.content);
                });
            });
        }

        AsyncStorage.getItem('agentsFilter', (err, result) => {
            if (result) {
                this.props.setAgentsFilter(JSON.parse(result));
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isLogout) {
            this.props.clearState();
            Actions.login();
        }
    }

    refreshAgentsList = () => {
        var arrAgents = [];
        for (var i = 0; i < this.props.allAgentsList.length; i++) {
            var status = this.props.allAgentsList[i].liveInfo.status != undefined ? this.props.allAgentsList[i].liveInfo.status : "Logged Out";
            
            if (this.props.agentsFilter.includes(status)) {
                arrAgents.push(this.props.allAgentsList[i]);
            }
        }
        
        this.props.setAgentList(arrAgents);
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
                            profilePicture={this.props.account.photo ? "https://"+this.props.domain+"/storage/"+this.props.account.photo : ""}
                            setLogout={this.props.setLogout}
                            currentPage={"agents"}
                            timer={timer}
                            setAgentTimer={this.props.setAgentTimer} />}
                            onClose={() => closeDrawer()} 
                        >
                <Container>
                    <AgentsHeader setAgentsFilterModal={this.props.setAgentsFilterModal} />
                    <Content bounces={false} >
                        { (this.props.isInternetConnected == "no") && 
                            <OfflineSignComponent />
                        }
                        <View>
                            { this.props.agentsList &&
                                <View>
                                    { this.props.agentsList.length > 0 &&
                                        <AgentsList 
                                            domain={this.props.domain}
                                            setCurrentAgent={this.props.setCurrentAgent}
                                            setAgentsModal={this.props.setAgentsModal}
                                            agentsList={this.props.agentsList} />    
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
                        { this.props.currentAgent &&
                            <AgentsModal 
                                domain={this.props.domain}
                                setCurrentAgent={this.props.setCurrentAgent}
                                currentAgent={this.props.currentAgent}
                                showAgentsModal={this.props.showAgentsModal}
                                setAgentsModal={this.props.setAgentsModal}
                                agentLiveStatistics={this.props.agentLiveStatistics}
                                agentTimer={this.props.agentTimer} />
                        }

                        <AgentsFilterModal 
                                agentsFilter={this.props.agentsFilter}
                                showAgentsFilterModal={this.props.showAgentsFilterModal}
                                setAgentsFilterModal={this.props.setAgentsFilterModal}
                                refreshAgentsList={this.refreshAgentsList}
                                agentsList={this.props.agentsList} />
                    </Content>
                </Container>
            </Drawer>
        );
    }
}

export default Agents;