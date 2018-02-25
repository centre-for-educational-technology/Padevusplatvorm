import Vue from 'vue'
import Router from 'vue-router'
import Greeting from '@/components/Greeting'
import Registration from '@/components/RegistrationForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Registration
    }
  ]
})
