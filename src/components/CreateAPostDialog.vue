<template>
  <TDialog
    :open="openDialog"
    @TDialog:closed="closedDialog"
    @TDialog:submit="submit"
  >
    <span slot="t-dialog-rightBtn-name">{{ $t('post') }}</span>
    <span slot="t-dialog-title" v-if="sharePost">{{ $t('sharePost') }}</span>
    <span slot="t-dialog-title" v-else>{{ $t('createPost') }}</span>
    <q-card slot="t-dialog-content" class="create-post full-height">
      <q-form ref="statusForm">
        <div class="create-post__area">
          <q-select
            square
            outlined
            color="primary"
            use-input
            use-chips
            multiple
            input-debounce="0"
            option-value="id"
            option-label="name"
            v-model="accessLevel"
            :options="filterOptions"
            @filter="filterGroupsFn"
            :label="$t('whoCanSeeThisPost')"
            @add="groupAdd"
            @remove="groupRemove"
            ref="groupSelect"
          />
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="authenticateUser.payload.avatar || 'statics/no-avatar.jpg'">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ authenticateUserFullName() }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-input
            id="postInput"
            class="post-input-wrapper"
            v-model="bodyText"
            filled
            autogrow
            :placeholder="$t('whatsOnMind')"
            input-class="post-input"
            bg-color="white"
            type="textarea"
            ref="statusBody"
            :rules="[val => !!val || $t('contentIsRequired')]"
          />
          <div class="row">
            <q-img
              v-for="(image, index) in imagePreviews"
              :key="index"
              :src="image.src"
              :style="image.style"
            >
              <div
                class="post-input--image-remove"
              >
                <q-chip dense clickable @click="removeImage(index)" style="background: #eee;" text-color="primary" icon="fal fa-times-circle">{{ $t('remove') }}</q-chip>
              </div>
            </q-img>
          </div>
          <div class="row">
            <q-card-section  v-if="sharePost" style="padding: 10px 18px; width: 100%;">
              <q-card style="padding: 20px;">
                <q-item-section>
                  <q-item-label @click="handleSetActiveProfileClick(sharePost.profile)" class="text-primary">{{ $root.fullName(sharePost.profile) }}</q-item-label>
                    <q-item-label
                      style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: normal; color: #525252;"
                      caption>
                      <span>{{ sharePost.role.name }}, {{ sharePost.local.name }}</span>
                    </q-item-label>
                  <q-item-label
                    style="letter-spacing: normal; color: #525252; font-size: 0.68rem;"
                    caption>
                    {{ $moment.utc(sharePost.modifieddate).fromNow() }}
                  </q-item-label>
                </q-item-section>
                <div v-html="sharePost.body" style="margin-top: 10px;"></div>
                <div class="row" style="padding-top: 10px;">
                  <q-img
                    v-for="(image, index) in sharePost.postmedia"
                    :key="index"
                    :src="image.url"
                  >
                  </q-img>
                </div>
              </q-card>
            </q-card-section>
          </div>
        </div>
      </q-form>
      <q-list bordered>
        <q-item clickable v-ripple @click="triggerImageUpload">
          <q-item-section avatar>
            <q-icon color="positive" name="fas fa-file-image" />
          </q-item-section>
          <q-item-section>{{ $t('photo') }}</q-item-section>
        </q-item>
<!--        <q-separator />-->
<!--        <q-item clickable v-ripple>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon color="primary" name="fas fa-camera-alt" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Camera</q-item-section>-->
<!--        </q-item>-->
<!--        <q-separator />-->
<!--        <q-item clickable v-ripple>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon color="warning" name="fas fa-smile" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Emotion</q-item-section>-->
<!--        </q-item>-->
<!--        <q-separator />-->
<!--        <q-item clickable v-ripple>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon color="deep-purple" name="fas fa-poll" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>Poll</q-item-section>-->
<!--        </q-item>-->
      </q-list>
      <input
        type="file"
        id="postFiles"
        ref="postFiles"
        class="post-image--input"
        v-on:change="processMedia()"
      />
    </q-card>
  </TDialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TDialog from './TDialog'

