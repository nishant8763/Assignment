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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {AirbnbRating} from 'react-native-ratings';

function* yLabel() {
  yield* [0, 25, 75, 100, 125];
}

const data = {
  labels: [], // optional
  data: [0.81],
};
const data1 = {
  labels: [], // optional
  data: [0.67],
};
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
  const yLabelIterator = yLabel();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={PRIMARYCOLOR} />
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
                uri: 'data:image/png;base64,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',
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
                Swati Singh
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
            Maruti Suzuki ZXI 2017
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{fontSize: 10, fontWeight: 'bold', color: PRIMARYCOLOR}}>
                Policy No.
              </Text>
              <Text style={{fontSize: 13, fontWeight: 'bold', color: '#000'}}>
                EPOI12345456788
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
                style={{fontSize: 10, fontWeight: 'bold', color: PRIMARYCOLOR}}>
                Last Premium
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                }}>
                INR2356
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
                20/04/2022
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
                HP01X9986
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
                style={{fontSize: 11, fontWeight: 'bold', color: PRIMARYCOLOR}}>
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
                  style={{fontSize: 25, alignSelf: 'center', color: '#000'}}>
                  1
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
                style={{fontSize: 11, fontWeight: 'bold', color: PRIMARYCOLOR}}>
                ACCIDENTS
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
                  style={{fontSize: 25, alignSelf: 'center', color: '#000'}}>
                  1
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
                style={{alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>
                81
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
                style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold'}}>
                67
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
                  style={{}}
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
                <Text>27</Text>
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
                <MaterialCommunityIcons
                  name="car-hatchback"
                  size={20}
                  color={'#000'}
                  style={{marginLeft: 5}}
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
                <Text>27kms</Text>
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
                <MaterialCommunityIcons
                  name="car-hatchback"
                  size={20}
                  color={'#000'}
                  style={{marginLeft: 5}}
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
                <Text>17 HR</Text>
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
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>75</Text>
              <Foundation
                name="arrow-up"
                size={17}
                color={'green'}
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
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>75</Text>
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
              <Text style={{marginLeft: 5, fontWeight: 'bold'}}>75</Text>
              <Foundation
                name="arrow-up"
                size={17}
                color={'green'}
                style={{marginLeft: 5}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
