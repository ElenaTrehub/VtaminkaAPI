"use strict";


class Response{

    constructor( code , message , data ){

        this.code = code;
        this.message = message;
        this.data = data;

    }//constructor

}//Response

module.exports = Response;