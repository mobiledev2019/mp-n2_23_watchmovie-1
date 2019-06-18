import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Picker, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import { SFProDisplayMedium } from '../ultils/string-fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: ""
        };
    }
    getSelectedPickerVaule = (itemValue) => {
        console.log("So", itemValue);
        if (itemValue == 1) {
            console.log("So", itemValue);
            this.props.navigation.navigate("TopMovie");
        }
        if (itemValue == 3) {
            console.log("So", itemValue);
            this.props.navigation.navigate("Theloai");
        }

    }
    render() {
        var {
            buttonLeft,
            data
        } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={buttonLeft.action}
                >
                    <AntDesign
                        name="menufold"
                        size={20}
                        color="white"
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 150, color: "white" }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ language: itemValue })
                            this.getSelectedPickerVaule(itemValue)
                        }
                        }>
                        {/* <Picker.Item label="Top Movie" value="0" /> */}
                        <Picker.Item label="Siêu anh hùng" value="1" />
                        <Picker.Item label="DC commic" value="3" />
                    </Picker>

                    {/* <Button
                        onPress={this.getSelectedPickerVaule()}
                        title="OK"
                        color="#841584"
                    /> */}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("TopMovie")
                        }}
                    >
                        <Icon2 name="list" size={30} color="white" style={{ marginLeft: 15, marginBottom: 2, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("TopMovieGrid", { data })
                        }}
                    >
                        <Icon2 name="grid" size={30} color="white" style={{ marginLeft: 5, marginBottom: 2, }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("SearchView")
                    }}
                >
                    <Icon name="search1" size={20} color="white" style={{ marginRight: 10, marginBottom: 5, }} />
                </TouchableOpacity>
            </View >

        );
    }
}

export default Header;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        alignItems: "flex-end",
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontFamily: SFProDisplayMedium,
    }
});
