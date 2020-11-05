export default {
  inject: {
    FormProvider: {
      default: {}
    }
  },
  computed: {
    $disabled() {
      return this.FormProvider.disabled
    },
    $model () {
      return this.FormProvider.model
    },
    $rules() {
      return this.FormProvider.rules
    }
  }
}
