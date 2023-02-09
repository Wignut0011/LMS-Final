import RestLocalStorage from '../Model/rest_storage_service.js'
import BracketView from '../View/bracket_view.js'
import Animations from './animations.js'
import Router from "./router.js";

export default class AppController{
  constructor(appViewModel){
    //Set loadContent and hashchange event handler
    $(window).on("loadTab",( e,route)=>{
      this.loadTab(route);
    })

    this.appViewModel = appViewModel;
    this.connect = appViewModel.connect;
    this.router = new Router(window, appViewModel.routes, appViewModel.navId,appViewModel.tabContainerId , appViewModel.tabContentId, appViewModel.navEJS,appViewModel.contentEJS, appViewModel.spinnerId)
    this.animations = new Animations(); //Just init it
  }

  //Loads container
  loadTab(route){
    this.$tabContainer.empty();
    switch (route.type) {
      case 'plain':
        this.router.render().then(()=>this.router.hideSpinner()); //Just render
        break;
      case 'api':
        this.router.render(false).then(()=>{ //Render first
          this.RestLocalStorage = new RestLocalStorage(route.viewModel.bracket.defaultTeamSize, this.apiName, null, route.viewModel.bracket.remaining.tableOptions, this.host);
          this.bracket_view = new BracketView(this.RestLocalStorage, route.viewModel, route.spinner);
          this.bracket_view.Render()
              .then(()=>this.router.hideSpinner());
        })
        break;
    }
  }

  
  //Getters and Setters, basically shorthands
  get teams(){return this.appViewModel.teams;}
  get remaining(){return this.appViewModel.bracket.remaining;}
  get apiName(){return this.connect.apiName}
  get host(){return this.connect.host}
  get $tabContainer(){return $('#'+this.appViewModel.tabContainerId)}
}