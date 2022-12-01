import React, { useState } from 'react';
import '../styles/components/pages/contactoPage.css';
import axios from 'axios';


const ContactoPage = (props) => {
  const initialForm = {
    nombre:'',
    mail:'',
    tipo:'',
    consulta:'',
  }

  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState(initialForm);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({
      ...oldData,
      [name]: value //forma dinamica
    }));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setSending(true)
    const response = await axios.post('http://localhost:3000/api/contacto', formData);
    setSending(false);
    setMsg(response.data.message);
    if (response.data.error === false) {
      setFormData(initialForm)
    }

  }

  return (
    <main className="holder contacto">
      <div>
        <img src="images/recetasView.png" width="100%" alt="Morfi-Facil"/>
      </div>
      <div>
        <h2>Contacto Rápido</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <p>
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </p>
          <p>
            <label for="mail">Email</label>
            <input type="text" name="mail" value={formData.mail} onChange={handleChange} />
          </p>
          <p>
            <label for="tipo">tipo consulta</label>
            <select class="form-select" name="tipo" id="tipo" value={formData.tipo} onChange={handleChange} >
              <option value="Consulta">Consulta</option>
              <option value="Soporte">Soporte</option>
              <option value="Mejora">Mejora</option>
            </select>
          </p>
          <p>
            <label for="consulta">Mensaje</label>
            <textarea name="consulta" value={formData.consulta} onChange={handleChange} > </textarea>
          </p>
          {sending ? <p>Enviando...</p> : null}
          {msg ? <p>{msg}</p> : null}
          <p class="centrar">
              <input type="submit" value="Enviar"/>
          </p>
        </form>
     </div>
     <div class="datos">
      <h2> Otras vias de comunicación </h2>
      <p> También puede contactarse con nosotros usando los siguientes medios </p>
      <ul>
        <li>Teléfono: 43242388</li>
        <li>Email: contacto@transportesx.com.ar</li>
        <li>Facebook:</li>
        <li>Twitter:</li>
        <li>Skype:</li>
      </ul>
    </div>
   </main>

   );
}

export default ContactoPage;
