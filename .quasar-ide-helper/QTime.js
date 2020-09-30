
/**
 * Quasar QTime component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/time|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QTime',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {String} value New model value 
     */      
    '@input': function (value) {},
    /**
     * Time of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {String}
     */
    value: {
      type: String,
    },
    /**
     * Display the component in landscape mode
     * @type {Boolean}
     */
    landscape: {
      type: Boolean,
    },
    /**
     * Mask (formatting string) used for parsing and formatting value
     * @type {String}
     */
    mask: {
      type: String,
    },
    /**
     * Locale formatting options
     * @type {{days : Array, daysShort : Array, months : Array, monthsShort : Array}}
     */
    locale: {
      type: Object,
    },
    /**
     * Specify calendar type
     * @type {'gregorian'|'persian'}
     */
    calendar: {
      type: String,
    },
    /**
     * Specify calendar type
     * @type {'gregorian'|'persian'}
     */
    'calendar="gregorian" _': {
      type: String,
    },
    /**
     * Specify calendar type
     * @type {'gregorian'|'persian'}
     */
    'calendar="persian" _': {
      type: String,
    },
    /**
     * Color name for component from the Quasar Color Palette
     * @type {String}
     */
    color: {
      type: String,
    },
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     * @type {String}
     */
    textColor: {
      type: String,
    },
    /**
     * Notify the component that the background is a dark color
     * @type {Boolean}
     */
    dark: {
      type: Boolean,
    },
    /**
     * Put component in readonly mode
     * @type {Boolean}
     */
    readonly: {
      type: Boolean,
    },
    /**
     * Put component in disabled mode
     * @type {Boolean}
     */
    disable: {
      type: Boolean,
    },
    /**
     * Forces 24 hour time display instead of AM/PM system
     * @type {Boolean}
     */
    format24h: {
      type: Boolean,
    },
    /**
     * Optionally configure what time is the user allowed to set; Overriden by 'hour-options', 'minute-options' and 'second-options' if those are set
     * @type {Function}
     */
    options: {
      type: Function,
    },
    /**
     * Optionally configure what hours is the user allowed to set; Overrides 'options' prop if that is also set
     * @type {Array}
     */
    hourOptions: {
      type: Array,
    },
    /**
     * Optionally configure what minutes is the user allowed to set; Overrides 'options' prop if that is also set
     * @type {Array}
     */
    minuteOptions: {
      type: Array,
    },
    /**
     * Optionally configure what seconds is the user allowed to set; Overrides 'options' prop if that is also set
     * @type {Array}
     */
    secondOptions: {
      type: Array,
    },
    /**
     * Allow the time to be set with seconds
     * @type {Boolean}
     */
    withSeconds: {
      type: Boolean,
    },
    /**
     * Display a button that selects the current time
     * @type {Boolean}
     */
    nowBtn: {
      type: Boolean,
    }
  }
}
