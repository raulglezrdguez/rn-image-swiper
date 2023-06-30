import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
import {memo} from 'react';

interface SVGRProps {
  width?: number;
  height?: number;
  color?: string;
}
const CircleFilled = ({
  width = 32,
  height = 32,
  color = 'black',
  ...props
}: SvgProps & SVGRProps) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" {...props}>
    <Circle cx={16} cy={16} r={16} fill={color} />
  </Svg>
);
const Memo = memo(CircleFilled);
export default Memo;

/*
<Svg width={width} height={height} viewBox="0 0 32 32" {...props}>
      <Circle cx={16} cy={16} r={16} fill={currentColor} />
    </Svg>
*/
