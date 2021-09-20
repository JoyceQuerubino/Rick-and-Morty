
import React from 'react'; 
import LottieView from 'lottie-react-native'; 


import { 
    Container, 
    Title,
   } from './styles';

export function Loading(){
    return(
        <Container>
            <LottieView 
                source={require('../../assets/morty-dance-loader.json')}
                autoPlay
                loop
                style={[{backgroundColor: 'transparent', width: 300, height: 300}]}
            />
            <Title>Loading...</Title>
        </Container>
    )
}