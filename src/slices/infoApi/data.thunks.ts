
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IPage {
  page?: number;
  value: string;
}

export const getData = createAsyncThunk(
  "slice/infoApi", 
  async ( page: IPage, thunkAPI) => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/v1/search_by_date?query=${page.value}&page=${page.page}&hitsPerPage=8`,
      });
      
      return res;
    } catch (err) {
      return err;
    }
  }
);
