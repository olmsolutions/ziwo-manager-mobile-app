import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = {
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width
    },
    offlineText: { 
        color: '#fff'
    }
};

export default styles;