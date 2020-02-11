<template>
  <div class="input_box">
    <input
      :type="type"
      :placeholder="placeholder"
      class="yk-input"
      :class="[status]"
      :value="value"
      @input="handleInput"
    />
    <span class="tips" v-if="showTips">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },

  // 接收type和placeholder
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  computed: {
    showTips () {
      return this.status === 'error' && this.errMsg
    }
  },
  methods: {
    handleInput (e) {
      const { value } = e.target
      this.$emit('input', value)

      if (!this.rules) {
        return
      }

      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input_box {
  padding-bottom: 20px;
  position: relative;
  .yk-input {
    width: 100%;
    height: 38px;
    background-color: transparent;
    border-bottom: 1px #666 solid;
    font-size: 18px;

    &.error {
      border-color: red;
    }

    &.success {
      border-color: green;
    }
  }
  .tips {
    color: red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
