import { useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

interface LocationSearchProps {
  setCustomValue?: (id: string, value: number[] | string) => void;
  setLocation?: (location: string) => void;
  setLocationValue?: (locationValue: number[]) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  setCustomValue,
  setLocation,
  setLocationValue,
}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const delayDebounceFn = setTimeout(async () => {
      const res: any = await provider.search({ query: search });
      setSearchResult(res);
      console.log(res);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="relative">
      <input
        id="locationSearch"
        placeholder="Anywhere"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`
        w-full
        py-3
        px-4
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        focus:border-gray-700
        mb-4
      `}
      />
      <div className="absolute top-12 left-2 z-30 bg-white ">
        {searchResult.length > 0 &&
          searchResult.map((result: any, i: number) => (
            <div
              key={i}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100 border-b border-gray-400 text-sm"
              onClick={() => {
                setCustomValue?.("locationValue", [result.y, result.x]);
                setLocationValue?.([result.y, result.x]);

                setCustomValue?.("location", result.label);
                setLocation?.(result.label);
                setSearchResult([]);
              }}
            >
              {result.label}
            </div>
          ))}
      </div>
    </div>
  );
};
export default LocationSearch;
