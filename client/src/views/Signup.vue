<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <div class="text-xs-center">
          <h2 class="heading-secondary text-uppercase font-weight-bold">Welcome to share projects!</h2>
        </div>
      </v-flex>
    </v-layout>

    <!-- Error alert -->
    <v-layout row wrap my-5>
      <v-flex x12 sm6 offset-sm3>
        <v-alert :value="getErrorMsg" type="error">
          {{getErrorMsg}}
        </v-alert>
      </v-flex>
    </v-layout>

    <!-- Login Form -->
    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container px-5 py-5>
            <v-form @submit.prevent="handleSignupUser(user)" v-model="valid">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="user.username" :rules="usernameRules" :counter="30" prepend-icon="face" label="Username" type="text" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="user.email" :rules="emailRules" prepend-icon="email" label="Email" type="text" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="user.password" :rules="passwordRules" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn color="secondary mb-4" type="submit">Signup</v-btn>
                  <h3>Already have an account?
                    <router-link class="secondary--text" to="/login" tag="a">Login</router-link>
                  </h3>
                </v-flex>
              </v-layout>
          </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Signup',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      valid: false,
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 30 || 'Username must be more than 2 and less than 30 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ]
    }
  },
  computed: {
    ...mapGetters('authentication', ['getErrorMsg'])
  },
  methods: {
    ...mapActions('authentication', ['signup']),
    handleSignupUser(user) {
      this.signup(user);
    }
  }
}
</script>

<style>

</style>
