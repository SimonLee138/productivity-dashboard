"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
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
  const [boardData, setBoardData] = useState(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = boardData.columns[source.droppableId as keyof typeof boardData.columns];
    const destinationColumn = boardData.columns[destination.droppableId as keyof typeof boardData.columns];

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = [...sourceColumn.cards];
      const [movedCard] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, movedCard);

      setBoardData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            cards: reorderedCards,
          },
        },
      }));
      return;
    }

    const sourceCards = [...sourceColumn.cards];
    const destinationCards = [...destinationColumn.cards];
    const [movedCard] = sourceCards.splice(source.index, 1);
    destinationCards.splice(destination.index, 0, movedCard);

    setBoardData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          cards: sourceCards,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          cards: destinationCards,
        },
      },
    }));
  };

  const handleAddCard = (columnId: string, card: any) => {
    setBoardData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId as keyof typeof prev.columns],
          cards: [...prev.columns[columnId as keyof typeof prev.columns].cards, card],
        },
      },
    }));
  };

  return (
    <div className="flex flex-col w-screen">
      <h1 className="text-xl font-bold">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex mx-2 mt-4 gap-2">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId as keyof typeof boardData.columns];
            return (
              <Column
                key={column.id}
                columnId={column.id}
                title={column.title}
                cards={column.cards}
                themeColor={column.themeColor}
                onAddCard={handleAddCard}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  )
}