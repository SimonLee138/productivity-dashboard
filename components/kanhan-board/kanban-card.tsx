"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react";
import { X } from "lucide-react";
import { updateCard, updateCardPriority } from "@/lib/actions";

export default function KanbanCard({ card, ...props }: any) {
  const [priority, setPriority] = React.useState(card.priority);

  return (
    <Card
      className="mb-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
      {...props}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <h4 className="font-medium leading-tight">{card.title}</h4>
          <Button variant="ghost" size="icon" className="p-0">
            <X />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {card.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {card.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between mt-4 w-full gap-2">
          {card.assignee && (
            <Avatar className="h-7 w-7">
              <AvatarFallback>{card.assignee[0]}</AvatarFallback>
            </Avatar>
          )}
          {card.dueDate && (
            <p className="text-xs text-muted-foreground">
              {new Date(card.dueDate).toLocaleDateString()}
            </p>
          )}
          {priority && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant={priority === "High" ? "destructive" : priority === "Normal" ? "secondary" : "outline"} onClick={(e) => e.stopPropagation()}>{priority}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-45" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={priority} onValueChange={async (newPriority) => {
                    setPriority(newPriority);

                    await updateCardPriority(card.id, newPriority);
                  }}>
                    <DropdownMenuRadioItem value="Urgent">Urgent</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Normal">Normal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Add Personal Priority</DropdownMenuLabel>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </CardFooter>
    </Card>
  );
}