import styled from 'styled-components/native'; 
import { TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 

export const Container = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.secondary};
    width: ${RFPercentage(139)}px;
    height: ${RFValue(137)}px;
`; 