import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

//Employee_Sheet
const Employee_Sheet = () => import('@/views/Employee_sheet')

// Planning
const Planning = () => import('@/views/planning/Planning')

// PlanningTeam
const Planning_Team = () => import('@/views/planning/Planning_Team')

// Login
const Login = () => import('@/views/pages/Login')

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/pages/login',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'planning',
          name: 'Planning',
          component: Planning
        },
        {
          path: 'planning_team',
          name: 'Planning_Team',
          component: Planning_Team
        },
        {
          path: 'employee_sheet',
          name: 'Employee_sheet',
          component: Employee_Sheet
        },
      ]
    },
    
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.length == 0 && from.path != "/" && to.path != "/pages/login") {
    next('/pages/login');
  }
  else if(to.path == "/logout")
  {
    sessionStorage.clear()
    next('/pages/login')
  }
  else{
    next();
  }
})

export default router;