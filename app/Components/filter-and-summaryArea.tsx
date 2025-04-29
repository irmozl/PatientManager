import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CurrentViewOption,
  usePatientViewStore,
} from "../Hooks/usePatientViewStore";
import { GenderDropdown } from "./dropdowns/gender-dropdown";
import { FaList,FaTrash } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

function SummaryAndButtonsArea() {
  return (
    <div className="w-full items-center mt-10 flex justify-between px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Patients List</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <IconToggle />
        <GenderDropdown />
      </div>
    </div>
  );
}

function IconToggle() {
  const { currentView, updateCurrentView } = usePatientViewStore();

  const handleToggle = (value: CurrentViewOption) => {
    if (value.trim() === "") {
      return;
    }

    updateCurrentView(value);
  };

  return (
    <ToggleGroup
      type="single"
      value={currentView}
      onValueChange={handleToggle}
      className="flex gap-2"
    >
<ToggleGroupItem value="list">
<FaTrash className="text-gray-500 hover:text-red-500" />
      </ToggleGroupItem>

      <ToggleGroupItem value="list">
        <FaList
          className={`${
            currentView === "list" ? "text-primary" : "text-gray-500"
          }`}
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Toggle grid">
        <IoGrid
          className={`${
            currentView === "grid" ? "text-primary" : "text-gray-500"
          }`}
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default SummaryAndButtonsArea;
