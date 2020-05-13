import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '@/api/user'
import staticRouter from '@/router/staticRouter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      permissions: [],
      accessMenu: []
    },
    source: {
      token: null,
      cancel: null
    }
  },

  mutations: {
    setUser (state, { user }) {
      state.user.name = user.name
      state.user.permissions = user.permissions
      state.user.accessMenu = user.accessMenu
    },
    deleteUser (state) {
      state.user.name = ''
      state.user.permissions = []
      state.user.accessMenu = []
    },
    updateSource (state, { source }) {
      state.source = source
    }
  },

  actions: {
    requestUserInfo ({ commit }) {
      /*  return requestUserInfo().then(user => {
         commit('setUser', { user })
       }) */
      let user = {
        name: 'admin',

        'permissions': [
          { name: 'index' },
          { name: 'pageQrcodeAdd' },
          { name: 'pageQrcodeManage' },
          { name: 'errorDemo403' },
          { name: 'errorDemo404' },
          { name: 'errorDemo500' },
          { name: 'userPassword' },
          { name: 'userPermissions' },
          { name: 'manager' },
          { name: 'about' }
        ]
      }

      const filterUserMenu = function (menus, accessMenu) {
        menus.forEach(function (m) {
          if (m.noMenu) {
            return
          }
          if (m.children) {
            let subMenu = []
            filterUserMenu(m.children, subMenu)
            if (subMenu.length > 0) {
              let _aMenu = Object.assign({}, m)
              _aMenu.children = subMenu
              accessMenu.push(_aMenu)
            }
          } else {
            user.permissions.some(p => p.name === m.name) && accessMenu.push(m)
          }
        })
      }

      let accessMenu = []
      let menus = []
      staticRouter.forEach(r => {
        menus = r.menu ? menus.concat(r.children) : menus
      })

      // 判断是否是管理员
      if (user.name !== 'admin') {
        menus.forEach((item, index) => {
          if (item.name === 'manager') {
            menus.splice(index, 1)
          }
        })
      }

      filterUserMenu(menus, accessMenu)
      user.accessMenu = accessMenu

      commit('setUser', { user })
    }
  }
})
