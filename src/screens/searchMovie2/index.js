import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../components/SliderEntry';
import { sliderWidth, itemWidth } from '../../ultils/styles/StyleCarousel';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { searchMovie } from "../../services";
import { domain_iamge } from "../../ultils";
import ViewLoading from "../../components/ViewLoading";
import styles from "./styles";

class SearchView2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            isLoading: false,
            data: null,
        };
    }
    searchMovie(text) {
        this.setState({ isLoading: true });
        searchMovie(text, this.cbSuccess);
    }
    cbSuccess = data => {
        this.setState({
            result: data.results,
            isLoading: false,
        });
        this.props._saveSearchMovie(data.results);
    };
    _renderItemWithParallax({ item, index }, parallaxProps, topMovie) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
                onPressItem={() => topMovie.props.navigation.navigate("DetailMovie", {
                    itemMovie: item
                })}
            />
        );
    }
    render() {
        // const data = this.props
        var { result, isLoading } = this.state;
        // console.log("text", data);
        // this.state.result=data.results
        return (
            <View style={styles.container}>
                {/* header */}

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("TopMovie")}>
                        <Icon name="left" size={20} color="white" />
                    </TouchableOpacity>
                    <View style={styles.view1}>
                        <Icon name="search1" color="grey" size={16} />
                        <TextInput
                            style={{ flex: 1, color: "gray" }}
                            placeholder="Nhập tên phim"
                            placeholderTextColor="gray"
                            selectionColor="gray"
                            onSubmitEditing={({ nativeEvent }) => {
                                console.log("text", nativeEvent.text);
                                this.searchMovie(nativeEvent.text);
                            }}
                        />
                        <MaterialIcons name="keyboard-voice" color="grey" size={20} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("SearchView")
                        }}
                    >
                        <Icon2 name="list" size={30} color="white" style={{ marginLeft: 15, marginBottom: 2, }} />
                    </TouchableOpacity>
                </View>

                {/* flatlist */}
                {isLoading == true ? (
                    <ViewLoading style={{ backgroundColor: "transparent" }} />
                ) : (
                        <View
                            style={styles.exampleContainer}
                        >
                            <Carousel
                                ref={c => this._slider1Ref = c}
                                data={result}
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
                                    this.setState({ urlImage: domain_iamge + result[index].backdrop_path });
                                    console.log("onSnapToItem")
                                }}
                            />
                        </View>
                    )}
            </View>
        );
    }
}

export default SearchView2;
