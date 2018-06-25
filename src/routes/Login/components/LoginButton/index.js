import React from "react";
import {View, Text, TouchableOpacity } from "react-native";
import styles from "./LoginButtonStyles.js";

export const LoginButton = ({ setDisplayInstruction }) => {
    return (
        <View style={styles.loginButtonContainer}>
            <TouchableOpacity
                onPress={() => setDisplayInstruction("no")}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginButton;