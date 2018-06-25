import React from "react";
import { Text, View, Modal, Image } from 'react-native';
import { Content, Button, Header, Body, Left, Right, Icon } from "native-base";
import styles from "./AgentsNumberModalStyles.js";
import AgentsComponent from "../AgentsComponent";
import CallerCalledComponent from "../CallerCalledComponent";
import NumberComponent from "../NumberComponent";
import SegmentedControlTab from 'react-native-segmented-control-tab'

export const AgentsNumberModal = ({ backupRestoreIcon, getCallHistory, getAgentsList, agentsList, getNumbersList, numbersList, setContactTab, selectedContactTab, setAgentsNumberModal, showAgentsNumberModal, setSelectedAgents, selectedAgents, setSelectedNumbers, selectedNumbers, isAgentListLoading, isNumberListLoading, setSearchAgentTerm, searchAgentTerm, setSearchNumberTerm, searchNumberTerm, setPagination, setContactNumber, contactNumber, setTempContactNumber, tempContactNumber, trackTimer, AudioPlayer, setCurrentCall, currentCall, setScrolledStatus }) => {

    function handleSaveButton() {        
        if (currentCall != null) {
            setCurrentCall(null);
        }
        
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }

        AudioPlayer.pause();
        
        if (selectedContactTab == 0) {
            setContactNumber(tempContactNumber);
        }

        setScrolledStatus(false);
        setPagination({
            fetchStart: 1,
            fetchStop: 10
        });
        getCallHistory();
        setAgentsNumberModal(false);
    }

    function handleResetAllFilters() {
        setContactNumber("");
        setTempContactNumber("");
        setSelectedAgents([]);
        setSelectedNumbers([]);

        handleSaveButton();
    }

    handleIndexChange = (index) => {
        setContactTab(index);

        if (index == 0) {
            if (contactNumber != "") {
                setTempContactNumber(contactNumber);
            }
        } else if (index == 1) {
            getNumbersList();
        } else if (index == 2) {
            getAgentsList();
        }
    }

    return (
        <Modal
            presentationStyle={"fullScreen"}
            animationType="slide"
            transparent={false}
            visible={showAgentsNumberModal}
            hardwareAccelerated={true} >
            <Header style={styles.headerContainer} iosBarStyle="light-content" androidStatusBarColor="#1D1610">
                <Left>
                    <Button transparent onPress={() => setAgentsNumberModal(false)} >
                        <Icon name="md-arrow-back" style={styles.menu} /> 
                    </Button>
                </Left>
                <Body>
                </Body>
                <Right>  
                    <Button transparent onPress={() => handleSaveButton()}>
                        <Text style={styles.saveText}>SAVE</Text>
                    </Button>
                    { (selectedAgents.length > 0 || selectedNumbers.length > 0 || contactNumber != "") &&
                        <Button transparent onPress={() => handleResetAllFilters()}>
                            <Image source={backupRestoreIcon} resizeMode={"contain"} style={styles.resetIcon}/>
                        </Button>
                    }
                </Right>
            </Header>
            <View style={styles.segmentContainer}>
                <SegmentedControlTab
                    textNumberOfLines={2}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    values={['Caller/Called No.', 'Call Center No.', 'Agent']}
                    selectedIndex={selectedContactTab}
                    onTabPress= {this.handleIndexChange}
                />
            </View>
            <Content bounces={false}>
            { selectedContactTab == 0 &&
                <CallerCalledComponent setTempContactNumber={setTempContactNumber} tempContactNumber={tempContactNumber} />
            }
            { selectedContactTab == 1 &&
                <NumberComponent numbersList={numbersList} setSelectedNumbers={setSelectedNumbers} selectedNumbers={selectedNumbers} isNumberListLoading={isNumberListLoading} setSearchNumberTerm={setSearchNumberTerm} searchNumberTerm={searchNumberTerm} />
            }
            { selectedContactTab == 2 &&
                <AgentsComponent agentsList={agentsList} setSelectedAgents={setSelectedAgents} selectedAgents={selectedAgents} isAgentListLoading={isAgentListLoading} setSearchAgentTerm={setSearchAgentTerm} searchAgentTerm={searchAgentTerm} />
            }
            </Content>
        </Modal>
    )
}

export default AgentsNumberModal;