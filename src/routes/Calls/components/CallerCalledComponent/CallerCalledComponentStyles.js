import { Dimensions } from "react-native";

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
    numbersText: {
        fontSize: 15,
        color: "#6F6F6F"
    },
    searchContainer: {
        marginTop: 5,
        paddingHorizontal: 10
    },
    searchText: {
        fontSize: 13,
        color: "#6F6F6F"
    },
    switchContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    resetText: {
        marginRight: 10
    }
};

export default styles;