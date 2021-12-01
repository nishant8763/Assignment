import React from "react"
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
class page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name
        };
    }

    render() {
        console.log('page2', this.state.name)
        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.headerText} >Welcome {this.state.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('page1')}
                        style={styles.button} >
                        <Text style={styles.btntext}>Goto Page 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('page3')}
                        style={styles.button} >
                        <Text style={styles.btntext}>Goto Page 3</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    };
}
const mapStateToProps = ({ data_reducer }) => {
    const { data } = data_reducer;
    return {
        data,
    };
};
export default connect(mapStateToProps)(page2);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginVertical: 20
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: '40%',
        backgroundColor: '#f00',
        borderRadius: 5,

    },
    btntext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
});