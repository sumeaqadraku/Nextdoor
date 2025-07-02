
import FormInput from "../../../components/ui/LabelInput";
import { useState, useEffect } from "react";
import axiosInstance from "../../../context/axiosInstance";
import { Link } from "react-router-dom";


const Ligjeratat = () => {


    const [lecturerName, setLecturerName] = useState("");
    const [deparatament, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [lecturerId, setLecturerId] = useState("");
    const [ligjeruesit, setLigjeruesit] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddLecturer = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/ligjeratat/addLecturers", {
                lecturerName,
                deparatament,
                email
            })

            console.log("Lecturer added successfully:", response.data);  
        } catch (error) {
            console.error("Error adding lecturer:", error);
        }
    }

    const handleAddLecture = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/ligjeratat/createLecture", {
                lectureName,
                lecturerId
            })

            console.log("Lecture added successfully:", response.data);  
        } catch (error) {
            console.error("Error adding lecture:", error);
        }
        
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/ligjeratat/delete/${id}`);
            console.log("Deleted successfully:", response.data);
            setLigjeruesit(ligjeruesit.filter(lecturer => lecturer.id !== id));
        } catch (error) {
            console.error("Error deleting lecturer:", error);
        }
    }

    useEffect(() => {

    axiosInstance.get("/ligjeratat/getLecturers")
      .then(res => setLecturers(res.data))
      .catch(() => setLecturers([]))
      .finally(() => setLoading(false));    

    axiosInstance.get("/ligjeratat/getLecturersWithLectures")
      .then(res => setLigjeruesit(res.data))
      .catch(() => setLigjeruesit([]))
      .finally(() => setLoading(false));
  }, []);

  console.log(ligjeruesit)


    return (
        <div className="p-4">

            <div className="mb-4">
                <form onSubmit={handleAddLecturer}>
                    <h1 className="text-2xl">Shto nje ligjerues</h1>

                    <FormInput label={"Emri Ligjeruesit:"} placeholder={"Shkuraj emrin"} name={"lecturerName"} value={lecturerName} type={"text"} onChange={(e) => setLecturerName(e.target.value)}  />
                    <FormInput label={"Departamenti:"} placeholder={"Enter departament"} name={"deparatament"} value={deparatament} type={"text"} onChange={(e) => setDepartment(e.target.value)}   />
                    <FormInput label={"Email:"} placeholder={"Enter email"} name={"email"} type={"text"} value={email} onChange={(e) => setEmail(e.target.value)}  />

                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Create</button>
                </form>
            </div>
            <hr />
            <div className="mb-4">
                <form onSubmit={handleAddLecture}>
                    <h1 className="text-2xl">SHto nje ligjerate</h1>

                    <FormInput label={"Titulli i Ligjerates:"} placeholder={"Shkuraj titullin"} name={"lectureName"} value={lectureName} type={"text"} onChange={(e) => setLectureName(e.target.value)}  />

                    <label className="block mt-4 mb-2 font-medium">Zgjedh Ligjeruesin:</label>
                    <select
                        value={lecturerId}
                        onChange={(e) => setLecturerId(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    >
                        <option value="">Zgjedh Ligjeruesin</option>
                        {lecturers.map((lecturerr) => (
                        <option key={lecturerr.id} value={lecturerr.id}>
                            {lecturerr.lecturerName}
                        </option>
                        ))}
                    </select>

                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Create
                    </button>

                </form>    
            </div>
            <hr />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">LecturerName</th>
                    <th className="py-2 px-4 border-b">Departamenti</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Lecture</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ligjeruesit.map(lecturer => (
                    <tr key={lecturer.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{lecturer.id}</td>
                        <td className="py-2 px-4 border-b">{lecturer.lecturerName}</td>
                        <td className="py-2 px-4 border-b">{lecturer.deparatament}</td>
                        <td className="py-2 px-4 border-b">{lecturer.email}</td>
                        <td className="py-2 px-4 border-b">{lecturer.lectureName}</td>
                        <td className="py-2 px-4 border-b">
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={() => handleDelete(lecturer.ligjerataId)}
                        >
                            Delete
                        </button>
                        <Link
                            className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            to={`/editLigjeruesi/${lecturer.id}`}
                            onClick={() => console.log("Edit functionality not implemented yet")}
                            >Edit</Link>
                        </td>
                    </tr>
                    ))}
                    {ligjeruesit.length === 0 && (
                    <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-400">
                        No lecturers found.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>  
        </div>
    );
}

export default Ligjeratat;