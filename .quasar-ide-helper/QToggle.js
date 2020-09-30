
/**
 * Quasar QToggle component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/toggle|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QToggle',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {*} value New model value 
     */      
    '@input': function (value) {},
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {*|Array}
     */
    value: {
    },
    /**
     * Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked
     * @type {*}
     */
    val: {
    },
    /**
     * What model value should be considered as checked/ticked/on?
     * @type {*}
     */
    trueValue: {
    },
    /**
     * What model value should be considered as unchecked/unticked/off?
     * @type {*}
     */
    falseValue: {
    },
    /**
     * Label to display along the component (or use the default slot instead of this prop)
     * @type {String}
     */
    label: {
      type: String,
    },
    /**
     * Label (if any specified) should be displayed on the left side of the component
     * @type {Boolean}
     */
    leftLabel: {
      type: Boolean,
    },
    /**
     * Color name for component from the Quasar Color Palette
     * @type {String}
     */
    color: {
      type: String,
    },
    /**
     * Should the color (if specified any) be kept when the component is unticked/ off?
     * @type {Boolean}
     */
    keepColor: {
      type: Boolean,
    },
    /**
     * Notify the component that the background is a dark color
     * @type {Boolean}
     */
    dark: {
      type: Boolean,
    },
    /**
     * Dense mode; occupies less space
     * @type {Boolean}
     */
    dense: {
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
     * Tabindex HTML attribute value
     * @type {Number|String}
     */
    tabindex: {
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
     * The icon to be used when the toggle is on
     * @type {String}
     */
    checkedIcon: {
      type: String,
    },
    /**
     * The icon to be used when the toggle is off
     * @type {String}
     */
    uncheckedIcon: {
      type: String,
    }
  }
}
