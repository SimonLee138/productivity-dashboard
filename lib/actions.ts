"use server";

type AddCardData = {
  columnId: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDate: string;
}

export async function addCard(data: AddCardData) {

}