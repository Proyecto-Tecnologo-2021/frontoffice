import Dashboard from "views/Dashboard.js";
import UserProfile_original from "views/UserProfile_original.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import UserProfile from "./components/UserProfile";
import ProductGeneral from "./components/Product/ProductGeneral";
import Cart from "./components/Cart/Cart";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/home",
  // },
  // {
  //   path: "/user_original",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile_original,
  //   layout: "/home",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/home",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/home",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/home",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/home",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/home",
  // },
  {
    path: "/general",
    name: "Pedidos General",
    icon: "nc-icon nc-circle-09",
    component: ProductGeneral,
    layout: "/home",
  },
  {
    path: "/user",
    name: "Mi perfil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/home",
  },
  {
    path: "/cart",
    name: "Mi pedido",
    icon: "nc-icon nc-circle-09",
    component: Cart,
    layout: "/home",
  },
];

export default dashboardRoutes;
