import styled from 'styled-components/native';

export const ProductImageStyled = styled.Image`
  width: 100%;
  border-radius: ${({theme}) => theme.shape.radius.xs};
`;
