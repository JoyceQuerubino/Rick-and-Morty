import React from 'react';
import { Text, TouchableOpacityProps } from 'react-native';

import { 
    Container, 
    Image, 
} from './styles';

export interface CharacteresProps extends TouchableOpacityProps {
    id: string,
    name: string,
    image: string,
}

interface Props {
    data: CharacteresProps
}

export function CharactereCard({data, ...rest}: Props){
    return(
        <Container
            {...rest}
        >
            <Image
                source={{uri: data.image}}
                resizeMode="cover"
            />

            <Text>{data.name}</Text>
            <Text>{data.id}</Text>
        </Container>
    )
}   