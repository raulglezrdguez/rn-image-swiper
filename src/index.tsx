export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { default as RNImageSwiper } from './Swiper';

export type { Props as RNImageSwiperProps } from './Swiper';
export type { ItemData as RNImageSwiperItemData } from './Swiper';
export type { DataProps as RNImageSwiperDataProps } from './Swiper';

export { default as RNImageSwiperItemView } from './ItemView';
export type { Props as RNImageSwiperItemViewProps } from './ItemView';

export { default as RNImageSwiperRectFilled } from './RectFilled';
export type { Props as RNImageSwiperRectFilledProps } from './RectFilled';

export {
  size as RNImageSwiperSize,
  fontSize as RNImageSwiperFontSize,
} from './size';
