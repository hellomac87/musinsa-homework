import { Character } from "store/types/characters";
import styled, { css } from "styled-components";
import {
  FaBookDead,
  FaRegLaughSquint,
  FaFemale,
  FaTv,
  FaBook,
} from "react-icons/fa";

interface Props {
  character: Character;
  onClickDelete: () => void;
}

function CharacterItem({ character, onClickDelete }: Props) {
  const isFemale = character.gender === "Female";
  return (
    <Container>
      <NameWrap>
        <NameLabel isFemale={isFemale}>
          {character.name ? character.name.slice(0, 2) : "-"}
        </NameLabel>
        <Name>{character.name || "-"}</Name>
      </NameWrap>
      <AliaseWrap>
        <Label>{"Aliase :"}</Label>
        <EllipseList>
          {character.aliases.map((aliase) => (
            <li key={aliase}>{aliase}</li>
          ))}
        </EllipseList>
      </AliaseWrap>

      <ul>
        titles:
        {character.titles.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
      <div>
        <FaWrapper size={1.3}>
          <FaBook />
        </FaWrapper>
        :{character.books.length}
      </div>
      <div>
        <FaWrapper size={1.3}>
          <FaTv />
        </FaWrapper>
        :{character.tvSeries.length}
      </div>

      <div>
        {character.died ? <FaBookDead /> : <FaRegLaughSquint />}{" "}
        {character.gender === "Female" && <FaFemale />}
      </div>
      {/* <div>dead: {character.died}</div> */}
      <button onClick={onClickDelete}>{"삭제"}</button>
    </Container>
  );
}

export default CharacterItem;

const Container = styled.li`
  width: 100%;
  max-width: 375px;
  margin-bottom: 24px;
  margin-right: 24px;

  padding: 24px;

  -webkit-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #616161;
  &::last-child {
    margin-bottom: 0;
  }
`;

const NameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 8px;
`;

const NameLabel = styled.div<{ isFemale: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  border-radius: 20px;
  background-color: #616161;
  ${(props) =>
    props.isFemale
      ? css`
          background-color: #f48fb1;
          color: #616161;
        `
      : css`
          background-color: #90caf9;
          color: #616161;
        `}
`;

const Name = styled.div`
  width: calc(100% - 40px);
  padding: 0 12px;
  font-size: 1.5rem;
`;

const AliaseWrap = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: inline-block;
  width: auto;
  max-width: 60px;
`;

const EllipseList = styled.ul`
  width: 100%;
  max-width: calc(100% - 60px);
  display: inline-block;
`;

const FaWrapper = styled.div<{ size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: ${(props) => props.size && `${props.size}rem`};
`;
