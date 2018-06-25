import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = {
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalContainer: {
        height: height,
        width: width,
        backgroundColor: "#A62A7C"
    },
    contentContainer: {
        flex: 1, 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        height
    },
    textContainer: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    greetingsText: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 50
    },
    normalText: {
        fontSize: 15,
        color: "#fff",
        textAlign: "center",
        marginBottom: 60
    },
    smallText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center"
    },
    urlImage: {
        height: 35,
        marginTop: 30,
        marginBottom: 30,
    },
    buttonContainer: {
        backgroundColor: '#A62A7C',
        borderWidth: 1.5,
        borderColor: "#fff",
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 100
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15
    },
    loginButtonContainer: {
        height: 100
    }
};

export default styles;