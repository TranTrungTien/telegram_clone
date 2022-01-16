import SearchForm from "../SearchForm";
import Bar from "../Bar";

const TopSideBar = ({ handleOpenSettings }) => {
  return (
    <div className="flex items-center justify-start pl-4 pr-6 space-x-4">
      <Bar handleOpenSettings={handleOpenSettings} />
      <SearchForm />
    </div>
  );
};

export default TopSideBar;
