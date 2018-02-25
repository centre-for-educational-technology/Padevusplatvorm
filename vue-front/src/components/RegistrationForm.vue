<template>
  <form action="/register" method="post" @submit="checkForm">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="email">Name</label>
      <input type="email" name="email" id="email" v-model="email">
    </p>

    <p>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password">
    </p>

    <p>
      <label for="cpassword">Confirm password</label>
      <input type="cpassword" name="cpassword" id="cpassword" v-model="cpassword">
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
</template>

<script>
export default {
  name: 'registration-form',
  data () {
    return {
      errors: [],
      email: null,
      password: null,
      cpassword: null
    }
  },
  methods: {
    checkForm: function (e) {
      if (this.email && this.password && this.cpassword) return true
      this.errors = []
      if (!this.email) this.errors.push('Email required.')
      if (!this.password) this.errors.push('Password required.')
      if (!this.cpassword) this.errors.push('Confirm password required.')
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
input,
select {
  margin-left: 10px;
}
</style>
