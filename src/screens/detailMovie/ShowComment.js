import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ShowComment = (props) => {
    var { data, item, } = props;//tuowng duowng var nameIcon = props.nameIcon;
    return (
        <View
            style={styles.tab1}
        >
            <Text
                style={styles.text2}
                numberOfLines={1}
            >
                {item.username}
            </Text>
            <Text
                numberOfLines={2}
                style={styles.text3}
            >
                {item.comment}
            </Text>
        </View>
    )

}

export default ShowComment;
const styles = StyleSheet.create({
    tab1: {
        flex: 1,
        backgroundColor: "#ffff",
        // height: 20,
        borderRadius: 10,
        alignItems: 'baseline',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    text2: {
        color: "#000000",
        fontSize: 20
    },
    text3: {
        marginLeft: 20,
        color: "#000000",
        fontSize: 14
    },
});

