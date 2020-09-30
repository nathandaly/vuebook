
/**
 * Quasar QPopupEdit component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/popup-edit|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QPopupEdit',
  props: {
    /**
     * Emitted when Popup gets cancelled in order to reset model to its initial value; Is also used by v-model
     * @param {*} value New model value 
     */      
    '@input': function (value) {},

    /**
     * Emitted right after Popup gets shown

     */      
    '@show': function () {},

    /**
     * Emitted right after Popup gets dismissed

     */      
    '@hide': function () {},

    /**
     * Emitted when value has been successfully validated and it should be saved
     * @param {*} value Validated value to be saved 
     * @param {*} initialValue Initial value, before changes 
     */      
    '@save': function (value,initialValue) {},

    /**
     * Emitted when user cancelled the change (hit ESC key or clicking outside of Popup or hit 'Cancel' button)
     * @param {*} value Edited value 
     * @param {*} initialValue Initial value, before changes 
     */      
    '@cancel': function (value,initialValue) {},
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     * @type {*}
     */
    value: {
    },
    /**
     * Optional title (unless 'title' slot is used)
     * @type {String}
     */
    title: {
      type: String,
    },
    /**
     * Show Set and Cancel buttons
     * @type {Boolean}
     */
    buttons: {
      type: Boolean,
    },
    /**
     * Override Set button label
     * @type {String}
     */
    labelSet: {
      type: String,
    },
    /**
     * Override Cancel button label
     * @type {String}
     */
    labelCancel: {
      type: String,
    },
    /**
     * Avoid Popup closing by hitting ESC key or by clicking/tapping outside of the Popup
     * @type {Boolean}
     */
    persistent: {
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
     * Class definitions to be attributed to the content
     * @type {String}
     */
    contentClass: {
      type: String,
    },
    /**
     * Style definitions to be attributed to the content
     * @type {Array|String|Object}
     */
    contentStyle: {
      type: [Array,String,Object],
    },
    /**
     * Validates model then triggers 'save' and closes Popup; Returns a Boolean ('true' means valid, 'false' means abort); Syntax: validate(value)
     * @type {Function}
     */
    validate: {
      type: Function,
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
