import React from 'react';
import { Text, TouchableOpacityProps } from 'react-native';

import { 
    Container, 
} from './styles';

interface Props extends TouchableOpacityProps {
    id: string; 
    character: string;
}

export function CharactereCard({character, ...rest}: Props){
    return(
        <Container
            {...rest}
        >
            <Text>{character}</Text>
        </Container>
    )
}   