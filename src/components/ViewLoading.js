import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
class ViewLoading extends Component {
    render() {
        return (
            <View style={[styles.container, { ...this.props.style }]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text> Đang load dữ liệu ... </Text>
            </View>
        );
    }
}
export default ViewLoading;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
