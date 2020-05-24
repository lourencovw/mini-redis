const MiniRedis = require('./mini-redis');
var colors = require("colors/safe");

var prompt = require('prompt');
prompt.message = colors.red("Mini Redis");

prompt.delimiter = colors.red(" ");


const mn = new MiniRedis();

prompt.start();

function recursive() {
    prompt.get({
        properties: {
            command: {
                description: ">"
            }
        }
    }, function (err, result) {
        console.log(mn.validation(result.command));
        recursive();
    });

}

function onErr(err) {
    console.log(err);
    return 1;
}
mn.validation('zadd test 3 test3');
mn.validation('zadd test 4 test4');
mn.validation('zadd test 1 test1');
mn.validation('zadd test 2 test2');
recursive();





