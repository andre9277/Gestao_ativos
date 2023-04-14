import { SearchResult } from "./SearchResult";
import "../styles/SearchResultsList.css";

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.numb_ser} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
