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
 * Created by shimon on 18/01/2017.
 */
var core_1 = require('@angular/core');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var docs_service_1 = require('./docs.service');
var doc_1 = require("./doc");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var URL = 'api/file';
var ManageDocsComponent = (function () {
    function ManageDocsComponent(docsService) {
        this.docsService = docsService;
        this.docs = [];
        this.editedDoc = new doc_1.Doc();
        this.showEditSuccessMes = false;
        this.showEditErrorMes = false;
        this.errorNewMes = '';
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
    }
    ManageDocsComponent.prototype.ngOnInit = function () {
        this.getDocs();
    };
    ManageDocsComponent.prototype.getDocs = function () {
        var _this = this;
        this.docsService.getDocs()
            .then(function (docs) { return _this.docs = docs; }, function (error) {
            console.error(error);
            alert('Server error');
        });
    };
    ManageDocsComponent.prototype.editDoc = function (doc) {
        this.selectedDoc = doc;
        Object.assign(this.editedDoc, this.selectedDoc);
        this.showEditSuccessMes = false;
        this.showEditErrorMes = false;
        this.errorNewMes = '';
        this.docModal.show();
        console.log(doc);
    };
    ManageDocsComponent.prototype.submitDoc = function () {
        var _this = this;
        this.docsService.updateDoc(this.editedDoc)
            .then(function (response) {
            Object.assign(_this.selectedDoc, response);
            _this.showEditSuccessMes = true;
        }, function (error) {
            console.log('Error from server');
            console.log(error);
            if (error.errMessage) {
                _this.showEditErrorMes = true;
                _this.errorNewMes = error.errMessage;
            }
        });
    };
    ManageDocsComponent.prototype.deleteDoc = function () {
        var _this = this;
        this.docsService.deleteDoc(this.editedDoc)
            .then(function (response) {
            _this.showEditErrorMes = true; //Контейнер ошибки используется для удобства. Никакой ошибки тут нет
            _this.errorNewMes = response.message;
        }, function (error) {
            console.log('Error from server');
            console.log(error);
            if (error.errMessage) {
                _this.showEditErrorMes = true;
                _this.errorNewMes = error.errMessage;
            }
        });
    };
    ManageDocsComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    __decorate([
        core_1.ViewChild('docModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], ManageDocsComponent.prototype, "docModal", void 0);
    ManageDocsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manage-docs',
            templateUrl: 'manage-docs.component.html',
        }), 
        __metadata('design:paramtypes', [docs_service_1.DocsService])
    ], ManageDocsComponent);
    return ManageDocsComponent;
}());
exports.ManageDocsComponent = ManageDocsComponent;
//# sourceMappingURL=manage-docs.component.js.map