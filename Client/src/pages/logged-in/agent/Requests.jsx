
import useCheckRole from "../../../context/checkRole";
import RequestsMailPanel from "../../../components/widgets/RequestsTable";

const Request = () => {
    useCheckRole(['buyer', 'admin', 'agent'], '/login');
    return(
        <div className="flex h-lvh bg-gray-100">
            <main className="flex-grow overflow-auto">
                <div className="bg-white px-10 py-2 flex justify-between items-center">
                    <div className="">
                        <h1 className="text-2xl font-medium leading-tight">Appointment Requests</h1>
                        <p className="text-[20px] font-light leading-5">View all appointments requested from clients</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-gray-200 size-10 rounded-full"></div>
                        <h1 className="font-semibold">Erris Binxhija</h1>
                    </div>
                </div>
                <div className="px-10 w-full mt-5 mb-3 flex gap-1">
                    <h1 className="text-xl font-medium">All Requests: </h1>
                    <div className="bg-gray-300 w-7 flex items-center justify-center rounded-full">
                        <h1>2</h1>
                    </div>
                </div>
                <RequestsMailPanel/>
            </main>
        </div>
    );
}

export default Request;