
const Topbar = ({ 
  searchPlaceholder = "Search...", 
  onSearchChange, 
  onLocationChange, 
  showLocationFilter = true 
}) => {
const user = JSON.parse(localStorage.getItem('userData'));

  return (    
    <div className="w-full h-[12%] flex items-center justify-between px-10">
      <div className="flex w-[50%] items-center gap-10">
        <input
          className="bg-[#f6f6f6] py-2 px-4 w-[70%] rounded-2xl"
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {showLocationFilter && (
          <div className="flex flex-col w-[25%] border-x-2 px-2">
            <label className="text-[15px] font-regular ml-1">Location:</label>
            <select className="w-full" onChange={(e) => onLocationChange(e.target.value)}>
              <option value="prishtine">Prishtine</option>
              <option value="gjakove">Gjakove</option>
              <option value="ferizaj">Ferizaj</option>
              <option value="ferizaj">Peje</option>
              <option value="ferizaj">Prizren</option>
              <option value="ferizaj">Mitrovice</option>
              <option value="ferizaj">Gjilan</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <img className="bg-gray-100 size-10 rounded-full" src={user.avatarUrl}/>
        <h1 className="font-semibold">{user.username}</h1>
      </div>
    </div>
  );
};

export default Topbar;