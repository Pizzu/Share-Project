<template>
  <section>
    <!-- Dialog -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogForm" persistent max-width="600px">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title>
            <span class="heading-tertiary primaryDark--text">Edit your project</span>
          </v-card-title>

          <!-- Error alert -->
          <v-alert :value="getErrorMsg" type="error">
            {{getErrorMsg}}
          </v-alert>

          <v-card-text>
            <v-container grid-list-md>
              <v-form>
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
            </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogForm = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="handleEditProject(project)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  <!-- Parallax -->
    <v-parallax :src="getProject.imageUrl" height="650">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="heading-primary mb-2 display-xs-3 text-xs-center text-uppercase">{{ getProject.title }}</h1>
          </v-layout>
    </v-parallax>

    <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 v-if="getUser && getUser._id === getProject.createdBy._id">
            <v-btn color="warning" @click="dialogForm=true">Edit Project</v-btn>
            <v-btn flat icon :color="checkLike ? 'secondary' : 'primaryDark'" @click="handleLikeUnlike()">
              <v-icon>favorite</v-icon>
              <span>({{ getProject.likes }})</span>
            </v-btn>
            
            <v-btn color="error" @click="handleDeleteProject()">Delete Project</v-btn>
          </v-flex>
          <v-flex xs12 v-else-if="getUser">
            <v-btn flat icon :color="checkLike ? 'secondary' : 'primaryDark'" @click="handleLikeUnlike()">
              <v-icon>favorite</v-icon>
              <span>({{getProject.likes}})</span>
            </v-btn>
          </v-flex>
        <div style="padding: 3rem;">
          <v-flex xs12 class="my-5">
            <div class="text-xs-center">
              <h2 class="heading-secondary text-uppercase font-weight-bold">Author</h2>
            </div>
          </v-flex>
          <v-flex xs12>
              <v-layout column wrap align-center justify-center>
                <p class="paragraph-text primaryDark--text text-xs-center">{{ getProject.createdBy.username }}</p>
                <p class="paragraph-text primaryDark--text text-xs-center">{{ getProject.createdBy.email }}</p>
              </v-layout>
          </v-flex>
        </div>
        <div style="padding: 3rem;">
          <v-flex xs12 class="my-5">
            <div class="text-xs-center">
              <h2 class="heading-secondary text-uppercase font-weight-bold">Description</h2>
            </div>
          </v-flex>
          <v-flex xs12>
              <v-layout row wrap align-center justify-center>
                <p class="paragraph-text primaryDark--text text-xs-center">{{ getProject.description }}</p>
              </v-layout>
          </v-flex>
        </div>
        <div style="padding: 3rem;">
          <v-flex xs12 class="my-5">
            <div class="text-xs-center">
              <h2 class="heading-secondary text-uppercase font-weight-bold">Categories</h2>
            </div>
          </v-flex>
          <v-flex xs12>
              <v-layout row wrap align-center justify-center>
                <div class="text-xs-center">
                  <v-chip color="secondary" text-color="white" v-for="category in getProject.categories" :key="category">{{category}}</v-chip>
                </div>
              </v-layout>
          </v-flex>
        </div>
        <div style="padding: 3rem;" v-if="getProject.gitRepository">
          <v-flex xs12 class="my-5">
            <div class="text-xs-center">
              <h2 class="heading-secondary text-uppercase font-weight-bold">Git Repository</h2>
            </div>
          </v-flex>
          <v-flex xs12>
              <v-layout row wrap align-center justify-center>
                <div class="text-xs-center">
                 <p class="paragraph-text primaryDark--text text-xs-center">{{ getProject.gitRepository }}</p>
                </div>
              </v-layout>
          </v-flex>
        </div>
     </v-layout>
     <v-layout row wrap my-5>
       <v-flex xs12 mb-5>
              <v-layout row wrap align-center justify-center>
                <div class="text-xs-center">
                 <h2 class="heading-secondary text-uppercase font-weight-bold">Comments</h2>
                </div>
              </v-layout>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-if="getUser">
        <v-card color="accent" dark>
          <v-container px-5 py-5 text-xs-center>
            <v-form @submit.prevent="handleCreateComment(comment)">
              <v-layout row>
                <v-flex xs12>
                  <v-textarea auto-grow rows="1" v-model="comment.messageBody" prepend-icon="comment" label="Comment here..." type="text" required></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn color="secondary mb-4" type="submit">Comment</v-btn>
                </v-flex>
              </v-layout>
          </v-form>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex x12 sm6 offset-sm3 v-else>
        <p class="paragraph-text primaryDark--text text-xs-center">Want to leave a comment? 
          <router-link class="secondary--text" to="/login" tag="a">Login Now</router-link>
        </p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
       <v-list subheader>
          <v-subheader>Comments {{getProject.comments.length}}</v-subheader>
          <v-list-tile avatar v-for="comment in getProject.comments" :key="comment._id">
            <v-list-tile-avatar>
              <img :src="comment.messageUser.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{comment.messageUser.username}} ({{ comment.messageUser.email }})</v-list-tile-title>
              <v-list-tile-sub-title>{{comment.messageBody}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
export default {
  name: 'Project',
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
        ],
      comment: {
        messageBody: ''
      },
      dialogForm: false
    }
  },
  mounted() {
    this.getOneProject(this.$route.params.id);
  },
  computed: {
    ...mapGetters('projects', ['getProject']),
    ...mapGetters('authentication', ['getUser', 'getErrorMsg']),
    checkLike() {
      if (this.getUser.favorites.length > 0) {
        for (let favoriteProject of this.getUser.favorites) {
          if (favoriteProject._id === this.getProject._id) {
            return true;
          }
        }
          return false;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions('projects', ['getOneProject', 'createComment', 'editProject', 'deleteProject', 'likeProject', 'unlikeProject']),
    handleCreateComment(comment) {
      this.createComment({comment, projectId: this.$route.params.id});
    },
    handleEditProject(project) {
      project.categories = this.select;
      this.editProject({project, projectId: this.$route.params.id});
    },
    handleDeleteProject() {
      this.deleteProject(this.$route.params.id);
    },
    handleLikeUnlike() {
      if (this.checkLike) {
        //You already like the project -- unlike
        this.unlikeProject(this.$route.params.id);
      } else {
        //You don't like the project yet -- like
        this.likeProject(this.$route.params.id);
      }
    },
    getProjectDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
  }
}
</script>
