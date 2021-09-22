import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`; 

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    margin-bottom: 16px;
`;

export const Image = styled.Image`
  width: ${RFPercentage(44)}px;
  height: ${RFValue(210)}px;
  border-radius: 4px;
  margin-bottom: 22px;
`; 

export const FavoriteContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`; 

export const BtnFavorite = styled.TouchableOpacity`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: 18px;
  justify-content: center;
  align-items: center;
`

export const IconFavorite = styled(AntDesign)`
font-size: ${RFValue(18)}px;
color: ${({ theme }) => theme.colors.text};
`; 

export const Description = styled.View`
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  width: 100%;
  height: 100%;
  margin-top: 8px;
  padding: 32px 0;
`

export const Strip = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: ${RFValue(170)}px;
    padding: 8px 16px;
    margin: 16px 0;
`; 

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.dark_text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  
`;  

export const TopicsContainer = styled.View`
  flex-direction: row;
  padding: 0 42px;
`;  

export const Topic = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  /* margin-bottom: 8px; */
`; 
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;  