import { createStackNavigator, createAppContainer } from "react-navigation";
import TopMovie from "./screens/topMovie";
import TopMovieGrid from "./screens/topMovieGrid";
import DetailMovie from "./screens/detailMovie";
import SearchView from "./screens/searchMovie";
import SearchView2 from "./screens/searchMovie2";
import Theloai from "./screens/theloai";
import SignIn from "./screens/SignIn";
import Menu from "./screens/Menu";
import SaveMovie from "./screens/saveMovie";

const AppNavigator = createStackNavigator({
    TopMovie: {
        screen: TopMovie
    },
    DetailMovie: {
        screen: DetailMovie
    },
    SearchView: {
        screen: SearchView
    },
    TopMovieGrid: {
        screen: TopMovieGrid
    },
    SearchView2:{
        screen:SearchView2
    },
    Theloai:{
        screen:Theloai
    },
    SignIn:{
        screen:SignIn
    },
    Menu: {
        screen: Menu
    },
    SaveMovie: {
        screen: SaveMovie
    },
}, {
        headerMode: "none",
        initialRouteName: "SignIn"
    });

export default createAppContainer(AppNavigator);