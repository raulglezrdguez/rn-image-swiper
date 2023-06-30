import { Animated, Easing } from 'react-native';
import React, { memo } from 'react';
import type { FC } from 'react';
import { size } from './size';

export type Props = {
  width: number;
  height: number;
  active: boolean;
  color: string;
};

const RectFilled: FC<Props> = ({
  width = 32,
  height = 32,
  active = true,
  color = 'red',
}) => {
  const opacity = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: active ? 0.8 : 0.2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.bounce),
    }).start();
  }, [active, opacity]);

  return (
    <Animated.View
      style={{
        width: width || size(32),
        height: height || size(32),
        backgroundColor: color || 'transparent',
        opacity: opacity || 0,
        borderRadius: width ? width / 2 : size(32) / 2,
      }}
    />
  );
};

const Memo = memo(RectFilled);
export default Memo;
