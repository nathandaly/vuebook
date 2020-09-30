import Vue from 'vue'

/*
 * @param {Boolean} If value is 'false' then directive is disabled, otherwise any other value enables it
 */
Vue.directive('ClosePopup', {})

/*
 * @param {String|Object} Equivalent to Vue Router <router-link> 'to' property
 */
Vue.directive('GoBack', {})

/*
 * @param {Boolean|{stop : Boolean, center : Boolean, color : String}} Boolean (if just wanting to enable/disable) or Object for configuring more options
 */
Vue.directive('Ripple', {})

/*
 * @param {Function} Function to call when scrolling occurs
 */
Vue.directive('Scroll', {})

/*
 * @param {Function} Function to call when scrolling occurs
 */
Vue.directive('Scroll="(verticalscrollposition, horizontalscrollposition) => {}"', {})

/*
 * @param {Function} Function to call when scrolling and element comes into the viewport
 */
Vue.directive('ScrollFire', {})

/*
 * @param {Function} Function to call when scrolling and element comes into the viewport
 */
Vue.directive('ScrollFire="(el) => {}"', {})

/*
 * @param {Function} Function to call after user has hold touch/click for the specified amount of time
 */
Vue.directive('TouchHold', {})

/*
 * @param {Function} Function to call after user has hold touch/click for the specified amount of time
 */
Vue.directive('TouchHold="(details) => {}"', {})

/*
 * @param {Function} Handler for panning
 */
Vue.directive('TouchPan', {})

/*
 * @param {Function} Handler for panning
 */
Vue.directive('TouchPan="(details) => {}"', {})

/*
 * @param {Function} Handler for touch-repeat
 */
Vue.directive('TouchRepeat', {})

/*
 * @param {Function} Handler for touch-repeat
 */
Vue.directive('TouchRepeat="(details) => {}"', {})

/*
 * @param {Function} Handler for swipe
 */
Vue.directive('TouchSwipe', {})

/*
 * @param {Function} Handler for swipe
 */
Vue.directive('TouchSwipe="(details) => {}"', {})
