// Copyright (c) 2021 Daiyong Kim
'use strict';

export default class Reply {
    constructor(error = 0, errorMsg = "No Error") {
        this.__private__ = {
            name : "",
            bytes : 0,
            payload : {},
            error,
            errorMsg
        }
        // Response expected by client
        // {
        //     "name": "requested entity name",
        //     "payload": "JSONString" // actual data in JSON format 
        //     "bytes": "actual bytes read",
        //     "error": 0
        // }
    }

    set payload( value ) {
        // Data
        let my = this.__private__;
        my.payload = value;  
    }

    ok() {        
        let my = this.__private__;
        my.error = 0; // ok means, Error is false
        my.errorMsg = "No Error"
        return this;       
    }

    error(code = 0, msg = "No Error") {
        let my = this.__private__;
        my.error = code;
        my.errorMsg = msg;
        return this;
    }

    serialize() {
        return JSON.stringify( this.__private__ );
    }
}