<template>
  <div
    class="trust-pull"
    :style="{ height: wrapperHeight, transform: `translate3d(0, ${diff}px, 0)` }">
    <div
      v-if="topLoadMethod"
      class="trust-pull-action"
      :style="{ height: `${topBlockHeight}px`, marginTop: `${-topBlockHeight}px` }">
      <slot
        name="top-block"
        :state="state"
        :state-text="topText">
        <p class="trust-pull-text">
          <img
            :class="{'is-down': state === 'pull', 'is-up': state === 'trigger'}"
            class="trust-pull-icon"
            :src="stateSrc"
          />
          {{ topText }}
        </p>
      </slot>
    </div>
    <div
      class="trust-pull-scroll"
      ref="scroll">
      <slot/>
    </div>
    <div
      v-if="bottomLoadMethod"
      class="trust-pull-action"
      :style="{ height: `${bottomBlockHeight}px`, marginBottom: `${-bottomBlockHeight}px` }">
      <slot
        name="bottom-block"
        :state="state"
        :state-text="bottomText">
        <p class="trust-pull-text">
          <img
            :class="{'is-down': state === 'trigger', 'is-up': state === 'pull'}"
            class="trust-pull-icon"
            :src="stateSrc"
          />
          {{ bottomText }}
        </p>
      </slot>
    </div>
  </div>
</template>

