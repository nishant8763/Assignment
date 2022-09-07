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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* yLabel() {
  yield* [0, 25, 75, 100, 125];
}

const data2 = {
  labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '6 Jan', '7 Jan', '8 Jan'],
  datasets: [
    {
      data: [81, 61, 10, 55, 73, 85, 95, 85],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      // strokeWidth: 2, // optional
    },
  ],
};
const {height, width} = Dimensions.get('screen');
const OUTER_SIZE = width * 0.75;
const PRIMARYCOLOR = '#023866';

const Dashboard = props => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [vehicle, setVehicle] = useState(null);
  const [data, setData] = useState({
    labels: [],
    data: [0.0],
  });
  const [data1, setData1] = useState({
    labels: [],
    data: [0.0],
  });
  const yLabelIterator = yLabel();
  const userDetail = async () => {
    let userDetails = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(userDetails);
    // console.log(userDetails.policyDetails[0].policyExpiryDate);
    // policyIssueDate
    // policyExpiryDate
    // userDetails.authToken
    // userDetails.policyDetails[0].vehicleNo
    // userDetails.policyDetails[0].policyIssueDate

    fetch(
      'http://staging.infosmart.co.in/mapp/infoinsure/services/getDashboardContent',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authToken: userDetails?.authToken,
          vehicleNo: userDetails?.policyDetails[0].vehicleNo,
          startDate: userDetails?.policyDetails[0].policyIssueDate,
          endDate: userDetails?.policyDetails[0].policyExpiryDate,
          reportMode: 'M',
        }),
      },
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setVehicle(res);
        setData({
          labels: [],
          data: [res?.avgLastSafetyScore],
        });
        setData1({
          labels: [],
          data: [res?.avgSafetyScore],
        });
        setLoader(false);
        // props.navigation.replace('Dashboard');
      });
  };
  useEffect(() => {
    userDetail();
  }, []);

  // const data = {
  //   labels: [],
  //   data: [vehicle?.avgSafetyScore / 100],
  // };
  // const data1 = {
  //   labels: [],
  //   data: [vehicle?.avgLastSafetyScore / 100],
  // };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={PRIMARYCOLOR} />
      {loader ? (
        <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="menu" size={30} style={{marginHorizontal: 5}} />
              <Image
                source={{
                  uri: 'http://staging.infosmart.co.in/mapp/infoinsure/resources/images/profileimages/22_PARTHASARATHIB.png?37',
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: PRIMARYCOLOR,
                  marginHorizontal: 5,
                }}
              />
              <View style={{marginStart: 5}}>
                <Text style={{fontSize: 12, fontWeight: '600'}}>
                  Policy Holder
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {user?.userName}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>
              SOS
            </Text>
          </View>
          <View
            style={{
              backgroundColor: PRIMARYCOLOR,
              marginVertical: 10,
              paddingVertical: 3,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginStart: 5,
              }}>
              POLICY DETAILS
            </Text>
          </View>
          <View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                fontWeight: 'bold',
                color: '#000',
                marginBottom: 10,
              }}>
              {user?.policyDetails[0]?.model}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                  }}>
                  Policy No.
                </Text>
                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#000'}}>
                  {user?.policyDetails[0]?.policyNumber}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: '#000',
                  marginHorizontal: 10,
                }}
              />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                  }}>
                  Last Premium
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  INR {user?.policyDetails[0]?.totalpremium}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: '#000',
                  marginHorizontal: 10,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                    textAlign: 'center',
                  }}>
                  Expiration Date
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  {user?.policyDetails[0]?.policyExpiryDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  borderColor: PRIMARYCOLOR,
                  borderWidth: 3,
                  borderRadius: 50,
                  height: 70,
                  width: 70,
                }}>
                <Image
                  source={require('./Assets/CarFront.png')}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{alignSelf: 'center', marginStart: 10}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                  }}>
                  Registration Number
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  {user?.policyDetails[0]?.vehicleNo}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                backgroundColor: PRIMARYCOLOR,
                borderRadius: 2,
                padding: 5,
                paddingHorizontal: 10,
              }}
              onPress={() => props.navigation.navigate('Maps')}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                VIEW DETAILS
              </Text>
              <AntDesign
                name="caretdown"
                size={10}
                color={'#fff'}
                style={{alignSelf: 'center', marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                borderColor: '#CCC',
                borderWidth: 2,
                width: '38%',
                flexDirection: 'row',
                height: height * 0.08,
              }}>
              <View
                style={{
                  paddingStart: 25,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                  }}>
                  ACCIDENTS
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignContent: 'center',
                  }}>
                  <AntDesign
                    name="car"
                    size={20}
                    color={'#000'}
                    style={{alignSelf: 'center', marginTop: 5}}
                  />
                  <Text
                    style={{fontSize: 20, alignSelf: 'center', color: '#000'}}>
                    {vehicle?.accidentsCount}
                  </Text>
                  <Foundation
                    name="arrow-up"
                    size={17}
                    color={'green'}
                    style={{marginTop: 7}}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '40%',
                  height: '105%',
                  backgroundColor: PRIMARYCOLOR,
                  marginTop: -2,
                  marginStart: 30,
                  justifyContent: 'center',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  VIEW DETAILS
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor: '#CCC',
                borderWidth: 2,
                width: '38%',
                flexDirection: 'row',
                height: height * 0.08,
              }}>
              <View
                style={{
                  paddingStart: 25,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: PRIMARYCOLOR,
                  }}>
                  ALERTS
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignContent: 'center',
                  }}>
                  <Feather
                    name="alert-triangle"
                    size={20}
                    color={'#000'}
                    style={{alignSelf: 'center', marginTop: 5}}
                  />
                  <Text
                    style={{fontSize: 20, alignSelf: 'center', color: '#000'}}>
                    {vehicle?.alertsCount}
                  </Text>
                  <Foundation
                    name="arrow-down"
                    size={17}
                    color={'red'}
                    style={{marginTop: 7}}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '40%',
                  height: '105%',
                  backgroundColor: PRIMARYCOLOR,
                  marginTop: -2,
                  marginStart: 30,
                  justifyContent: 'center',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  VIEW DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: PRIMARYCOLOR,
              marginTop: 10,
              paddingVertical: 3,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginStart: 5,
              }}>
              TRIP DETAILS
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <AntDesign
                name="calendar"
                size={17}
                color={PRIMARYCOLOR}
                style={{}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 12,
                  marginStart: 5,
                  color: PRIMARYCOLOR,
                }}>
                DRIVER PERFORMANCE
              </Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 5}}>
              <Text style={{fontWeight: 'bold'}}>1 Jan - 7 Jan 2020</Text>
            </View>
            <View style={styles.MainContainer}>
              <ProgressChart
                data={data}
                width={210}
                height={210}
                strokeWidth={5}
                radius={100}
                hideLegend={true}
                chartConfig={{
                  backgroundColor: '#f0f0f0',
                  backgroundGradientFrom: '#f0f0f0',
                  backgroundGradientTo: '#f0f0f0',
                  color: (opacity = 10) => `rgba(0, 179, 0, ${opacity})`,
                }}
                style={{
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  {vehicle?.avgSafetyScore}
                </Text>
                <Text>EXCELLENT SCORE</Text>
                <AirbnbRating count={5} size={15} showRating={false} />
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                marginLeft: 5,
                justifyContent: 'center',
              }}>
              <ProgressChart
                data={data1}
                width={110}
                height={110}
                strokeWidth={4}
                radius={50}
                hideLegend={true}
                chartConfig={{
                  backgroundColor: '#f0f0f0',
                  backgroundGradientFrom: '#f0f0f0',
                  backgroundGradientTo: '#f0f0f0',
                  //decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(168, 131, 62, ${opacity})`,
                }}
                style={{
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {vehicle?.avgLastSafetyScore}
                </Text>
                <Text style={{fontSize: 8}}>EXCELLENT SCORE</Text>
                <AirbnbRating count={5} size={7} showRating={false} />
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: PRIMARYCOLOR,
                alignSelf: 'flex-end',
                padding: 5,
                borderRadius: 5,
                flexDirection: 'row',
                marginRight: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                VIEW DETAILS
              </Text>
              <AntDesign
                name="caretup"
                size={10}
                color={'#fff'}
                style={{alignSelf: 'center', marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              elevation: 5,
              marginHorizontal: 2,
              marginBottom: 5,
              borderRadius: 10,
              padding: 5,
            }}>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <MaterialCommunityIcons
                    name="car-hatchback"
                    size={20}
                    color={'#000'}
                    style={{marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: PRIMARYCOLOR,
                    }}>
                    TRIPS
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text>{vehicle?.tripsCount}</Text>
                  <Foundation
                    name="arrow-up"
                    size={17}
                    color={'green'}
                    style={{}}
                  />
                </View>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <FontAwesome5
                    name="route"
                    size={20}
                    color={'#000'}
                    style={{marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: PRIMARYCOLOR,
                    }}>
                    DISTANCE
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text>{vehicle?.distance} kms</Text>
                  <Foundation
                    name="arrow-up"
                    size={17}
                    color={'green'}
                    style={{}}
                  />
                </View>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <AntDesign
                    name="clockcircleo"
                    size={20}
                    color={'#000'}
                    style={{marginRight: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: PRIMARYCOLOR,
                    }}>
                    DURATION
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text>{vehicle?.duration} HR</Text>
                  <Foundation
                    name="arrow-up"
                    size={17}
                    color={'green'}
                    style={{marginLeft: 5}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 2,
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <LineChart
                data={data2}
                width={width - 20}
                height={220}
                fromZero={true}
                withVerticalLines={false}
                withHorizontalLines={false}
                renderDotContent={({x, y, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        height: 20,
                        width: 20,
                        position: 'absolute',
                        top: y - 25,
                        left: x - 5,
                      }}>
                      <Text style={{fontSize: 10}}>
                        {data2.datasets[0].data[index]}
                      </Text>
                    </View>
                  );
                }}
                formatYLabel={() => yLabelIterator.next().value}
                backgroundGradientTo={'#f0f0f0'}
                chartConfig={{
                  backgroundColor: '#f0f0f0',
                  backgroundGradientFrom: '#f0f0f0',
                  backgroundGradientTo: '#f0f0f0',
                  fillShadowGradient: '#f0f0f0',
                  fillShadowGradientTo: '#f0f0f0',
                  fillShadowGradientFrom: '#f0f0f0',
                  fillShadowGradientOpacity: 1,
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  strokeWidth: 2,
                  decimalPlaces: 0,
                }}
                // getDotColor={(dataPoint, dataPointIndex) => {
                //   // console.log('dataPoint ---->', dataPoint);
                //   // console.log('dataPointIndex --->', dataPointIndex);
                //   //based on condition we return the color as string
                //   if (dataPointIndex === 0) {
                //     return 'green';
                //   } else if (dataPointIndex === 1) {
                //     return 'red';
                //   }
                // }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View
              style={{
                backgroundColor: '#ccc',
                padding: 3,
                alignItems: 'center',
              }}>
              <Text>HARSH ACCELARATION</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="ios-car-sport"
                  size={17}
                  color={'#000'}
                  style={{marginLeft: 5}}
                />
                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                  {vehicle?.haFlag}
                </Text>
                <Foundation
                  name="arrow-down"
                  size={17}
                  color={'red'}
                  style={{marginLeft: 5}}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                padding: 3,
                alignItems: 'center',
              }}>
              <Text>HARSH BREAKING</Text>
              <View style={{flexDirection: 'row'}}>
                <Foundation
                  name="foot"
                  size={17}
                  color={'#000'}
                  style={{marginLeft: 5}}
                />
                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                  {vehicle?.hbFlag}
                </Text>
                <Foundation
                  name="arrow-down"
                  size={17}
                  color={'red'}
                  style={{marginLeft: 5}}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                padding: 3,
                alignItems: 'center',
              }}>
              <Text>HARSH TURN</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="return-up-forward-outline"
                  size={17}
                  color={'#000'}
                  style={{marginLeft: 5}}
                />
                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                  {vehicle?.htFlag}
                </Text>
                <Foundation
                  name="arrow-down"
                  size={17}
                  color={'red'}
                  style={{marginLeft: 5}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
export default Dashboard;
