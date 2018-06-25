import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, Content } from "native-base";
import Modal from 'react-native-modalbox';
import styles from "./WhatsMyDomainModalStyles.js"

export const WhatsMyDomainModal = ({ showWhatsMyDomain, setWhatsMyDomain, domainUrl }) => {
    return(
        <Modal 
            style={[styles.modal, styles.modalContainer]} 
            position={"center"} 
            isOpen={showWhatsMyDomain}
            swipeToClose={true}
            backdropPressToClose={false}
            coverScreen={true}
            keyboardShouldPersistTaps={'handled'}
            onClosed={() => setWhatsMyDomain(false)}>
            <Content bounces={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.greetingsText}>What's my domain?</Text>
                        <Text style={styles.normalText}>Your domain name is visible in the web browser address bar while logged into your ZIWO instance.</Text>
                        <Text style={styles.smallText}>It should look something like this:</Text>
                        <Image style={styles.urlImage} source={domainUrl} resizeMode={"contain"} />
                    </View>
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            onPress={() => setWhatsMyDomain(false)}
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>GOT IT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Content>
        </Modal>
    )
}

export default WhatsMyDomainModal;