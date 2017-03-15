var webdriverio = require('webdriverio');
var expect = chai.expect;

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
// test ids
var username = 'Carlos Stevens';
var title = 'Carlos Stevens';
// TODO spec
webdriverio
    .remote(options)
    .init()
    .url('http://localhost:3000')
    .setValue('#searchField', username)
    .click('#searchField')
    .pause(10000)
    .click('#result-0')
    .pause(5000)
    .getText('.md-headline').then(function(text) {
        console.log('User is: ' + text);
    })
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .end();