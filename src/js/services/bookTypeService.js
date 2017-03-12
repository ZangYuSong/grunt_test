/**
 * Created by Zang on 2017/3/12.
 */
define(['app'], function (app) {
    app.register.factory('bookTypeService', [
        function () {
            this.bookType = '0';
            return {
                getType: function () {
                    return this._bookType;
                },
                setType: function (bookType) {
                    this._bookType = bookType;
                }
            }
        }
    ]);
    return app;
});