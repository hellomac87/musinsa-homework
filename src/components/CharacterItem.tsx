import { Character } from "store/types/characters";
import styled, { css } from "styled-components";
import {
  FaBookDead,
  FaRegLaughSquint,
  FaFemale,
  FaTv,
  FaBook,
  FaUserAlt,
} from "react-icons/fa";

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
          {character.name ? character.name[0] : <FaUserAlt />}
        </Avatar>
        <NameBlock>
          <Name>{character.name || "No Name"}</Name>
          <Gender>{character.gender}</Gender>
        </NameBlock>
      </HeadBlock>

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
  margin-bottom: 16px;

  padding: 16px 20px;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: #ffffff;

  color: #616161;
  &::last-child {
    margin-bottom: 0;
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
