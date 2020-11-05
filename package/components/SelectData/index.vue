<template>
  <div class="trust-selectData" :class="{ 'is-select': isSelect }">
    <span @click="onSelect">
      <span>{{ currentTitle }}</span>
      <i class="trust-selectData trust-icon icon_select" />
    </span>
    <Select
      v-model="currentValue"
      v-bind="$attrs"
      :title="title"
      :list="list"
      :valueKey="valueKey"
      :label="labelKey"
      :max="max"
      ref="select"
    />
  </div>
</template>

<script>
import Select from "../Select/index.vue";
import _ from "lodash";

export default {
  name: "SelectData",
  components: { Select },
  props: {
    max: {},
    value: {},
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "请选择"
    },
    labelKey: {
      default: "label"
    },
    valueKey: {
      default: "value"
    }
  },
  computed: {
    isSelect() {
      if (this.max === 1) {
        return this.currentValue;
      } else {
        return this.currentValue && this.currentValue.length;
      }
    },
    currentTitle() {
      const getLabel = value => {
        const obj = this.list.find(v => {
          if (this.valueKey) {
            return _.get(v, this.valueKey) === value;
          } else {
            return v === value;
          }
        });
        return obj ? _.get(obj, this.labelKey) : "";
      };

      if (this.max === 1) {
        this.$emit("name", getLabel(this.value));
        return getLabel(this.value) || this.title;
      } else {
        const val = (this.value || []).map(getLabel).filter(v => v);
        let str = val.length ? val.join(",") : this.title;
        if (str.length > 8) {
          str = str.slice(0, 8) + "...";
        }
        return str;
      }
    },
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        if (this.max === 1) {
          let newobj = [];
          if (this.list) {
            this.list.forEach(v => {
              if (v.value == val) {
                newobj.push(v);
              }
            });

            this.$emit("obj", newobj);
          }
        } else {
          let newobj = [];
          if (this.list) {
            this.list.forEach(v => {
              val.forEach(e => {
                if (v.value == e) {
                  newobj.push(v);
                }
              });
            });
            this.$emit("obj", newobj);
          }
        }
      }
    }
  },
  methods: {
    onSelect() {
      this.$refs.select.show();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.trust-selectData
  font-family: PingFangSC-Regular
  font-size: 14px
  color: #A2A2A2

  &.is-select
    color: #4A4A4A

  i
    color: currentColor
</style>
