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
            <View
                style={styles.item}
            >
                <Image
                    source={{ uri: domain_iamge + item.url_image }}
                    style={styles.image}
                />
                <View style={styles.view2}>
                    <Text
                        style={styles.text1}
                        numberOfLines={2}
                    >
                        {item.name_movie}
                    </Text>
                    <Text
                        style={styles.text2}
                    >
                        Ngày phát hành: {item.release_date}
                    </Text>
                    <Text
                        style={styles.text4}
                    >
                        {item.vote_average}
                    </Text>
                </View>
            </View >
        );
    }
}

export default Item;

