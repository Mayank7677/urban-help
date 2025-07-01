import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/api";

// CREATE SERVICE
export const createService = createAsyncThunk(
  "service/create",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const res = await axiosInstance.post("/services/create", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// GET ALL SERVICES
export const getAllServices = createAsyncThunk(
  "service/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/services/get");
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// GET ALL SERVICES OF PROVIDER
export const getAllServicesOfProvider = createAsyncThunk(
  "service/getAllServicesOfProvider",
  async (status, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/services/getProviderServices/${status}`
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// GET ONE SERVICE BY ID
export const getServiceById = createAsyncThunk(
  "service/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/services/getOne/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// GET SERVICE BY CATEGORY
export const getServiceByCategory = createAsyncThunk(
  "service/getByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/services/get/${category}`);
      console.log("-------------------------------------------------");
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// FILTER SERVICES
export const filterServices = createAsyncThunk(
  "service/filter",
  async (filters, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/services/filter-data?${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    servicesByCategory: [],
    servicesOfProvider: [],
    selectedService: null,
    loading: false,
    error: "",
    currentCategory: "", // <-- add this
  },

  reducers: {
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
    clearServicesByCategory: (state) => {
      state.servicesByCategory = [];
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // CREATE SERVICE
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })

      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.loading = false;
      })

      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL SERVICE
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL SERVICES OF PROVIDER
      .addCase(getAllServicesOfProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesOfProvider = action.payload;
      })
      .addCase(getAllServicesOfProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SERVICES BY ID
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SERVICES BY CATEGORY
      .addCase(getServiceByCategory.pending, (state) => {
        state.loading = true;
        state.servicesByCategory = []; // ✅ Clear previous category data
      })
      .addCase(getServiceByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesByCategory = action.payload;
        state.currentCategory = action.meta.arg; // <--- Track which category was fetched
      })
      .addCase(getServiceByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // Ensure servicesByCategory is cleared when not found
        state.servicesByCategory = [];
      })

      // FILTER SERVICES
      .addCase(filterServices.pending, (state) => {
        state.loading = true;
        state.services = []; // optional: clear old list
      })
      .addCase(filterServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(filterServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedService, clearServicesByCategory } =
  serviceSlice.actions;
export default serviceSlice.reducer;
