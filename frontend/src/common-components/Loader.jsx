import Image from "react-bootstrap/Image";
import LoaderImage from "../assets/loader.gif";

/**
 * Loader component displays a loading spinner or indicator.
 * 
 * @returns {JSX.Element} - Returns the JSX element for the Loader component.
 */
const Loader = () => {
  return (
    <div className="loader">
      <Image src={LoaderImage} className="loader__img" />
    </div>
  );
};

export default Loader;
