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
 * Created by shimon on 02/06/2017.
 */
var core_1 = require('@angular/core');
var journal_service_1 = require("./journal.service");
var JournalComponent = (function () {
    function JournalComponent(journalService) {
        this.journalService = journalService;
        this.records = [];
        this.limit = 10;
        this.page = 1;
    }
    JournalComponent.prototype.ngOnInit = function () {
        this.getRecords();
    };
    JournalComponent.prototype.getRecords = function () {
        var _this = this;
        this.journalService.getRecords({ limit: this.limit, page: this.page })
            .then(function (records) { return _this.records = records; }, function (error) {
            console.error(error);
            alert('Server error');
        });
    };
    JournalComponent.prototype.deleteRecord = function (record) {
        console.log('delete:');
        console.log(record);
    };
    JournalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'journal',
            templateUrl: 'journal.component.html',
        }), 
        __metadata('design:paramtypes', [journal_service_1.JournalService])
    ], JournalComponent);
    return JournalComponent;
}());
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map