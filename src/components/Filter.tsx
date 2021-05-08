import styled from "styled-components";
import { FilterState } from "../App";
import { ReactComponent as SvgReset } from "static/svg/02.svg";

interface Props {
  filter: FilterState;
  onClickFilter: (filterName: keyof FilterState) => void;
  resetRemovedIds: () => void;
}

function Filter({ onClickFilter, filter, resetRemovedIds }: Props) {
  return (
    <Container>
      <Filters>
        <Item onClick={() => onClickFilter("isAlive")} active={filter.isAlive}>
          {"생존인물만"}
        </Item>

        <Item
          onClick={() => onClickFilter("isFemale")}
          active={filter.isFemale}
        >
          {"여자"}
        </Item>

        <Item
          onClick={() => onClickFilter("hasNoTvSeries")}
          active={filter.hasNoTvSeries}
        >
          {"Tv Series 없음"}
        </Item>
      </Filters>

      <RefreshIconWrap>
        <SvgReset onClick={resetRemovedIds} />
      </RefreshIconWrap>
    </Container>
  );
}

export default Filter;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 0;
  border-bottom: 1px solid #f4f4f4;

  @media only screen and (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 34px;
  padding: 0 14px;

  margin-right: 8px;

  font-size: 1.4em;
  color: ${(props) => (props.active ? "#ffffff" : "#212121")};
  background: ${(props) => (props.active ? "#0077fe" : "#ffffff")};
  border: 1px solid ${(props) => (props.active ? "#0077fe" : "#e8e9ec")};

  cursor: pointer;
`;

const RefreshIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #212121;

  border: 1px solid #e8e9ec;
`;
