import Vue from 'vue'
import VueRouter from 'vue-router'
import Vehicles from '../components/Vehicles'
import saveVehicles from "../components/saveVehicles"
import updateVehicles from "../components/updateVehicles"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Vehicles
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router