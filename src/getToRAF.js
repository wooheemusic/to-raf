module.exports = function getToRAF() {
    let rid = 0;
    let ifn = () => { };
    let isRefreshed = false;
    let isRunning = false;

    function start() {
        if (!isRunning) {
            isRunning = true;
            rid = requestAnimationFrame(loop);
        }
    }
    function stop() {
        isRunning = false;
        cancelAnimationFrame(rid);
    }
    function loop(timestamp) {
        if (!isRefreshed) {
            stop();
            return;
        }
        rid = requestAnimationFrame(loop);
        ifn(timestamp);
        isRefreshed = false;
    }

    return function raf(fn) {
        ifn = fn;
        isRefreshed = true;
        start(); // idempotent
    };
};