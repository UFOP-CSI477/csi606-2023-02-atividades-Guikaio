import React from "react";
import useBandas from "../../hooks/useBandas";
import BandaCard from "./components/BandaCard";
import FormBanda from "./components/FormBanda";
import styles from "./styles.module.css";

export default function Bandas() {
  const { bandas, addBanda, loadingBandas } = useBandas();

  
  return (
    <div className={styles.container}>
      <FormBanda onSave={addBanda} />
      {bandas.length === 0 && <p>Nenhuma banda encontrada</p>}
      {loadingBandas ? (
        <p>Carregando....</p>
      ) : (
        <div className={styles.bandasContainer}>
          {bandas.map((banda) => {
            return <BandaCard key={banda._id} banda={banda} />;
          })}
        </div>
      )}
    </div>
  );
}
