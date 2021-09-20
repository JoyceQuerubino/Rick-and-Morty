import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'; 
import LottieView from 'lottie-react-native'; 

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Lottie = styled(LottieView)`
    
`; 

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    margin-top: 24px;
`; 

