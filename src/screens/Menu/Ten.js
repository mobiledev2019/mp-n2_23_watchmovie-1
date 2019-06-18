import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const Ten = (props) => {
    var { onPressItem, result } = props;//tuowng duowng var nameIcon = props.nameIcon;
    return (
        <View
            style={styles.tab1}
            onPress={onPressItem}
        >
            <Image
                source={{ uri: `http://www.wallpapermaiden.com/wallpaper/17403/download/750x1334/anime-boy-sky-walking-school-uniform-scenic.png` }}
                style={styles.avatar}
            />
            <Text style={styles.textName}>{result.username}</Text>

            <Text style={styles.textDiem}>{result.age}</Text>
            <Text style={styles.textDiem}>{result.phone}</Text>
        </View>
    )
}
export default Ten;
const styles = StyleSheet.create({
    tab1: {
        width: "100%", 
        height: 200, 
        backgroundColor: 'green',
        // justifyContent: 'center',
        // alignItems: 'center',    
        marginRight: 10,
        // borderRadius: 15,
        overflow: 'hidden',
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 25,
        overflow: 'hidden',
    },
    textName: {
        marginTop: 20,
        marginLeft: 20,
        color: 'white',
        fontSize: 20
    },
    textDiem: {
        marginTop: 10,
        marginLeft: 20,
        color: 'white',
        fontSize: 11
    },
});