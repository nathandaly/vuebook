
/**
 * Quasar QTooltip component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/tooltip|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QTooltip',
  props: {
    /**
     * Emitted when showing/hidden state changes; Is also used by v-model
     * @param {Boolean} value New state (showing/hidden) 
     */      
    '@input': function (value) {},

    /**
     * Emitted after component has triggered show()
     * @param {Object} evt JS event object 
     */      
    '@show': function (evt) {},

    /**
     * Emitted when component triggers show() but before it finishes doing it
     * @param {Object} evt JS event object 
     */      
    '@before-show': function (evt) {},

    /**
     * Emitted after component has triggered hide()
     * @param {Object} evt JS event object 
     */      
    '@hide': function (evt) {},

    /**
     * Emitted when component triggers hide() but before it finishes doing it
     * @param {Object} evt JS event object 
     */      
    '@before-hide': function (evt) {},
    /**
     * Class definitions to be attributed to the content
     * @type {Array|String|Object}
     */
    contentClass: {
      type: [Array,String,Object],
    },
    /**
     * Style definitions to be attributed to the content
     * @type {Array|String|Object}
     */
    contentStyle: {
      type: [Array,String,Object],
    },
    /**
     * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {Boolean}
     */
    value: {
      type: Boolean,
    },
    /**
     * The maximimum height of the Tooltip; Size in CSS units, including unit name
     * @type {String}
     */
    maxHeight: {
      type: String,
    },
    /**
     * The maximimum width of the Tooltip; Size in CSS units, including unit name
     * @type {String}
     */
    maxWidth: {
      type: String,
    },
    /**
     * One of Quasar's embedded transitions
     * @type {String}
     */
    transitionShow: {
      type: String,
    },
    /**
     * One of Quasar's embedded transitions
     * @type {String}
     */
    transitionHide: {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    anchor: {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="top left" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="top middle" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="top right" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="center left" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="center middle" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="center right" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="bottom left" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="bottom middle" _': {
      type: String,
    },
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'anchor="bottom right" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    self: {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="top left" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="top middle" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="top right" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="center left" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="center middle" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="center right" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="bottom left" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="bottom middle" _': {
      type: String,
    },
    /**
     * Two values setting the Tooltip's own position relative to its target
     * @type {'top left'|'top middle'|'top right'|'center left'|'center middle'|'center right'|'bottom left'|'bottom middle'|'bottom right'}
     */
    'self="bottom right" _': {
      type: String,
    },
    /**
     * An array of two numbers to offset the Tooltip horizontally and vertically in pixels
     * @type {Array}
     */
    offset: {
      type: Array,
    },
    /**
     * Configure a target element to trigger Tooltip toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
     * @type {Boolean|'(CSS selector)'}
     */
    target: {
      type: [Boolean,String],
    },
    /**
     * Configure Tooltip to appear with delay
     * @type {Number}
     */
    delay: {
      type: Number,
    }
  }
}
