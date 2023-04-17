import { Link } from "react-router-dom";
import "../styles/SearchResult.css";

export const SearchResult = ({ result, idAsset, setResults }) => {
  const handleSelectResult = (e) => {
    setResults([]); //clean the results searched
  };

  return (
    <div className="search-result" onClick={handleSelectResult}>
      <Link to={`/infoasset/${idAsset}`}>{result}</Link>
    </div>
  );
};
