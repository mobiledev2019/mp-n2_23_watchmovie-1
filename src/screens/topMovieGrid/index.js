import React, { Component } from "react";
import { FlatGrid } from "react-native-super-grid";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import { domain, api_key, domain_iamge } from "../../ultils";
class TopMovieGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.navigation.getParam("data");

    return (
      <ImageBackground style={styles.exampleContainer}>
        <Header navigation={this.props.navigation}
          buttonLeft={{
            action: () => { this.props.navigation.openDrawer(); }
          }}
        />
        <FlatGrid
          itemDimension={130}
          items={data}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("DetailMovie", {
                  itemMovie: item
                });
              }}
              style={[
                styles.itemContainer,
                { backgroundColor: "rgba(255,255,255,0.5)" }
              ]}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={{ uri: domain_iamge + item.poster_path }}
                  style={styles.image}
                />

                <View
                  style={{
                    paddingTop: 5,
                    paddingLeft: 30,
                    marginBottom: 10,
                    flexDirection: "row"
                  }}
                />
                <Text style={styles.textname} numberOfLines={2}>
                  {item.original_title}
                </Text>
                <Text style={styles.textdate}>
                  Ngày phát hành: {item.release_date}
                </Text>
              </View>
            </TouchableOpacity>}
        />
      </ImageBackground>
    );
  }
}

export default TopMovieGrid;
