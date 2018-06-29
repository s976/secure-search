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
 * Created by shimon on 13/02/2017.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var DocsService = (function () {
    function DocsService(http) {
        this.http = http;
        this.docsUrl = 'api/docs';
        this.searchUrl = 'api/search';
        this.utilsUrl = 'api/utils';
    }
    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    DocsService.prototype.transformResponse = function (serverResponse) {
        var response = serverResponse.json();
        if (response instanceof Array) {
            return response.map(function (doc) {
                doc.uploaded_at = new Date(doc.uploaded_at).toLocaleString();
                return doc;
            });
        }
        else {
            response.uploaded_at = new Date(response.uploaded_at).toLocaleString();
            return response;
        }
    };
    DocsService.prototype.getDocs = function () {
        var _this = this;
        return this.http.get(this.docsUrl)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, function (error) {
            throw error.json();
        });
    };
    DocsService.prototype.updateDoc = function (doc) {
        var _this = this;
        return this.http.post(this.docsUrl + '/' + doc._id, doc)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, //on success
        function (//on success
            error) {
            throw error.json();
        });
    };
    DocsService.prototype.deleteDoc = function (doc) {
        return this.http.delete(this.docsUrl + '/' + doc._id)
            .toPromise()
            .then(function (response) { return response.json(); }, function (error) { throw error.json(); });
    };
    DocsService.prototype.searchDocs = function (key) {
        var _this = this;
        return this.http.get(this.searchUrl + '/' + key)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, function (error) {
            throw error.json();
        });
    };
    DocsService.prototype.searchUtils = function (args) {
        var _this = this;
        return this.http.post(this.utilsUrl, args)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, function (error) {
            throw error.json();
        });
    };
    DocsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocsService);
    return DocsService;
}());
exports.DocsService = DocsService;
//# sourceMappingURL=docs.service.js.map