import { Character } from "store/types/characters";
import styled, { css } from "styled-components";

import { ReactComponent as SvgNoName } from "static/svg/03.svg";
import { ReactComponent as SvgDelete } from "static/svg/04.svg";

interface Props {
  character: Character;
  onClickDelete: () => void;
}

function CharacterItem({ character, onClickDelete }: Props) {
  // const isFemale = character.gender === "Female";
  const isName = character.name.length > 0;
  return (
    <Container>
      <HeadBlock>
        <Avatar isName={isName}>
          {character.name ? character.name[0] : <SvgNoName />}
        </Avatar>
        <NameBlock>
          <Name>{character.name || "No Name"}</Name>
          <Gender>
            {character.gender} {character.died && " | Dead"}
          </Gender>
        </NameBlock>
      </HeadBlock>

      <Body>
        <dl>
          <dt>{"Aliase"}</dt>
          <dd>{character.aliases.join(", ")}</dd>
        </dl>
        <dl>
          <dt>{"Titles"}</dt>
          <dd>{character.titles.join(", ")}</dd>
        </dl>
      </Body>

      <Bottom>
        <span>Books {character.books.length}</span>
        <span>Tv Series {character.tvSeries.length}</span>
      </Bottom>

      {/* <div>dead: {character.died}</div> */}
      <Delete>
        <SvgDelete onClick={onClickDelete}>{"삭제"}</SvgDelete>
      </Delete>
    </Container>
  );
}

export default CharacterItem;

const Container = styled.li`
  position: relative;
  width: 48.8%;
  max-width: 375px;
  margin-bottom: 16px;

  padding: 16px 20px;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: #ffffff;

  color: #616161;
  &::last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const HeadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 16px;
`;

const Avatar = styled.div<{ isName: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border: solid 1px #f3f3f5;
  border-radius: 50%;
  background-color: #f8f9fa;
  font-size: 2.2em;
  font-weight: 600;

  ${(props) =>
    props.isName &&
    css`
      background-color: #ffffff;
      border: 1px solid #b2d6ff;
      color: #0077fe;
    `}
`;

const NameBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  width: calc(100% - 42px);
  padding-left: 6px;
`;

const Name = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 1.8em;
  margin-bottom: 3px;
`;

const Gender = styled.div`
  width: 100%;
  font-size: 1.2em;
  color: #9c9ca7;
`;

const Body = styled.div`
  width: 100%;
  margin-bottom: 16px;
  dl {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 8px;
    &::last-child {
      margin-bottom: 0;
    }

    dt {
      width: 40px;
      font-size: 1.4em;
      color: #9c9ca7;
    }
    dd {
      width: calc(100% - 40px);
      font-size: 1.4em;
      color: #212121;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const Bottom = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 10px 14px;
  background-color: #f8f9fa;

  span {
    font-size: 1.4em;
    color: #9c9ca7;

    &:first-child {
      &:after {
        display: inline-block;
        content: "|";
        color: #e1e1e5;
        font-size: 1em;
        padding: 0 12px;
      }
    }
  }
`;

const Delete = styled.div`
  display: inline-block;
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
`;
