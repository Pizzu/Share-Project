import Joi from 'joi';
import store from '../store';
import router from '../../router';

//Joi validation schemas --- Project Schema
const addProjectSchema = Joi.object().keys({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().trim().min(2).required(),
  imageUrl: Joi.string().uri().trim().required(),
  gitRepository: Joi.string().allow('').uri(),
  categories: Joi.array().items(Joi.string().required())
});

const state = {
  projects: [],
  project: {},
  user: {}
};

const getters = {
  getProjects(state) {
    return state.projects;
  },
  getProject(state) {
    return state.project;
  },
  getUser(state) {
    return state.user;
  },
};

const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  },
  setProject(state, project) {
    state.project = project
  },
  setLikes(state, likes) {
    state.project.likes = likes
  },
  setComment(state, comment) {
    state.project.comments.unshift(comment);
  },
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  async getAllProjects({commit}) {
    const fetchResponse  = await fetch('https://server-xfpxpfvyga.now.sh/api/v1/projects/', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        }
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      store.dispatch('authentication/logout');
    } else {
      commit('setProjects', fetchResult.projects);
    }
  },
  async getUserProjects({commit}, username) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/users/${username}/projects`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        }
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'No user found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/logout');
      }
    } else {
      commit('setProjects', fetchResult.projects);
      commit('setUser', fetchResult.user);
    }
  },
  async getOneProject({ commit }, projectId) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${projectId}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        }
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'No project found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/logout');
      }
    } else {
      commit('setProject', fetchResult.project);
    }
  },
  async createProject(_, project) {
    const result = Joi.validate(project, addProjectSchema);
    if (result.error === null) {
      const fetchResponse = await fetch('https://server-xfpxpfvyga.now.sh/api/v1/projects/', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`
        },
        body: JSON.stringify(project)
      });
      const fetchResult = await fetchResponse.json();
      if (fetchResult.message) {
        if(fetchResult.message === 'Unauthorized') {
          store.dispatch('authentication/logout');
        } else {
          store.dispatch('authentication/changeErrorMessage', fetchResult.message);
        }
      } else {
        router.push({name: 'projects'});
      }
    } else {
      store.dispatch('authentication/changeErrorMessage', result.error.message);
    }
  },
  async editProject(_, payload) {
    const result = Joi.validate(payload.project, addProjectSchema);
    if (result.error === null) {
      const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${payload.projectId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`
        },
        body: JSON.stringify(payload.project)
      });
      const fetchResult = await fetchResponse.json();
      if (fetchResult.message) {
        if (fetchResult.message === 'Unauthorized') {
          store.dispatch('authentication/logout');
        } else if (fetchResult.message === 'No project found.') {
          router.push({name: 'projects'});
        } else {
          store.dispatch('authentication/changeErrorMessage', fetchResult.message);
        }
      } else {
        router.push({name: 'projects'});
      }
    } else {
      store.dispatch('authentication/changeErrorMessage', result.error.message);
    }
  },
  async deleteProject(_, projectId) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${projectId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        authorization: `${localStorage.token}`
      },
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'Unauthorized') {
        store.dispatch('authentication/logout');
      } else if (fetchResult.message === 'No project found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/changeErrorMessage', fetchResult.message);
      }
    } else {
      router.push({name: 'projects'});
    }
  },
  async createComment({commit}, payload) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${payload.projectId}/comments`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`
        },
        body: JSON.stringify(payload.comment)
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'Unauthorized') {
        store.dispatch('authentication/logout');
      } else if (fetchResult.message === 'No project found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/changeErrorMessage', fetchResult.message);
      }
    } else {
      commit('setComment', fetchResult.projectComment);
    }
  },
  async likeProject({commit}, projectId) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${projectId}/like`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`
        }
      });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'Unauthorized') {
        store.dispatch('authentication/logout');
      } else if (fetchResult.message === 'No project found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/changeErrorMessage', fetchResult.message);
      }
    } else {
      store.commit('authentication/setFavorites', fetchResult.favorites);
      commit('setLikes', fetchResult.likes);
    }
  },
  async unlikeProject({commit}, projectId) {
    const fetchResponse  = await fetch(`https://server-xfpxpfvyga.now.sh/api/v1/projects/${projectId}/unlike`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`
        }
      });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      if (fetchResult.message === 'Unauthorized') {
        store.dispatch('authentication/logout');
      } else if (fetchResult.message === 'No project found.') {
        router.push({name: 'projects'});
      } else {
        store.dispatch('authentication/changeErrorMessage', fetchResult.message);
      }
    } else {
      store.commit('authentication/setFavorites', fetchResult.favorites);
      commit('setLikes', fetchResult.likes);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}