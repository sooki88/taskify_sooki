function SearchBar() {
  return (
    <form>
      <input
        className="bg-[url('/images/search.png')] bg-no-repeat bg-[left_10px_top_7px] indent-35 w-full h-40 px-8 py-16 border-1 border-gray-D9D9 rounded-8 text-14 tablet:text-16"
        type="text"
        placeholder="검색"
        name="search"></input>
    </form>
  );
}

export default SearchBar;
