import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container, 
    Image, 
    Description, 
    Title
} from './styles';

export interface CharacteresProps  {
    id: string,
    name: string,
    image: string,
    species: string,
    location: {
        name: string,
    }, 
    episode: []
}

interface Props extends TouchableOpacityProps {
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

            <Description>
                <Title>{data.name}</Title>
            </Description>
        </Container>
    )
}   