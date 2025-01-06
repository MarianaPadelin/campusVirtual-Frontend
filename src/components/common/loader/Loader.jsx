import { PulseLoader } from "react-spinners";


const Loader = () => {
  return (
    <div className="basicContainer">
        <div className="secondaryContainer">
            <PulseLoader height={140} width={15} color="#ffffff"/> 
        </div>
    </div>
  )
}

export default Loader