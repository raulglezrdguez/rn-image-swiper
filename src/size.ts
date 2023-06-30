import { PixelRatio } from 'react-native';

const pixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

export const size = (n: number) => n / pixelRatio;
export const fontSize = (n: number) => n / fontScale;
