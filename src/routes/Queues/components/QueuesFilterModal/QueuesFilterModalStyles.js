import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

const styles = {
	modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalContainer: {
        height: height,
        width: width
    },
    headerContainer: {
		backgroundColor: "#A62A7C",
		borderBottomWidth: 0,
        elevation: 0,
        width
    },
    menu: {
		color: "#fff",
		fontSize: 24
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
};

export default styles;