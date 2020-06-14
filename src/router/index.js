import Vue from 'vue'
import VueRouter from 'vue-router'
import Vehicles from '../components/Vehicles'
import saveVehicles from "../components/saveVehicles"
import updateVehicles from "../components/updateVehicles"
import Professions from "../components/Professions"
import saveProfessions from "../components/saveProfessions"
import updateProfessions from "../components/updateProfessions"
import Municipalities from "../components/Municipalities"
import saveMunicipalities from "../components/saveMunicipalities"
import updateMunicipalities from "../components/updateMunicipalities"
import Users from "../components/Users"
import saveUsers from "../components/saveUsers"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Users
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
  {
    path: '/professions/:id',
    name: 'updateProfessions',
    component: updateProfessions
  },
  {
    path: '/municipalities',
    name: 'municipalities',
    component: Municipalities
  },
  {
    path: '/municipalities/new',
    name: 'saveMunicipalities',
    component: saveMunicipalities
  },
  {
    path: '/municipalities/:id',
    name: 'updateMunicipalities',
    component: updateMunicipalities
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/new',
    name: 'saveUsers',
    component: saveUsers
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router