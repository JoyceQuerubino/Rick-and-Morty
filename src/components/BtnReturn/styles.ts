import styled from 'styled-components/native'; 
import { TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {getStatusBarHeight } from 'react-native-iphone-x-helper'; 


export const Container = styled(TouchableOpacity)`
    margin-top: ${getStatusBarHeight() + RFValue(8)}px;
    text-align: center;
    padding: 0 16px;
    margin-bottom: 22px;
`; 

export const ButtonContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
`; 

export const Icon = styled(MaterialIcons)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text};
`