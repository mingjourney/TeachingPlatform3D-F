import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface MessageState {
  content: string
  type: string
}

const initialState: MessageState = {
  content: '',
  type: 'info'
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<MessageState>) => {
      const { content, type } = action.payload
      state.content = content
      state.type = type
    }
  }
})

export const { showMessage } = messageSlice.actions
export default messageSlice.reducer
