import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import AgentsWidget from "../../../components/widgets/AgentsWidget";
import useCheckRole from "../../../context/checkRole";
import Pagination from "../../../components/ui/Pagniations";
import { useState, useEffect } from "react";
import axiosInstance from "../../../context/axiosInstance";
import { Link } from "react-router-dom"

const Agents = () => {
  useCheckRole(['buyer', 'admin', 'agent'], '/login');

  const [agentsData, setAgentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axiosInstance.get('/buyers'); 
        setAgentsData(res.data);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

    const filteredAgents = agentsData.filter(agent => 
    agent.username.toLowerCase().includes(searchTerm.toLowerCase())
    );


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage)

  return (
    <div className="flex h-lvh">
      <div className="w-full">
        <Topbar showLocationFilter={false} onSearchChange={setSearchTerm} />
        <div className="w-full h-[88%] bg-[#f6f6f6]">
          <div className="w-full flex justify-between py-3 px-10">
            <div className="bg-white flex justify-center gap-2 items-center rounded-2xl p-1 w-[30%]">
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Ratings</option>
                  <option value="350">{"< 350"}</option>
                  <option value="350">{"> 350"}</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Experience</option>
                  <option value="">2</option>
                </select>
              </div>
              <div className="bg-[#f6f6f6] p-2 rounded-2xl">
                <select>
                  <option value="">Reviews</option>
                  <option value="">2</option>
                </select>
              </div>
            </div>
            <Pagination 
                totalItems={filteredAgents.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}/>
          </div>
          <div className="px-10 py-2 w-full">
            <h1 className="text-2xl font-semibold">Top Agents</h1>
            {loading ? (
              <p className="text-gray-500">Loading agents...</p>
            ) : (
              <div className="overflow-y-auto w-full h-[490px] flex flex-wrap mt-3 gap-5">
                {currentAgents.map((agent) => (
                    <Link
                    key={agent.id}
                    to={`/user/agents/${agent.id}`}
                    className="block">
                        <AgentsWidget {...agent} />
                    </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
