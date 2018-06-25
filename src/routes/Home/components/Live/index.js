import React from "react";
import { View, AsyncStorage } from "react-native";
import styles from "./LiveStyles.js";
import StatsList from "../StatsList/";
import SortableListView from 'react-native-sortable-listview';

export const Live = ({ liveStats, order, setOrder, updateLiveStatSetting }) => {
    return (
        <View style={styles.liveContainer}>
            <SortableListView
                style={{ flex: 1 }}
                activeOpacity={1}
                data={liveStats}
                order={order}
                moveOnPressIn={true}
                onRowMoved={e => {
                    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                    setOrder(order);
                    AsyncStorage.setItem('order', JSON.stringify(order));
                }}
                rowHasChanged={(r1, r2) => true}
                renderRow={row => <StatsList data={row} order={order} setOrder={setOrder} updateLiveStatSetting={updateLiveStatSetting} stats={liveStats} />}
            />
        </View>
    );
}

export default Live;