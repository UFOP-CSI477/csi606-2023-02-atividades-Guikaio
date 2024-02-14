import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>
        <NavLink to={"/"} className={`${styles.links} ${styles.logo}`}>
          Discoteca
        </NavLink>
      </div>
      <div className={styles.linksBasicosContainer}>
        <NavLink to={"/adicionaralbum"} className={`${styles.links} ${styles.linksBasicos}`}>
          Adicionar álbum
        </NavLink>
        <NavLink to={"/bandas"} className={`${styles.links} ${styles.linksBasicos}`}>
          Bandas
        </NavLink>
      </div>
    </nav>
  );
}
