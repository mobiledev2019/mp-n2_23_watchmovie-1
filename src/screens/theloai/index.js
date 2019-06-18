import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../ultils/styles/StyleCarousel';
import styles from '../../ultils/styles/index';
import Header from '../../components/Header';
import { domain, api_key, domain_iamge } from '../../ultils';
import ViewLoading from '../../components/ViewLoading';
import { getTopMovie, theloai } from '../../services';

class Theloai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array_movie_rate: [],
            urlImage: "",
            isLoading: false,
            so: "0"
        }
    }
    componentDidMount() {
        theloai("3", this.cbSuccess)
    }
    cbSuccess = (responseJson) => {
        this.setState({
            array_movie_rate: responseJson.items,
            urlImage: domain_iamge + responseJson.items[0].backdrop_path,
            isLoading: true
        })
    }

    _renderItemWithParallax({ item, index }, parallaxProps, topMovie) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
                onPressItem={() => topMovie.props.navigation.navigate("DetailMovie", {
                    itemMovie: item
                })}
            // navigation={topMovie.props.navigation}
            />
        );
    }
    render() {

        var { array_movie_rate, isLoading } = this.state;
        if (isLoading == false) {
            return <ViewLoading />
        } else {
            return (
                <View
                    style={styles.exampleContainer}

                >
                    <Header navigation={this.props.navigation}
                        data={this.state.array_movie_rate}
                        navigation={this.props.navigation}
                        buttonLeft={{
                            action: () => { this.props.navigation.openDrawer(); }
                        }}
                    />
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={array_movie_rate}
                        renderItem={(item, parallaxProps) => this._renderItemWithParallax(item, parallaxProps, this)}
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
                            this.setState({ urlImage: domain_iamge + array_movie_rate[index].backdrop_path });
                            console.log("onSnapToItem")
                        }}
                    />
                </View>
            );
        }
    }
}

export default Theloai;
