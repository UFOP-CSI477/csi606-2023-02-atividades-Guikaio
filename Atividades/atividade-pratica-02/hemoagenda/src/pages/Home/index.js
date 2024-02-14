import React from "react";
import { useNavigate } from "react-router-dom";
import useDoacoes from "../../hooks/useDoacoes";
import FormularioDoacao from "../../components/FormularioDoacao";
import { BiSolidDonateBlood } from "react-icons/bi";
import styles from "./styles.module.css";

export default function Home() {
  const { listaDoacoes, adicionarNovaDoacao } = useDoacoes();
  const navigate = useNavigate();

  const handleSubmit = async (e, formValues) => {
    e.preventDefault();
    const requiredFields = ["doador", "localColeta"];

    const isValid = requiredFields.every(
      (field) => formValues[field] !== null && formValues[field] !== ""
    );
    if (isValid) {
      await adicionarNovaDoacao(formValues);
      window.location.reload();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  return (
    <div>
      <FormularioDoacao handleSubmit={handleSubmit} />
      {listaDoacoes.length > 0 ? (
        <div className={styles.doacoesContainer}>
          {listaDoacoes.map((doacao) => (
            <a
              className={styles.doacaoCard}
              key={doacao._id}
              onClick={() => navigate(`/doacoes/${doacao._id}`)}
              href={`/doacoes/${doacao._id}`}
            >
              <div className={styles.cardContent}>
                <div className={styles.infoContainer}>
                  <p className={styles.textXl}>Doação:</p>
                  <p className={styles.textXl}>{doacao.pessoa.nome}</p>
                  <BiSolidDonateBlood className={styles.arrowIcon}/>
                  <p className={styles.textXl}>{doacao.localColeta.nome}</p>
                  <p>{new Date(doacao.data).toISOString().split('T')[0]}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div>Nenhuma doação encontrado.</div>
      )}
    </div>
  );
}
