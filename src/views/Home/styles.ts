import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 31px 24px 0px 24px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
` 
export const Title = styled.Text`
    max-width: ${RFValue(150)}px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(36)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: ${RFValue(39)}px;
  height: ${RFValue(39)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const IconFavorite = styled(AntDesign)`
 font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  padding: 14px;
  margin-top: 24px;
`;

export const Input = styled.TextInput``;

