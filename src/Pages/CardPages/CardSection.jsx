import React from "react";
import Menu from "../Menu";

function CardSection() {
  return (
    <section id="card-content">
      <div id="card-box">
        <div className="card-title cssanimation fadeInTop">
          <h1>Julia Pedrozo</h1>
          <h2>Tattoo</h2>
        </div>
        <Menu />
      </div>
    </section>
  );
}

export default CardSection;
