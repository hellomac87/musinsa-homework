import { Character } from "store/types/characters";
import styled from "styled-components";

interface Props {
  character: Character;
  onClickDelete: () => void;
}

function CharacterItem({ character, onClickDelete }: Props) {
  return (
    <Container>
      <NameWrap>
        <Label>{"Name :"}</Label> {character.name || "No Name"}
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
      <div>books:{character.books.length}</div>
      <div>tvSeries:{character.tvSeries.length}</div>
      <div>gender: {character.gender}</div>
      {/* <div>dead: {character.died}</div> */}
      <button onClick={onClickDelete}>{"삭제"}</button>
    </Container>
  );
}

export default CharacterItem;

const Container = styled.li`
  width: 100%;
  margin-bottom: 12px;

  padding: 24px;

  -webkit-box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  &::last-child {
    margin-bottom: 0;
  }
`;

const NameWrap = styled.div`
  width: 100%;
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
