import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

const styles = {
    headerContainer: {
		backgroundColor: "#A62A7C",
    },
    menu: {
		color: "#fff",
        fontSize: 24,
        paddingRight: 30
	},
    headerText:{
		color:"#fff",
		fontSize:18,
		fontWeight: "bold"
    },
    onBreakText: {
        color: "#F96A2B"
    },
    availableText: {
        color: "#6FCC49"
    },
    loggedOutText: {
        color: "#848484"
    },
    meetingText: {
        color: "#ad3278"
    },
    outgoingText: {
        color: "#7847FF"
    },
    listContainer: {
        width
    },
    switchContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 14,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    resetText: {
        marginTop: 5,
        marginRight: 10
    },
};

export default styles;