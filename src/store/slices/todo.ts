import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { APIStatus, Paginated, TodoInfo, TodoDetailPayload, TodoCreatePayload, Range, TodoUpdatePayload } from '@/types';
import * as TodoAPIs from '@/service/todo';
import { DEFAULT_PAGE_SIZE } from '@/config';
import { RootState } from '@/store';

type TodoState = APIStatus & Range & {
  todos: Paginated<TodoInfo>;
  todo: TodoInfo | null;
  createStatus: APIStatus;
  updateStatus: APIStatus;
  deleteStatus: APIStatus;
};
const initialState: TodoState = {
  todos: { start: 0, end: 0, total: 0, data: [] },
  todo: null,
  start: 0,
  end: DEFAULT_PAGE_SIZE,
  error: '',
  loading: false,
  createStatus: { error: '', loading: false },
  updateStatus: { error: '', loading: false },
  deleteStatus: { error: '', loading: false },
};

export const getAllTodos = createAsyncThunk<Paginated<TodoInfo>, Range | undefined>(
  'todos/getAll',
  async (range, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let result = state.todo.todos;

    try {
      result = await TodoAPIs.getAllTodos(range ?? { start: state.todo.start, end: state.todo.end });
    } catch (e) {
      thunkAPI.rejectWithValue(JSON.stringify(e));
    }

    return result;
  }
);

export const getDetail = createAsyncThunk<TodoInfo, TodoDetailPayload>('/todos/getDetail', TodoAPIs.getTodo);

export const createTodo = createAsyncThunk<TodoInfo, TodoCreatePayload>('todos/create', TodoAPIs.createTodo);

export const deleteTodo = createAsyncThunk<void, TodoDetailPayload>('todos/delete', TodoAPIs.deleteTodo);

export const updateTodo = createAsyncThunk<TodoInfo, TodoUpdatePayload>('todos/update', TodoAPIs.updateTodo);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearTodo: (state, _: PayloadAction<void>) => {
      state.todo = null;
    },
    setRange: (state, action: PayloadAction<Range>) => {
      const { payload } = action;
      state.start = payload.start;
      state.end = payload.end;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoState>) => {
    builder.addCase(getAllTodos.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getAllTodos.fulfilled, (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    });
    builder.addCase(getAllTodos.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = JSON.stringify(payload);
    });

    builder.addCase(getDetail.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getDetail.fulfilled, (state, { payload }) => {
      state.todo = payload;
      state.loading = false;
    });
    builder.addCase(getDetail.rejected, (state, { payload }) => {
      state.todo = null;
      state.loading = false;
      state.error = JSON.stringify(payload);
    });

    builder.addCase(createTodo.pending, (state) => {
      state.createStatus.loading = true;
      state.createStatus.error = '';
    });
    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.todo = payload;
      state.createStatus.loading = false;
    });
    builder.addCase(createTodo.rejected, (state, { payload }) => {
      state.createStatus.loading = false;
      state.createStatus.error = JSON.stringify(payload);
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.deleteStatus.loading = true;
      state.deleteStatus.error = '';
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.deleteStatus.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, { payload }) => {
      state.deleteStatus.loading = false;
      state.deleteStatus.error = JSON.stringify(payload);
    });

    builder.addCase(updateTodo.pending, (state) => {
      state.updateStatus.loading = true;
      state.updateStatus.error = '';
    });
    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.todo = payload;
      state.updateStatus.loading = false;
    });
    builder.addCase(updateTodo.rejected, (state, { payload }) => {
      state.updateStatus.loading = false;
      state.updateStatus.error = JSON.stringify(payload);
    });
  }
});

export default todoSlice.reducer;

export const {
  clearTodo, setRange
} = todoSlice.actions
