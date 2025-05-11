import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Disaggregation {
  name: string;
  value: number;
}

export interface DataItem {
  id: string;
  title: string;
  period: string;
  location: string;
  value: number;
  status: 'draft' | 'readyForApproval' | 'approved' | 'rejected';
  disaggregations: Disaggregation[];
}

interface DataState {
  items: DataItem[];
  selectedItemIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState_DataItem: DataState = {
  items: [],
  selectedItemIds: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState_DataItem,
  reducers: {
    setItems: (state, action: PayloadAction<DataItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<DataItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<DataItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<DataItem>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    setSelectedItems: (state, action: PayloadAction<string[]>) => {
      state.selectedItemIds = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { setItems, addItem, updateItem, removeItem, setSelectedItems, setLoading, setError } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;

// ------------------------------------------

interface DropdownState {
  periods: { id: string; name: string }[];
  locations: { id: string; name: string }[];
  selectedPeriod: string | null;
  selectedLocation: string | null;
  isDataEntry: boolean;  // Add this new state  
}

// Obsolete One
//interface DisplayDataState {
//  displayData: any | null;
//}

// QUESTION: Does combining all dropdown related states into one slice make sense?
const initialState: DropdownState = {
  periods: [],
  locations: [],
  selectedPeriod: null,
  selectedLocation: null,
  isDataEntry: false,  // Add this new state  
};

//const initialState_DisplayData: DisplayDataState = {
//  displayData: null,
//};

const dropdownSlice = createSlice({
  name: "dropdowns",
  initialState,
  reducers: {
    setPeriods: (state, action: PayloadAction<{ id: string; name: string }[]>) => {
      state.periods = action.payload;
    },
    setLocations: (state, action: PayloadAction<{ id: string; name: string }[]>) => {
      state.locations = action.payload;
    },
    setSelectedPeriod: (state, action: PayloadAction<string>) => {
      state.selectedPeriod = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    clearSelections: (state) => {
      state.selectedPeriod = null;
      state.selectedLocation = null;
    },
    toggleDataEntry: (state) => {
      state.isDataEntry = !state.isDataEntry;
    },
  },
});

/*
const displayDataSlice = createSlice({
  name: "displayData",
  initialState: initialState_DisplayData,
  reducers: {
    setDisplayData: (state, action: PayloadAction<any>) => {
      state.displayData = action.payload;
    },
  },
});
*/

export const { setPeriods, setLocations, setSelectedPeriod, setSelectedLocation, clearSelections, toggleDataEntry } = dropdownSlice.actions;
//export const { setDisplayData } = displayDataSlice.actions;
export const dropdownReducer = dropdownSlice.reducer;

// ------------------

export const store = configureStore({
  reducer: {
    dropdowns: dropdownSlice.reducer,
//    displayData: displayDataSlice.reducer,
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



