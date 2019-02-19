<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <div class="text-xs-center">
          <h2 class="heading-secondary text-uppercase font-weight-bold">Create a Project</h2>
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
            <v-form @submit.prevent="handleCreateProject(project)">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="project.title" prepend-icon="title" label="Title" type="text" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-textarea auto-grow rows="1" v-model="project.description" prepend-icon="description" label="Description" type="text" required></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="project.imageUrl" prepend-icon="image" label="Image Url" type="text" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="project.gitRepository" prepend-icon="laptop" label="Git Repository" type="text"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-combobox
                    v-model="select"
                    :items="items"
                    prepend-icon="category"
                    label="Select or write some categories"
                    multiple
                    chips
                  ></v-combobox>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn color="secondary mb-4" type="submit">Create</v-btn>
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
  name: 'AddProject',
  data() {
    return {
      project: {
        title: '',
        description: '',
        imageUrl: '',
        categories: this.select,
        gitRepository: ''
      },
      select: [],
      items: [
          'Programming',
          'Design',
          'Vue Js',
          'React Js',
          'Python',
          'Javascript'
        ]
    }
  },
  computed: {
    ...mapGetters('authentication', ['getErrorMsg'])
  },
  methods: {
    ...mapActions('projects', ['createProject']),
    handleCreateProject(project) {
      project.categories = this.select;
      this.createProject(project);
    }
  }
}
</script>

<style lang="scss">
.theme--dark.v-chip {
  background-color: #66CCFF!important;
}
</style>
