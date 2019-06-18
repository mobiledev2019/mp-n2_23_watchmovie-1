import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ten from './Ten';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
        };
    }
    navigate(key) {
        this.props.navigation.navigate(key)
    }
    render() {
        const data = this.props.navigation.getParam("data");
        result = data.result
        console.log("result", result);
        let { routes, key } = this.props.navigation.state;
        return (
            <View>
                <Ten
                    result={result}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("SaveMovie")}
                >
                    <View
                        style={styles.viewScreen}
                    >
                        <Text
                            style={styles.textName}
                        >
                            Danh sách phim yêu thích
                        </Text>

                    </View>

                </TouchableOpacity>
            </View>

        );
    }
}

export default Menu;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    viewScreen: {

        width: "100%",
        height: 25,
    },
    textScreen: {
        marginLeft: 20,
        height: 200,
        color: 'black',
        fontSize: 15,
    },
});
