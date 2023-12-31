import React, {FC} from 'react';
import {useTheme} from 'styled-components';
import {RouteProp, useRoute} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Message from '../../atoms/Message';
import ConfirmModalActions from '../../molecules/ConfirmModalActions';
import AuthModalActions from '../../molecules/AuthModalActions';
import LogoutModalActions from '../../molecules/LogoutModalActions';
import LoginModalActions from '../../molecules/LoginModalActions';
import AvatarModalActions from '../../molecules/AvatarModalActions';
import {RootStackParamList} from 'navigation/types';
import {MODAL_ICON_SIZE, MODAL_TYPES} from 'constants/shared';
import {ModalStyled, TitleStyled} from './Modal.styled';

const Modal: FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Modal'>>();
  const {type, title, message, options} = route.params;
  const theme = useTheme();

  return (
    <ModalStyled accessibilityRole="alert" accessible={true}>
      {options && (
        <AntDesignIcon
          name={options.iconName}
          size={MODAL_ICON_SIZE}
          color={theme.color[options.iconColor]}
        />
      )}
      <TitleStyled text={title} />
      {message && <Message text={message} />}
      {type === MODAL_TYPES.confirm && <ConfirmModalActions />}
      {type === MODAL_TYPES.auth && <AuthModalActions />}
      {type === MODAL_TYPES.logout && <LogoutModalActions />}
      {type === MODAL_TYPES.login && <LoginModalActions />}
      {type === MODAL_TYPES.avatar && <AvatarModalActions />}
    </ModalStyled>
  );
};

export default Modal;
