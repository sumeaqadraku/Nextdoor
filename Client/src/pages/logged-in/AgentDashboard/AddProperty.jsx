import Agentbar from "../../../components/AgentBar"
import apartament1 from "../../../assets/images/apartament1.jpg";


const AddProperty = () => {

    const users = [
        {
          id: 1,
          name: "Banese Emshir",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        },
        {
          id: 2,
          name: "Banese Prishtine",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        },
        {
          id: 2,
          name: "Banese Prishtine",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        },
        {
          id: 2,
          name: "Banese Prishtine",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        },
        {
          id: 2,
          name: "Banese Prishtine",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        },
        {
          id: 2,
          name: "Banese Prishtine",
          created: "2022-07-04",
          lastActive: "2024-03-04"
        }
    ];

    return(
        <div className="flex h-lvh">
            <Agentbar/>
            <div className="w-full bg-[#f6f6f6] p-6 overflow-y-auto">
                <div>
                    <h1 className="text-2xl font-semibold">Property management</h1>
                    <p className="text-[19px] text-gray-400 font-semibold">Add and manage your properties here</p>
                </div>
                <div className="mt-5 mb-5 flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <h1 className="text-[22px] font-bold">All Properties</h1>
                        <p className="font-semibold text-gray-400">6</p>
                    </div>
                    <div className="flex w-[50%] gap-3">
                        <input className="bg-[#fff] py-2 px-4 w-[75%] rounded-2x" type="text" placeholder="Search here..." />
                        <button className="bg-[#1275A4] text-white font-semibold py-2 px-2">Add Property</button>
                    </div>
                </div>
                <div className="overflow-x-auto h-110 bg-white p-6 rounded-xl shadow-md">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Actions</th>
                        <th className="py-3 px-4">Updated</th>
                        <th className="py-3 px-4">Created</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-1 px-4 flex items-center gap-3">
                            <img
                            src={apartament1}
                            alt={user.name}
                            className="w-12 h-12 rounded-[5px] object-cover"
                            />
                            <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                        </td>
                        <td className="py-4 px-4">
                            <button className="text-blue-600 border cursor-pointer border-blue-600 px-3 py-2 rounded-full text-xs font-medium mr-2 hover:bg-blue-100 transition">
                            Edit Property
                            </button>
                            <button className="text-red-600 border cursor-pointer border-red-600 px-3 py-2 rounded-full text-xs font-medium hover:bg-red-100 transition">
                            Remove Property
                            </button>
                        </td>
                        <td className="py-4 px-4">{user.lastActive}</td>
                        <td className="py-4 px-4">{user.created}</td>
                        <td className="py-4 px-4 text-right">
                            <button className="text-gray-500 hover:text-gray-700">
                            ⋮
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default AddProperty;