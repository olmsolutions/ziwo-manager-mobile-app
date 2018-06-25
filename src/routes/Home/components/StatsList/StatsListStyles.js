const size = 150;
const width = 15;
const cropDegree = 90;
const textOffset = width;
const textWidth = size - (textOffset * 2 );
const textHeight = size * (1 - cropDegree/360) - (textOffset * 2);

const styles = {
    listContainer: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#eee',
        marginVertical: 5,
        backgroundColor: "#fff"
    },
    slaText: {
        fontSize: 24, 
        position: "absolute", 
        left: 24, 
        bottom: 24
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row"
    },
    statsValueText: {
        fontSize: 28
    },
    inboundText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#F96A2B",
    },
    outboundText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#17837A",
    },
    performanceText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ad3278",
    },
    moreIcons: {
        fontSize: 32,
        textAlign: "right",
        color: "#00000054"
    },
    leftPart: {
        alignItems: 'flex-start',
        justifyContent: "center",
        marginRight: 10
    },
    inboundContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderLeftWidth: 1,
        borderColor: "#FA7F3840",
        paddingLeft: 15
    },
    outboundContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderLeftWidth: 1,
        borderColor: "#17837A40",
        paddingLeft: 15
    },
    performanceContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderLeftWidth: 1,
        borderColor: "#ad327840",
        paddingLeft: 15
    },
    centerItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        marginRight: 10
    },
    centerValue: {
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    rightPart: {
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 2.5,
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    arrow: {
        borderTopColor: '#fff',
    },
    background: {
        backgroundColor: '#A9A9A950'
    },
    slaContainer: {
        justifyContent: "center",
        alignContent: "center",
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 5,
        marginBottom: 5
    },
    textView: {
        position: 'absolute',
        top: textOffset,
        left: textOffset,
        width: textWidth,
        height: textHeight,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        fontSize: 30,
        fontWeight: "bold"
    },
    popOverButton: {
        paddingVertical: 10
    }
};

export default styles;