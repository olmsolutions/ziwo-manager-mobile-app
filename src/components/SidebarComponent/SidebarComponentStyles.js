import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	sidebarContainer: {
		backgroundColor: "#FAFAFA",
	},
	userDetailsContainer: {
		flex: 1,
		flexDirection: "row",
		height: 110,
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "#A62A7C",
		paddingTop: 30,
		paddingBottom: 0,
		paddingHorizontal: 10
	},
	thumbnailContainer: {
		justifyContent: "center", 
		alignContent: "center"
	},
	accountContainer:{
		flex: 1, 
		flexDirection: "column", 
		justifyContent: "center", 
		alignContent: "center", 
		marginLeft: 10
	},
	userText:{
		fontSize: 13,
		fontWeight: "bold",
		color: "#fff"
	},
	emailText:{
		marginTop: 2,
		fontSize: 13,
		color: "#fff"
	},
	resetText:{
		color: "#FFFFFF"
	},
	headerButton: {
		borderRadius: 0
	},
	navigationRow: {
		flex: 1, 
		flexDirection: "row"
	},
	navigationContainer: {
		flex: 1, 
		flexDirection: "column", 
		justifyContent: "center", 
		alignContent: "center"
	},
	navigationImage: {
		alignSelf: "center",
		width: 50,
	},
	activeNavigationText: {
		alignSelf: "center",
		position: "absolute",
		top: 95,
		color: "#A62A7C"
	},
	inactiveNavigationText: {
		alignSelf: "center",
		position: "absolute",
		top: 95,
		color: "#727272"
	},
	activeNavigationImageContainer: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		padding: 20,
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: .5,
		borderRightWidth: .5,
		borderColor: "#D1C7CD",
		backgroundColor: "#F6E5ED"
	},
	inactiveNavigationImageContainer: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		padding: 20,
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: .5,
		borderRightWidth: .5,
		borderColor: "#D1C7CD",
		backgroundColor: "#FAFAFA"
	},
	domainTextContainer: {
		position:"absolute", 
		bottom: 15, 
		left: 15
	},
	domainText: {
		position:"absolute", 
		bottom: 35, 
		left: 15,
		color: "#727272"
	},
	versionText: {
		position:"absolute", 
		bottom: 15, 
		left: 15,
		color: "#727272"
	},
    domainTextInner: {
		color: "#A62A7C"
	},
});

export default styles;