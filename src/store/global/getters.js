export function getReaction (state) {
  const { payload } = state.settings
  return !payload ? [] : payload.reaction
}
export function getPluginStyles (state) {
  const { payload } = state.settings
  return !payload ? '' : payload.pluginStyles
}
