"use client";

import React from "react";
import AddForm from "./components/AddForm";
import UpdateForm from "./components/UpdateForm";
import { buscarCidadePeloId } from "../../services/cidadeService";
import { buscaEstadoPorId } from "../../services/estadoService";
import UpdateForm2 from "./components/UpdateForm2";
import AddForm2 from "./components/AddForm2";
import useCidades from "../../hooks/useCidades";
import useEstados from "../../hooks/useEstados";
import useTiposSanguineos from "../../hooks/useTiposSanguineos";
import { buscarTipoSanguineoPorId } from "../../services/tipoSanguineoService";

export default function Parameterization() {
  const {
    listaCidades,
    adicionarNovaCidade,
    atualizarCidadeExistente,
    excluirCidade,
    loading: cidadesLoading,
    error: cidadesError,
  } = useCidades();

  const {
    listaEstados,
    adicionarNovoEstado,
    excluirEstado,
    atualizarEstadoExistente,
    loading: estadosLoading,
    error: estadosError,
  } = useEstados();

  const {
    listaTiposSanguineos,
    adicionarNovoTipoSanguineo,
    atualizarTipoSanguineoExistente,
    excluirTipoSanguineo,
    loading: tiposSanguineosLoading,
    error: tiposSanguineosError,
  } = useTiposSanguineos();

  if (cidadesError || estadosError || tiposSanguineosError) {
    return (
      <div>
        <h1>
          500: ERRO NO SERVIDOR, CONTATE O SUPORTE
        </h1>
      </div>
    );
  }
  return (
    <div>
      <AddForm2
        elementTitle={"Estado"}
        addElement={adicionarNovoEstado}
        elementSubtitle={"estado"}
        elementpropname1={"nome"}
        elementpropname2={"sigla"}
      />
      {estadosLoading ? (
        <p>Carregando..</p>
      ) : (
        <UpdateForm2
          elements={listaEstados}
          updateElement={atualizarEstadoExistente}
          deleteElement={excluirEstado}
          elementTitle={"Estado"}
          elementSubtitle={"estado"}
          getElementById={buscaEstadoPorId}
          elementpropname1={"nome"}
          elementpropname2={"sigla"}
        />
      )}
      {estadosLoading ? (
        <p>Carregando..</p>
      ) : (
        <AddForm
          elementTitle={"Cidade"}
          addElement={adicionarNovaCidade}
          elementSubtitle={"cidade"}
          selectOptions={listaEstados}
          selectOptionViewName={"nome"}
          selectOptionLabel={"estado"}
          selectOptionValue={"estado"}
        />
      )}
      {cidadesLoading ? (
        <p>Carregando...</p>
      ) : (
        <UpdateForm
          elements={listaCidades}
          updateElement={atualizarCidadeExistente}
          deleteElement={excluirCidade}
          elementTitle={"Cidade"}
          elementSubtitle={"cidade"}
          getElementById={buscarCidadePeloId}
          selectOptions={listaEstados}
          selectOptionViewName={"nome"}
          selectOptionLabel={"estado"}
          selectOptionValue={"estado"}
        />
      )}

      <AddForm2
        elementTitle={"Tipos Sanguineos"}
        addElement={adicionarNovoTipoSanguineo}
        elementSubtitle={"tipo sanguineo"}
        elementpropname1={"tipo"}
        elementpropname2={"fator"}
      />
      {tiposSanguineosLoading ? (
        <p>Carregando..</p>
      ) : (
        <UpdateForm2
          elements={listaTiposSanguineos}
          updateElement={atualizarTipoSanguineoExistente}
          deleteElement={excluirTipoSanguineo}
          elementTitle={"Tipos Sanguineos"}
          elementSubtitle={"tipo sanguineo"}
          getElementById={buscarTipoSanguineoPorId}
          elementpropname1={"tipo"}
          elementpropname2={"fator"}
        />
      )}
    </div>
  );
}
