import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from 'react-native-vector-icons/Entypo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { searchMovie } from "../../services";
import { domain_iamge } from "../../ultils";
import ViewLoading from "../../components/ViewLoading";
import styles from "./styles";
import Item from "./Item";
import Item1 from "./Item1";

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      data:null,
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
      data:data,
    });
    this.props._saveSearchMovie(data.results);
    console.log("seachmovie", result);
  };

  render() {
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
              this.props.navigation.navigate("SearchView2")
            }}
          >
            <Icon2 name="grid" size={30} color="white" style={{ marginLeft: 5, marginBottom: 2, }} />
          </TouchableOpacity>
        </View>

        {/* flatlist */}
        {this.state.isLoading == true ? (
          <ViewLoading style={{ backgroundColor: "transparent" }} />
        ) : (
            <FlatList
              data={this.state.result}
              renderItem={({ item, index }) => {
                return this.renderItem(item, index);
              }}
              keyExtractor={this._keyExtractor}
              style={{ flex: 1 }}
            />
          )}
      </View>
    );
  }
  renderItem(item, index) {
    return (
      <Item index={index} item={item} navigation={this.props.navigation} />
    );
  }
  _keyExtractor = (item, index) => index.toString();
}
export default SearchView;


