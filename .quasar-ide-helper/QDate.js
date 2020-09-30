
/**
 * Quasar QDate component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/date|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QDate',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {String} value New model value 
     * @param {'year'|'month'|'day'|'today'|'locale'|'mask'} reason Reason of the user interaction (what was picked) 
     * @param {{year : Number, month : Number, day : Number}} details Object of properties on the new model 
     */      
    '@input': function (value,reason,details) {},
    /**
     * Date of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
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
     * When specified, it overrides the default header title; Makes sense when not in 'minimal' mode
     * @type {String}
     */
    title: {
      type: String,
    },
    /**
     * When specified, it overrides the default header subtitle; Makes sense when not in 'minimal' mode
     * @type {String}
     */
    subtitle: {
      type: String,
    },
    /**
     * Emit model when user browses month and year too
     * @type {Boolean}
     */
    emitImmediately: {
      type: Boolean,
    },
    /**
     * The default year and month to display (in YYYY/MM format) when model is unfilled (undefined or null)
     * @type {String}
     */
    defaultYearMonth: {
      type: String,
    },
    /**
     * The view which will be displayed by default
     * @type {'Calendar'|'Months'|'Years'}
     */
    defaultView: {
      type: String,
    },
    /**
     * The view which will be displayed by default
     * @type {'Calendar'|'Months'|'Years'}
     */
    'defaultView="Calendar" _': {
      type: String,
    },
    /**
     * The view which will be displayed by default
     * @type {'Calendar'|'Months'|'Years'}
     */
    'defaultView="Months" _': {
      type: String,
    },
    /**
     * The view which will be displayed by default
     * @type {'Calendar'|'Months'|'Years'}
     */
    'defaultView="Years" _': {
      type: String,
    },
    /**
     * A list of events to highlight on the calendar; If using a function, it receives the date as a String and must return a Boolean (matches or not)
     * @type {Array|Function}
     */
    events: {
      type: [Array,Function],
    },
    /**
     * Color name (from the Quasar Color Palette); If using a function, it receives the date as a String and must return a String (color for the received date)
     * @type {String|Function}
     */
    eventColor: {
      type: [String,Function],
    },
    /**
     * Optionally configure the days that are selectable; If using a function, it receives the date as a String and must return a Boolean (is date acceptable or not)
     * @type {Array|Function}
     */
    options: {
      type: [Array,Function],
    },
    /**
     * Sets the day of the week that is considered the first day (0 - Sunday, 1 - Monday, ...); This day will show in the left-most column of the calendar
     * @type {String|Number}
     */
    firstDayOfWeek: {
      type: [String,Number],
    },
    /**
     * Display a button that selects the current day
     * @type {Boolean}
     */
    todayBtn: {
      type: Boolean,
    },
    /**
     * Don’t display the header
     * @type {Boolean}
     */
    minimal: {
      type: Boolean,
    }
  }
}
