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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by shimon on 02/06/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var JournalService = /** @class */ (function () {
    function JournalService(http) {
        this.http = http;
        this.journalUrl = 'api/journal';
    }
    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    JournalService.prototype.transformResponse = function (serverResponse) {
        var response = serverResponse.json();
        if (response instanceof Array) {
            return response.map(function (record) {
                record.time = new Date(record.time).toLocaleString();
                return record;
            });
        }
        else {
            response.time = new Date(response.time).toLocaleString();
            return response;
        }
    };
    JournalService.prototype.getRecords = function (args) {
        var _this = this;
        return this.http.post(this.journalUrl, args)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, function (error) {
            throw error.json();
        });
    };
    JournalService.prototype.deleteRecord = function (record) {
        return this.http.delete(this.journalUrl + '/' + record._id)
            .toPromise()
            .then(function (response) { return response.json(); }, function (error) { throw error.json(); });
    };
    JournalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], JournalService);
    return JournalService;
}());
exports.JournalService = JournalService;
//# sourceMappingURL=journal.service.js.map