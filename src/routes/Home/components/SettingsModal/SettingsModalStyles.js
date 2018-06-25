import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    headerContainer: {
		backgroundColor: "#A62A7C",
		borderBottomWidth: 0,
        elevation: 0,
        width
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
	headerButton: {
		borderRadius: 0
	},
	listText: {
		fontSize: 14,
		color: "#393839"
	},
	inboundTitleText: {
		fontSize: 24,
		color: "#F96A2B"
	},
	outboundTitleText: {
		fontSize: 24,
		color: "#17837A"
	},
	performanceTitleText: {
		fontSize: 24,
		color: "#ad3278"
	},
    switchContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 14.5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    resetText: {
		marginTop: 5,
        marginRight: 10
    },
};

export default styles;