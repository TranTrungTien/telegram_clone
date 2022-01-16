const SearchForm = () => {
  return (
    <div className="flex-1">
      <form className="w-full flex justify-start items-center px-4 py-2 rounded-full bg-color_181818 text-color_6f6f6f space-x-2 border border-transparent hover:border-color_707579">
        <div>
          <i className="fas fa-search fa-lg"></i>
        </div>
        <div className="flex-1">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="w-full bg-transparent focus:border-transparent focus:outline-none hover:border hover:border-color_707579 text-sm font-light text-color_f8f8f8"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
