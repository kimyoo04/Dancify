import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { tasks } from "./data/tasks";

export default function Feedbacks() {
  return (
    <div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
