import { useEffect, useState } from "react";
import VerTps from "./VerTps";
import axios from "axios";

const VerTpsContainer = () => {
  const [tpList, setTpList] = useState([]);
  useEffect(() => {
    const promise = axios.get("/tp");
    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setTpList(res.data.listaTps);
        }
        return setTpList([]);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <VerTps tpList={tpList} />
    </>
  );
};

export default VerTpsContainer;
