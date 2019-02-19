<template>
  <header>
    <!-- SIDEBAR -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar class="secondary" dark flat>
        <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
        <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Share Projects</router-link>
      </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- side navbar links -->
      <v-list>
        <v-list-tile ripple v-for="item in sidebarItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="primaryDark--text">
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="getUser" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <!-- NAVBAR -->
    <v-toolbar fixed class="primary" dark>
      <v-toolbar-side-icon class="secondary" @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text headline font-weight-medium">
      <router-link to="/" tag="span" style="cursor: pointer">Share Project</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in navbarItems" :key="item.title" :to="item.link">
        <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
      {{ item.title }}
      </v-btn>

      <v-btn flat to="/favorites" v-if="getUser">
          <v-icon class="hidden-sm-only" left>favorite</v-icon>
          Favorites
        </v-btn>
        <v-btn flat v-if="getUser" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    ...mapGetters('authentication', ['getUser']),
    navbarItems() {
      if (this.getUser) {
        return [{ icon: 'chat', title: 'Projects', link: '/projects' }]
      } else {
        return [
        { icon: 'chat', title: 'Projects', link: '/projects' },
        { icon: 'lock_open', title: 'Login', link: '/login' },
        { icon: 'create', title: 'Signup', link: '/signup' },
        ]
      }
    },
    sidebarItems() {
      if (this.getUser) {
        return [
          { icon: 'chat', title: 'Projects', link: '/projects' },
          { icon: 'stars', title: 'New Project', link: '/projects/new' },
          { icon: 'favorite', title: 'Favorites', link: '/favorites' },
        ]
      } else {
        return [
        { icon: 'chat', title: 'Projects', link: '/projects' },
        { icon: 'lock_open', title: 'Login', link: '/login' },
        { icon: 'create', title: 'Signup', link: '/signup' },
      ]
      }
      
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('authentication/logout');
    }
  }
}
</script>
