
/**
 * Quasar QOptionGroup component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/option-group|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QOptionGroup',
  props: {
    /**
     * Emitted when component's model changes; Is also used by v-model
     * @param {*} value New model value 
     */      
    '@input': function (value) {},
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {*}
     */
    value: {
    },
    /**
     * Array of objects with value and label props. The binary components will be created according to this array
     * @type {Array}
     */
    options: {
      type: Array,
    },
    /**
     * The type of input component to be used
     * @type {'radio'|'checkbox'|'toggle'}
     */
    type: {
      type: String,
    },
    /**
     * The type of input component to be used
     * @type {'radio'|'checkbox'|'toggle'}
     */
    'type="radio" _': {
      type: String,
    },
    /**
     * The type of input component to be used
     * @type {'radio'|'checkbox'|'toggle'}
     */
    'type="checkbox" _': {
      type: String,
    },
    /**
     * The type of input component to be used
     * @type {'radio'|'checkbox'|'toggle'}
     */
    'type="toggle" _': {
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
     * Should the color (if specified any) be kept when input components are unticked?
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
     * Label (if any specified) should be displayed on the left side of the input components
     * @type {Boolean}
     */
    leftLabel: {
      type: Boolean,
    },
    /**
     * Show input components as inline-block rather than each having their own row
     * @type {Boolean}
     */
    inline: {
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
