// cliente/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importamos un archivo CSS para estilos adicionales

function App() {
  const [tareas, setTareas] = useState([]);
  const [gifData, setGifData] = useState([]);

  // Obtener tareas de nuestra API al cargar el componente
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get('http://examen01-env.eba-v4tc5hkr.us-east-1.elasticbeanstalk.com/api/tareas');
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    obtenerTareas();
  }, []);

  // Obtener datos de la API de Giphy al hacer clic en un botón
  const obtenerDatosGiphy = async () => {
    try {
      const response = await axios.get('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: 'ZqTZnIP50Y3D1SQXCF1Gu6T9SNBT9S1J', // Reemplaza 'tu-api-key' con tu clave de API de Giphy
          limit: 10 // Puedes ajustar el número de GIFs que deseas obtener
        }
      });
      console.log(response.data);
      setGifData(response.data.data);
    } catch (error) {
      console.error('Error al obtener datos de la API de Giphy:', error);
    }
  };

  return (
    <div className="App">
      <h1>Tareas</h1>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea._id}>
            <strong>{tarea.nombre}</strong>: {tarea.descripcion}
          </li>
        ))}
      </ul>
      <button onClick={obtenerDatosGiphy}>Obtener GIFs de Giphy</button>
      <div className="gif-container">
        {gifData.map((gif, index) => (
          <div key={index} className="gif-card">
            <img src={gif.images.original.url} alt={`GIF ${index}`} />
            <div className="gif-info">
              <h2>{gif.title}</h2>
              <p>By: {gif.user ? gif.user.username : 'Unknown'}</p>
              <p>Rating: {gif.rating}</p>
              <a href={gif.url} target="_blank" rel="noopener noreferrer">Ver en Giphy</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
