import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    menu: {
		color: "#fff",
        fontSize: 24,
        paddingRight: 30
    },
    headerContainer: {
		backgroundColor: "#A62A7C",
		borderBottomWidth: 0,
        elevation: 0,
        width
    },
    headerText:{
		color:"#fff",
		fontSize:18,
		fontWeight: "bold"
	},
    saveText:{
		color:"#fff",
		fontSize:18
	},
    segmentContainer: {
        padding: 10, 
        width
    },
    tabStyle: {
        borderColor: "#A62A7C",
        padding: 5
    },
    tabTextStyle: {
        fontSize: 13,
        color: "#A62A7C"
    },
    activeTabStyle: {
        backgroundColor: "#A62A7C",
    },
    resetIcon: {
        width: 24,
        height: 24
    }
};

export default styles;