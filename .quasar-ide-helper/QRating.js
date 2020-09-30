
/**
 * Quasar QRating component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/rating|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QRating',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {*} value New model value 
     */      
    '@input': function (value) {},
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {Number}
     */
    value: {
      type: Number,
    },
    /**
     * Number of icons to display
     * @type {Number|String}
     */
    max: {
      type: [Number,String],
    },
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     * @type {String}
     */
    icon: {
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
     * Size in CSS units, including unit name
     * @type {String}
     */
    size: {
      type: String,
    },
    /**
     * When used, disables default behavior of clicking/tapping on icon which represents current model value to reset model to 0
     * @type {Boolean}
     */
    noReset: {
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
    }
  }
}
