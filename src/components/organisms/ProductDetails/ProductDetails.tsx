import React, {FC} from 'react';
import {RefreshControl, ScrollView} from 'react-native';

import ImageSlider from '../../molecules/ImageSlider';
import ProductCost from '../../atoms/ProductCost';
import HorizontalLine from '../../atoms/HorizontalLine';
import ProductDescription from '../../atoms/ProductDescription';
import ProductSelect from '../../atoms/ProductSelect';
import Title from '../../atoms/Title';
import useRefreshing from '../../../hooks/useRefreshing';
import ProductRelationship from '../../../interfaces/ProductRelationship';
import {PRODUCT_COLORS} from '../../../constants/data';
import {ProductDetailsWrap, ProductNameStyled} from './ProductDetails.styled';

interface ProductDetailsProps {
  images: ProductRelationship[];
  name: string;
  description: string;
  price: string;
  priceView: string;
  compareAtPrice: string | null;
  compareAtPriceView: string | null;
  selectedColorId: string;
  onSelectColor: (id: string) => void;
  options: {
    sliderSize?: number;
  };
}

const ProductDetails: FC<ProductDetailsProps> = ({
  images,
  name,
  description,
  price,
  priceView,
  compareAtPrice,
  compareAtPriceView,
  selectedColorId,
  onSelectColor,
  options,
}) => {
  const [isRefreshing, onRefresh] = useRefreshing();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <ProductDetailsWrap>
        <ImageSlider images={images} options={options} />
        <ProductNameStyled text={name} />
        <ProductCost
          price={price}
          priceView={priceView}
          compareAtPrice={compareAtPrice}
          compareAtPriceView={compareAtPriceView}
        />
        <HorizontalLine />
        <Title text="Select Color" />
        <ProductSelect
          variants={PRODUCT_COLORS}
          selectedId={selectedColorId}
          onSelect={onSelectColor}
        />
        <HorizontalLine />
        <Title text="Description" />
        <ProductDescription text={description} />
      </ProductDetailsWrap>
    </ScrollView>
  );
};

export default ProductDetails;
