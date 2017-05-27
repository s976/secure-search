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
/**
 * Created by shimon on 05/12/2016.
 */
var core_1 = require('@angular/core');
var docs_service_1 = require('./docs.service');
var HomeComponent = (function () {
    function HomeComponent(docsService) {
        this.docsService = docsService;
        this.searchUrl = 'api/search';
    }
    HomeComponent.prototype.search = function (key) {
        var _this = this;
        this.docsService.searchDocs(key)
            .then(function (docs) {
            console.log(docs);
            _this.outputResults(docs);
        }, function (error) { });
    };
    HomeComponent.prototype.outputResults = function (results) {
        this.resultDocs = results.docs;
        this.resultMessage = results.message;
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [docs_service_1.DocsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map