import Image from "react-bootstrap/Image";
import LoaderImage from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <Image src={LoaderImage} className="loader__img" />
    </div>
  );
};

export default Loader;
