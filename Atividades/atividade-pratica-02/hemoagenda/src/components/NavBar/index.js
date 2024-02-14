import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";

export default function Navbar() {
  return (
    <header>
      <nav>
        <div>
          <NavLink to={"/"} className={`${styles.links} ${styles.logo}`}>
            HemoAgenda
            <BiSolidDonateBlood />
          </NavLink>
        </div>
        <div className={styles.linksBasicosContainer}>
          <NavLink
            to={"/locaiscoleta"}
            className={`${styles.links} ${styles.linksBasicos}`}
          >
            Locais de Coleta
          </NavLink>
          <NavLink
            to={"/pessoas"}
            className={`${styles.links} ${styles.linksBasicos}`}
          >
            Pessoas
          </NavLink>
          <NavLink
            to={"/cadastrosgerais"}
            className={`${styles.links} ${styles.linksBasicos}`}
          >
            Cadastros Gerais
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
