import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WarehouseType {
    id: number;
    name: string;
    location: string;
}

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: [] as WarehouseType[],
    reducers: {
        setWarehouses(state, action: PayloadAction<WarehouseType[]>) {
            return action.payload;
        },
        addWarehouse(state, action: PayloadAction<WarehouseType>) {
            state.push(action.payload);
        },
        clearWarehouses() {
            return [];
        }
    }
});

export const { setWarehouses, addWarehouse, clearWarehouses } = warehouseSlice.actions;
export default warehouseSlice.reducer;
