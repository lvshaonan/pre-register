import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import welcome from '@/components/welcome'
import successfully from '@/components/successfully'
import regAgreementUser from '@/components/reg-agreement-user'
import regAgreementDriver from '@/components/reg-agreement-driver'

import registerUser from '@/components/registerUser/register-user'
import regPersonal from '@/components/registerUser/reg-personal'
import regCompany from '@/components/registerUser/reg-company'

import regDriver from '@/components/registerDriver/reg-driver'
import regDriverPersonal from '@/components/registerDriver/reg-driver-personal'
import regDriverInfo from '@/components/registerDriver/reg-driver-info'

import regDriverTeam from '@/components/registerDriver/reg-driver-team'
import enterpriseInfo from '@/components/registerDriver/enterprise-info'

import vehicleType from '@/components/registerDriver/vehicle-type'
import productMedia from '@/components/registerDriver/product-media'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/registerUser',
      name: 'registerUser',
      component: registerUser
    },
    {
      path: '/regAgreementUser',
      name: 'regAgreementUser',
      component: regAgreementUser
    },
    {
      path: '/regAgreementDriver',
      name: 'regAgreementDriver',
      component: regAgreementDriver
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
    },
    {
      path: '/regDriver',
      name: 'regDriver',
      component: regDriver
    },
    {
      path: '/regDriverPersonal',
      name: 'regDriverPersonal',
      component: regDriverPersonal
    },
    {
      path: '/regDriverTeam',
      name: 'regDriverTeam',
      component: regDriverTeam
    },
    {
      path: '/regDriverInfo',
      name: 'regDriverInfo',
      component: regDriverInfo
    },
    {
      path: '/enterpriseInfo',
      name: 'enterpriseInfo',
      component: enterpriseInfo
    },
    {
      path: '/successfully',
      name: 'successfully',
      component: successfully
    }
  ]
})
