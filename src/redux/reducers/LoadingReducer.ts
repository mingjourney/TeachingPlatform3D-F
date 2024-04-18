interface LoadingState {
  isLoading: boolean
}

// 定义Action类型
interface LoadingAction {
  type: string
}

// 定义初始状态
const initialState: LoadingState = {
  isLoading: false
}

// 定义Reducer
export const LoadingReducer = (
  prevState: LoadingState = initialState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case 'change_loading':
      return {
        ...prevState,
        isLoading: !prevState.isLoading
      }
    default:
      return prevState
  }
}
