const Topbar = () => {
    return (
        <div className="w-full h-[12%] flex items-center justify-between px-10">
            {/* Left side: search + location */}
            <div className="flex w-[50%] items-center gap-10">
                <input
                className="bg-[#f6f6f6] py-2 px-4 w-[70%] rounded-2xl"
                type="text"
                placeholder="Search properties or cities"
                />

                <div className="flex flex-col w-[25%] border-x-2 px-2">
                    <label className="text-[15px] font-regular ml-1">Location:</label>
                    <select className="w-full" name="location" id="location">
                        <option value="prishtine">Prishtine</option>
                        <option value="gjakove">Gjakove</option>
                        <option value="ferizaj">Ferizaj</option>
                    </select>
                </div>
            </div>
            {/* Right side: user info */}
            <div className="flex items-center gap-3">
                <div className="bg-gray-100 size-10 rounded-full"></div>
                <h1 className="font-semibold">Erris Binxhija</h1>
            </div>
        </div>
    )
}

export default Topbar;