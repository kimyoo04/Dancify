let logs = []; // 로그를 저장할 배열을 선언합니다.

console.log = (function() {
    var originalLog = console.log;
    return function() {
        originalLog.apply(console, arguments);

        // 로그를 객체 형태로 저장합니다.
        logs.push({
            timestamp: new Date(),
            log: Array.from(arguments).join(' ')
        });
    };
})();

console.log('Hello');
console.log('World');

console.log(JSON.stringify(logs, null, 2));
