import React from "react";
import { Link } from "react-router-dom";

export default function BtnInicio() {
  return (
    <Link to="/" className="btnHome">
      Voltar para o menu inicial
    </Link>
  );
}
