<template>
  <v-container mt-5 pt-5>
     <v-layout row wrap>
       <v-flex v-if="getUser.favorites.length === 0">
         <p class="paragraph-text primaryDark--text">No favorites yet.</p>
       </v-flex>
      <v-flex sm12 md6 lg4 pr-3 mb-3 v-for="project in getUser.favorites" :key="project._id">
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
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
  name: 'Favorites',
  computed: {
    ...mapGetters('authentication', ['getUser'])
  },
  methods: {
    getProjectDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }
}
</script>
