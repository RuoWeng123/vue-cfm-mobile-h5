<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CollapseGroup",
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    value: {},
    defaultOpen: {}
  },
  data() {
    return {
      currentValue: []
    };
  },
  methods: {
    onToggle(data) {
      const index = this.currentValue.indexOf(data);
      this.$emit("open", data);
      if (index === -1) {
        if (this.accordion) this.currentValue = [];
        this.currentValue.push(data);
      } else {
        this.currentValue.splice(index, 1);

        this.$emit("open", -1);
      }
    }
  },
  watch: {
    value() {
      this.currentValue = this.value || [];
      if (this.defaultOpen != {}) {
        this.onToggle(this.defaultOpen);
      }
    }
  }
};
</script>
