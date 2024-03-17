'use strict';
const fs = require('fs')
const crypto = require('crypto')
const http = require('http')

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(()=> console.log(`Timer 1 finished`), 0) 
setImmediate(()=> console.log(`Immediate 1 finished`)) 

fs.readFile('text-file.txt','utf-8',()=>{
    console.log(`I/O finished`); //3
    console.log(`----------------------`); 

    setTimeout(()=> console.log(`Timer 2 finished`), 0) 
    setTimeout(()=> console.log(`Timer 3 finished`), 5000) 
    setImmediate(()=> console.log(`Immediate 2 finished`)) 

    process.nextTick(()=> console.log('process.nextTick'))

    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log((Date.now()- start)/1000, "Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log((Date.now()- start)/1000, "Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log((Date.now()- start)/1000, "Password encrypted");
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log((Date.now()- start)/1000, "Password encrypted");
    })
    
})

process.nextTick(()=> console.log('process.nextTick'))
console.log('hello from top-level code'); 

fs.readFile('text-file.txt',()=>{
    console.log('yet finished');
})




