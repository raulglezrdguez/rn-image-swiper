/* eslint-disable react-native/no-inline-styles */
import {
  Easing,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import type { ImageStyle, StyleProp, TextStyle, ViewToken } from 'react-native';
import React, { memo } from 'react';
import { fontSize } from './size';
import type { ItemData } from './Swiper';
import { Animated } from 'react-native';

export type Props = {
  imageStyle?: StyleProp<ImageStyle>;
  labelStyle?: StyleProp<TextStyle>;
  item: ItemData;
  visibleItems: ViewToken[];
};

const ItemView = ({ imageStyle, labelStyle, item, visibleItems }: Props) => {
  const { width } = useWindowDimensions();
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const visible = visibleItems.filter(
      (it) => it.isViewable && it.item === item
    );
    Animated.timing(opacity, {
      toValue: visible.length > 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.linear),
    }).start();
  }, [visibleItems, item, opacity]);

  return (
    <Animated.View
      style={[
        styles.itemView,
        {
          width: width || '100%',
          position: 'relative',
          opacity: opacity || 1,
        },
      ]}
    >
      <Image
        source={item.image}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />
      <Text
        style={[
          {
            textAlign: 'center',
            fontSize: fontSize(40),
            position: 'absolute',
            bottom: '10%',
            textShadowColor: 'rgba(255, 255, 255, 0.75)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
          },
          labelStyle,
        ]}
      >
        {item.label}
      </Text>
    </Animated.View>
  );
};

const Memo = memo(ItemView);
export default Memo;

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  image: {
    height: '100%',
    width: undefined,
    aspectRatio: 9 / 16,
  },
});
