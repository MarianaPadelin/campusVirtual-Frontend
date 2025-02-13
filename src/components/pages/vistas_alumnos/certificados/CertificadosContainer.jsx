import { useContext, useEffect, useState } from "react";
import Certificados from "./Certificados";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";

const CertificadosContainer = () => {
  const [url, setUrl] = useState("");
  const { id } = useContext(UserContext);
  console.log(id);
  const date = new Date();
  const year = date.getFullYear();
  console.log(year);
  useEffect(() => {
    const promise = axios.get(`/material/certificado/${id}/${year}`);
    promise
      .then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          return setUrl(res.data.certActual.url);
        } 
        return setUrl("")
      })
      .catch((error) => console.log(error));
  }, [id]);

  console.log(url)
  return (
    <>
      <Certificados url={url}/>
    </>
  );
};

export default CertificadosContainer;
