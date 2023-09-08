import React, {FC, JSX} from 'react';

import {
  IconWrap,
  InputLabel,
  InputLabelWrap,
  InputStyled,
  InputWrap,
} from './Input.styled';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  icon?: JSX.Element;
  onPressIcon?: () => void;
  isSecure?: boolean;
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  icon,
  onPressIcon,
  isSecure,
}) => (
  <InputWrap>
    {icon && <IconWrap onPress={onPressIcon}>{icon}</IconWrap>}
    {!icon && label && (
      <InputLabelWrap>
        <InputLabel>{label}</InputLabel>
      </InputLabelWrap>
    )}
    <InputStyled
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      hasIcon={Boolean(icon)}
      secureTextEntry={isSecure}
    />
  </InputWrap>
);
export default Input;
