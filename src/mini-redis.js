const colors = require("colors/safe");
const check = require('check-types');

class MiniRedis {
    constructor() {
        this.storage = {};
        this.commandConfigs = {
            set: { numberOfOptions: [3, 5], func: function (self, ...args) { return self.set(...args) } },
            get: { numberOfOptions: [2], func: function (self, ...args) { return self.get(...args) } },
            del: { numberOfOptions: [2], func: function (self, ...args) { return self.del(...args) } },
            dbsize: { numberOfOptions: [1], func: function (self) { return self.dbsize() } },
            incr: { numberOfOptions: [2], func: function (self, ...args) { return self.incr(...args) } },
            zadd: { numberOfOptions: [4], func: function (self, ...args) { return self.zadd(...args) } },
            zcard: { numberOfOptions: [2], func: function (self, ...args) { return self.zcard(...args) } },
            zrank: { numberOfOptions: [3], func: function (self, ...args) { return self.zrank(...args) } },
            zrange: { numberOfOptions: [4], func: function (self, ...args) { return self.zrange(...args) } },
            logt: { numberOfOptions: [1], func: function (self, ...args) { return self.logt(...args) } }
        }
    }

    validation(entireCommand) {
        const validCommands = ['logt','set', 'get', 'del', 'dbsize', 'incr', 'zadd', 'zcard', 'zrank', 'zrange']
        const commands = entireCommand.split(' ').map(item => item.toLowerCase());
        const isValidCommand = validCommands.includes(commands[0]);

        
        if (isValidCommand) {
            const command = commands[0];
            const hasCorrectNumberOfOptions = this.commandConfigs[command].numberOfOptions.includes(commands.length);

            if (hasCorrectNumberOfOptions) {
                return (this.commandConfigs[command].func(this, ...commands));
            } else {
                return colors.red('Check options');
            }
        } else {
            return colors.red('Invalid command');
        };
    }

    set(command, key, value, ...Rest) {
        const hasExpirationTime = Rest.length === 2;
        const regexOnlyNumbers = new RegExp('^[0-9]+$'); 

        if (hasExpirationTime) {
            const isValidExpTime = Rest[0] === 'EX' && regexOnlyNumbers.test(Rest[1]);
            if (isValidExpTime) {
                const seconds = Number(Rest[1]) * 1000;
                this.storage[key] = value;
                setTimeout(() => {
                    delete this.storage[key];    
                }, seconds);
                
            }
        } else {
            this.storage[key] = value;
            return 'OK';
        }

    }
    get(command, key) {
        const hasThisKey = this.checkKey(key);

        return hasThisKey ? this.storage[key] : colors.red('(nil)');
    }

    del(command, key) {
        const hasThisKey = this.checkKey(key);
        if (hasThisKey) {
            delete this.storage[key];
            return 'OK';
        } else {
            return colors.red('This key does not exist.');
        }
    }

    dbsize() {
        return Object.keys(this.storage).length;
    }

    incr(command, key) {
        if (this.checkKey(key)) {
            const regexOnlyNumbers = new RegExp('^[0-9]+$'); 
            const isNumber = regexOnlyNumbers.test(this.storage[key]) || check.integer(this.storage[key]) ;
            if (isNumber) {
                this.storage[key] = parseInt(this.storage[key], 10) + 1;
                return this.storage[key];
            } else {
                return colors.red('Value is not a number');
            }
        } else {
            return colors.red('Invalid key');
        }
        

    }

    zadd(command, key, score, member) {
        if (!!this.storage[key]) {
            if (check.array(this.storage[key])) {
                this.storage[key].push({ score: Number(score), member });
                this.storage[key].sort(function (a, b) {return a.score - b.score});
                return 'OK';
                
            } else {
                return colors.red('Invalid key');
            }
            
        } else {
            this.storage[key] = [];
            this.storage[key].push({ score: Number(score), member});
            return 'OK';
        }
    }

    zcard(command, key) {
        const card = !!this.storage[key] && check.array(this.storage[key]) ? this.storage[key].length : colors.red('Invalid key');
        return card;
    }

    zrank(command, key, member) {
        const rankIndex = this.storage[key].map(item =>item.member).indexOf(member);
        return rankIndex === -1 ? colors.red('(nil)') : rankIndex;
    }

    zrange(command, key, start, stop) {
        const slice = this.storage[key].map(item => item.member).slice(Number(start), Number(stop));

        return !!slice ? slice : colors.red('Invalid key or member');
    }

    checkKey(key) {
        const keys = Object.keys(this.storage);
        const hasThisKey = keys.includes(key);
        return hasThisKey;
    }

    fictionalFunctionSum(add1, add2) {
        return add1 + add2;
    }

    fictionalFunctionMinus(add1, add2) {
        return add1 + add2;
    }

    fibonacci(n) {
        if (n <= 1) {
            return n;
        } else {
            return this.fibonacci(n - 1) + this.fibonacci(n - 2);
        }
    }

    fibonacciIterative(n) {
        let a = 0;
        let b = 1;
        let c = 0;
        for (let i = 0; i < n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return a;
    }

    rungeKutta(f, x0, y0, x, n) {
        let h = (x - x0) / n;
        let k1, k2, k3, k4;
        let y = y0;
        for (let i = 0; i < n; i++) {
            k1 = h * f(x0, y);
            k2 = h * f(x0 + 0.5 * h, y + 0.5 * k1);
            k3 = h * f(x0 + 0.5 * h, y + 0.5 * k2);
            k4 = h * f(x0 + h, y + k3);
            y = y + (1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
            x0 = x0 + h;
        }
        return y;
    }
}

module.exports = MiniRedis;