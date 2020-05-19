import Vue from 'vue'
import Vuex from 'vuex'
import staticRouter from '@/router/staticRouter'

//Vuex持久化存储之vuex-persist
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

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
      state.user.admin_id = user.admin_id
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

    saveUser ({ commit }, userMess) {
      let user = {
        admin_id: userMess.admin_id,
        name: userMess.user_name,
        'permissions': [
          { name: 'index' },
          { name: 'qrcode' },
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

      // 判断是否是管理员,不是管理员则隐藏管理栏
      if (userMess.type !== 0) {
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
  },

  plugins: [vuexLocal.plugin]
})
