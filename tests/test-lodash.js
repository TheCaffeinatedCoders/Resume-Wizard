//npm install --save lodash
//npm install --save @types/lodash
const _ = require('lodash');
const {readFile} = require('fs').promises;

// import template from .tex file
readFile('./test_template.tex', 'utf8')
    .then(latexTemplate => {
        let variableMap = {name: "Calvin", phone: "4259855538"};

        // set custom delimiter @{ }
        _.templateSettings.interpolate = /\@{([\s\S]+?)}/g;

        // string interpolation with custom delimiter @{ }
        let compiled = _.template(latexTemplate);
        let compiledTemplate = compiled(variableMap);

        // log it
        console.log(compiledTemplate);
    })
    .catch(error => {
        console.error(error);
    });