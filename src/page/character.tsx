import Loader from "components/Loader";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router";
import { Character } from "store/types/characters";
import styled, { css } from "styled-components";

function CharacterPage() {
  const params: any = useParams();
  const { data } = useFetch<Character>(`/characters/${params.id}`);

  if (!data) return <Loader />;
  return (
    <Container>
      <Header>
        <Avatar isName={data.name.length > 0 ? true : false}>
          {data.name[0]}
        </Avatar>
        <NameBlock>
          <Name>{data.name || "No Name"}</Name>
          <Gender>
            {data.gender} {data.died && " (Dead)"}
          </Gender>
        </NameBlock>
      </Header>

      <ContentWrap>
        <Content>
          <Title>{"Aliases"}</Title>
          <Body>{data.aliases.join(",")}</Body>
        </Content>
        <Content>
          <Title>{"Titles"}</Title>
          <Body>{data.titles.join(",")}</Body>
        </Content>
        <Content>
          <Title>{"Books"}</Title>
          <Body>{data.books.length}</Body>
        </Content>
        <Content>
          <Title>{"Tv Series"}</Title>
          <Body>{data.tvSeries.join(",")}</Body>
        </Content>
      </ContentWrap>
    </Container>
  );
}

export default CharacterPage;

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  border-bottom: 1px solid #fafafa;
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

  margin-bottom: 8px;

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
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  text-align: center;
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

const ContentWrap = styled.div`
  padding: 24px;
  width: 100%;
`;
const Content = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 1.8em;
  margin-bottom: 12px;
`;

const Body = styled.div`
  width: 100%;

  font-size: 1.4em;
`;
