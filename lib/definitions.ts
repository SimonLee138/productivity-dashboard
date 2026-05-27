export type Card = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: "Urgent" | "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type Column = {
  id: string;
  boardId: string;
  title: string;
  cards: Card[];
  themeColor: string;
  columnColor: string;
  position: number;
  createdAt: string;
}

export type BoardRawData = {
  card_id: string;
  card_title: string;
  description: string;
  priority: "Urgent" | "Low" | "Medium" | "High";
  assignee: string;
  due_date: string;
  card_position: number;
  col_id: string;
  col_title: string;
  col_position: number;
  theme_color: string;
  column_color: string;
}

export type AddCardData = {
  columnId: string;
  title: string;
  description: string;
  priority: "Urgent" | "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
  position: number;
}

export type UpdateCardData = {
  cardId: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
}