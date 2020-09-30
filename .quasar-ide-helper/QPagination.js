
/**
 * Quasar QPagination component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/pagination|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QPagination',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {String} value New model value 
     */      
    '@input': function (value) {},
    /**
     * Current page (must be between min/max)
     * @type {Number}
     */
    value: {
      type: Number,
      required: true
    },
    /**
     * Minimum page (must be lower than 'max')
     * @type {Number}
     */
    min: {
      type: Number,
    },
    /**
     * Number of last page (must be higher than 'min')
     * @type {Number}
     */
    max: {
      type: Number,
      required: true
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
     * Button size in CSS units, including unit name
     * @type {String}
     */
    size: {
      type: String,
    },
    /**
     * Put component in disabled mode
     * @type {Boolean}
     */
    disable: {
      type: Boolean,
    },
    /**
     * Use an input instead of buttons
     * @type {Boolean}
     */
    input: {
      type: Boolean,
    },
    /**
     * Show boundary button links
     * @type {Boolean}
     */
    boundaryLinks: {
      type: Boolean,
    },
    /**
     * Always show first and last page buttons (if not using 'input')
     * @type {Boolean}
     */
    boundaryNumbers: {
      type: Boolean,
    },
    /**
     * Show direction buttons
     * @type {Boolean}
     */
    directionLinks: {
      type: Boolean,
    },
    /**
     * Show ellipses (...) when pages are available
     * @type {Boolean}
     */
    ellipses: {
      type: Boolean,
    },
    /**
     * Maximum number of page links to display at a time; 0 means Infinite
     * @type {Number}
     */
    maxPages: {
      type: Number,
    }
  }
}
