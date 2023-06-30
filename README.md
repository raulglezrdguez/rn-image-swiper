# rn-image-swiper

React Native Image Swiper Component

## Installation

```sh
npm install rn-image-swiper
```

## Usage

```js
import { ImageSourcePropType } from 'react-native';

import { RNImageSwiper } from 'rn-image-swiper';

const data: { image: ImageSourcePropType, label: string }[] = [
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
];

// ...

<RNImageSwiper
    data={data}
    decelerationRate={'fast'}
    activeColor="rgb(0, 0,255)"
    imageStyle={{
        backgroundColor: 'lightgray',
    }}
    labelStyle={{fontSize: fontSize(48)}}
    contentStyle={{backgroundColor: 'transparent'}}
    maxInactivityTime={5000}
    onChangeIndex={(index, prevIndex) => console.log(index, prevIndex)}
    onScrollEndDrag={event => console.log(event)}
    />
/>;
```

## Splash screen

![splashscreen](./splashscreens/Screen%20Shot%202023-06-30%20at%2009.36.31.jpg)

## Properties

```
- decelerationRate?: number | "fast" | "normal".
- activeColor?: string.
- imageStyle?: StyleProp<ImageStyle>.
- labelStyle?: StyleProp<TextStyle>.
- contentStyle?: StyleProp<ViewStyle>.
- maxInactivityTime?: number.
- onChangeIndex?: ((index: number, prevIndex: number) => void).
- onScrollEndDrag?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void).
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
