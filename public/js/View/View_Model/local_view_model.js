//Local instance of the team data
import teamViewModel from './team_view_model.js'
import genericViewModel from "./generic_view_model.js";

const routes =[{
  id:"home_content",
  name:"home",
  title: "Home",
  defaultView: true,
  type: 'plain',
  content:true,
  classes:"",
  partial: "js/View/ejs/Partials/home.ejs",
  viewModel: genericViewModel

},{

  id:"teams_content",
  name:"team",
  title: "Teams",
  defaultView: false,
  type: 'api',
  content:true,
  classes:"",
  partial: "js/View/ejs/Partials/teams.ejs",
  spinner:"#teams_spinner",
  viewModel: teamViewModel
},{

  id:"about_content",
  name:"about",
  title: "About",
  defaultView: false,
  type: 'plain',
  content:true,
  classes:"align-items-center text-white",
  partial: "js/View/ejs/Partials/about.ejs",
  viewModel: genericViewModel
},{

  id:"watch_content",
  name:"watch",
  title: "Watch",
  defaultView: false,
  type: 'plain',
  content:false,
  classes:"",
  partial: "js/View/ejs/Partials/watch.ejs",
  viewModel: genericViewModel
}]

const appViewModel = {
  routes: routes,
  navEJS: "js/View/ejs/Partials/nav.ejs",
  contentEJS: "js/View/ejs/Partials/nav_content.ejs",
  navId: "page_header",
  tabContainerId: "page_content",
  tabContentId: "tab_content",
  spinnerId: "#content_spinner",

  connect: {
    host: "localhost:8080",
    apiName:"teams"
}
};
export default appViewModel;