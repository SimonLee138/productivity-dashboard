"use server";

import { sql } from "./db";
import { AddCardData, BoardRawData, Card, Column, UpdateCardData } from "./definitions";

export async function getColumns(boardId: string) {
  try {
    const rows = (await sql`
      SELECT id, title, theme_color AS "themeColor", column_color AS "columnColor", position
      FROM columns
      WHERE board_id = ${boardId}
    `) as Column[];
    
    return rows;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw new Error("Failed to fetch columns");
  }
}

export async function getCards(columnId: string) {
  try {
    const rows = (await sql`
      SELECT *
      FROM cards
      WHERE column_id = ${columnId}
    `) as Card[];

    return rows;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch cards");
  }
}

export async function addCard(data: AddCardData) {
  try {
    const { columnId, title, description, priority, assignee, dueDate, position } = data;
    const rows = await sql`
      INSERT INTO cards (column_id, title, description, priority, assignee, due_date, position)
      VALUES (${columnId}, ${title}, ${description}, ${priority}, ${assignee}, ${dueDate}, ${position})
      RETURNING *
    ` as Card[];

    return rows[0];
  } catch (error) {
    console.error("Error adding card:", error);
    throw new Error("Failed to add card");
  }
}

export async function updateCard(data: UpdateCardData) {
  try {
    const { cardId, title, description, assignee, dueDate } = data;
    const rows = await sql`
      UPDATE cards
      SET title = ${title},
          description = ${description},
          assignee = ${assignee},
          due_date = ${dueDate || null},
          updated_at = NOW()
      WHERE id = ${cardId}
      RETURNING *
    ` as Card[];

    return rows[0];
  } catch (error) {
    console.error("Error updating card:", error);
    throw new Error("Failed to update card");
  }
}

export async function getBoardData(boardId: string) {
  try {
    const rows = (await sql`
      select card.id as card_id, card.title as card_title, description, priority, assignee, due_date, card.position as card_position, 
      col.id as col_id, col.title as col_title, col.position as col_position, theme_color, column_color from cards card
      join columns col on card.column_id = col.id and col.board_id = ${boardId};
    `) as BoardRawData[];

    return rows;
  } catch (error) {
    console.error("Error fetching board data:", error);
    throw new Error("Failed to fetch board data");
  }
}