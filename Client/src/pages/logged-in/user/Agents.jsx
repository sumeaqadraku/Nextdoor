import Sidebar from "../../../components/Sidebar"
import Topbar from "../../../components/Topbar";
import AgentsWidget from "../../../components/widgets/AgentsWidget";
import useCheckRole from "../../../context/checkRole";


const Agents = () => {
    useCheckRole(['buyer', 'admin', 'agent'], '/login');

    const agentsData = [
        { name: "Erris Binxhija", title: "Agent", rating: 5, phone: "045-522-356", email: "eb5454@gmail.com", properties: 25 },
        { name: "Alba Krasniqi", title: "Senior Agent", rating: 4, phone: "049-334-221", email: "alba.krasniqi@nextdoor.com", properties: 32 },
        { name: "Driton Berisha", title: "Property Consultant", rating: 3, phone: "048-222-889", email: "dritonb@nextdoor.com", properties: 18 },
        { name: "Learta Gashi", title: "Real Estate Expert", rating: 5, phone: "046-111-765", email: "learta.gashi@nextdoor.com", properties: 40 },
        { name: "Arben Morina", title: "Field Agent", rating: 2, phone: "044-101-554", email: "arben.m@nextdoor.com", properties: 9 },
        { name: "Elira Zeqiri", title: "Sales Agent", rating: 4, phone: "043-909-777", email: "elira.z@nextdoor.com", properties: 21 }
      ];
      

    return (
        <div className="flex h-lvh">

            <div className="w-full">
                <Topbar showLocationFilter={false}/>
                <div className="w-full h-[88%] bg-[#f6f6f6]">
                    <div className="w-full flex justify-between py-3 px-10">
                        <div className="bg-white flex justify-center gap-2 items-center rounded-2xl p-1 w-[30%]">
                            <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                <select name="" id="">
                                    <option value="">Ratings</option>
                                    <option value="350">{"< 350"}</option>
                                    <option value="350">{"> 350"}</option>
                                </select>
                                </div>
                                <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                    <select name="" id="">
                                        <option value="">Experience</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                                <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                                    <select name="" id="">
                                        <option value="">Reviews</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                    <div className="px-10 py-2 w-full">
                        <h1 className="text-2xl font-semibold">Top Agents</h1>
                        <div className="overflow-y-auto w-full h-[490px] flex flex-wrap mt-3 gap-5">
                            {agentsData.map((agent, index) => (
                                <AgentsWidget key={index} {...agent} />
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agents;