const MiniRedis = require('./mini-redis');
var colors = require("colors/safe");

const mn = new MiniRedis();

test("'SET key value' returns 'OK'", () => {
    expect(mn.validation('SET key value')).toBe('OK');
});

test("'SET key' returns 'Check options'", () => {
    expect(mn.validation('SET key')).toBe(colors.red('Check options'));
});

test("'SET key value EX' returns 'Check options'", () => {
    expect(mn.validation('SET key value EX')).toBe(colors.red('Check options'));
});

test("'GET key' returns 'value'", () => {
    expect(mn.validation('GET key')).toBe('value');
});

test("'GET' should return 'Check options'", () => {
    expect(mn.validation('GET')).toBe(colors.red('Check options'));
});

test("'DEL key' should return 'OK'", () => {
    expect(mn.validation('DEL key')).toBe('OK'); 
});


test("'DBSIZE' should return 1", () => {
    mn.validation('SET key value');
    expect(mn.validation('DBSIZE')).toBe(1); 
});

test("'DBSIZ' should return 'Invalid command'", () => {
    mn.validation('SET key value');
    expect(mn.validation('DBSIZ')).toBe(colors.red('Invalid command')); 
});


test("'INCR incKey'  should return 2", () => {
    mn.validation('set incKey 1')
    expect(mn.validation('INCR incKey')).toBe(2); 
});

test("'ZADD key 1 member' should return 'Invalid key''", () => {
    expect(mn.validation('ZADD key 1 member')).toBe(colors.red('Invalid key')); 
});

test("'ZADD anotherKey 1 member' should return 'OK''", () => {
    expect(mn.validation('ZADD anotherKey 1 member')).toBe('OK'); 
});

test("'ZCARD anotherKey' should return 1", () => {
    expect(mn.validation('ZCARD anotherKey')).toBe(1); 
});

test("'ZCARD wrongKey' should return 'Invalid key'", () => {
    expect(mn.validation('ZCARD wrongKey')).toBe(colors.red('Invalid key')); 
});

test("'ZRANK anotherKey member' should return 0", () => {
    expect(mn.validation('ZRANK anotherKey member')).toBe(0); 
});

test("'ZRANK anotherKey wrongMember' should return (nil)", () => {
    expect(mn.validation('ZRANK anotherKey wrongMember')).toBe(colors.red('(nil)')); 
});

test("'ZRANGE anotherKey 0 1' should return 'member'", () => {
    expect(mn.validation('ZRANGE anotherKey 0 1')[0]).toBe('member'); 
});

test("'ZRANGE anotherKey 2 30' should return an empty array", () => {
    expect(mn.validation('ZRANGE anotherKey 2 30')).toHaveLength(0); 
});