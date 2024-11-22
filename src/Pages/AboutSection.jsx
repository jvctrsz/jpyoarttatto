import React from "react"
import BtnInicio from "./BtnInicio"

export default function AboutSection() {
    return (
        <section id="about-content">
            <div className="about-box">
                <div className="about-title">
                    <h2 className="cssanimation typing">Sobre Mim</h2>
                </div>
                <div className="description cssanimation fadeIn">
                    <p >Olá! Eu sou a Julia Pedrozo, atualmente tenho 21 anos e estou no ramo da tatuagem há 2 anos.
                        Sempre tive muito envolvimento com a arte, dês de muito jovem sempre fui a artista em meus
                        meios sociais. Dessa forma sempre tive muito interesse em trabalhar em algo que envolvesse o
                        meio artístico, incluindo principalmente a tatuagem.</p>
                    <p >Aos 18 anos já comecei a estudar e também trabalhar em um Studio de tatuagem, o que me ajudou
                        muito a desenvolver não somente a prática na arte, mas também em como lidar com o atendimento ao
                        cliente, gerenciamento da empresa, entre outras coisas que considero super importante
                        para desenvolver um bom profissional.</p>
                    <p > Eu dei continuidade aos meus estudos pelo período de 1 ano, até começar a atender. Após alguns
                        meses atendendo no Studio de uma amiga, devido a um imprevisto, tive que abrir meu próprio
                        espaço. Com bastante trabalho consegui abrir minha sala, aonde atualmente realizo meus
                        atendimentos.</p>
                    <p >Tenho muito amor pelo meu trabalho e pela minha arte. E cada vez mais estou
                        buscando evoluir em todos os aspectos possíveis para se tornar um profissional melhor.</p>
                </div>
                <BtnInicio />

            </div>
        </section>
    )
}

//onclick={cardMenu()}