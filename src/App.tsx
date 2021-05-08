import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  charactersSlice,
  fetchCharacters,
  selectCharactors,
} from "store/slices/charactersSlice";
import styled from "styled-components";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
import { Character } from "store/types/characters";
import CharacterItem from "components/CharacterItem";
import Filter from "components/Filter";
import Loader from "components/Loader";
import Logo from "static/img/01.png";

export type FilterState = {
  isAlive: boolean;
  isFemale: boolean;
  hasNoTvSeries: boolean;
};
function App() {
  const dispatch = useDispatch();
  const { page } = queryString.parse(window.location.search);
  const { items, params, fetching, removedItemIds } = useSelector(
    selectCharactors
  );
  const [filter, setFilter] = useState<FilterState>({
    isAlive: false,
    isFemale: false,
    hasNoTvSeries: false,
  });

  const onClickFilter = useCallback(
    (filterName: keyof FilterState) => {
      setFilter({ ...filter, [filterName]: !filter[filterName] });
    },
    [filter]
  );

  const fetchNext = useCallback(() => {
    if (!fetching) {
      dispatch(fetchCharacters(params.page + 1));
    }
  }, [dispatch, params, fetching]);

  function aliveFilter(items: Character[]) {
    if (filter.isAlive) {
      items = items.filter((item) => !item.died);
    }
    return items;
  }

  function femaleFilter(items: Character[]) {
    if (filter.isFemale) {
      items = items.filter((item) => item.gender === "Female");
    }
    return items;
  }

  function tvSeriesFilter(items: Character[]) {
    if (filter.hasNoTvSeries) {
      items = items.filter((item) => item.tvSeries.length < 1);
    }
    return items;
  }

  function removeIdsFilter(items: Character[]) {
    if (removedItemIds.length > 0) {
      items = items.filter((item) => !removedItemIds.includes(item.id));
    }
    return items;
  }

  const resetRemovedIds = useCallback(() => {
    setFilter((prevState) => ({
      ...prevState,
      isAlive: false,
      hasNoTvSeries: false,
      isFemale: false,
    }));
    dispatch(charactersSlice.actions.resetRemovedIds());
  }, [dispatch]);

  const deleteItem = useCallback(
    (id: string) => {
      dispatch(charactersSlice.actions.addRemoveId(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const p = Number(page as string) || 1;
    dispatch(fetchCharacters(p));
    // eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <Container>
      <Header>
        <img src={Logo} alt={"무신사 로고"} />
      </Header>
      <Filter
        filter={filter}
        onClickFilter={onClickFilter}
        resetRemovedIds={resetRemovedIds}
      />

      <InfiniteScroll
        dataLength={items.length}
        next={fetchNext}
        // hasMore={params.page < 10}
        hasMore={true}
        loader={null}
        scrollThreshold={1}
      >
        <List>
          {aliveFilter(
            femaleFilter(tvSeriesFilter(removeIdsFilter(items)))
          ).map((character, index) => {
            return (
              <CharacterItem
                character={character}
                key={character.id}
                onClickDelete={() => deleteItem(character.id)}
              />
            );
          })}
        </List>
      </InfiniteScroll>

      {fetching && <Loader />}
    </Container>
  );
}

export default App;

const Container = styled.section`
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px 0;
  width: 100%;

  background-color: #000;
  color: #fff;

  img {
    width: 100px;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  padding: 16px;
`;
