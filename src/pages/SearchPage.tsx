import { useSearchRestaurants } from "@/api/RestaurantAPI";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        Add cuisines here....
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo city={city} total={results.pagination.total}/>     
      </div>
    </div>
  );
};

export default SearchPage;