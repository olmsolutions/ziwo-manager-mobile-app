import React from "react";
import {View, Text, Image } from "react-native";
import { Icon } from "native-base";
import styles from "./InstructionsStyles.js";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import Carousel from 'react-native-carousel-view';

export const Instructions = ({ ziwoMan, screen2, screen3, screen4, screen5, screen6, screen7, screen8, headsetIcon, dateRangeIcon, agentIcon }) => {
    return (
        <Carousel
                width={width}
                height={height - 114}
                animate={false}
                indicatorSize={12}
                indicatorColor="#000"
                inactiveIndicatorColor="#fff"
                indicatorSpace={14} >
            <View style={styles.contentContainer}>
                <Text style={styles.greetingsText}>Hello Ziwo!</Text>
                <Text style={styles.normalText}>How is my team doing today?</Text>
                <Image style={styles.instructionImages} source={ziwoMan} resizeMode={"contain"} />
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen2} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Icon name="md-menu" style={styles.icon}/>
                    <Text style={styles.normalText}>Main menu</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen3} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Image source={headsetIcon} resizeMode={"contain"} style={styles.imageIcon} />
                    <Text style={styles.normalText}>Organize your dashboard</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen4} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Icon name="md-call" style={styles.icon}/>
                    <Text style={styles.normalText}>Calls tab</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen5} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Image source={dateRangeIcon} resizeMode={"contain"} style={styles.imageIcon} />
                    <Text style={styles.normalText}>Date range filter</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen6} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Icon name="md-funnel" style={styles.funnelIcon}/>
                    <Text style={styles.normalText}>Calls filter</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Image style={styles.instructionImages} source={screen7} resizeMode={"contain"} />
                <View style={styles.textContainer}>
                    <Image source={agentIcon} resizeMode={"contain"} style={styles.agentIcon} />
                    <Text style={styles.normalText}>Agents status</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.greetingsText}>Let's go!</Text>
                <Text style={styles.lastNormalText}>Use your account details</Text>
                <Text style={styles.normalText}>and Ziwo domain to log in.</Text>
                <Text style={styles.lastNormalText}>Domain address can be found in the</Text>
                <Text style={styles.normalText}>address bar of your browser</Text>
                <Text style={styles.normalText}>while connected to Ziwo.</Text>
                <Image style={styles.urlImage} source={screen8} resizeMode={"contain"} />
            </View>
        </Carousel>
    );
}

export default Instructions;