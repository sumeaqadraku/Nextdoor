
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import PropertyWidget from "../../components/widgets/PropertyWidget";

const HomePage = () => {

    const PropertyData = [
        { id: 1, name: "Modern Flat", size: "72m²", rooms: 3, location: "Prishtine", price: "430.00" },
        { id: 2, name: "Cozy Apartment", size: "55m²", rooms: 2, location: "Prishtine", price: "300.00" },
        { id: 3, name: "Luxury Condo ", size: "85m²", rooms: 4, location: "Prishtine", price: "600.00" },
        { id: 4, name: "Studio Room ", size: "40m²", rooms: 1, location: "Prishtine", price: "250.00" },
        { id: 5, name: "Family Home ", size: "100m²", rooms: 5, location: "Prishtine", price: "700.00" },
        { id: 6, name: "Penthouse ", size: "120m²", rooms: 4, location: "Prishtine", price: "850.00" },
        { id: 7, name: "Cozy Loft", size: "50m²", rooms: 1, location: "Prishtine", price: "280.00" },
        { id: 8, name: "Spacious Villa", size: "150m²", rooms: 6, location: "Shkup", price: "900.00" },
        { id: 9, name: "Urban Studio", size: "45m²", rooms: 1, location: "Ferizaj", price: "220.00" }
    ]

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
                            <div className="overflow-y-auto w-full h-[470px] flex pb-4 flex-wrap mt-3 gap-5">
                            {PropertyData.map((property, index) => (
                                <PropertyWidget key={index} {...property} isSavedPage={false} />
                          ))}
                            </div>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default HomePage;