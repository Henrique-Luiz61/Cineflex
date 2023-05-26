import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

    const promise = axios.get(URL);
    promise.then((resposta) => {
      setMovies(resposta.data);
    });
    promise.catch((erro) => {
      console.log(erro.response.data);
    });
  }, []);

  if (movies.length === 0) {
    return <SCLoading>Loading...</SCLoading>;
  }

  return (
    <SCPageContainer>
      Selecione o filme
      <SCListContainer>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/sessions/${movie.id}`}>
            <SCMovieContainer>
              <img src={movie.posterURL} alt="poster" />
            </SCMovieContainer>
          </Link>
        ))}
      </SCListContainer>
    </SCPageContainer>
  );
}

const SCPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const SCListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const SCMovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
const SCLoading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;
