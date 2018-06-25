import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    filterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        width,
        height: 55,
        backgroundColor: "#fff",
        marginVertical: 7,
        paddingVertical: 10
    },
    dateContainer: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
        marginLeft: 15,
        height: 55,
    },
    dateButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    dateText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#444343"
    },
    iconButton: {
        alignSelf: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        height: 55,
    },
    disabledIcon: {
        color: "#D9D9D9",
        fontSize: 20
    },
    calendarIcon: {
        marginRight: 10
    },
    funnelIcon: {
        color: "#A62A7C",
        fontSize: 20
    },
    iconStyle: {
        color: "#868686",
        fontSize: 20
    }
};

export default styles;