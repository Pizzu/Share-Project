<template>
  <v-container mt-5 pt-5>
    <v-layout class="profile-box" column  align-center justify-center pa-4 mb-5>
      <div class="profile_picture-box">
        <img :src="getUser.avatar" class="profile_picture-photo">
      </div>
        <h1 class="white--text display-2">{{getUser.username}}</h1>
        <h1 class="white--text display-1">{{getUser.email}}</h1>
    </v-layout>
     <v-layout row wrap>
    <v-flex sm12 md6 lg4 pr-3 mb-3 v-for="project in getProjects" :key="project._id">
      <v-card>
        <v-img
          class="white--text"
          height="300px"
          :src="project.imageUrl"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="heading-tertiary">{{project.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <v-layout justify-space-between>
            <div>
              <h2 class="heading-tertiary primaryDark--text">{{project.createdBy.username}}</h2>
              <span class="paragraph-text primaryDark--text">{{project.createdBy.email}}</span>
            </div>
            <div>
              <p class="paragraph-text primaryDark--text">{{getProjectDate(project.createdDate)}}</p>
            </div>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" :to="`/projects/${project._id}`">Explore Project</v-btn>
          <v-btn flat color="primary" :to="`/users/${project.createdBy.username}/projects`">User Profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'UserProjects',
  mounted() {
    this.getUserProjects(this.$route.params.username);
  },
  computed: {
    ...mapGetters('projects', ['getProjects', 'getUser'])
  },
  methods: {
    ...mapActions('projects', ['getUserProjects']),
    getProjectDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }
}
</script>

<style lang="scss">
  .profile-box {
    background-image: linear-gradient(to right, #0099CC, #66CCFF);
  }
  .profile_picture-box {
    width: 80px;
    height: 80px;
    margin-bottom: 1.3rem;
  }

  .profile_picture-photo {
    width: 100%;
    height: 100%;
  }
</style>
