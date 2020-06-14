import Vue from 'vue'
import VueRouter from 'vue-router'
import Vehicles from '../components/Vehicles'
import saveVehicles from "../components/saveVehicles"
import updateVehicles from "../components/updateVehicles"
import Professions from "../components/Professions"
import saveProfessions from "../components/saveProfessions"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Professions
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: Vehicles
  },
  {
    path: '/vehicles/new',
    name: 'saveVehicles',
    component: saveVehicles
  },
  {
    path: '/vehicles/:id',
    name: 'updateVehicles',
    component: updateVehicles
  },
  {
    path: '/professions',
    name: 'professions',
    component: Professions
  },
  {
    path: '/professions/new',
    name: 'saveProfession',
    component: saveProfessions
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router