import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import {
  CharactereCard,
  CharacteresProps,
} from "../../components/CharactereCard";
import {
  CharacteresList,
  Container,
  FavoriteButton,
  Header,
  IconFavorite,
  IconSearch,
  Input,
  InputContainer,
  Subtitle,
  Title,
} from "./styles";
import { Loading } from "../../components/Loading";

export interface CharactereCardProps extends CharacteresProps {}

export default function Home() {
  const navigation = useNavigation<any>();

  const [characters, setCharacters] = useState<CharactereCardProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingApi, setLoadingApi] = useState(true);
  const [searchName, setSearchName] = useState("");

  function handleSelectedCharacterPage(pagCharacters: CharactereCardProps) {
    navigation.navigate("Characters", { pagCharacters });
  }

  function handleOpenFavoritesPage() {
    navigation.navigate("Favorites");
  }

  async function fetchCharacters() {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const resultdata = result.data.results;

      if (!resultdata) return setLoadingApi(true);

      setCharacters([...characters, ...resultdata]);
      setLoadingApi(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleFetchMore() {
    setPage(page + 1);
  }

  function handleInputChange(value: string) {
    setSearchName(value);
  }

  function filterResultByCharName() {
    if (searchName) {
      return characters.filter((character) =>
        character.name.includes(searchName)
      );
    }
    return characters;
  }

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  if (loadingApi) return <Loading />;

  return (
    <Container>
      <Header>
        <Title>Rick and Morty</Title>
        <FavoriteButton onPress={handleOpenFavoritesPage}>
          <IconFavorite name="star" />
        </FavoriteButton>
      </Header>
      <InputContainer>
        <Input
          value={searchName}
          placeholder="Type the character name..."
          placeholderTextColor="#7A7A7A"
          onChangeText={handleInputChange}
        />
        <IconSearch name="search" />
      </InputContainer>
      <Subtitle>Characters</Subtitle>

      <CharacteresList
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
        keyExtractor={(item) => String(item.id)}
        data={filterResultByCharName()}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        renderItem={({ item, index }) => (
          <CharactereCard
            key={item.id.toString()}
            data={item}
            onPress={() => handleSelectedCharacterPage(item)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={handleFetchMore}
        ListFooterComponent={
          loading ? <ActivityIndicator color={"green"} /> : <></>
        }
      />
    </Container>
  );
}
