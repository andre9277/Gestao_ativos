import { Link } from "react-router-dom";
import "../styles/SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      <Link to="/infoasset">{result}</Link>
    </div>
  );
};
