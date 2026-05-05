import { Badge } from "../ui/badge";
import Column from "./column";

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      cards: [
        { id: "card-1", title: "Task 1", description: "Description for Task 1", priority: "High", assignee: "Alice", dueDate: "2024-06-30" },
        { id: "card-2", title: "Task 2", description: "Description for Task 2", priority: "Low", assignee: "Bob", dueDate: "2024-07-05" },
      ],
      themeColor: "bg-gray-200 text-gray-800",
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      cards: [
        { id: "card-3", title: "Task 3", description: "Description for Task 3", priority: "Medium", assignee: "Charlie", dueDate: "2024-07-01" },
      ],
      themeColor: "bg-blue-200 text-blue-800",
    },
    "column-3": {
      id: "column-3",
      title: "Complete",
      cards: [
        { id: "card-4", title: "Task 4", description: "Description for Task 4", priority: "Low", assignee: "Dave", dueDate: "2024-06-28" },
      ],
      themeColor: "bg-green-200 text-green-800",
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default function KanbanBoard() {
  return (
    <div className="flex flex-col w-screen">
      <h1 className="text-xl font-bold">Kanban Board</h1>
      <div className="flex mx-2 mt-4 gap-2">
          {initialData.columnOrder.map((columnId) => {
            const column = initialData.columns[columnId as keyof typeof initialData.columns];
            return <Column key={column.id} title={column.title} cards={column.cards} themeColor={column.themeColor} />;
          })}
        </div>
    </div>
  )
}