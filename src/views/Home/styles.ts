import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { FlatList} from 'react-native';
import {getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { CharactereCardProps } from '.'; //importada da propria pasta

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0px 24px;
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
  margin-top: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.TextInput`
   color: ${({ theme }) => theme.colors.text};
   margin: 0 14px;
`;

export const InputButton = styled.TouchableOpacity`
   background-color: ${({ theme }) => theme.colors.primary};
   width: ${RFValue(42)}px;
   height: ${RFValue(42)}px;
   border-top-right-radius: 12px;
   border-bottom-right-radius: 12px;
   justify-content: center;
   align-items: center;
 
`;
export const IconSearch = styled(FontAwesome)`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const Subtitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    margin-top: 24px;
    margin-bottom: 18px;
`; 

export const CharacteresList = styled(
  FlatList as new () => FlatList<CharactereCardProps>
)``