import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import AddProject from './views/AddProject.vue';
import Projects from './views/Projects.vue';
import Project from './views/Project.vue';
import UserProjects from './views/UserProjects.vue';
import Favorites from './views/Favorites.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({name:"home"})
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({name:"home"})
      } else {
        next();
      }
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
  },
  {
    path: '/users/:username/projects',
    name: 'userProjects',
    component: UserProjects,
  },
  {
    path: '/projects/new',
    name: 'newProject',
    component: AddProject,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next();
      } else {
        next({name:"home"})
      }
    }
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: Project,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next();
      } else {
        next({name:"home"})
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];