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
import { danhsachphim } from "../../services";
import ViewLoading from "../../components/ViewLoading";
import styles from "./styles";
import Item from "./Item";

class SaveMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoading: false,
      data: null,
    };
  }
  componentDidMount() {
    this.danhsachphim();
  }
  danhsachphim() {
    this.setState({ isLoading: true });
    danhsachphim(this.cbSuccessdanhsachphim);
  }
  cbSuccessdanhsachphim = data => {
    this.setState({
      result: data.result,
      isLoading: false,
      data: data,
    });
    console.log("resultasfsdf", result);
  };
  render() {
    return (
      <View style={styles.container}>
        {/* header */}<View
              style={{marginTop:12}}
        />
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
export default SaveMovie;


