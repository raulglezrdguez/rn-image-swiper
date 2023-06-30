/* eslint-disable react-native/no-inline-styles */
import {Text, View, ImageSourcePropType, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {RNImageSwiper} from 'rn-image-swiper';
import {multiply, RNImageSwiper} from 'rn-image-swiper';
import {fontSize, size} from './src/components/size';
// import Swiper from './src/components/Swiper';

const data: {image: ImageSourcePropType; label: string}[] = [
  {
    image: require('./assets/dugba-cauley-hushie-6MNmDi1hc_Y-unsplash.jpg'),
    label: 'Hello',
  },
  {
    image: require('./assets/amir-hanna-sweUF7FcyP4-unsplash.jpg'),
    label: 'World',
  },
  {
    image: require('./assets/maxim-ilyahov-0aRycsfH57A-unsplash.jpg'),
    label: '',
  },
  {image: require('./assets/neil-soni-6wdRuK7bVTE-unsplash.jpg'), label: ''},
  {image: require('./assets/oscar-nord-8l9VxXI28tY-unsplash.jpg'), label: ''},
  {
    image: require('./assets/rahul-chakraborty-xsGxhtAsfSA-unsplash.jpg'),
    label: '',
  },
  {
    image: require('./assets/rishabh-malhotra-83ypHTv6J2M-unsplash.jpg'),
    label: 'Black style',
  },
];

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>App title</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '90%',
          }}>
          <RNImageSwiper
            data={data}
            decelerationRate={'fast'}
            activeColor="rgb(0, 0,255)"
            imageStyle={{
              // borderRadius: size(10),
              backgroundColor: 'lightgray',
            }}
            labelStyle={{fontSize: fontSize(48)}}
            contentStyle={{backgroundColor: 'transparent'}}
            maxInactivityTime={1000}
            onChangeIndex={(index, prevIndex) => console.log(index, prevIndex)}
            onScrollEndDrag={event => console.log(event)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
