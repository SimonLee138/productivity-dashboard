"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import Column from "./column";
import { getBoardData } from "@/lib/actions";
import * as React from "react";


export default function KanbanBoard() {
  const [boardData, setBoardData] = useState({
    columns: {} as Record<string, any>,
    columnOrder: [] as string[],
  });

  React.useEffect(() => {
    getBoardData("979bc330-23c7-45a6-8ef5-dbb71d52b7bb").then((data) => {
      const columns: Record<string, any> = {};
      data.forEach((item) => {
        if (!columns[item.col_id]) {
          columns[item.col_id] = {
            id: item.col_id,
            title: item.col_title,
            cards: [],
            themeColor: item.theme_color,
            columnColor: item.column_color,
            position: item.col_position,
          };
        }
        columns[item.col_id].cards.push({
          id: item.card_id,
          title: item.card_title,
          description: item.description,
          priority: item.priority,
          assignee: item.assignee,
          dueDate: item.due_date,
          position: item.card_position,
        });
      });

      const columnOrder = Object.values(columns)
        .sort((a: any, b: any) => a.position - b.position)
        .map((column: any) => column.id);

      setBoardData({ columns, columnOrder });
    });
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = boardData.columns[source.droppableId];
    const destinationColumn = boardData.columns[destination.droppableId];

    if (!sourceColumn || !destinationColumn) return;

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
          ...prev.columns[columnId],
          cards: [...prev.columns[columnId].cards, card],
        },
      },
    }));
  };

  const handleUpdateCard = (columnId: string, cardId: string, updates: any) => {
    setBoardData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          cards: prev.columns[columnId].cards.map((card: any) =>
            card.id === cardId ? { ...card, ...updates } : card
          ),
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
            const column = boardData.columns[columnId];
            return (
              <Column
                key={column.id}
                columnId={column.id}
                title={column.title}
                cards={column.cards}
                themeColor={column.themeColor}
                onAddCard={handleAddCard}
                onUpdateCard={handleUpdateCard}
                columnColor={column.columnColor}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  )
}