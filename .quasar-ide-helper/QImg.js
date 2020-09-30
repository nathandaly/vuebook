
/**
 * Quasar QImg component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/img|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QImg',
  props: {
    /**
     * Emitted when image has been loaded by the browser
     * @param {String} src URL of image that has been loaded; useful when using 'srcset' and/or 'sizes' 
     */      
    '@load': function (src) {},

    /**
     * Emitted when browser could not load the image
     * @param {Error} src JS Error object 
     */      
    '@error': function (src) {},
    /**
     * Path to image
     * @type {String}
     */
    src: {
      type: String,
    },
    /**
     * Same syntax as <img> srcset attribute.
     * @type {String}
     */
    srcset: {
      type: String,
    },
    /**
     * Same syntax as <img> sizes attribute.
     * @type {String}
     */
    sizes: {
      type: String,
    },
    /**
     * Specifies an alternate text for the image, if the image cannot be displayed
     * @type {String}
     */
    alt: {
      type: String,
    },
    /**
     * While waiting for your image to load, you can use a placeholder image
     * @type {String}
     */
    placeholderSrc: {
      type: String,
    },
    /**
     * Do not use transitions; faster render
     * @type {Boolean}
     */
    basic: {
      type: Boolean,
    },
    /**
     * Make sure that the image getting displayed is fully contained, regardless if additional blank space besides the image is needed on horizontal or vertical
     * @type {Boolean}
     */
    contain: {
      type: Boolean,
    },
    /**
     * Equivalent to CSS background-position property
     * @type {String}
     */
    position: {
      type: String,
    },
    /**
     * Force the component to maintain an aspect ratio
     * @type {String|Number}
     */
    ratio: {
      type: [String,Number],
    },
    /**
     * One of Quasar's embedded transitions
     * @type {String}
     */
    transition: {
      type: String,
    },
    /**
     * Color name for default Spinner (unless using a 'loading' slot)
     * @type {String}
     */
    spinnerColor: {
      type: String,
    },
    /**
     * Size in CSS units, including unit name, for default Spinner (unless using a 'loading' slot)
     * @type {String}
     */
    spinnerSize: {
      type: String,
    }
  }
}
