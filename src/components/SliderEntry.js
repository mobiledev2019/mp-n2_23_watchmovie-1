import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../ultils/styles/StyleCarousel';
import { Card } from 'react-native-shadow-cards';
import { SFProDisplayRegular, SFProTextRegular } from '../ultils/string-fonts';
import { domain_iamge } from '../ultils';
export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        const { data: { backdrop_path, title } } = this.props;

        return (
            <ImageBackground
                source={{ uri: domain_iamge + backdrop_path }}
                style={styles.image}
            >
                {/* <Text style={{
                    alignSelf: 'center',
                    color: "white",
                    fontSize: 30,
                    marginBottom: 15,
                    marginLeft: -25,
                    fontFamily: SFProTextBold,
                    fontWeight: "bold"
                }}>{title}</Text> */}
            </ImageBackground >


        )
    }

    render() {
        const { data: { title, release_date, overview, vote_average } } = this.props;
        var { onPressItem, navigation } = this.props;
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.slideInnerContainer}
                    // onPress={() => {
                    //     navigation.navigate("DetailMovie")
                    // }}
                    onPress={onPressItem}
                >
                    <Card style={{ flex: 1 }} elevation={10}>
                        <View style={styles.shadow} />
                        <View style={styles.imageContainer}>
                            {this.image}
                        </View>
                    </Card>
                </TouchableOpacity>
                <View style={styleEntry.view1}>
                    <Text
                        style={styleEntry.txtTitle}
                    >{title}</Text>
                    <Text
                        style={styleEntry.txtVote}
                    >{vote_average}/10</Text>
                </View>
                <Text
                    style={styleEntry.date}
                >
                    Ngày phát hành: {release_date}
                </Text>
                <Text
                    style={styleEntry.txtOverview}
                    numberOfLines={4}
                >{overview}</Text>
            </View >
        );
    }
}
const styleEntry = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingLeft: 15,
        marginTop: -10
    },
    txtTitle: {
        fontSize: 20,
        color: 'white',
        fontFamily: SFProDisplayRegular,
        width: "70%"
    },
    txtVote: {
        fontSize: 20,
        color: 'white',
        fontFamily: SFProDisplayRegular
    },
    date: {
        fontSize: 12,
        fontFamily: SFProTextRegular,
        color: "rgba(255, 255, 255,0.8)",
        marginLeft: 15,
        marginVertical: 5
    },
    txtOverview: {
        marginLeft: 15,
        color: "rgba(255, 255, 255,0.5)",
        fontSize: 10,
        fontFamily: SFProTextRegular,
    }

});
