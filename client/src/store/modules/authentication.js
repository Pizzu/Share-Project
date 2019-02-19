import router from '../../router.js';
import Joi from 'joi';

//Joi validation schemas
const signupSchema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required()
});

const state = {
  user: null,
  errorMsg: '',
};

const getters = {
  getUser(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  getErrorMsg(state) {
    return state.errorMsg;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setFavorites(state, favorites) {
    state.user.favorites = favorites;
  },
  setIsLoggedOut(state) {
    state.user = null;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg
  }
};

const actions = {
  async signup({ dispatch }, user) {
    const result = Joi.validate(user, signupSchema);
    if (result.error === null) {
      const fetchResponse = await fetch('https://server-xfpxpfvyga.now.sh/auth/signup', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      });
      const fetchResult = await fetchResponse.json();
      if (fetchResult.message) {
        dispatch('changeErrorMessage', fetchResult.message);
      } else {
        localStorage.token = fetchResult.token;
        router.go();
        router.push('/projects');
      }
    } else {
      dispatch('changeErrorMessage', result.error.message);
    }
  },
  async login({ dispatch }, user) {
    const result = Joi.validate(user, loginSchema);
    if (result.error === null) {
      const fetchResponse = await fetch('https://server-xfpxpfvyga.now.sh/auth/login', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      });
      const fetchResult = await fetchResponse.json();
      if (fetchResult.message) {
        dispatch('changeErrorMessage', fetchResult.message);
      } else {
        localStorage.token = fetchResult.token;
        router.go();
        router.push('/projects');
      }
    } else {
      dispatch('changeErrorMessage', result.error.message);
    }
  },
  async getCurrentUser({commit, dispatch}) {
    const fetchResponse  = await fetch('https://server-xfpxpfvyga.now.sh/auth/me', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          authorization: `${localStorage.token}`,
        }
    });
    const fetchResult = await fetchResponse.json();
    if (fetchResult.message) {
      dispatch('removeToken');
    } else {
      commit('setUser', fetchResult.user);
    }
  },
  changeErrorMessage({ commit }, message) {
    commit('setErrorMsg', message);
    setTimeout(() => {
      commit('setErrorMsg', '');
    }, 3500);
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('setIsLoggedOut');
    router.push('/');
  },
  removeToken({ commit }) {
    localStorage.removeItem('token');
    commit('setIsLoggedOut');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}