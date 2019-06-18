import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { domain_iamge } from '../../ultils';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../ultils/styles/StyleCarousel';
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    _renderItemWithParallax({ item, index }, parallaxProps, navigation) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
                onPressItem={() => navigation.navigate("DetailMovie", {
                    itemMovie: item
                })}
            />
        );
    }
    render() {
        var { item, navigation } = this.props;
        console.log("item", item);
        return (
            <Carousel
            ref={c => this._slider1Ref = c}
            data={item}
            renderItem={(item, parallaxProps) => this._renderItemWithParallax(item, parallaxProps, navigation)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={1}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loopClonesPerSide={2}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => {//chay khi scroll , keo 1 phan
                this.setState({ urlImage: domain_iamge + item.backdrop_path });
            }}
        />
        );
    }
}

export default Item;

