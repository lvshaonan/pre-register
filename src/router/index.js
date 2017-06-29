import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import registerUser from '@/components/registerUser/register-user'
import regAgreement from '@/components/registerUser/reg-agreement'
import regPersonal from '@/components/registerUser/reg-personal'
import regCompany from '@/components/registerUser/reg-company'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'registerUser',
      component: registerUser
    },
    {
      path: '/regAgreement',
      name: 'regAgreement',
      component: regAgreement
    },
    {
      path: '/regPersonal',
      name: 'regPersonal',
      component: regPersonal
    },
    {
      path: '/regCompany',
      name: 'regCompany',
      component: regCompany
    }
  ]
})
