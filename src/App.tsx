import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  charactersSlice,
  fetchCharacters,
  selectCharactors,
} from "store/slices/charactersSlice";
import styled, { css } from "styled-components";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
import { Character } from "store/types/characters";
import CharacterItem from "components/CharacterItem";
import {
  FaBan,
  FaFemale,
  FaSyncAlt,
  FaRegLaughSquint,
  FaSpinner,
} from "react-icons/fa";

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
      <Header>
        <img
          src={`http://image.musinsa.com/mfile_outsrc/img/logo-simbol-musinsache.png?v=1`}
          alt="무신사로고"
        />
        {"Homework"}
      </Header>

      <Filters>
        <Filter
          onClick={() => onClickFilter("isAlive")}
          active={filter.isAlive}
        >
          <FilterIconWrap>
            <FaRegLaughSquint />
          </FilterIconWrap>

          {"생존인물만"}
        </Filter>

        <FilterFemale
          onClick={() => onClickFilter("isFemale")}
          active={filter.isFemale}
        >
          <FilterIconWrap>
            <FaFemale />
          </FilterIconWrap>

          {"여자"}
        </FilterFemale>

        <Filter
          onClick={() => onClickFilter("hasNoTvSeries")}
          active={filter.hasNoTvSeries}
        >
          <FilterIconWrap>
            <FaBan />
          </FilterIconWrap>

          {"tvSeries 없음"}
        </Filter>
        <Filter onClick={resetRemovedIds}>
          <FilterIconWrap>
            <FaSyncAlt />
          </FilterIconWrap>

          {"초기화"}
        </Filter>
      </Filters>

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

      {fetching && (
        <Fetching>
          <FaSpinner />
          {"fetching..."}
        </Fetching>
      )}
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

  background-color: #121212;
  color: #fff;
  font-size: 1.1rem;
  line-height: -1.2rem;
  img {
    height: 100px;
    margin-bottom: 12px;
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 24px 12px 24px;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;

    width: auto;
    height: 34px;

    padding: 0 12px 0 8px;
    margin-right: 8px;
    margin-bottom: 6px;
    /* transition: background-color 0.15s linear; */
    cursor: pointer;
  }
`;

const FilterIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  margin-right: 2px;
`;

const Filter = styled.button<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#ffffff" : "#b2b2b2")};
  background: ${(props) => (props.active ? "#00a3ff" : "#ffffff")};
  border: 1px solid ${(props) => (props.active ? "#00a3ff" : "#ddd")};
`;

const FilterFemale = styled.button<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#ffffff" : "#b2b2b2")};
  background: ${(props) => (props.active ? "#f48fb1" : "#ffffff")};
  border: 1px solid ${(props) => (props.active ? "#f48fb1" : "#ddd")};
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px 24px;
`;

const Fetching = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  color: #000;
`;
