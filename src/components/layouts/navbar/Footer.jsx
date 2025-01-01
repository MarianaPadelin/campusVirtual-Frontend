import { Link } from "react-router-dom"
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

const Footer = () => {
  return (
    <div className="basicContainer">

        <Link to="/">
        <HomeTwoToneIcon fontSize="large"  />
        </Link>
    </div>
  )
}

export default Footer