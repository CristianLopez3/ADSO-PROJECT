import { categoryService } from "@/service/category";
import { Category } from "@/utils/types/Menu";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  isLoading: boolean;
  isError: boolean;
  data: Category[];
}

const initialState: State = {
  isLoading: false,
  isError: false,
  data: []
};

const menuSlicer = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     // * Add the getAllCategories reducer
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  }
})


const getAllCategories = createAsyncThunk("categories/getAllCategories", async () => {
  const response = await categoryService.getCategories();
  return response.data;
})

export { getAllCategories };
export default menuSlicer.reducer;