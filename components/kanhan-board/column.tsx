"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./kanban-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Column({ columnId, title, cards, themeColor, onAddCard }: any) {
  return (
    <div key={title} className="flex flex-col gap-2 min-w-3xs border border-gray-300 rounded-lg p-4">
      <Badge className={`w-max ${themeColor}`}>
        <div className="font-semibold uppercase">{title}</div>
      </Badge>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded-lg min-h-[100px]">
            {cards.map((card: any, index: number) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <KanbanCard card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 justify-start"
        onClick={() => {
          const newCard = {
            id: `card-${Date.now()}`,
            title: "New Task",
            description: "",
            priority: "Low",
            assignee: "",
            dueDate: "",
          };
          onAddCard(columnId, newCard);
        }}
      >
        + Add Card
      </Button>
    </div>
  )
}