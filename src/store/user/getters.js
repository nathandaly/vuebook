export function authenticateUserFullName (state) {
  const { firstname, lastname } = state.authenticateUser.payload
  return `${firstname} ${lastname}`
}