<script type="text/babel">
  import { throttle } from "../../utils/throttle.js"
  import { PackingEvent } from "../../utils/PackingEvent.js"
  import { delayed } from "../../utils/delayed.js"

  const TOP_DEFAULT_CONFIG = {
    pullText: '下拉刷新',
    triggerText: '释放更新',
    loadingText: '加载中...',
    doneText: '加载完成',
    failText: '加载失败',
    loadedStayTime: 400,
    stayDistance: 50,
    triggerDistance: 70
  }
  const BOTTOM_DEFAULT_CONFIG = {
    pullText: '上拉加载',
    triggerText: '释放更新',
    loadingText: '加载中...',
    doneText: '加载完成',
    failText: '加载失败',
    loadedStayTime: 400,
    stayDistance: 50,
    triggerDistance: 70
  }
  export default {
    name: 'Pull',
    props: {
      name: {
        type: [Object, String, Number]
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      topBlockHeight: {
        type: Number,
        default: 50
      },
      bottomBlockHeight: {
        type: Number,
        default: 50
      },
      wrapperHeight: {
        type: String,
        default: '100%'
      },
      topLoadMethod: {
        type: Function
      },
      bottomLoadMethod: {
        type: Function
      },
      isThrottleTopPull: {
        type: Boolean,
        default: true
      },
      isThrottleBottomPull: {
        type: Boolean,
        default: true
      },
      topConfig: {
        type: Object,
        default: () => {
          return {}
        }
      },
      bottomConfig: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        scrollEl: null,
        startScrollTop: 0,
        distance: 0,
        direction: 0,
        diff: 0,
        beforeDiff: 0,
        topText: '',
        bottomText: '',
        state: '',
        bottomReached: false,
        throttleEmitTopPull: null,
        throttleEmitBottomPull: null
      }
    },
    computed: {
      stateSrc() {
        if (this.state === 'pull' || this.state === 'trigger') {
          return require('./arrow.png')
        } else if (this.state === 'loading') {
          return require('./loading.gif')
        } else if (this.state === 'loaded-done') {
          return require('./success.png')
        } else {
          return require('./error.png')
        }
      },
      _topConfig() {
        return { ...TOP_DEFAULT_CONFIG, ...this.topConfig }
      },
      _bottomConfig() {
        return { ...BOTTOM_DEFAULT_CONFIG, ...this.bottomConfig }
      }
    },
    watch: {
      state(val) {
        if (this.direction === 'down') {
          this.$emit('top-state-change', val)
        } else {
          this.$emit('bottom-state-change', val)
        }
      }
    },
    methods: {
      actionPull() {
        this.state = 'pull'
        this.direction === 'down'
          ? this.topText = this._topConfig.pullText
          : this.bottomText = this._bottomConfig.pullText
      },
       scrollBottom () {
        this.$nextTick(() => {
          const scrollHeight = this.scrollEl.scrollHeight
          this.scrollEl.scrollTop = scrollHeight - this.scrollEl.offsetHeight - 1
        })
      },
      actionTrigger() {
        this.state = 'trigger'
        this.direction === 'down'
          ? this.topText = this._topConfig.triggerText
          : this.bottomText = this._bottomConfig.triggerText
      },
      async actionLoading() {
        if (this.state === 'loading' || this._inLoading) return
        this.state = 'loading'
        this._inLoading = true
        if (this.direction === 'down') {
          this.topText = this._topConfig.loadingText
          this.scrollTo(this._topConfig.stayDistance)
          this.topLoadMethod(this.actionLoaded, this.name)
        } else {
          this.bottomText = this._bottomConfig.loadingText
          this.scrollTo(-this._bottomConfig.stayDistance)
          this.bottomLoadMethod(this.actionLoaded, this.name)
        }
      },
      async actionLoaded(loadState = 'done') {
        this.state = `loaded-${ loadState }`
        let loadedStayTime
        if (this.direction === 'down') {
          this.topText = loadState === 'done'
            ? this._topConfig.doneText
            : this._topConfig.failText
          loadedStayTime = this._topConfig.loadedStayTime
        } else {
          this.bottomText = loadState === 'done'
            ? this._bottomConfig.doneText
            : this._bottomConfig.failText
          loadedStayTime = this._bottomConfig.loadedStayTime
        }
        await delayed(loadedStayTime)
        this.scrollTo(0)
        await delayed(300)
        this.state = ''
        await delayed(200)
        this._inLoading = false
      },
      async scrollTo(y, duration = 200) {
        this.$el.style.transition = `${ duration }ms`
        this.diff = y
        await delayed(200)
        this.$el.style.transition = ''
      },
      checkBottomReached() {
        return this.scrollEl.scrollTop + this.scrollEl.offsetHeight + 1 >= this.scrollEl.scrollHeight
      },
      handleTouchStart() {
        this.beforeDiff = this.diff
        this.startScrollTop = this.scrollEl.scrollTop
        this.bottomReached = this.checkBottomReached()
      },
      handleTouchMove(e) {
        this.distance = e.deltaY / this.distanceIndex + this.beforeDiff
        this.direction = this.distance > 0 ? 'down' : 'up'
        if (this.startScrollTop === 0 && this.direction === 'down') {
          this.diff = this.distance
          this.isThrottleTopPull ? this.throttleEmitTopPull(this.diff) : this.$emit('top-pull', this.diff)
          if (typeof this.topLoadMethod !== 'function') return
          if (this.distance < this._topConfig.triggerDistance &&
            this.state !== 'pull' && this.state !== 'loading') {
            this.actionPull()
          } else if (this.distance >= this._topConfig.triggerDistance &&
            this.state !== 'trigger' && this.state !== 'loading') {
            this.actionTrigger()
          }
        } else if (this.bottomReached && this.direction === 'up') {
          this.diff = this.distance
          this.isThrottleBottomPull ? this.throttleEmitBottomPull(this.diff) : this.$emit('bottom-pull', this.diff)
          if (typeof this.bottomLoadMethod !== 'function') return
          if (Math.abs(this.distance) < this._bottomConfig.triggerDistance &&
            this.state !== 'pull' && this.state !== 'loading') {
            this.actionPull()
          } else if (Math.abs(this.distance) >= this._bottomConfig.triggerDistance &&
            this.state !== 'trigger' && this.state !== 'loading') {
            this.actionTrigger()
          }
        }
      },
      handleTouchEnd() {
        if (this.diff !== 0) {
          if (this.state === 'trigger') {
            this.actionLoading()
            return
          }
          this.scrollTo(0)
        }
      },
      throttleEmit(delay, mustRunDelay = 0, eventName) {
        const throttleMethod = function () {
          const args = [...arguments]
          args.unshift(eventName)
          this.$emit.apply(this, args)
        }
        return throttle(throttleMethod, delay, mustRunDelay)
      },
      init() {
        this.throttleEmitTopPull = this.throttleEmit(200, 300, 'top-pull')
        this.throttleEmitBottomPull = this.throttleEmit(200, 300, 'bottom-pull')
        this.scrollEl = this.$refs.scroll
        this.packingEvent = new PackingEvent({
          el: this.scrollEl,
          prevent: false,
          stop: false,
          direction: PackingEvent.VERTICAL(),
          start: this.handleTouchStart,
          move: this.handleTouchMove,
          end: this.handleTouchEnd
        })
      },
      startPull(direction = 'down') {
        this.direction = direction
        if (direction === 'down' && !this.topLoadMethod) return
        if (direction === 'up' && !this.bottomLoadMethod) return
        this.actionLoading()
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .trust-pull
    flex: 1
    display: flex
    flex-direction: column
    height: 100%

    &-scroll
      flex: 1
      overflow-x: hidden
      overflow-y: auto
      -webkit-overflow-scrolling: touch
      will-change: transform
      contain: layout

      &::-webkit-scrollbar
        display: none

    &-action
      position: relative
      width: 100%

    &-icon
      display: inline-block
      vertical-align: middle
      margin-right: 10px
      width: 24px
      height: 24px
      transition: .2s

      &.is-down
        transform: rotate(-180deg)

      &.is-up
        transform: rotate(0deg)

    &-text
      height: 100%
      line-height: 50px
      text-align: center

</style>
