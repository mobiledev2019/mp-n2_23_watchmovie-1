import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  PixelRatio,
  FlatList,
  Dimensions
} from "react-native";

import YouTube, {
} from 'react-native-youtube';

import { domain_iamge, api_key, domain } from "../../ultils";
import Icon from "react-native-vector-icons/AntDesign";
import { SFProTextRegular, SFProTextBold } from "../../ultils/string-fonts";
import ViewLoading from "../../components/ViewLoading";
import { postComment, showComment, postLike, checkLuu } from '../../services';
import ShowComment from "./ShowComment";


class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailMovie: null,
      isLoading: false,
      isLoadingComment: false,
      result: [],
      textcomment: "",
      checkluu:" "
    };
  }
  renderComment(item, index) {
    return (
      <ShowComment index={index} item={item} />
    );
  }
  _keyExtractor = (item, index) => index.toString();
  componentDidMount() {
    
    var itemMovie = this.props.navigation.state.params.itemMovie;
    this.showComment(itemMovie.id);
    this.checkLuu(itemMovie.id, "admin")
    fetch(
      `${domain}movie/${itemMovie.id}?api_key=${api_key}&language=en-US&page=1`
    )
      .then(response => response.json()) //convert sang json
      .then(responseJson => {
        //noi nhan du lieu sau khi convert
        console.log("responseJson", responseJson); //detail Movie
        this.setState({
          detailMovie: responseJson,
          isLoading: true
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  postLike(id_movie, name_movie, url_image, release_date, vote_average) {
    postLike(id_movie,name_movie, "admin",url_image, release_date, vote_average, this.cbSsspostLuu);
  }
  checkLuu(id_movie, user_name){
    checkLuu(id_movie, user_name, this.cbSsscheckluu);
  }
  showComment(id_movie) {
    this.setState({ isLoadingComment: true });
    showComment(id_movie,this.callBackSuccess);
  }
  postComment(id) {
    postComment(this.state.textcomment, id, "x", this.cbSuccesspostComment);
  }
  cbSsscheckluu = data => {

    if(data.result.check=="1")
    this.setState({
      checkluu: "Lưu lại",
    });
    if(data.result.check=="0")
    this.setState({
      checkluu: "Đã lưu",
    });
  };
  cbSsspostLuu = data => {

    if(data.result.check=="1")
    alert(JSON.stringify(data.result.notify));
    if(data.result.check=="0"){
    alert(JSON.stringify(data.result.notify));
    this.setState({
      checkluu: "Đã lưu",
    });
  }
  };
  cbSuccesspostComment = data => {
    console.log(
      "POST Response",
      "Response Body -> " + JSON.stringify(data)
    )
    alert(JSON.stringify(data.result));
    var itemMovie = this.props.navigation.state.params.itemMovie;
    this.showComment(itemMovie.id);
  };

  callBackSuccess = (data) => {
    this.setState({
      result: data.result,
      isLoadingComment: false,
    })
    console.log("datacomment", data)
    console.log("isLoadingComment", this.state.isLoadingComment)
  }


  render() {
    var itemMovie = this.props.navigation.state.params.itemMovie;
    if (this.state.isLoading === false) {
      return <ViewLoading />;
    } else {
      return (
        <ScrollView>
          <ImageBackground
            style={styles.container}
            source={{ uri: domain_iamge + itemMovie.backdrop_path }}
            // resizeMode="stretch"
            blurRadius={2}
          >
            <View
              styel={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}
            >
              {/* <Text>{itemMovie.id} ----{itemMovie.title}</Text> */}
              <View></View>
              <ImageBackground
                style={styles.view1}
                source={{ uri: domain_iamge + itemMovie.backdrop_path }}
              >
                <View style={styles.view3} />
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Icon name="left" color="white" size={20} />
                    <Text style={styles.text1}>Top Rated</Text>
                  </TouchableOpacity>

                  <Text style={styles.text2}>
                    {itemMovie.vote_average}
                    <Text style={styles.text3}>/10</Text>
                  </Text>
                </View>
                <View style={styles.item}>
                  <ImageBackground
                    source={{
                      uri: domain_iamge + this.state.detailMovie.poster_path
                    }}
                    style={{ width: 100, height: 150, marginLeft: 30 }}
                    resizeMode="stretch"
                  />
                  <View style={styles.view4}>
                    <Text style={styles.text2} numberOfLines={1}>
                      Fearuted Crew
                </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 18,
                        color: "white",
                        fontFamily: SFProTextBold
                      }}
                    >
                      James Mangold
                </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        color: "white",
                        fontFamily: SFProTextBold
                      }}
                    >
                      Director, Screenplay, Story
                </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 18,
                        color: "white",
                        fontFamily: SFProTextBold
                      }}
                    >
                      David James Kelly
                </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        color: "white",
                        fontFamily: SFProTextBold
                      }}
                    >
                      Story
                </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "rgba(255,255,255,0.9)",
                        fontSize: 8,
                      }}
                    >
                      Action | 2h 17min | 03/03/2017
                </Text>

                  </View>
                </View>
              </ImageBackground>
              <View
                style={{ flex: 1, alignItems: 'flex-end', marginRight:10 }}>
                <TouchableOpacity
                  onPress={() => this.postLike(itemMovie.id, itemMovie.original_title, itemMovie.poster_path,itemMovie.release_date,itemMovie.vote_average)}
                  style={{ backgroundColor: "#841584", width: 80 }}>
                  <Text style={styles.txtComment}> {this.state.checkluu} </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewvideo}>

                <ScrollView
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                  }}
                  onLayout={({
                    nativeEvent: {
                      layout: { width },
                    },
                  }) => {
                    if (!this.state.containerMounted)
                      this.setState({ containerMounted: true });
                    if (this.state.containerWidth !== width)
                      this.setState({ containerWidth: width });
                  }}>
                  {this.state.containerMounted && (
                    <YouTube
                      ref={component => {
                        this._youTubeRef = component;
                      }}
                      // You must have an API Key for the player to load in Android
                      apiKey="AIzaSyBaDPOPdd0bVGeO1900XXnHL4SPke06pIo"
                      // Un-comment one of videoId / videoIds / playlist.
                      // You can also edit these props while Hot-Loading in development mode to see how
                      // it affects the loaded native module
                      videoId="Xmr-0LWcpsg"
                      // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
                      // playlistId="PLF797E961509B4EB5"
                      play={this.state.isPlaying}
                      loop={this.state.isLooping}
                      fullscreen={this.state.fullscreen}
                      controls={1}
                      style={[
                        {
                          height: PixelRatio.roundToNearestPixel(
                            this.state.containerWidth / (16 / 9)
                          ),
                        },
                        styles.player,
                      ]}
                      onError={e => this.setState({ error: e.error })}
                      onReady={e => this.setState({ isReady: true })}
                      onChangeState={e => this.setState({ status: e.state })}
                      onChangeQuality={e => this.setState({ quality: e.quality })}
                      onChangeFullscreen={e =>
                        this.setState({ fullscreen: e.isFullscreen })
                      }
                      onProgress={e =>
                        this.setState({
                          duration: e.duration,
                          currentTime: e.currentTime,
                        })
                      }
                    />
                  )}

                  {/* Playing / Looping */}
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}>
                      <Text style={styles.buttonText}>
                        {this.state.status == 'playing' ? 'Pause' : 'Play'}
                      </Text>
                    </TouchableOpacity>
                    {!this.state.fullscreen && (
                      <View style={styles.buttonGroup1}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.setState({ fullscreen: true })}>
                          <Text style={styles.buttonText}>Fullscreen</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  {/* Fullscreen */}
                </ScrollView>
              </View>

              <ScrollView>
                <View
                  style={{ marginTop: 5, flex: 1 }}
                >
                  {this.state.isLoadingComment == true ? (
                    <ViewLoading style={{ backgroundColor: "transparent" }} />
                  ) : (
                      <FlatList
                        data={this.state.result}
                        renderItem={({ item, index }) => {
                          return this.renderComment(item, index);
                        }}
                        keyExtractor={this._keyExtractor}
                        style={{ flex: 1. }}
                      />
                    )
                  }
                </View>


                <View style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                  <View style={styles.viewcomment}>
                    <TextInput
                      style={{ flex: 1, color: "gray" }}
                      placeholder="Bình luận"
                      placeholderTextColor="gray"
                      selectionColor="gray"
                      onChangeText={(textcomment) => this.setState({ textcomment: textcomment })}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.postComment(itemMovie.id)}
                    style={styles.btnComment}>
                    <Text style={styles.txtComment}>Bình luận</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </ScrollView>
      );
    }
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default DetailMovie;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

  },
  viewcomment: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: "#ffff",
    // height: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  view1: {
    flex: 1,
    backgroundColor: "black",
  },
  viewvideo: {
    flex:1,
    marginTop:10

  },
  btnBack: {
    marginTop: 5,
    marginLeft: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  text1: {
    fontSize: 14,
    color: "white",
    fontFamily: SFProTextRegular
  },
  header: {
    flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },
  text2: {
    fontSize: 26,
    color: "white",
    fontFamily: SFProTextBold
  },
  text3: {
    fontSize: 16
  },
  view3: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  item: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  text2: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14
  },
  view4: {
    flex: 1,
    marginLeft: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonGroup1: {
    marginLeft: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  txtComment: {
    color: '#fff',
    textAlign: 'center'
  },
  btnComment: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,145,234,1)',
    borderRadius: 20,
    marginTop: 2,
    width: 100
  },
  btnLike: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,145,234,1)',
    borderRadius: 20,
    marginTop: 10,

  },
  txtLike: {
    color: '#fff',
    textAlign: 'center'
  },
});
