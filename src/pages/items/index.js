import TableItem from "@/components/items/TableItem";
import Loading from "@/components/Loading";
import { fetchItems } from "@/store/items";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ListItems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const {
    data: itemsList = [],
    isLoading,
    error,
  } = useQuery(["items"], fetchItems, {
    onSuccess: (data) => {
      setSearchData(data);
    },
  });

  if (isLoading) return <Loading />;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = itemsList.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchData(filteredData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">List of Items</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search items..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <TableItem itemsList={searchData} />
    </div>
  );
}
