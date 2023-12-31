import React, {FC, useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import SliderPagination from '../SliderPagination';
import ProductImage from '../../atoms/ProductImage';
import SliderButton from '../../atoms/SliderButton';
import ProductRelationship from 'interfaces/ProductRelationship';
import getImagePathById from 'utils/getImagePathById';
import {SLIDER_SIZE} from 'constants/shared';
import {CarouselWrap, ImageSliderStyled} from './ImageSlider.styled';

interface ImageSliderProps {
  images: ProductRelationship[];
  options: {sliderSize?: number};
}

const ImageSlider: FC<ImageSliderProps> = ({images, options}) => {
  const [sliderSize, setSliderSize] = useState<number>(SLIDER_SIZE);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<Carousel<ProductRelationship>>(null);
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= images.length - 1;

  const onLayoutCarousel = useCallback(
    (event: LayoutChangeEvent) => {
      setSliderSize(
        options.sliderSize ?? Math.round(event.nativeEvent.layout.width),
      );
    },
    [options.sliderSize],
  );

  const onPressNext = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
  }, []);

  const onPressPrev = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToPrev();
    }
  }, []);

  return (
    <>
      <ImageSliderStyled testID="slider">
        <SliderButton
          iconName="arrow-left"
          onPress={onPressPrev}
          disabled={isPrevDisabled}
        />
        <CarouselWrap onLayout={onLayoutCarousel}>
          <Carousel
            ref={carouselRef}
            data={images}
            renderItem={({item}) => (
              <ProductImage
                source={{uri: getImagePathById(item.id, sliderSize)}}
                options={{
                  width: sliderSize,
                  height: sliderSize,
                }}
              />
            )}
            sliderWidth={sliderSize}
            itemWidth={sliderSize}
            itemHeight={sliderSize}
            onSnapToItem={index => setCurrentIndex(index)}
          />
        </CarouselWrap>
        <SliderButton
          iconName="arrow-right"
          onPress={onPressNext}
          disabled={isNextDisabled}
        />
      </ImageSliderStyled>
      <SliderPagination
        carouselRef={carouselRef}
        dotsLength={images.length}
        activeDotIndex={currentIndex}
      />
    </>
  );
};

export default ImageSlider;
