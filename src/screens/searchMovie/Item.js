import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { domain_iamge } from '../../ultils';
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var { item, navigation } = this.props;
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.navigate("DetailMovie", {
                        itemMovie: item
                    })
                }}
            >
                <Image
                    source={{ uri: domain_iamge + item.poster_path }}
                    style={styles.image}
                />
                <View style={styles.view2}>
                    <Text
                        style={styles.text1}
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={styles.text2}
                        numberOfLines={1}
                    >
                        Tiều đề: {item.original_title}
                    </Text>
                    <Text
                        style={styles.text2}
                    >
                        Ngày phát hành: {item.release_date}
                    </Text>
                    <Text
                        numberOfLines={5}
                        style={styles.text3}
                    >
                        {item.overview}
                    </Text>
                    <Text
                        style={styles.text4}
                    >
                        {item.vote_average}
                    </Text>
                </View>
            </TouchableOpacity >
        );
    }
}

export default Item;

