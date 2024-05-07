import { useSearchRestaurants } from "@/api/RestaurantAPI";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();

  //SearchState type object that have "" searchQuery when loading
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: ""
  });

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  const setSearchQuery = (formData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: formData.searchQuery,
    }));
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        Add cuisines here....
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          placeHolder="Search by Cuisine or Restaurant Name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <SearchResultInfo city={city} total={results.pagination.total} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;