import React ,{useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import "../instrument.css";
import Detailsback from "../background/backdetails";
import axios from "axios";

const OudDetails = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [ouds, setOuds] = useState([]); // État pour stocker les détails de l'instrument

  useEffect(() => {
    // Fonction pour récupérer les détails de l'instrument depuis le backend
    const fetchInstrumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${_id}`);
        setOuds(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstrumentDetails(); // Appel de la fonction pour récupérer les détails de l'instrument
  }, [_id]);

  return (
    <>
    <Detailsback/>
    {ouds && (
    <div className="instru-details-container">
      <img className="instru-details-img" src={ouds.cover} alt={ouds.name} />
      <div className="instru-details-content">
        <h1 className="instru-details-name">{ouds.title}</h1>
        <p className="instru-details-price"><b>Prix: </b>${ouds.price}.00</p>
        <p className="instru-details-price"><b>Quantité: </b>{ouds.quantity}</p>
        <p className="instru-details-description"><b>Description: </b>{ouds.description}</p>
      </div>
    </div>
    )}
    </>
  );
};

export default OudDetails;
