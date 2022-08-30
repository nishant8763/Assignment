import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
const OUTER_SIZE = width * 0.75;

const Login = props => {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const codeDigitsArray = new Array(4).fill(0);
  const ref = useRef(null);
  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    return (
      <View key={idx} style={styles.inputContainer}>
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };
  const handleOnPress = () => {
    ref?.current?.focus();
  };
  return (
    <SafeAreaView style={{backgroundColor: '#023866'}}>
      <StatusBar translucent backgroundColor="#023866" />
      <View
        style={{
          height: height * 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 35,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}>
          INFO ASSURE
        </Text>
      </View>
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // flex: 1,
          height: height * 0.6,
          backgroundColor: '#F6F5F3',
          // justifyContent: 'space-evenly',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          Login
        </Text>
        <View style={styles.View1}>
          <Text style={styles.Text1}>Mobile Number:</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: '#E0E0E0',
            }}
            value={phone}
            onChange={number => setPhone(number)}
          />
        </View>
        <View style={styles.View1}>
          <Text style={styles.Text1}>PIN:</Text>
          <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
            {codeDigitsArray.map(toDigitInput)}
          </Pressable>
          <TextInput
            ref={ref}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode"
            maxLength={4}
            style={styles.hiddenCodeInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.replace('Dashboard')}
          style={{
            width: '95%',
            height: 35,
            borderRadius: 50,
            alignSelf: 'center',
            backgroundColor: '#023866',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 15,
              letterSpacing: 1,
            }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{marginHorizontal: 10}}>First Time User?</Text>
            <Text>Register Here</Text>
          </View>
          <Text style={{color: 'blue'}}>Forgot Password/Pin?</Text>
        </View>
        <Image
          source={require('./Assets/carLogo1.png')}
          style={{
            height: '25%',
            width: '100%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: '10%',
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 22,
              letterSpacing: 1,
            }}>
            Powered By:
          </Text>
          <Image
            source={require('./Assets/InfoTrackLogo.png')}
            style={{
              height: 50,
              width: 200,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  View1: {alignSelf: 'center', width: '95%', marginVertical: 10},
  Text1: {fontWeight: 'bold'},
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  inputsContainer: {
    // backgroundColor: '#F00',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  inputContainer: {
    borderColor: '#cccccc',
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputText: {
    fontSize: 24,
    fontFamily: 'Menlo-Regular',
  },
});
export default Login;
