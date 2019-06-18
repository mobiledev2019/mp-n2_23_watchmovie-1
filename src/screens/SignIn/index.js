import React, { Component } from 'react';
import { LoginManager } from 'react-native-fbsdk'
import {Alert, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Montserrat_Bold, Montserrat_Medium, SF_UI_Text_Medium } from '../../ultils/string-fonts';
import { dangnhap } from "../../services";
import firebase from 'react-native-firebase';
class SignIn extends Component {//rnce
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            data:null,
            result: [],
        };
    }

    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken', value);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
    chuyenmanhinh(that) {
        that.props.navigation.navigate("Menu",  this.state.data )
    }
    async loginfacebook(that) {
        try {
            let result = await LoginManager.logInWithReadPermissions(['public_profile'])
            if (result.isCancelled) {
                alert('Đăng nhập không thành công');
            }
            else {
                this.chuyenmanhinh(that);
            }
        } catch (error) {
            alert('Đăng nhập Facebook lỗi: ' + error)
        }
    }

    dangnhap() {
        const { username, password } = this.state
        // if (this.state.kiemtra == 1)
            dangnhap(username, password, this.cbSuccess);

    }
    cbSuccess = data => {
        this.setState({
            data:data,
            result:data.result,
        });
        if(data.result==0){
            alert('Đăng nhập không thành công');
        }
        else if(data.result!=0){
            this.props.navigation.navigate("Menu", { data });
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login Movie</Text>
                <TextInput placeholder="Username"
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    style={styles.txtInput}
                    onChangeText={(username) => this.setState({ username: username })} />
                <TextInput placeholder="Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    style={styles.txtInput}
                    onChangeText={(password) => this.setState({ password: password })} />
                <TouchableOpacity
                    onPress={() => this.dangnhap()}
                    style={styles.btnLogin}>
                    <Text style={styles.txtLogin}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => this.loginfacebook(this)}
                >
                    <Text style={styles.textStyle}>Đăng Nhập bằng Facebook</Text>
                </TouchableOpacity>
            </View>
        );
    }
    ////////////////////// Add these methods //////////////////////

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            // this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 30,
        color: 'red'
    },
    txtInput: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        width: DEVICE_WIDTH - 40,

        marginHorizontal: 20,
        padding: 8,
        borderRadius: 20,
        color: '#000',
        marginTop: 2
    },
    btnLogin: {
        width: DEVICE_WIDTH - 40,
        backgroundColor: 'rgba(0,145,234,1)',
        padding: 8,
        borderRadius: 20,
        marginTop: 2

    },
    txtLogin: {
        color: '#fff',
        textAlign: 'center'
    },
    buttonStyle: {
        alignItems: 'center',
        height: 20,
        backgroundColor: '#141E39',
        borderRadius: 5,
        paddingBottom: 50,
        paddingHorizontal: 15,
    },
    textStyle: {
        marginTop: 10,
        fontSize: 20,
        fontFamily: Montserrat_Medium,
        color: '#FFFFFFFF',
        alignItems: 'center',
    },

});
