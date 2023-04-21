import { SearchResult } from "./SearchResult";
import "../styles/SearchResultsList.css";

const SearchResultsList = ({ results, setResults }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result.numb_inv}
            key={id}
            idAsset={result.id}
            setResults={setResults}
          />
        );
      })}
    </div>
  );
};

export default SearchResultsList;
