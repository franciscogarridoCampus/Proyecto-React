import './Axio.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Axio() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí llamaremos a tu backend cuando esté listo
    axios.get('https://jsonplaceholder.typicode.com/posts') // temporal
      .then(response => {
        setPeliculas(response.data.slice(0, 5)); // solo los primeros 5 para probar
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar películas:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando películas...</p>;

  return (
    <div>
      <h2>Películas de ejemplo</h2>
      {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="mb-3">
          <h4>{pelicula.title}</h4>
          <p>{pelicula.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export { Axio };
