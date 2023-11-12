export interface ITodoItem {
  id?: string;
  name: string;
  description: string;
  dueDate: Date;
  priority?: ITodoPriority;
  isCompleted: boolean;
}

export interface ITodoPriority {
  name: string;
  color: string;
  order: number;
}

export interface IStorageTodoItemData {
  items: ITodoItem[];
}
