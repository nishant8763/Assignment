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
    TouchableHighlight,
    TouchableWithoutFeedback,
    Alert,
} from "react-native"
import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

class page3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View style={styles.main} >
                <View style={{ justifyContent: 'space-between', paddingRight: 20, flexDirection: 'row' }} >
                    <AntDesign
                        name={'arrowleft'}
                        size={25}
                        color={'#fff'}
                        style={{ marginLeft: 15 }}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.headerText} >{this.props.data.name}</Text>
                </View>
                <View >
                    <Text style={{ color: '#A8B418', alignSelf: 'center' }} >4 Variations of a button</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Pressed', 'Variation 1')}
                        style={{ ...styles.button, backgroundColor: 'transparent' }} >
                        <Text style={styles.btntext}>Press me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Pressed', 'Variation 2')}
                        style={{ ...styles.button, backgroundColor: '#34424A' }} >
                        <Text style={styles.btntext}>Press me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Pressed', 'Variation 3')}
                        style={{ ...styles.button, backgroundColor: '#6EB1F7' }} >
                        <Text style={styles.btntext}>Press me</Text>
                    </TouchableOpacity>
                    <SwipeButton
                        title={'Slide me to continue'}
                        titleColor={'#77ADF0'}
                        titleFontSize={17}
                        railStyles={{ borderRadius: 10, }}
                        containerStyles={{ borderRadius: 10, marginTop: 20, }}
                        railFillBackgroundColor={'transparent'}
                        railBackgroundColor={'transparent'}
                        thumbIconStyles={{ borderRadius: 10, }}
                        thumbIconBackgroundColor={'#6EB1F7'}
                        onSwipeSuccess={() => Alert.alert('Success', 'Action Started')}
                    />
                </View>
            </View>
        )
    };
}
const mapStateToProps = ({ data_reducer }) => {
    const { data } = data_reducer;

    return {
        data,
    };
};
export default connect(mapStateToProps)(page3);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#1A1924',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    button: {
        paddingVertical: 10,
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#f00',
        borderRadius: 5,

    },
    btntext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center'
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff'
    },
});