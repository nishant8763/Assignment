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
    TextInput,
    // Alert,
} from "react-native"
import { connect } from 'react-redux';
import { addData } from './Actions/DataAction';
import DeviceInfo from 'react-native-device-info';
import Alert from './Alert';
class page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            deviceInfo: '',
            isalert: false
        };
    }
    componentDidMount = () => {
        DeviceInfo.isEmulator().then((isEmulator) => {
            console.log(isEmulator)
            if (isEmulator) {
                this.setState({ deviceInfo: 'Emulator', isalert: true })
            } else {
                this.setState({ deviceInfo: 'Device', isalert: true })
            }
        });
    }
    onSumbit = () => {
        const emailType = /^\w+([\D.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.name === '') {
            Alert.alert(
                "Validation Errors",
                'Enter Valid Name'
            )
        } else if (this.state.email === '' || emailType.test(this.state.email) === false) {
            Alert.alert(
                "Validation Errors",
                'Enter Valid Email'
            )
        } else {
            var obj = {
                name: this.state.name,
                email: this.state.email
            }
            this.props.addData(obj)
            this.props.navigation.navigate('page2')
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.main} >
                    <Text style={styles.text} >Enter your name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter Name'}
                        onChangeText={(name) => this.setState({ name })}
                    />
                    <Text style={styles.text}>Enter your Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter Email'}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TouchableOpacity onPress={() => this.onSumbit()} style={styles.button} >
                        <Text style={styles.btntext} >Submit</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isalert ? (
                    <View style={{ position: 'absolute', flex: 1, alignSelf: 'center', marginTop: '50%' }} >
                        <Alert type={this.state.deviceInfo} close={() => this.setState({ isalert: false })} />
                    </View>
                ) : (null)}

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
export default connect(mapStateToProps, {
    addData
})(page1);
const styles = StyleSheet.create({
    main: {
        marginHorizontal: 10,
        marginTop: '40%'
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10
    },
    input: {
        borderWidth: 0.5
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#f00',
        borderRadius: 5
    },
    btntext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
});