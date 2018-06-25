import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#A62A7C",
	},
	headerBody: {
		flex: 1, 
		alignItems:'center', 
		justifyContent:'center'
	},
	menuLeft: {
		color: "#fff",
		fontSize: 24,
		paddingRight: 15,	
	},
	menuRight: {
		color: "#fff",
		fontSize: 24
	},
	headerText:{
		color:"#fff",
		fontSize:18,
		fontWeight: "bold"
	},
	refreshText: {
		color: "#fff",
		fontSize: 11
	}
});

export default styles;