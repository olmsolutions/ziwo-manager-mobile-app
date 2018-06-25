import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = {
    container: {
        width
    },
    listContainer: {
        backgroundColor: "#fff",
        marginLeft: 0, 
        paddingLeft: 17
    },
    agentsText: {
        fontSize: 15,
        color: "#6F6F6F"
    },
    searchContainer: {
        paddingHorizontal: 10
    },
    searchText: {
        fontSize: 15,
        color: "#6F6F6F"
    },
    switchContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    resetText: {
        marginTop: 5,
        marginRight: 10
    },
    listItemContainer: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        marginRight: 10, 
        borderColor: "#D0D0D0"
    }
};

export default styles;