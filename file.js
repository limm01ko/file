import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, basename, extname } from 'path';
// to use xml
// Dependencies: "fast-xml-parser", "xmlbuilder2"
// Install:
//    npm install fast-xml-parser
//    npm install xmlbuilder2
// import { XMLParser } from "fast-xml-parser";
// import { create } from "xmlbuilder2"; 
export default class File {
    constructor({ filePath }) {
        this.file = filePath;
        this.propretery = {
            path: existsSync(dirname(this.file)) ? dirname(this.file) : false,
            format: extname(this.file).toLocaleLowerCase(),
        };
    }
    write(data, { overwrite= false}= {}) {
        try { // if(typeof data !== 'object') throw new Error('[ ERRO]: the data must be a valid object`);
            if(this.propretery.path) { if(overwrite || !existsSync(this.file)) { let output;
                    switch(this.propretery.format) {// Formats [ ! ]
                        case '.json': output= JSON.stringify(data, null, 2); break;
                        // case '.xml': output= create(data).end({ prettyPrint: true }); break;
                        case '.txt': output= data; break;
                         // Adicione novos formatos aqui: 
                        default: output= null; };
                    if(!output) { throw new Error(`[ ERRO]: Format ${this.propretery.format} is undefined`); }else
                        { writeFileSync(this.file, output, 'utf-8'); return 'File saved successfully'; };
                }else { throw new Error(`[ ERRO]: File ${basename(this.file)} already exists`) };
            }else { throw new Error(`[ ERRO ]: Path ${this.propretery.path} does not exist`); };
        } catch(err) { throw new Error(`[ Error writing the file ]: ${err.message}`); };
    }
    read() {
        if(!existsSync(this.file)) { throw new Error(`[ ERRO]: File ${basename(this.file)} does not exist`); };
        const content = readFileSync(this.file, 'utf-8'); let data;
        switch (this.propretery.format) {// Formats [ ! ]
            case '.json': data= JSON.parse(content); break;
            // case '.xml': data= new XMLParser().parse(content); break;
            case '.txt': data= content; break;
            // Adicione novos formatos aqui:
            // case '.meuFormato': data = ...; break;
            default: throw new Error(`[ ERRO]: Format ${this.propretery.format} not supported for reading`); };
        return data;
    }
}

// Criar um arquivo
// new File({ filePath: "example.txt" }).write("Hi!", { overwrite: true })
// "overwrite: true" -> sobrescreve o arquivo caso já exista
// example.txt conterá: "Hi!"

// Ler um arquivo
// new File({ filePath: "example.txt" }).read()
// Retorna: "Hi!"
