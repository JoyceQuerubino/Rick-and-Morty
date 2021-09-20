import styled from 'styled-components/native'; 
import { TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 

export const Container = styled(TouchableOpacity)`
    width: ${RFValue(142)}px;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: baseline; 
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
`; 

export const Image = styled.Image`
    width: ${RFValue(138)}px;
    height: ${RFValue(112)}px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`; 

export const Description = styled.View`
    width: 100%;
    justify-content: center;
    padding: 6px; 
`; 

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    text-align: center;
`; 