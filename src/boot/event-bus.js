let appRouter

export function emit (event, args) {
  appRouter.app.$root.$emit(event, args)
}

export default ({ Vue, router }) => {
  appRouter = router
}
