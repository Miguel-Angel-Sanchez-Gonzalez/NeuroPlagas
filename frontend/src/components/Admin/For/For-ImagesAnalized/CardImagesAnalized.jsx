import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CardImagesAnalized.css'; // Asegúrate de importar el archivo CSS

function CardImagesAnalized() {
  const location = useLocation();
  const { idAnalizedImage, imageUrl, detected, types } = location.state || {};
  const [recommendations, setRecommendations] = useState({ plaga: [], enfermedad: [] });
  const [actions, setActions] = useState({ plaga: [], enfermedad: [] });
  const [setIsLoaded] = useState(false); // Declarar isLoaded correctamente

  useEffect(() => {
    const getRAndAByIdAnalizedImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/analizedImage/solutions/${idAnalizedImage}`
        );
        if (response.status === 200) {
          const data = await response.json();
          const plagueData = data.filter(item => item.tipo === "plaga");
          const plagueRecommendations = plagueData.flatMap(item => item.recomendaciones);
          const plagueActions = plagueData.flatMap(item => item.acciones);
  
          const diseaseData = data.filter(item => item.tipo === "enfermedad");
          const diseaseRecommendations = diseaseData.flatMap(item => item.recomendaciones);
          const diseaseActions = diseaseData.flatMap(item => item.acciones);
  
          setRecommendations({ plaga: plagueRecommendations, enfermedad: diseaseRecommendations });
          setActions({ plaga: plagueActions, enfermedad: diseaseActions });
          setIsLoaded(true);
        } else if (response.status === 404) {
          console.log('No se encontraron las recomendaciones y/o acciones para la imagen.');
          setIsLoaded(true);
        }
      } catch (error) {
        console.error(
          "Error al obtener las recomendaciones y acciones de la plaga o enfermedad:",
          error
        );
        setIsLoaded(true); 
      }
    };
  
    if (idAnalizedImage) {
      getRAndAByIdAnalizedImage();
    }
  }, [idAnalizedImage, setIsLoaded]); 
  
  return (
    <div>
      <h1 className='title'>Imágenes detectadas</h1>
      <div className="projcard-container">
        {types && types.map((type, index) => (
          <div className="image-detail-container" key={index}>
            <div className="image-container">
              {type === "Plaga" && (
                <img src={imageUrl} alt="Imagen de Plaga" />
              )}
              {type === "Enfermedad" && detected && detected.diseaseImageUrl && (
                <img src={detected.diseaseImageUrl} alt="Imagen de Enfermedad" />
              )}
            </div>
            <div className="details-container">
              <div className="card">
                <h3>{type === "Plaga" ? "Plagas" : "Enfermedades"}</h3>
                <ul>
                  {detected && detected[type.toLowerCase() + "s"] && detected[type.toLowerCase() + "s"].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {(type === "Plaga" || type === "Enfermedad") && (
                <div className="recommendations-container">
                  <h5>Recomendaciones</h5>
                  <ul>
                    {recommendations[type.toLowerCase()].map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                  <div className="actions-container">
                    <h5>Acciones</h5>
                    <ul>
                      {actions[type.toLowerCase()].map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardImagesAnalized;
