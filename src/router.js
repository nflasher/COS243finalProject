import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";
import Admin from "./pages/Admin.vue";
import Passenger from "./pages/Passenger.vue";
import addVehicle from "./pages/addVehicle";
import updateVehicle from "./pages/updateVehicle"
import addVehicleType from "./pages/addVehicleType";
import addRide from "./pages/addRide";
import updateRide from "./pages/updateRide";
import authorizeDriver from "./pages/authorizeDriver";
import getReport from "./pages/getReport";
import registerRide from "./pages/registerRide";
import seeRides from "./pages/seeRides";
import Driver from "./pages/Driver";
import registerToDrive from "./pages/registerToDrive";
import signUpPassenger from "./pages/signUpPassenger";
import signUpDriver from "./pages/signUpDriver";




Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "accounts", path: "/accounts", component: Accounts },
    { name: "admin", path: "/admin", component: Admin },
    { name: "passenger", path: "/passenger", component: Passenger },
    { name: "driver", path: "/driver", component: Driver },
    { name: "addVehicle", path: "/admin/addVehicle", component: addVehicle },
    { name: "updateVehicle", path: "/admin/updateVehicle", component: updateVehicle },
    { name: "addVehicleType", path: "/admin/addVehicleType", component: addVehicleType },
    { name: "addRide", path: "/admin/addRide", component: addRide },
    { name: "updateRide", path: "/admin/updateRide", component: updateRide },
    { name: "authorizeDriver", path: "/admin/authorizeDriver", component: authorizeDriver },
    { name: "getReport", path: "/admin/getReport", component: getReport },
    { name: "registerRide", path: "/passenger/registerRide", component: registerRide },
    { name: "seeRides", path: "/passenger/seeRides", component: seeRides },
    { name: "registerToDrive", path: "/driver/registerToDrive", component: registerToDrive },
    { name: "signUpPassenger", path: "/passenger/signUpPassenger", component: signUpPassenger },
    { name: "signUpDriver", path: "/passenger/signUpDriver", component: signUpDriver },



  ]
});
