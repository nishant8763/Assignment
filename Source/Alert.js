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

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View style={{ height: 150, width: 210, backgroundColor: '#ccc', borderRadius: 5, paddingVertical: 20 }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', justifyContent: 'center' }} > The app is Running on {this.props.type}</Text>
                <TouchableOpacity
                    onPress={this.props.close}
                    style={{ alignSelf: 'flex-end', margin: 20, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 10 }} >
                    <Text>Ok</Text>
                </TouchableOpacity>
            </View>
        )
    };
}

export default Alert;

const styles = StyleSheet.create({
});