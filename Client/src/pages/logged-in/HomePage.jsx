
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import PropertyWidget from "../../components/widgets/PropertyWidget";

const HomePage = () => {
    return (
        <div className="flex h-lvh">
            <Sidebar/>
            <div className="w-full">
                <Topbar/>
                <div className="w-full h-[88%] bg-[#f6f6f6]">
                    <div className="w-full flex justify-between py-3 px-10">
                        <div class="bg-white rounded-full p-1 flex w-fit gap-2">
                            <input type="radio" name="property" id="apartments" class="hidden peer/apartments" checked />
                            <label for="apartments" class="px-5 py-2 rounded-full font-medium cursor-pointer peer-checked/apartments:bg-[#1275A4] peer-checked/apartments:text-white">
                                Apartments
                            </label>
                            <input type="radio" name="property" id="house" class="hidden peer/house" checked />
                                <label for="house" class="px-5 py-2 rounded-full font-medium cursor-pointer peer-checked/house:bg-[#1275A4] peer-checked/house:text-white">
                                    House
                                </label>
                        </div>
                        <div className="bg-white flex justify-center gap-2 items-center rounded-2xl p-1 w-[30%]">
                            <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                <select name="" id="">
                                    <option value="">Price</option>
                                    <option value="350">{"< 350"}</option>
                                    <option value="350">{"> 350"}</option>
                                </select>
                                </div>
                                <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                    <select name="" id="">
                                        <option value="">Rooms</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                                <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                    <select name="" id="">
                                        <option value="">Other</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-10 py-2 w-full">
                            <h1 className="text-2xl font-semibold">Top Apartment Rooms</h1>
                            <div className="overflow-y-auto w-full h-[490px] flex flex-wrap mt-3 gap-5">
                                <PropertyWidget/>
                                <PropertyWidget/>
                                <PropertyWidget/>
                                <PropertyWidget/>
                                <PropertyWidget/>
                                <PropertyWidget/>
                                
                            </div>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default HomePage;