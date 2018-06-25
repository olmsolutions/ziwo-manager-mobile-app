import React from "react";
import { View, Slider, Image, ActivityIndicator, Platform } from "react-native";
import { ListItem, Left, Body, Right, Text, Icon, Button } from 'native-base';
import styles from "./CallHistoryListStyles.js";
import Spinner from 'react-native-loading-spinner-overlay';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

var dateFormat = require('dateformat');

export const CallHistoryList = ({ setTrackTimer, trackTimer, AudioPlayer, incomingIcon, outgoingIcon, internalIcon, serviceIcon, domain, callHistory, currentCall, setCurrentCall, setCallLoader, isCallLoading, setPagination, pagination, getCallHistory, isInfiniteScrollLoading, setScrolledStatus, isListScrolled }) => {

    function playAudio(recordingFile, currentDuration, callID, callerIDName) {
        setCallLoader(true);
        
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }
        
        AudioPlayer.pause();
        setCurrentCall(null);
        AudioPlayer.prepare("https://" + domain + "/surveillance/recordings/" + recordingFile, () => {
            setCallLoader(false);
            setCurrentCall({
                callID: callID,
                callerIDName: callerIDName,
                duration: currentDuration,
                status: "play",
                time: 0
            });

            AudioPlayer.play();
            trackAudio(callID, callerIDName, currentDuration)
        })
    }

    function stopAudio() {
        if (trackTimer != null) {
            clearInterval(trackTimer);
        }

        AudioPlayer.pause();
        setCurrentCall(null);
    }

    function handleCallStatusEvent() {
        if (currentCall.status == "play") {
            AudioPlayer.pause();
            if (trackTimer != null) {
                clearInterval(trackTimer);
            }
            setCurrentCall({
                callID: currentCall.callID,
                callerIDName: currentCall.callerIDName,
                duration: currentCall.duration,
                status: "pause",
                time: currentCall.time
            });
        } else {
            AudioPlayer.play();
            setCurrentCall({
                callID: currentCall.callID,
                callerIDName: currentCall.callerIDName,
                duration: currentCall.duration,
                status: "play",
                time: currentCall.time
            });

            trackAudio(currentCall.callID, currentCall.callerIDName, currentCall.duration);
        }
    }

    function handleSetTimeEvent(value) {
        setCurrentCall({
            callID: currentCall.callID,
            callerIDName: currentCall.callerIDName,
            duration: currentCall.duration,
            status: currentCall.status,
            time: value
        });
        AudioPlayer.setTime(value);
    }

    function trackAudio(callID, callerIDName, currentDuration) {
        setTrackTimer(setInterval(() => {
            AudioPlayer.getCurrentTime((currentTime) => {
                setCurrentCall({
                    callID: callID,
                    callerIDName: callerIDName,
                    duration: currentDuration,
                    status: "play",
                    time: Math.round(currentTime)
                });
                if (Math.round(currentTime) >= Math.round(currentDuration)) {
                    clearInterval(trackTimer);
                    setCurrentCall(null);
                }
            });
        }, 1000));
    }

    function handleOnScrollEndDrag() {
        if (!isListScrolled) {
            setScrolledStatus(true);
        }
    }

    function getCallIcon(direction) {
        if (direction == "inbound") {
            return incomingIcon;
        }

        if (direction == "outbound") {
            return outgoingIcon;
        }

        if (direction == "internal") {
            return internalIcon;
        }

        if (direction == "service") {
            return serviceIcon;
        }
    }

    handleLoadMore = () => {
        if (currentCall == null) {
            if (isListScrolled) {
                setPagination({
                    fetchStart: pagination.fetchStart + 10,
                    fetchStop: 10
                })

                if (callHistory.length >= 10) {
                    getCallHistory();
                }
            }
        }
    }
    
    return (
        <View style={{flex: 1}}>
            <Spinner visible={isCallLoading} color={"#A62A7C"} />
            <OptimizedFlatList
                onScrollEndDrag={() => handleOnScrollEndDrag()}
                data={callHistory}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={Platform.OS === 'ios' ? 0.01 : 0.3}
                renderItem={({item}) => <View>
                                            <ListItem avatar style={styles.listContainer}>
                                                <Left>
                                                    <Image source={getCallIcon(item.direction)} style={styles.directionIcon} resizeMode="contain" />
                                                </Left>
                                                <Body>
                                                    <View style={styles.listBody}>
                                                        <Text style={styles.callerText}>{item.callerIDName}</Text>
                                                        <Text style={styles.answerText}>{dateFormat(item.createdAt, "m/d/yy") + " " + dateFormat(item.startDateTime, "h:MM TT")}</Text>
                                                        <Text>
                                                            <Text style={styles.answerText}>{item.direction == "inbound" ? "Answered by " : "Called By "}</Text>
                                                            { (item.extendedInfo && item.extendedInfo.agents) &&
                                                                <Text style={styles.answerTextBold}>{item.extendedInfo.agents.firstName + " " + item.extendedInfo.agents.lastName}</Text>
                                                                ||
                                                                <Text style={styles.answerTextBold}>{item.position}</Text>
                                                            }
                                                        </Text>
                                                    </View>
                                                </Body>
                                                <Right>
                                                    <View style={styles.rightContainer}>
                                                        <View style={styles.secondsContainer}><Text style={styles.secondsText}>{item.duration}s</Text></View>
                                                        <View>
                                                            <Button transparent disabled={isCallLoading} onPress={() => currentCall != null && item.callID == currentCall.callID ? stopAudio() : playAudio(item.recordingFile, item.duration, item.callID, item.callerIDName)}>
                                                                { currentCall != null && item.callID == currentCall.callID &&
                                                                    <Icon ios='ios-square' android="ios-square" style={styles.callStatusIcon}/>
                                                                ||
                                                                    <Icon ios='md-play' android="md-play" style={styles.callStatusIcon}/>
                                                                }
                                                            </Button>
                                                        </View>
                                                    </View>
                                                </Right>
                                            </ListItem>
                                            { (currentCall != null && currentCall.callID == item.callID) &&
                                                <View style={styles.playerContainer}>
                                                    <View style={styles.playerController}>
                                                        <Slider
                                                            step={1}
                                                            value={currentCall.time}
                                                            minimumValue={0}
                                                            maximumValue={Math.round(currentCall.duration) - 1}
                                                            onSlidingComplete={(value) => handleSetTimeEvent(value)} />
                                                    </View>
                                                    <View style={styles.playerButtonContainer}>
                                                        <Button transparent onPress={() => handleCallStatusEvent()}>
                                                            { (currentCall != null && currentCall.status == "play") &&
                                                                <Icon ios='md-pause' android="md-pause" style={styles.callStatusIcon}/>
                                                                ||
                                                                <Icon ios='md-play' android="md-play" style={styles.callStatusIcon}/>
                                                            }
                                                        </Button>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    }
            />
            { isInfiniteScrollLoading && 
                <ActivityIndicator style={{marginVertical: 10}} size="large" color="#A62A7C" />
            }
        </View>
    );
}

export default CallHistoryList;