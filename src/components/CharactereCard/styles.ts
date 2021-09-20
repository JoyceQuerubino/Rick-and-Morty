import styled from 'styled-components/native'; 
import { TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 

export const Container = styled(TouchableOpacity)`
    width: ${RFValue(139)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    /* width: 50%;  */
    align-items: baseline; 
    /* margin-right: 10px; */
`; 

export const Image = styled.Image`
    width: ${RFValue(139)}px;
    height: ${RFValue(112)}px;
`; 