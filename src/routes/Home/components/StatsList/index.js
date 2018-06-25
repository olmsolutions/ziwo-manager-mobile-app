import React from "react";
import {View, Text, TouchableOpacity, Image, TouchableHighlight, AsyncStorage } from "react-native";
import { Icon, Button } from "native-base";
import { Popover, PopoverController } from 'react-native-modal-popover';
import {  GaugeProgress } from 'react-native-simple-gauge';
import styles from "./StatsListStyles.js";

class StatsList extends React.Component {
    render() {
        handleUpdateLiveStatSettings = (setting, value) => {
            var data = {
                setting: setting,
                value: value
            };
    
            this.props.updateLiveStatSetting(data);
        }

        handleMoveOnTop = (fromIndex) => {
            var orderArray = this.props.order;
            var element = orderArray[orderArray.indexOf(fromIndex)];
            orderArray.splice(orderArray.indexOf(fromIndex), 1);
            orderArray.splice(0, 0, element);
            this.props.setOrder([]);
            this.props.setOrder(orderArray);
            AsyncStorage.setItem('order', JSON.stringify(orderArray));
        }

        function getBorderStyle(value) {
            if (value == "inbound") {
                return styles.inboundContainer;
            } else if (value == "outbound") {
                return styles.outboundContainer;
            } else {
                return styles.performanceContainer;
            }
        }
    
        function getTextStyle(value) {
            if (value == "inbound") {
                return styles.inboundText;
            } else if (value == "outbound") {
                return styles.outboundText;
            } else {
                return styles.performanceText;
            }
        }

        return (
            <View style={{flex: 1}}>
                {(this.props.data.currentSetting == true) &&
                <TouchableHighlight
                    underlayColor={'#eee'}
                    style={{ flex: 1 }}
                    {...this.props.sortHandlers} >
                    { (this.props.data.parameter == "sla") &&
                        <View style={styles.slaContainer}>
                            <GaugeProgress
                                style={{alignSelf: "center"}}
                                size={150}
                                width={15}
                                fill={this.props.data.value}
                                rotation={90}
                                cropDegree={90}
                                tintColor="#A62A7C"
                                backgroundColor="#ad859f"
                                stroke={[2, 2]}
                                strokeCap="circle" >
                                {(fill) => (
                                    <View style={styles.textView}>
                                        <Text style={styles.text}>{this.props.data.value}%</Text>
                                    </View>
                                )}
                            </GaugeProgress>
                            <Text style={styles.slaText}>SLA</Text>
                        </View>
                    ||
                        <View style={styles.listContainer}>
                            <View style={styles.cardContainer}>
                                <View style={styles.leftPart}>
                                    <Image source={this.props.data.icon} resizeMode={"contain"} style={{width: 32}} / >
                                </View>
                                <View style={getBorderStyle(this.props.data.type)}>
                                    <View style={styles.centerItem}>
                                        <Text style={getTextStyle(this.props.data.type)}>{this.props.data.description}</Text> 
                                    </View>
                                    <View style={styles.centerValue}>
                                        <Text style={styles.statsValueText}>{this.props.data.value}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rightPart}>
                                <PopoverController>
                                    {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                                        <React.Fragment>    
                                            <Button transparent ref={setPopoverAnchor} onPress={openPopover}>
                                                <Icon ios='md-more' android="md-more" style={styles.moreIcons}/>
                                            </Button>
                                            <Popover 
                                                contentStyle={styles.content}
                                                arrowStyle={styles.arrow}
                                                backgroundStyle={styles.background}
                                                visible={popoverVisible}
                                                onClose={closePopover}
                                                fromRect={popoverAnchorRect}
                                                supportedOrientations={['portrait', 'landscape']}>
                                                    <TouchableOpacity style={styles.popOverButton} 
                                                        onPress={() => {
                                                                    handleMoveOnTop(this.props.data.key);
                                                                    closePopover();
                                                                }}>
                                                        <Text>Move to top</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.popOverButton} onPress={() => handleUpdateLiveStatSettings(this.props.data.parameter, this.props.data.currentSetting == true ? false : true)}>
                                                        <Text>Hide</Text>
                                                    </TouchableOpacity>
                                            </Popover>
                                        </React.Fragment>
                                    )}
                                </PopoverController>
                            </View>
                        </View>
                    }
                    </TouchableHighlight>
                }
            </View>
        )
    }
}

export default StatsList;