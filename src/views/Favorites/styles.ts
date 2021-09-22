import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { TouchableOpacity, FlatList } from 'react-native';
import {getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import { CharactereCardProps } from '.'; //importada da propria pasta

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    margin-bottom: 24px;
`;

export const Content = styled.View`
    padding: 0px 24px;
`;

export const CharacteresList = styled(
    FlatList as new () => FlatList<CharactereCardProps>)``