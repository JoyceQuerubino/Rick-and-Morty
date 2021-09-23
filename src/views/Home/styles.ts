import styled from "styled-components/native";
import { TouchableOpacity, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'; 
import {getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { CharactereCardProps } from '.'; //importada da propria pasta

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 0px 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + RFValue(8)}px;
  width: 100%;
` 
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(36)}px;
  max-width: ${RFValue(150)}px;
`;

export const FavoriteButton = styled(TouchableOpacity)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  height: ${RFValue(39)}px;
  justify-content: center;
  margin-top: 20px;
  width: ${RFValue(39)}px;
`;

export const IconFavorite = styled(AntDesign)`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  padding: 8px 24px;
  width: 100%;
`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.colors.text};
`;

export const IconSearch = styled(FontAwesome)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
`

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
  margin-bottom: 18px;
  margin-top: 24px;
`; 

export const CharacteresList = styled(
  FlatList as new () => FlatList<CharactereCardProps>
)``