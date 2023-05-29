import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function SeatsPage() {
  const navigate = useNavigate();

  const { idSession } = useParams();
  const [sessionMovie, setSession] = useState(undefined);
  const [nameBuyer, setName] = useState("");
  const [cpfBuyer, setCpf] = useState("");
  const [idsSelected, setIdsSelected] = useState([]);
  const [namesSelected, setNamesSelected] = useState([]);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`;
    const promise = axios.get(URL);

    promise.then((resposta) => {
      setSession(resposta.data);
    });
    promise.catch((erro) => {
      console.log(erro);
    });
  }, []);

  if (sessionMovie === undefined) {
    return <h1>Loading...</h1>;
  }

  function selectedSeat(name, id) {
    let newArrayName = [...namesSelected, name];
    setNamesSelected(newArrayName);
    let newArrayId = [...idsSelected, id];
    setIdsSelected(newArrayId);
  }

  function desselectedSeat(name, id) {
    let newArrayName = [...idsSelected];
    let namePosition = newArrayName.indexOf(name);
    let removeName = newArrayName.splice(namePosition, 1);
    setNamesSelected(newArrayName);
    let newArrayId = [...idsSelected];
    let idPosition = newArrayId.indexOf(id);
    let removeId = newArrayId.splice(idPosition, 1);
    setIdsSelected(newArrayId);
  }

  const objSuccess = {
    movie: sessionMovie.movie.title,
    date: sessionMovie.day.date,
    time: sessionMovie.name,
    seats: namesSelected,
    nameBuyer: nameBuyer,
    cpfBuyer: cpfBuyer,
  };

  function reserveSeats(e) {
    e.preventDefault();

    const objTicket = {
      ids: idsSelected,
      name: nameBuyer,
      cpf: cpfBuyer,
    };

    const URL_API =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

    const promise = axios.post(URL_API, objTicket);

    promise.then((resposta) => navigate("/success", { state: objSuccess }));

    promise.catch((erro) => console.log(erro.response.data));
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {sessionMovie.seats.map((seat) => {
          if (seat.isAvailable === true) {
            if (idsSelected.includes(seat.id)) {
              return (
                <SeatSelected
                  key={seat.name}
                  onClick={() => desselectedSeat(seat.name, seat.id)}
                  data-test="seat"
                >
                  {seat.name}
                </SeatSelected>
              );
            } else {
              return (
                <SeatAvailable
                  key={seat.name}
                  onClick={() => selectedSeat(seat.name, seat.id)}
                  data-test="seat"
                >
                  {seat.name}
                </SeatAvailable>
              );
            }
          } else {
            return (
              <SeatUnavalable
                key={seat.name}
                onClick={() => alert("Esse assento não está disponível")}
                data-test="seat"
              >
                {seat.name}
              </SeatUnavalable>
            );
          }
        })}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <SelectedCircle />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <AvailableCircle />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <UnavailableCircle />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={reserveSeats}>
        <label htmlFor="nome">Nome do Comprador:</label>
        <input
          type="text"
          required
          id="nome"
          value={nameBuyer}
          placeholder="Digite seu nome..."
          onChange={(e) => setName(e.target.value)}
          data-test="client-name"
        />
        <label htmlFor="cpf">CPF do Comprador:</label>
        <input
          type="number"
          required
          id="cpf"
          value={cpfBuyer}
          placeholder="Digite seu CPF..."
          onChange={(e) => setCpf(e.target.value)}
          data-test="client-cpf"
        />
        <button data-test="book-seat-btn" type="submit">
          Reservar Assento(s)
        </button>
      </FormContainer>
      <FooterContainer data-test="footer">
        <div>
          <img src={sessionMovie.movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{sessionMovie.movie.title}</p>
          <p>
            {sessionMovie.day.weekday} - {sessionMovie.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const SelectedCircle = styled.div`
  border: 1px solid #0e7d71;
  background-color: #1aae9e;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const AvailableCircle = styled.div`
  border: 1px solid #7b8b99;
  background-color: #c3cfd9;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const UnavailableCircle = styled.div`
  border: 1px solid #f7c52b;
  background-color: #fbe192;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatAvailable = styled.button`
  border: 1px solid #7b8b99;
  background-color: #c3cfd9;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const SeatUnavalable = styled.button`
  border: 1px solid #f7c52b;
  background-color: #fbe192;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const SeatSelected = styled.button`
  border: 1px solid #0e7d71;
  background-color: #1aae9e;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
