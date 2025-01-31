function domain(t0, t1, fn) {
    return function(t) {
        return t0 <= t && t <= t1 ? fn(t) : NaN;
    };
}


for (var attr in Ease) {
    Ease[attr] = domain(0, 1, Ease[attr]);
}
