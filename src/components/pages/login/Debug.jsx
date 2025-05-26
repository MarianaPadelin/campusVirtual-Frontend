import axios from "axios";
import { useEffect, useState } from "react";

const Debug = () => {
    const [message, setMessage] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const msg = await axios.get("/session/debug", {
          withCredentials: true,
        });
        console.log(msg.data);
        setMessage(msg.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(message)

  return <div></div>;
};

export default Debug;
