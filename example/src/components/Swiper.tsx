import {FlatList, Pressable, StyleSheet, View, ViewToken} from 'react-native';
import type {
  ImageSourcePropType,
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import type {FC} from 'react';

import {size} from './size';
import RectFilled from './RectFilled';
import ItemView from './ItemView';

export type ItemData = {image: ImageSourcePropType; label: string};
export type DataProps = ItemData[];

export type Props = {
  data: DataProps;
  maxInactivityTime?: number;
  activeColor?: string;
  decelerationRate?: number | 'fast' | 'normal';
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onChangeIndex?: (index: number, prevIndex: number) => void;
};
const Swiper: FC<Props> = ({
  data,
  maxInactivityTime = 500,
  activeColor = 'rgb(0,0,0)',
  decelerationRate = 'fast',
  contentStyle = null,
  imageStyle = null,
  labelStyle = null,
  onScrollEndDrag = null,
  onChangeIndex = null,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [lastChange, setLastChange] = useState<number>(new Date().getTime());
  const [visibleItems, setVisibleItems] = useState<ViewToken[]>([]);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef) {
      flatListRef.current?.scrollToOffset({animated: true, offset: 0});
      setIndex(0);
    }
  }, [data]);

  const getContentStyle = () =>
    contentStyle || {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    };

  const onViewCallBack = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setVisibleItems(viewableItems);
    },
    [],
  );

  return (
    <View style={getContentStyle()}>
      <FlatList
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, indx) => indx.toString()}
        // alwaysBounceHorizontal={false}
        decelerationRate={decelerationRate}
        // bounces={false}
        // bouncesZoom={false}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({item}) => (
          <ItemView
            item={item}
            imageStyle={imageStyle}
            labelStyle={labelStyle}
            visibleItems={visibleItems}
          />
        )}
        onScrollEndDrag={event => {
          const currentTicks = new Date().getTime();
          if (
            data.length > 0 &&
            currentTicks - lastChange > maxInactivityTime
          ) {
            // current pos in scroll
            const pos = event.nativeEvent.contentOffset.x;
            // max scroll width
            const max = event.nativeEvent.contentSize.width;
            // image width
            const w = max / data.length;
            // scrolling back
            let newIndex = Math.floor(pos / w);
            if (index * w > pos) {
              if (index > 0) {
                if (flatListRef) {
                  flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: newIndex,
                  });
                  if (onChangeIndex) {
                    onChangeIndex(newIndex, index);
                  }
                  setIndex(newIndex);
                  setLastChange(new Date().getTime());
                }
              }
            } else if (index < data.length - 1) {
              if (newIndex === index) {
                newIndex = index + 1;
              }
              if (flatListRef) {
                flatListRef.current?.scrollToIndex({
                  animated: true,
                  index: newIndex,
                });
                if (onChangeIndex) {
                  onChangeIndex(newIndex, index);
                }
                setIndex(newIndex);
                setLastChange(new Date().getTime());
              }
            } else {
              if (flatListRef) {
                flatListRef.current?.scrollToIndex({
                  animated: true,
                  index: index,
                });
                setLastChange(new Date().getTime());
              }
            }
          } else {
            if (flatListRef) {
              flatListRef.current?.scrollToIndex({
                animated: true,
                index: index,
              });
              setLastChange(new Date().getTime());
            }
          }

          if (onScrollEndDrag) {
            onScrollEndDrag(event);
          }
        }}
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.index}>
        {data.length > 1 &&
          data.map((_, indx) => (
            <Pressable
              key={indx.toString()}
              onPress={() => {
                if (flatListRef) {
                  if (onChangeIndex) {
                    onChangeIndex(indx, index);
                  }
                  setIndex(indx);
                  flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: indx,
                  });
                  setLastChange(new Date().getTime());
                }
              }}>
              <RectFilled
                width={size(32)}
                height={size(32)}
                active={indx === index}
                color={activeColor}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

const Memo = memo(Swiper);
export default Memo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  index: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: -size(64),
  },
});
