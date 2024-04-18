export const FoldReducer = (
  prevState = {
    isFold: false
  },
  action: any
) => {
  const { type } = action
  switch (type) {
    case 'change_isFold':
      return {
        ...prevState,
        isFold: !prevState.isFold
      }
    default:
      return prevState
  }
}
