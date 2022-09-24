import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    patients:
    [
        {
            title: "Sam",
            secondaryText: "Patient Info Test"
        },
        {
            title: "Hunter",
            secondaryText: "Patient Info"
        },
        {
            title: "Sara",
            secondaryText: "Patient Info"
        },
        {
            title: "Matthew",
            secondaryText: "dying"
        }
    ]
}

const patientsSlice = createSlice({
  name: 'checkupStates',
  initialState,
  reducers: {
    getBooks(state) {
      state.patients = initialState.patients;
    },
  },
})

export const { getBooks } = patientsSlice.actions;
export default patientsSlice;