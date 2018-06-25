import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./LoadingComponentStyles";

export const LoadingComponent = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={"#A62A7C"}/>
        </View>
    );
}

export default LoadingComponent;