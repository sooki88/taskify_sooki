import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value;
    setSearchTerm(result);
    onSearch(result);
  };

  return (
    <input
      className="bg-[url('/images/search.png')] bg-no-repeat bg-[left_10px_top_7px] indent-35 w-full h-40 px-8 py-16 border focus:border-violet border-gray-D9D9 rounded-8 text-14 tablet:text-16"
      type="text"
      placeholder="검색"
      name="search"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
