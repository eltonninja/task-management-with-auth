export enum Priority {
    High = 'high',
    Normal = 'normal',
    Low = 'low',
}

export enum TodoStatus {
    Ready = 'ready',
    InProgress = 'in_progress',
    Completed = 'completed',
}

export type TodoInfo = {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: TodoStatus;
}

export type TodoCreatePayload = Omit<TodoInfo, 'id'>;

export type TodoGetAllPayload = {
  start: number;
  end: number;
}

export type TodoDetailPayload = Pick<TodoInfo, 'id'>;

export type TodoUpdatePayload = {
    id: string;
    todo: TodoCreatePayload;
}
