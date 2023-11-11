sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("fourtrust.teste20.controller.View1", {
            onInit: function () {
                this.getUserInfo();
            },


            getUserInfo: function () {
                const url = this.getBaseURL() + "/user-api/currentUser";
                var oModel = new JSONModel();
                var mock = {
                    firstname: "Dummy",
                    lastname: "User",
                    email: "dummy.user@com",
                    name: "dummy.user@com",
                    displayName: "Dummy User (dummy.user@com)"
                };

                oModel.loadData(url);
                oModel.dataLoaded()
                    .then(() => {
                        //check if data has been loaded
                        //for local testing, set mock data
                        if (!oModel.getData().email) {
                            oModel.setData(mock);
                        }
                        this.getView().setModel(oModel, "userInfo");
                    })
                    .catch(() => {
                        oModel.setData(mock);
                        this.getView().setModel(oModel, "userInfo");
                    });
            },

            getBaseURL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath;
            }

        });
    });
