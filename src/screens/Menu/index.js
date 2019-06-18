import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Menu from "./Menu";
import TopMovie from "./../topMovie"
import TopMovieGrid from "./../topMovieGrid"
import Theloai from "./../theloai"

// import DemoMenu from './DemoMenu';

const RouteConfigs = {

    Theloai: {
        screen: Theloai,
        navigationOptions: {
            drawerLabel: 'Theloai'
        }
    },
    TopMovie: {
        screen: TopMovie,
        navigationOptions: {
            drawerLabel: 'TopMovie'
        }
    },
    TopMovieGrid: {
        screen: TopMovieGrid,
        navigationOptions: {
            drawerLabel: 'TopMovieGrid'
        }
    },
}
const DrawerNavigatorConfig = {
    initialRouteName: 'TopMovie',
    headerMode: "none",

    contentComponent: Menu
}

const DemoMenu = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);




export default createAppContainer(DemoMenu);//Thieu cai nay