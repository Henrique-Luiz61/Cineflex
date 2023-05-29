import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function SessionsPage() {
  const { idMovie } = useParams();
  const [session, setSession] = useState(undefined);
  const [daysSession, setDays] = useState([]);

  useEffect(getSessions, []);

  function getSessions() {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`;
    const promise = axios.get(URL);

    promise.then((resposta) => {
      setSession(resposta.data);
      setDays(resposta.data.days);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {daysSession.map((s, i) => (
          <SessionContainer data-test="movie-day" key={s.id}>
            {s.weekday} - {s.date}
            <ButtonsContainer>
              <Link to={`/assentos/${s.showtimes[0].id}`}>
                <button data-test="showtime">{s.showtimes[0].name}</button>
              </Link>
              <Link to={`/assentos/${s.showtimes[1].id}`}>
                <button data-test="showtime">{s.showtimes[1].name}</button>
              </Link>
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <FooterContainer data-test="footer">
        <div>
          <img src={session.posterURL} alt="poster" />
        </div>
        <div>
          <p>{session.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