export default {
  name: 'CreateAPostDialog',

  prop: {
    dialog: Boolean
  },

  components: {
    TDialog
  },

  data () {
    return {
      accessLevel: [],
      bodyText: '',
      openDialog: false,
      groupOptions: [],
      filterOptions: null,
      everyoneGroup: null,
      files: [],
      imagePreviews: []
    }
  },

  mounted () {
    setTimeout(() => {
      this.filterGroupsForUser()
    }, 0)
  },

  beforeDestroy () {
    this.$root.$off('OPEN_DIALOG:CREATE_POST')
    this.$root.$off('SAVE_POST')
  },

  computed: {
    ...mapState('user', [
      'authenticateUser'
    ]),

    ...mapState('global', [
      'centre'
    ]),

    ...mapState('post', [
      'sharePost'
    ])
  },

  methods: {
    ...mapGetters('user', [
      'authenticateUserFullName'
    ]),

    triggerImageUpload () {
      setTimeout(() => {
        this.$refs.postFiles.click()
      }, 0)
    },

    processMedia () {
      const self = this
      const { files } = this.$refs.postFiles
      let orientationId
      let iOSversion = this.iOSversion()
      var img, img2, width, height, canvas, ctx

      this.$_.map(files, file => {
        const reader = new FileReader()

        // @see https://github.com/rricard/react-exif-orientation-img/blob/master/src/ExifOrientationImg.js
        window.EXIF.getData(file, function () {
          orientationId = this.exifdata.Orientation
        })

        reader.onloadend = () => {
          var srcEncoded = reader.result

          img = new Image()
          img.src = srcEncoded
          img.onload = () => {
            if (iOSversion > 0 && iOSversion < 13.4) {
              width = img.width
              height = img.height
              canvas = document.createElement('canvas')
              ctx = canvas.getContext('2d')

              canvas.width = width
              canvas.height = height
              if (orientationId > 4 && orientationId < 9) {
                canvas.width = height
                canvas.height = width
              }

              switch (orientationId) {
                case 2:
                  ctx.transform(-1, 0, 0, 1, width, 0)
                  break
                case 3:
                  ctx.transform(-1, 0, 0, -1, width, height)
                  break
                case 4:
                  ctx.transform(1, 0, 0, -1, 0, height)
                  break
                case 5:
                  ctx.transform(0, 1, 1, 0, 0, 0)
                  break
                case 6:
                  ctx.transform(0, 1, -1, 0, height, 0)
                  break
                case 7:
                  ctx.transform(0, -1, -1, 0, height, width)
                  break
                case 8:
                  ctx.transform(0, -1, 1, 0, 0, width)
                  break
                default:
                  break
              }

              ctx.drawImage(img, 0, 0)
              srcEncoded = canvas.toDataURL(img, 'image/jpeg', 0)
            }

            img2 = new Image()
            img2.src = srcEncoded
            img2.onload = () => {
              width = img2.width
              height = img2.height
              canvas = document.createElement('canvas')
              ctx = canvas.getContext('2d')

              canvas.width = width
              canvas.height = height
              var longestEdge = 'width'
              if (canvas.height > canvas.width) {
                longestEdge = 'height'
              }

              var drawWidth = canvas.width
              var drawHeight = canvas.height
              var maxDimension = 1280

              if (longestEdge === 'width' && drawWidth > maxDimension) {
                drawWidth = maxDimension
                drawHeight = (maxDimension / canvas.width) * canvas.height
              } else if (longestEdge === 'height' && drawHeight > maxDimension) {
                drawWidth = (maxDimension / canvas.height) * canvas.width
                drawHeight = maxDimension
              }

              canvas.width = drawWidth
              canvas.height = drawHeight
              ctx.drawImage(img2, 0, 0, canvas.width, canvas.height)
              srcEncoded = canvas.toDataURL(img2, 'image/jpeg', 0)

              self.imagePreviews.push({
                src: srcEncoded
              })
            }
          }
        }

        if (file) {
          reader.readAsDataURL(file)
        }
      })
    },

    removeImage (index) {
      this.imagePreviews.splice(index, 1)
    },

    filterGroupsForUser () {
      this.$root.$on('OPEN_DIALOG:CREATE_POST', this.openDialogCallBack)
      this.everyoneGroup = this.$_.find(this.centre.payload.available_groups, ['name', 'Everyone'])
      this.groupOptions = this.$_.intersectionBy(
        this.centre.payload.available_groups,
        this.authenticateUser.payload.groups,
        'id'
      ) || this.groupOptions
      this.groupOptions.unshift(this.everyoneGroup)
      this.filterOptions = this.groupOptions
      this.accessLevel = [this.everyoneGroup]
    },

    groupAdd (details) {
      setTimeout(() => {
        if (details.value.id === this.everyoneGroup.id) {
          this.$refs.groupSelect.value.splice(0, this.$refs.groupSelect.value.length)
          this.$refs.groupSelect.value.push(this.everyoneGroup)
        } else {
          this.$_.mapKeys(this.$refs.groupSelect.value, (value, key) => {
            if (value.id === this.everyoneGroup.id) {
              this.$refs.groupSelect.removeAtIndex(key)
            }
          })
        }
      }, 0)
    },

    groupRemove (details) {
      setTimeout(() => {
        if (!this.$refs.groupSelect.value.length) {
          this.$refs.groupSelect.value.push(this.everyoneGroup)
        }
      }, 0)
    },

    submit () {
      const self = this
      this.$refs.statusForm.validate().then(success => {
        if (success) {
          if (!this.accessLevel.length) {
            this.accessLevel = [this.$_.find(this.groupOptions, ['name', 'Everyone'])]
          }
          this.$root.$emit('SAVE_POST', {
            profile: this.authenticateUser.payload,
            postType: self.sharePost ? 'share' : 'status',
            postShare: self.sharePost ? self.sharePost.id : 0,
            postGroups: this.accessLevel,
            body: this.bodyText,
            files: this.imagePreviews
          })

          this.bodyText = ''
          this.imagePreviews = []
          this.openDialog = false
        }
      })
    },

    closedDialog () {
      this.bodyText = ''
      this.openDialog = false
    },

    openDialogCallBack () {
      this.openDialog = !this.openDialog
    },

    filterGroupsFn (value, update) {
      update(() => {
        if (value === '') {
          this.filterOptions = this.groupOptions
        } else {
          const needle = value.toLowerCase()

          const groupMatch = this.$root.$_.find(this.groupOptions, function (group) {
            if (group.name.toLowerCase().indexOf(needle) !== -1) {
              return group
            }
          })

          if (groupMatch !== undefined) {
            if (!this.filterOptions.isArray) {
              this.filterOptions = []
              this.filterOptions.push(groupMatch)
            }
          }
        }
      })
    },

    iOSversion () {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <https://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
        var vs = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
        return parseFloat(vs[0] + '.' + vs[1])
      }
      return 0
    }

  }
}
</script>

<style scoped>
.post-image--input {
  position: absolute;
  top: -1000px;
}
.post-input--image-remove {
  top: 4px;
  left: 10px;
  padding: 0;
  display: inline-block;
  background: transparent;
}
</style>
