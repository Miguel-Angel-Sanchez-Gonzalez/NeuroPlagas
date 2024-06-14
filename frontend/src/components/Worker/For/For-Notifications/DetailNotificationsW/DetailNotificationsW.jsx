import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailNotificationsW = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { fecha } = location.state;

  return (
    <div>
      Mañana termino este banda, ya me dio sueñito :p
    </div>
  );
}


export default DetailNotificationsW;