import Utilities from "../Util/util.js";

export default class Router{
    constructor(window, routes, header, container, content, headerTemplate, contentTemplate, spinner) {
        this.window = window;
        this._routes = routes;
        this.header = header;
        this.container = container
        this.content = content;
        this.headerTemplate = headerTemplate;
        this.contentTemplate = contentTemplate;
        this.spinner = spinner;
        this.prevHash = null;

        this.util = new Utilities();

        //init
        (async ()=>await this.init())()
    }

    async init(){
        //Render Navbar, hidden
        $(this.header).hide();
        let nav = await this.util.getFileContents(this.headerTemplate);
        await this.$header.html(ejs.render(nav, {routes:this._routes}));

        //Done, show navbar
        $(this.header).show();

        //Set hashchange events
        $(window).on("hashchange",(e)=>this.loadHash(e));

        //Load home page
        if (window.location.hash.substr(1) !== this.defaultRoute.id)
            window.location.hash = this.Previous = this.defaultRoute.id;
        else
            $(window).trigger("hashchange")
    }

    loadHash(e){
        //Save previous hash
        if (e.originalEvent)
            this.previous = e.originalEvent.oldURL.split('/').slice(-1)[0].substr(1);

        //Trigger load
        $(window).trigger("loadTab",this.current);
    }

    async render(handleSpinner = true){
        let curr = this.current;
        this.showSpinner();

        //Render wrapper
        let container = await this.util.getFileContents(this.contentTemplate);
        await this.$container.html(ejs.render(container, curr));

        //Render content, no data needed
        let content = await this.util.getFileContents(curr.partial);
        await this.$content.html(ejs.render(content, {}));

        //Change activated tab
        this.$prevTab.removeClass("active");
        this.$activeTab.addClass("active");

        //Remove Spinner
        if(handleSpinner)
            this.hideSpinner();
    }

    //Spinner helper classes
    showSpinner(){
        $(this.spinner).removeClass("spinner-hide");
        $(this.spinner).addClass("spinner-show");
    }
    hideSpinner(){
        $(this.spinner).removeClass("spinner-show");
        $(this.spinner).addClass("spinner-hide");
    }
    //Getters and Setters
    get routes(){return this._routes};
    get defaultRoute(){return this._routes.find((i)=>i.defaultView)};
    get current(){return this.routes.find((i)=>i.id === window.location.hash.substr(1))};
    get previous(){return !this.prevHash ? this.defaultRoute.name : this.prevHash};
    set previous(hash){this.prevHash = this.routes.find((i)=>i.id === hash)};
    get $header(){return $('#'+this.header)};
    get $container(){return $('#'+this.container)};
    get $content(){return $('#'+this.content)}
    get $prevTab(){return $('#'+this.previous.name+'_tab')}
    get $activeTab(){return $('#'+this.current.name+'_tab')}
}