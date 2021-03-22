// Copyright (c) 2021 Daiyong Kim
'use strict';

import Express from 'express'
import Path from 'path'
const __dirname = Path.resolve();
import HTTP from 'http'
import FileSystem from 'fs-extra'

import Reply from './scripts/Reply.js'

const PORT = 3000;

class Server {
    constructor() {
        this.api = Express();
        this.api.use(Express.json())
            .use(Express.urlencoded({ extended: false }))
            .use(Express.static(Path.join(__dirname, '.')));

        this.api.get('/', ( request, response ) => {        
            response.sendFile('index.html', { title: 'From Demo' });
        });
        this.api.get('/editor', (request, response) => {
            //Get editor pàge
            response.sendFile(Path.join(__dirname, 'editor.html'));
        });
        // get_level_list api
        this.api.post('/api/get_level_list', (request, response) => {


        });
        // get_object_list api
        this.api.post('/api/get_object_list', (request, response) => {
            // FileSystem.readdir(this.fullPath, { withFiletypes: true})
            //         .then( fileNameList =>{} )
            //         .catch( err => {})
        });
        // save api
        this.api.post('/api/save', (request, response) => {

        });
        // load api
        this.api.post('/api/load', (request, response) => {
            // caller : $post('/api/load', { data to load })

            let parameters = request.body;
            // {
            //     "userid": "valid vfs username", // eg pg15student
            //     "name": "filename", // name of entity, no spaces, no extension
            //     "type": "object" | "level", // one of these two key strings
            // }
            let reply = new Reply(1, "Don't use data");

            // open some file, the name is in parameters
            let folder = "./data";
            if(parameters.type == "object")
                folder += "/library";
            FileSystem.readFile(`${parameters.name}.json`, 'utf8')
                    .then(fileData =>{
                        // if data is ok, add to reply
                        reply.payload = fileData;
                    })
                    .catch( err =>{
                        reply.error(1, "No data")
                    });
            
            // if data is ok, add to the reply
            reply.payload = fileData;            

            response.send(reply.ok().reply.serialize());
        });
        
        this.api.post('/api', ( request, response ) => {
            // pull info from request
            //console.log(request);
            let assert = true;
            let params = request.params;
            let query = request.query;
            let data = request.body;   

            // console.log(params)
            // console.log(query)
            // console.log(data)

            // do something
  
            let food = data['fav-food'];
            let bev = data['fav-beverage'];
            let takeOut = data['fav-take-out'];
            // console.log(food);
            // console.log(bev);
            // console.log(takeOut);
            // respond
        });
        
		this.run();

		
	}
	run(){
  
        this.api.set('port', PORT);

        this.listener = HTTP.createServer(this.api);
        this.listener.listen(PORT);

        this.listener.on('listening', event => {

            let addr = this.listener.address();
            let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
            //Conditional  (expr ? val if true : val if fale)
            console.log(`Listening on ${bind}`);
        })		
    }
}

const server = new Server();