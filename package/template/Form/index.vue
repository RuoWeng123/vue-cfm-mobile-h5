<template>
  <Form 
    class="TemplateForm"
    :rules="currentRules"
    :model="currentModel">
    <div
      class="TemplateForm-panel"
      v-for="(panel, index) in currentPanels"
      :key="index">
      <div
        class="TemplateForm-title"
        v-if="panel.title">
        {{ panel.title }}
        <span v-if="panel.required" style="color: red">*</span>
      </div>
      <div class="TemplateForm-body">
        <component
          v-on="column.events"
          v-bind="column.props"
          v-for="(column, key) in panel.columns"
          @input="val => setValue(column, val)"
          class="TemplateForm-row"
          :source="getSource(column)"
          :value="getValue(column)"
          :is="getLayout(column)"
          :key="key"
        />
      </div>
    </div>
    <div
      class="TemplateForm-btn"
      :class="{ 'is-fixed': currentIsFixed }"
      :slot="currentIsFixed ? 'btn' : 'default'">
      <Btn
        @error="showError"
        @confirm="onSubmit"
        validator
        loading>
        提交
      </Btn>
    </div>
  </Form>
</template>

<script>
  import components from './column.js'
  import service from '../../service'
  import Form from "../../components/Form/index.vue"
  import FormModel from '../../model/Form.js'

  export default {
    name: 'TemplateForm',
    components: { Form },
    props: {
      options: {}
    },
    computed: {
      currentConfig() {
        return this.options.config
      },
      currentColumns() {
        return this.options.columns
      },
      currentAdapter() {
        return this.options.adapter
      },
      currentPanels() {
        return this.currentConfig.panels
      },
      currentIsFixed() {
        return this.currentConfig.isFixed
      },
      currentRules () {
        return this.currentConfig.rules
      },
      currentModel () {
        return this.currentAdapter.getValue()
      }
    },
    methods: {
      getLayout({ layout }) {
        return typeof layout === 'string' ? components['Cell' + layout] : layout
      },
      getSource({ source }) {
        const data = source ? this.currentAdapter.getSource(source) : []
        return data || []
      },
      getValue({ field }) {
        return this.currentAdapter.getValue(field)
      },
      setValue({ field }, val) {
        return this.currentAdapter.setValue(field, val)
      },
      onSubmit(e, done) {
        this.currentAdapter.emitEvent(FormModel.Events.submit, this.currentAdapter.getValue(), done)
      },
      showError(message) {
         service.message.error(message)
      }
    },
    watch: {
      currentModel (v) {
          this.$emit('cache',v)
       
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .TemplateForm

    &-panel
      margin-top: 10px

    &-title
      display: flex
      align-items: center
      font-family: PingFangSC-Regular
      font-size: 16px
      line-height: 40px
      color: #999999
      text-align: center

      &:before, &:after
        display: inline-block
        height: 1px
        content: ' '
        flex: 1
        background: #E9E9E9

      &:before
        margin-right: 8px

      &:after
        margin-left: 8px

    &-body
      position: relative
      background: #FFFFFF

      &:after
        content: " "
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: 1px
        z-index: 10
        background: #E9E9E9

      .TemplateForm-row:last-child
        &:before
          display: none

    &-row
      position: relative

      &:before
        content: " "
        position: absolute
        left: 15px
        right: 15px
        bottom: 0
        height: 1px
        background: #E9E9E9

    &-btn
      margin-top: 40px

      &.is-fixed
        margin-top: 0

</style>
