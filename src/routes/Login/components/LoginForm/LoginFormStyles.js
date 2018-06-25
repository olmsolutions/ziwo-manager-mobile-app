import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = {
    loginFormContainer: {
        height,
        width
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height,
        width
    },
    aswatLogo: {
        width: 140,
    },
    formText: {
        color: "#7F807F",
        textAlign: "center",
        marginBottom: 10
    },
    inputText: {
        fontSize: 15,
        textAlign: "center",
        color: "#A62A7C"
    },
    loginText: {
        fontSize: 15,
        color: "#7F807F"
    },
    buttonText: {
        fontSize: 15,
        color: "#FFFFFF"
    },
    loginButton: {
        marginTop: 15
    },
    myDomainsButton: {
        marginTop: 20
    },
    myDomainsText: {
        color: "#7F807F",
        textAlign: "center",
        fontSize: 12
    },
    formBoxContainer: {
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"transparent", 
        paddingBottom: 30
    },
    domainContainer: {
        alignItems: "center", 
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingTop: 44,
        paddingBottom: 20,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginHorizontal: 24
    },
    loginContainer: {
        alignItems: "center", 
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 18,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginHorizontal: 24
    },
    domainButton: {
        position:"absolute",
        top: 184,
        alignItems:'center',
        justifyContent:'center',
        width:55,
        height:55,  
        backgroundColor:'#6FCC49',
        borderRadius:100,
    },
    loginButton: {
        position:"absolute",
        top: 195,
        alignItems:'center',
        justifyContent:'center',
        width:55,
        height:55,  
        backgroundColor:'#6FCC49',
        borderRadius:100,
    },
    backButtonContainer: {
        alignItems:"flex-end", 
        justifyContent:"flex-end",
        alignSelf: 'stretch',
    },
    backButton: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30,  
        backgroundColor:'#fff',
        borderRadius:100,
    },
    listContainer: {
        borderBottomWidth: 0,
        width: 350,
    }
};

export default styles;