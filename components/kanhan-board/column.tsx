"use client";

import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./kanban-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addCard, updateCard } from "@/lib/actions";

export default function Column({ columnId, title, cards, themeColor, columnColor, onAddCard, onUpdateCard }: any) {
  cards.sort((a: any, b: any) => a.position - b.position);
  return (
    <div key={title} className={`flex flex-col gap-2 min-w-3xs border border-gray-300 rounded-lg p-4 h-fit ${columnColor}`}>
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
                    <CardDialog
                      card={card}
                      columnId={columnId}
                      onUpdateCard={onUpdateCard}
                    >
                      <DialogTrigger asChild>
                        <KanbanCard card={card} />
                      </DialogTrigger>
                    </CardDialog>
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
        onClick={async () => {
          const newCard = {
            id: `card-${Date.now()}`,
            title: "New Task",
            description: "",
            priority: "Low" as const,
            assignee: "",
            dueDate: new Date().toISOString().split("T")[0],
            position: cards.length > 0 ? cards[cards.length - 1].position + 1 : 0,
            newRecord: true,
          };
          await addCard({
            columnId: columnId,
            title: newCard.title,
            description: newCard.description,
            priority: newCard.priority,
            assignee: newCard.assignee,
            dueDate: newCard.dueDate,
            position: newCard.position,
          });
          onAddCard(columnId, newCard);
        }}
      >
        + Add Card
      </Button>
    </div>
  )
}

function CardDialog({ card, columnId, onUpdateCard, children }: any) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const cardData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      assignee: formData.get("assignee") as string,
      dueDate: formData.get("dueDate") as string,
    };

    if (card.newRecord) {
      await addCard({
        columnId,
        ...cardData,
        priority: card.priority,
        position: card.position,
      });
    } else {
      await updateCard({
        cardId: card.id,
        ...cardData,
      });

      onUpdateCard(columnId, card.id, cardData);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-sm">
        <form action={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor={`title-${card.id}`}>Title</Label>
              <Input id={`title-${card.id}`} name="title" type="text" defaultValue={card.title} />
            </Field>
            <Field>
              <Label htmlFor={`description-${card.id}`}>Description</Label>
              <Input id={`description-${card.id}`} name="description" type="text" defaultValue={card.description} />
            </Field>
            <Field>
              <Label htmlFor={`assignee-${card.id}`}>Assignee</Label>
              <Input id={`assignee-${card.id}`} name="assignee" type="text" defaultValue={card.assignee} />
            </Field>
            <Field>
              <Label htmlFor={`dueDate-${card.id}`}>Due Date</Label>
              <Input id={`dueDate-${card.id}`} name="dueDate" type="date" defaultValue={card.dueDate} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}