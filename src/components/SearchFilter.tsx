interface IProps {
  searchState: string;
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
}

function SearchFilter({ searchState, setSearchState }: IProps): JSX.Element {
  return (
    <input
      id="search-bar"
      value={searchState}
      onChange={(e) => setSearchState(e.target.value)}
      placeholder="Filter recommendations"
    />
  );
}

export default SearchFilter;
