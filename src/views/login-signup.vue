<template>
  <main class="login-container">
    <section v-if="!this.newUser" class="flex column align-center">
      <form class="login-form" @submit.prevent="doLogin">
        <div class="login-form-body flex column">
          <h1>Welcome back</h1>
          <input autocomplete="username" type="text" class="login-input" name="username" placeholder="Username"
            v-model="loginCred.username" />
          <input autocomplete="password" type="password" class="login-input" name="password" placeholder="Password"
            v-model="loginCred.password" />
          <p>{{ msg }}</p>
          <button type="submit" class="login-btn">Submit</button>
          <div class="login-actions-btns flex ">
            <button type="button" class="actions-btn" @click="toggleForm()">New user</button>
          </div>
        </div>
      </form>
    </section>


    <section v-else class="flex column align-center">
      <form class="login-form" @submit.prevent="doSignup">
        <div class="login-form-body flex column">
          <h1>Sign up</h1>
          <input type="text" class="login-input" name="fullname" placeholder="Full name"
            v-model="signupCred.fullname" />
          <input autocomplete="password" name="password" class="login-input" type="password" placeholder="Password"
            v-model="signupCred.password" />
          <input autocomplete="username" type="text" class="login-input" name="username" placeholder="Username"
            v-model="signupCred.username" />
          <p>{{ msg }}</p>
          <button class="login-btn" type="submit">Sign up</button>
          <div class="login-actions-btns flex">
            <button type="button" class=" actions-btn" @click="toggleForm()">I already have an account</button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'login-signup',
  data() {
    return {
      newUser: false,
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: {
        username: '',
        password: '',
        fullname: '',
        imgUrl: 'https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png',
        wishList: []
      },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    toggleForm() {
      this.newUser = !this.newUser;
      this.msg = "";
    },

    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      console.log('this.signupCred:', this.signupCred)
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    }
  }
}
</script>