import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./animex.css";

const AnimexItem = ({ item }) => {
  return (
    <li className="border border-primary rounded-3 border-2 ">
      <img
        className="img-fluid rounded float-start"
        src={item.images.jpg.image_url}
        alt={item.title}
      />

      <h3> {item.title}</h3>

      <FontAwesomeIcon icon={faHeart} />
    </li>
  );
};

export default AnimexItem;
