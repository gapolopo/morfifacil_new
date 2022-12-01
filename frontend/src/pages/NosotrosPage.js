
import React from 'react';
import '../styles/components/pages/nosotrosPage.css';

const NosotrosPage = (props) => {
  return (
    <main className="holder">
      <div>
        <img src="images/recetas.png" alt="Morfi-Facil"/>
      </div>
      <div className="historia">
        <h2>Historia</h2>
        <p>
          Descubridor de más de 30 especies de animales prehistóricos y autor de 62 publicaciones
           científicas, el paleontólogo Sebastián Apesteguía -uno de los más reconocidos de Argentina -
           aseguró a Télam-Confiar que "para que la paleontología exista y progrese se necesita el esfuerzo
           de muchas personas y en múltiples áreas; es muy difícil realizar nuestro trabajo en solitario”.
        </p>
      </div>
      <div className="staff">
        <h2>Staff</h2>
        <div className="personas">
          <div className="persona">
            <img src="images/nerd1.webp" width="100" alt="Juan Gomez"/>
            <h5>Juan Gomez</h5>
            <h6>Gerente General</h6>
            <p>Pablito clavó un clavito, que clavito clavó Pablito</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NosotrosPage;
