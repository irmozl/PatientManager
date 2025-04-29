import { useState } from "react";
import { Diagnosis, Patient } from "@/app/data/patients-data";
import usePatientDataStore from "@/app/Hooks/usePatientDataStore";
//import { nanoid } from "nanoid";
import { useTheme } from "next-themes"

const AddPatient = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [diagnosis, setDiagnosis] = useState<"Hypertension" | "Diabetes" | "Asthma" | "Heart Disease" | "Arthritis" | "Allergies">("Hypertension");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const { addPatient } = usePatientDataStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  setError("");
    
  try {
    const newPatient: Omit<Patient, 'id'> = {
      firstName,
      lastName,
      diagnosis,
      gender,
      appointmentDate: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
    };

    await addPatient(newPatient as Patient);
    setFirstName("");
    setLastName("");
    setDiagnosis("Hypertension");
    setGender("Male");
    onClose();
    window.location.reload();
  } catch {
    setError("Failed to add patient. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme()
  const bgColor = theme === "dark" ? "bg-gray-900 border-b border-gray-700 text-gray-200" : "bg-white border-b text-black "

  return (
    <div className={`fixed inset-0 flex items-center bg-black/50 justify-center z-50`} >
      <div className={`${bgColor} p-6 rounded-lg shadow-lg max-w-sm w-full`}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

<button type="submit" disabled={loading} className=" text-black p-2 rounded font-semibold">
  {loading ? "Adding..." : ""}
</button>
        <h2 className="text-xl mb-4 font-semibold">Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="diagnosis" className="block text-sm font-medium mb-1">Diagnosis</label>
            <select
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value as Diagnosis)}
              className={`${bgColor} w-full p-2  border border-gray-300 rounded`}
              required
            >
              <option value="Hypertension">Hypertension</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Asthma">Asthma</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Arthritis">Arthritis</option>
              <option value="Allergies">Allergies</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
				  className="mr-2"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
				  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 bg-red-400 p-2 rounded font-semibold text-white">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded font-semibold">Add Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;