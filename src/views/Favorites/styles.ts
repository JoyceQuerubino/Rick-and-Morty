import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'; 
import { FlatList } from 'react-native';
import { CharactereCardProps } from '.'; //importada da propria pasta

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(32)}px;
    margin-bottom: 24px;
`;

export const Content = styled.View`
    padding: 0px 24px;
`;

export const CharacteresList = styled(
    FlatList as new () => FlatList<CharactereCardProps>)``