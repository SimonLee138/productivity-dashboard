// components/KanbanCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function KanbanCard({ card, ...props }: any) {
  return (
    <Card
      className="mb-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium leading-tight">{card.title}</h4>
          {card.priority && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={card.priority === "High" ? "destructive" : card.priority === "Medium" ? "secondary" : "outline"}>{card.priority}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-45">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuItem>Urgent</DropdownMenuItem>
                  <DropdownMenuItem>High</DropdownMenuItem>
                  <DropdownMenuItem>Normal</DropdownMenuItem>
                  <DropdownMenuItem>Low</DropdownMenuItem>
                  <DropdownMenuItem>Clear</DropdownMenuItem>
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
      </CardHeader>

      <CardContent className="pt-0">
        {card.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
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
        </div>
      </CardContent>
    </Card>
  );
}