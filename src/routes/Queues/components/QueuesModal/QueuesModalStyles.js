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
    itemText: {
        color: "#615E61"
    },
    valueText: {
        fontWeight: "bold",
        fontSize: 18
    },
    menu: {
		color: "#fff",
		fontSize: 24
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
    queueDetailsContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    profilePicture: {
        width: 71,
        height: 71,
        marginLeft: 20
    },
    queueContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
        backgroundColor: "#F5F5F5"
    }
};

export default styles;