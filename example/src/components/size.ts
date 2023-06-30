import {PixelRatio} from 'react-native';

const pixelRatio = PixelRatio.get();
console.log('pixelRatio', pixelRatio);
const fontScale = PixelRatio.getFontScale();
console.log('fontScale', fontScale);

export const size = (n: number) => n / pixelRatio;
export const fontSize = (n: number) => n / fontScale;
