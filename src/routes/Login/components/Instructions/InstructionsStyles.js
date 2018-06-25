import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");

const styles = {
    contentContainer: {
        backgroundColor: "#A62A7C",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    greetingsText: {
        fontSize: 20,
        color: "#fff",
    },
    normalText: {
        fontSize: 15,
        color: "#fff"
    },
    lastNormalText: {
        fontSize: 15,
        color: "#fff",
        marginTop: 20,
        textAlign: "center"
    },
    instructionImages: {
        height: height <= 592 ? 295 : 360,
        marginTop: 30,
        marginBottom: 20,
    },  
    urlImage: {
        height: height <= 568 ? 80 : 85,
    },
    buttonContainer: {
        backgroundColor: '#A62A7C',
        borderWidth: 1.5,
        borderColor: "#fff",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 120
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15
    },
    icon: {
        color: "#fff",
        marginRight: 7,
        marginTop: 3,
        fontSize: 22
    },
    funnelIcon: {
        color: "#fff",
        marginRight: 7,
        marginTop: 3,
        fontSize: 22
    },
    agentIcon: {
        width: 20, 
        height: 20,
        marginRight: 7
    },
    textContainer: {
        flexDirection: "row", 
        alignItems: "center"
    },
    imageIcon: {
        width: 22, 
        height: 22,
        marginRight: 7
    }
};

export default styles;