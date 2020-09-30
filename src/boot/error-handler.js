let appRouter
/* eslint-disable */

function globalError (message, source, line, column, error) {
  // Global JavaScript runtime error.
  console.error(message, source, line, column, error)
}

window.onerror = (message, source, line, column, error) => globalError(message, source, line, column, error)

export function appError (humanError, machineError) {
  appRouter.app.$root.$emit('APPLICATION_ERROR', {
    humanMessage: humanError,
    machineMessage: machineError
  })
}

/**
 * Used in every action catch statement to throw an error and return the action payload.
 * @param func
 * @param reason
 * @param customReason
 * @returns {{payload: null, meta: null, loading: boolean, error: boolean}}
 */
export function handleActionBadResponse (func, reason, customReason = null) {
  const commitPayload = {
    loading: false,
    payload: null,
    error: false,
    meta: null
  }

  if (!reason.response) {
    appError(customReason || 'Network Error - cannot connect to the API.', reason)
    commitPayload.error = customReason || 'Network Error - cannot connect to the API.'
  } else {
    const { response } = reason

    if (response && response.data && response.data.error) {
      appError(customReason || `Error in ${func.name}`, response.data.error)
      commitPayload.payload = response.data
      commitPayload.error = response.data.error
    } else {
      appError(customReason || `Error in ${func.name}`, reason)
      commitPayload.error = reason
    }

    if (response.status === 500) {
      appRouter.push('/error500')
    }
  }

  return commitPayload
}

export function isJson (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }

  return true
}

export default ({ Vue, router }) => {
  appRouter = router
  Vue.config.errorHandler = (error, vm, info) => {
    console.error(error, vm, info)
    if (isJson(error.message)) {
      error.message = JSON.parse(error.message)
    }

    const humanMessage = error.message.humanMessage ||
      'A serious application error has occurred. If you continue to see this message please contact support.'
    const machineMessage = error.message.machineMessage ||
      `ErrorHandler Event: Message: ${error.message}`

    router.app.$root.$emit('APPLICATION_ERROR', {
      humanMessage: humanMessage,
      machineMessage: machineMessage
    })
  }
  Vue.errorCaptured = (error, vm, info) => {
    console.error(error, vm, info)
    router.app.$root.$emit('APPLICATION_ERROR', {
      humanMessage: 'A serious application error has occurred. If you continue to see this message please contact support.',
      machineMessage: `ErrorCaptured Event: Message: ${error}`
    })
  }

  Vue.mixin({
    methods: {
      actionErrorHandler (response, action = null) {
        if (!response) {
          console.error('Undefined error or response in action: ' + action)
          return
        }
        if ((response && response.status) && response.status !== 200) {
          console.error(response, action)
        }
        if ((response && response.status) && response.status === 500) {
          const { error } = response.data

          this.$root.$emit('APPLICATION_ERROR', {
            code: error.error_code,
            humanMessage: 'A serious application error has occurred. If you continue to see this message please contact support.',
            machineMessage: error.message
          })
        }
      }
    }
  })
}
/* eslint-enable */
