import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'; 
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`; 

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(24)}px;
    margin-bottom: 16px;
`;

export const Image = styled.Image`
  border-radius: 4px;
  height: ${RFValue(210)}px;
  margin-bottom: 22px;
  width: ${RFPercentage(44)}px;
`; 

export const FavoriteContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  padding: 0 24px;
`; 

export const BtnFavorite = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  height: ${RFValue(32)}px;
  justify-content: center;
  margin-left: 18px;
  width: ${RFValue(32)}px;
`

export const IconFavorite = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
`; 

//VERIFICAR
export const Description = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  height: 100%; 
  /* min-height:${RFValue(400)}px; */
  margin-top: 8px;
  flex: 1;
  padding: 24px; 
`

export const Section = styled.View`
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 12px 0;
  max-height:  ${RFValue(186)}px;
  padding: 16px;
  width: 100%;
`; 

export const EpisodesList = styled.ScrollView``;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  margin-bottom: 8px; 
  text-transform: uppercase;
`;  

export const TopicsContainer = styled.View`
  flex-direction: row;
  padding: 0 16px;
`;  

export const Topic = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  line-height: 24px;
`; 
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  line-height: 24px;
`;  

export const EpisodeContainer = styled.View`
  margin-bottom: 6px;
  padding: 0 16px;
`; 

export const TopicEpisode = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  line-height: 24px;
`; 