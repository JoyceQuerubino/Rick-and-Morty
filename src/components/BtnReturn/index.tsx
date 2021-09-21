import React from 'react'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacityProps} from 'react-native';

import { 
    Container, 
    ButtonContainer, 
    Icon,
    Title,
   } from './styles';

interface RetornProps extends TouchableOpacityProps {
    title: string,
}

export function BtnReturn({title, ...rest}: RetornProps){

    const nevigation = useNavigation();
    
    function handleBack(){
        nevigation.navigate('Home')
    }

    return(
        <Container >
            <ButtonContainer
                onPress={handleBack}
            >
                <Icon name="arrow-back-ios"/>
                <Title>{title}</Title>
            </ButtonContainer>
        </Container>
    )
}