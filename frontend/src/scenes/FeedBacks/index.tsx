import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { tasks } from "./data/tasks";

export default function Feedbacks() {
  //! 데이터 받아오기

  return (
    <div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
