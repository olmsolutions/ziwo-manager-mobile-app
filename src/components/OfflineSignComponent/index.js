import React from "react";
import { Text, View } from "react-native";
import styles from "./OfflineSignComponentStyles";

export const OfflineSignComponent = () => {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

export default OfflineSignComponent;