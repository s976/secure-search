"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_file_upload_1 = require("ng2-file-upload");
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var users_component_1 = require('./users.component');
var users_service_1 = require("./users.service");
var home_component_1 = require("./home.component");
var manage_docs_component_1 = require('./manage-docs.component');
var journal_component_1 = require('./journal.component');
var docs_service_1 = require("./docs.service");
var journal_service_1 = require("./journal.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_bootstrap_1.Ng2BootstrapModule
            ],
            declarations: [
                app_component_1.AppComponent,
                users_component_1.UsersComponent,
                home_component_1.HomeComponent,
                manage_docs_component_1.ManageDocsComponent,
                journal_component_1.JournalComponent,
                ng2_file_upload_1.FileSelectDirective,
                ng2_file_upload_1.FileDropDirective
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [users_service_1.UsersService, docs_service_1.DocsService, journal_service_1.JournalService],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map