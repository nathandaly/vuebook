
/**
 * Quasar QFab component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/fab|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QFab',
  props: {
    /**
     * Emitted when fab actions are shown/hidden; Captured by v-model directive
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
     * Controls state of fab actions (showing/hidden); Works best with v-model directive, otherwise use along listening to 'input' event
     * @type {Boolean}
     */
    value: {
      type: Boolean,
    },
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     * @type {String}
     */
    icon: {
      type: String,
    },
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     * @type {String}
     */
    activeIcon: {
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
     * Direction to expand Fab Actions to
     * @type {'up'|'right'|'down'|'left'}
     */
    direction: {
      type: String,
    },
    /**
     * Direction to expand Fab Actions to
     * @type {'up'|'right'|'down'|'left'}
     */
    'direction="up" _': {
      type: String,
    },
    /**
     * Direction to expand Fab Actions to
     * @type {'up'|'right'|'down'|'left'}
     */
    'direction="right" _': {
      type: String,
    },
    /**
     * Direction to expand Fab Actions to
     * @type {'up'|'right'|'down'|'left'}
     */
    'direction="down" _': {
      type: String,
    },
    /**
     * Direction to expand Fab Actions to
     * @type {'up'|'right'|'down'|'left'}
     */
    'direction="left" _': {
      type: String,
    },
    /**
     * By default, Fab Actions are hidden when user navigates to another route and this prop disables this behavior
     * @type {Boolean}
     */
    persistent: {
      type: Boolean,
    },
    /**
     * Define the button HTML DOM type
     * @type {'a'|'submit'|'button'|'reset'}
     */
    type: {
      type: String,
    },
    /**
     * Define the button HTML DOM type
     * @type {'a'|'submit'|'button'|'reset'}
     */
    'type="a" _': {
      type: String,
    },
    /**
     * Define the button HTML DOM type
     * @type {'a'|'submit'|'button'|'reset'}
     */
    'type="submit" _': {
      type: String,
    },
    /**
     * Define the button HTML DOM type
     * @type {'a'|'submit'|'button'|'reset'}
     */
    'type="button" _': {
      type: String,
    },
    /**
     * Define the button HTML DOM type
     * @type {'a'|'submit'|'button'|'reset'}
     */
    'type="reset" _': {
      type: String,
    },
    /**
     * Use 'outline' design for Fab button
     * @type {Boolean}
     */
    outline: {
      type: Boolean,
    },
    /**
     * Use 'push' design for Fab button
     * @type {Boolean}
     */
    push: {
      type: Boolean,
    },
    /**
     * Use 'flat' design for Fab button
     * @type {Boolean}
     */
    flat: {
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
     * Overrides text color (if needed); color name from the Quasar Color Palette
     * @type {String}
     */
    textColor: {
      type: String,
    },
    /**
     * Apply the glossy effect over the button
     * @type {Boolean}
     */
    glossy: {
      type: Boolean,
    }
  }
}
