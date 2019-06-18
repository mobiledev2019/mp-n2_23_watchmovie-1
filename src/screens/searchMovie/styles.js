import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393939'
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: getStatusBarHeight() + 20,
    },
    view1: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: "#292929",
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    item: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 20
    },
    image: {
        width: 100,
        height: 130
    },
    view2: {
        flex: 1,
        marginLeft: 10
    },
    text1: {
        color: "white",
        fontSize: 20,
        width:200
    },
    text2: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14
    },
    text3: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 14
    },
    text4: {
        position: "absolute",
        top: 10,
        right: 0,
        color: 'white',
        fontSize: 16
    }

});
export default styles;