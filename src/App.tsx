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

type FilterState = {
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
      <Header>{"Musinsa Homework"}</Header>

      <Filters>
        <Filter
          onClick={() => onClickFilter("isAlive")}
          active={filter.isAlive}
        >
          {"생존인물만"}
        </Filter>
        <Filter
          onClick={() => onClickFilter("isFemale")}
          active={filter.isFemale}
        >
          {"여자"}
        </Filter>
        <Filter
          onClick={() => onClickFilter("hasNoTvSeries")}
          active={filter.hasNoTvSeries}
        >
          {"tvSeries 없음"}
        </Filter>
        <Filter onClick={resetRemovedIds}>{"초기화"}</Filter>
      </Filters>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchNext}
        hasMore={params.page < 10}
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

      {fetching && <Fetching>fetching...</Fetching>}
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
  width: 100%;
  height: 100px;

  background-color: #000;
  color: #fff;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 24px 24px 12px 24px;
`;

const Filter = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 23%;
  padding: 4px 6px;
  color: ${(props) => (props.active ? "#ffffff" : "#212121")};
  background-color: ${(props) => (props.active ? "#00a3ff" : "#ffffff")};
  border: 1px solid ${(props) => (props.active ? "#00a3ff" : "#212121")};
  border-radius: 6px;

  cursor: pointer;
`;

const List = styled.ul`
  width: 100%;
  padding: 12px 24px;
`;

const Fetching = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;
