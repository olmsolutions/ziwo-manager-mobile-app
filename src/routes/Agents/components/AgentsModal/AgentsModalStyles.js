import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

const styles = {
    itemText: {
        color: "#615E61"
    },
    valueText: {
        fontWeight: "bold",
        fontSize: 18
    },
    onBreakText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#F96A2B"
    },
    callText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#ad3278"
    },
    loggedInText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#999999"
    },
    menu: {
		color: "#fff",
        fontSize: 24,
        paddingRight: 30
    },
    headerContainer: {
		backgroundColor: "#A62A7C",
    },
    headerText:{
		color:"#fff",
		fontSize:18,
		fontWeight: "bold"
    },
    agentDetailsContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    profilePicture: {
        width: 71,
        height: 71,
        marginLeft: 20
    },
    agentOnBreakContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#FFC384"
    },
    agentAvailableContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#B5EC94"
    },
    agentMeetingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#DDB3A6"
    },
    agentOutgoingContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#B7A9FF"
    },
    agentloggedOutContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#F5F5F5"
    },
    timeContainer: {
        width: 120, 
        flexDirection:"row", 
        alignContent: "flex-end", 
        justifyContent: "flex-end"
    }
};

export default styles;