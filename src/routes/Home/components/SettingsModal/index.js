import React from "react";
import { Text, View, Modal, Image } from 'react-native';
import { Content, Button, Header, Body, Left, Right, Icon, List, ListItem } from "native-base";
import styles from "./SettingsModalStyles.js";
import { Switch } from 'react-native-switch';

export const SettingsModal = ({ setSettingsModal, showSettingsModal, liveStatsSettings, updateLiveStatSetting, totalACDCallsIcon, totalIVRLandedCallsIcon, totalLostInIVRCallsIcon, totalCleanCallsInIcon, totalPhantomCallsInIcon, totalTransferredCallsIcon, totalAbandonedCallsIcon, percentageAbandonedCallsIcon, totalVoicemailsIcon, totalQueueAnsweredCallsIcon, answerSeizureRatioIcon, averageCallsAnsweredPerAgentIcon, averageWaitingTimeIcon, averageAbandonTimeIcon, averageInboundHandleTimeIcon, averageInboundTalkTimeIcon, averageSpeedOfAnswerIcon, averageQueueTalkTimeIcon, totalInboundTalkTimeIcon, totalOutgoingCallsIcon, totalCleanCallsOutIcon, totalPhantomCallsOutIcon, averageOutboundHandleTimeIcon, averageOutboundTalkTimeIcon, totalOutboundTalkTimeIcon, totalAgentsLoggedInIcon, totalAgentsOnCallIcon, totalAgentsOnAvailableStatusIcon, totalAgentsOnBreakStatusIcon, totalAgentsOnMeetingStatusIcon, totalAgentsOnOutgoingStatusIcon, totalHoldTimeIcon, totalAgentsIcon }) => {
    function handleChangeSettings(val) {
        updateLiveStatSetting({setting: "all", value: val});
    }

    function handleUpdateLiveSetting(setting, value) {
        updateLiveStatSetting({setting: setting, value: value});
    }

    function checkLiveSettings() { 
        var objliveStatsSettings = liveStatsSettings;
        for (var key in objliveStatsSettings) if (objliveStatsSettings.hasOwnProperty(key)) {  
            if (key != "SLA") {       
                if (objliveStatsSettings[key] == true) {
                    return true;
                }
            }   
        }

        return false;
    }

    return(
        <Modal
            presentationStyle={"fullScreen"}
            animationType="slide"
            transparent={false}
            visible={showSettingsModal} >
        <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
            <Left>
                <Button transparent onPress={() => setSettingsModal(false)}>
                    <Icon ios='md-arrow-back' android='md-arrow-back' style={styles.menu}/> 
                </Button>
            </Left>
            <Body>
                <Text style={styles.headerText}>Select KPIs</Text>
            </Body>
            <Right />  
        </Header>
            <Content>
                <View style={styles.switchContainer}>
                    <Text style={styles.resetText}>Select None/All</Text>
                        <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={checkLiveSettings()} onValueChange={(val) => handleChangeSettings(val)}/>
                </View>
                <List initialListSize={33}>
                    <ListItem itemDivider>
                        <Text style={styles.inboundTitleText}>Inbound</Text>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalACDCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total ACD Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalACDCalls} onValueChange={() => handleUpdateLiveSetting("totalACDCalls", !liveStatsSettings.totalACDCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalIVRLandedCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Calls landed in IVR</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalIVRLandedCalls} onValueChange={() => handleUpdateLiveSetting("totalIVRLandedCalls", !liveStatsSettings.totalIVRLandedCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalLostInIVRCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Calls Lost In IVR</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalLostInIVRCalls} onValueChange={() => handleUpdateLiveSetting("totalLostInIVRCalls", !liveStatsSettings.totalLostInIVRCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalCleanCallsInIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Clean Calls Inbound</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalCleanCallsIn} onValueChange={(val) => handleUpdateLiveSetting("totalCleanCallsIn", !liveStatsSettings.totalCleanCallsIn)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalPhantomCallsInIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Phantom Calls Inbound</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalPhantomCallsIn} onValueChange={() => handleUpdateLiveSetting("totalPhantomCallsIn", !liveStatsSettings.totalPhantomCallsIn)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalTransferredCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Transferred Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalTransferredCalls} onValueChange={() => handleUpdateLiveSetting("totalTransferredCalls", !liveStatsSettings.totalTransferredCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAbandonedCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Abandoned Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAbandonedCalls} onValueChange={() => handleUpdateLiveSetting("totalAbandonedCalls", !liveStatsSettings.totalAbandonedCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={percentageAbandonedCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Percentage Abandoned Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.percentageAbandonedCalls} onValueChange={() => handleUpdateLiveSetting("percentageAbandonedCalls", !liveStatsSettings.percentageAbandonedCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalVoicemailsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Voicemails</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalVoicemails} onValueChange={() => handleUpdateLiveSetting("totalVoicemails", !liveStatsSettings.totalVoicemails)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalQueueAnsweredCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Answered Queues Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalQueueAnsweredCalls} onValueChange={() => handleUpdateLiveSetting("totalQueueAnsweredCalls", !liveStatsSettings.totalQueueAnsweredCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={answerSeizureRatioIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Answer-seizure Ratio</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.answerSeizureRatio} onValueChange={() => handleUpdateLiveSetting("answerSeizureRatio", !liveStatsSettings.answerSeizureRatio)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageCallsAnsweredPerAgentIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Answered Calls per Agent</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageCallsAnsweredPerAgent} onValueChange={() => handleUpdateLiveSetting("averageCallsAnsweredPerAgent", !liveStatsSettings.averageCallsAnsweredPerAgent)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageWaitingTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Queue Waiting Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageWaitingTime} onValueChange={() => handleUpdateLiveSetting("averageWaitingTime", !liveStatsSettings.averageWaitingTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageAbandonTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Abandon Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageAbandonTime} onValueChange={() => handleUpdateLiveSetting("averageAbandonTime", !liveStatsSettings.averageAbandonTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageInboundHandleTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Inbound Handling Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageInboundHandleTime} onValueChange={() => handleUpdateLiveSetting("averageInboundHandleTime", !liveStatsSettings.averageInboundHandleTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageInboundTalkTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Inbound Talk Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageInboundTalkTime} onValueChange={() => handleUpdateLiveSetting("averageInboundTalkTime", !liveStatsSettings.averageInboundTalkTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageSpeedOfAnswerIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Speed of Answer</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageSpeedOfAnswer} onValueChange={() => handleUpdateLiveSetting("averageSpeedOfAnswer", !liveStatsSettings.averageSpeedOfAnswer)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageQueueTalkTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Talk Time for Queue Calls</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageQueueTalkTime} onValueChange={() => handleUpdateLiveSetting("averageQueueTalkTime", !liveStatsSettings.averageQueueTalkTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalInboundTalkTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Inbound Talk Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalInboundTalkTime} onValueChange={() => handleUpdateLiveSetting("totalInboundTalkTime", !liveStatsSettings.totalInboundTalkTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text style={styles.outboundTitleText}>Outbound</Text>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalOutgoingCallsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Outgoing Calls</Text>
                        </Body>
                        <Right>
                        <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalOutgoingCalls} onValueChange={() => handleUpdateLiveSetting("totalOutgoingCalls", !liveStatsSettings.totalOutgoingCalls)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalCleanCallsOutIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Clean Calls Outbound</Text>
                        </Body>
                        <Right>
                        <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalCleanCallsOut} onValueChange={() => handleUpdateLiveSetting("totalCleanCallsOut", !liveStatsSettings.totalCleanCallsOut)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalPhantomCallsOutIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Phantom Calls Outbound</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalPhantomCallsOut} onValueChange={() => handleUpdateLiveSetting("totalPhantomCallsOut", !liveStatsSettings.totalPhantomCallsOut)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageOutboundHandleTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Outbound Handling Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageOutboundHandleTime} onValueChange={() => handleUpdateLiveSetting("averageOutboundHandleTime", !liveStatsSettings.averageOutboundHandleTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={averageOutboundTalkTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Average Outbound Talk Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.averageOutboundTalkTime} onValueChange={() => handleUpdateLiveSetting("averageOutboundTalkTime", !liveStatsSettings.averageOutboundTalkTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalOutboundTalkTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Outbound Talk Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalOutboundTalkTime} onValueChange={() => handleUpdateLiveSetting("totalOutboundTalkTime", !liveStatsSettings.totalOutboundTalkTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text style={styles.performanceTitleText}>Performance</Text>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsLoggedInIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents Logged In</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsLoggedIn} onValueChange={() => handleUpdateLiveSetting("totalAgentsLoggedIn", !liveStatsSettings.totalAgentsLoggedIn)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsOnCallIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents On Call</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsOnCall} onValueChange={() => handleUpdateLiveSetting("totalAgentsOnCall", !liveStatsSettings.totalAgentsOnCall)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsOnAvailableStatusIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents Available</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsOnAvailableStatus} onValueChange={() => handleUpdateLiveSetting("totalAgentsOnAvailableStatus", !liveStatsSettings.totalAgentsOnAvailableStatus)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsOnBreakStatusIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents on Break</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsOnBreakStatus} onValueChange={() => handleUpdateLiveSetting("totalAgentsOnBreakStatus", !liveStatsSettings.totalAgentsOnBreakStatus)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsOnMeetingStatusIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents in a Meeting</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsOnMeetingStatus} onValueChange={() => handleUpdateLiveSetting("totalAgentsOnMeetingStatus", !liveStatsSettings.totalAgentsOnMeetingStatus)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsOnOutgoingStatusIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Current Agents set to Outbound</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgentsOnOutgoingStatus} onValueChange={() => handleUpdateLiveSetting("totalAgentsOnOutgoingStatus", !liveStatsSettings.totalAgentsOnOutgoingStatus)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalHoldTimeIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total On Hold Time</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalHoldTime} onValueChange={() => handleUpdateLiveSetting("totalHoldTime", !liveStatsSettings.totalHoldTime)}/>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Image resizeMode={"contain"} style={{width: 25}} source={totalAgentsIcon} / >
                        </Left>
                        <Body>
                            <Text style={styles.listText}>Total Agents</Text>
                        </Body>
                        <Right>
                            <Switch backgroundActive={"#CF8CB3"} backgroundInactive={"#E2E2E2"} circleActiveBorderColor={"#CF8CB3"} circleInactiveBorderColor={"#E2E2E2"} circleActiveColor={"#ad3278"} circleBorderWidth={1.5} changeValueImmediately={true} value={liveStatsSettings.totalAgents} onValueChange={() => handleUpdateLiveSetting("totalAgents", !liveStatsSettings.totalAgents)}/>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Modal>
    )
}

export default SettingsModal;