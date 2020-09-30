
/**
 * Quasar QScrollArea component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/scroll-area|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QScrollArea',
  props: {
    /**
     * Object with CSS properties and values for styling the thumb of custom scrollbar
     * @type {Object}
     */
    thumbStyle: {
      type: Object,
    },
    /**
     * Object with CSS properties and values for styling the container of QScrollArea
     * @type {Object}
     */
    contentStyle: {
      type: Object,
    },
    /**
     * Object with CSS properties and values for styling the container of QScrollArea when scroll area becomes active (is mouse hovered)
     * @type {Object}
     */
    contentActiveStyle: {
      type: Object,
    },
    /**
     * When content changes, the scrollbar appears; this delay defines the amount of time (in milliseconds) before scrollbars dissapear again (if component is not hovered)
     * @type {Number|String}
     */
    delay: {
      type: [Number,String],
    },
    /**
     * Register for horizontal scroll instead of vertical (which is default)
     * @type {Boolean}
     */
    horizontal: {
      type: Boolean,
    }
  }
}
