"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./kanban-card";
import { Badge } from "../ui/badge";


export default function Column({ title, cards }: any) {
  return (
    <DragDropContext onDragEnd={() => { }}>
      <div key={title} className="flex flex-col gap-2 min-w-3xs border border-gray-300 rounded-lg p-4">
        <Badge className="w-max bg-gray-200 text-gray-700">
          <div className="font-semibold uppercase">{title}</div>
        </Badge>
        <Droppable droppableId={`droppable-${title}`}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded min-h-[100px]">
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
      </div>
    </DragDropContext>
  )
}