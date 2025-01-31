ScriptCall_Setup = wrap(ScriptCall_Setup, function(prevFunc) {
    return function() {
        prevFunc.call(this);

        var girl = new Composition(
            new Asset('material-charillust', 'Female.png'),
            { width: 416, height: 600 }
        );

        var boy = new Composition(
            new Asset('material-charillust', 'Male.png'),
            { width: 424, height: 600 }
        );

        RenderLayers[0] = (
            girl
            .adjust({x: 300})
            .addSpecialEffect('direction blur', 2)
            .move({y: 300, speed: MoveSpeed.SUPER_LOW})
            .move({
                fn: function(t) {
                    if (0 <= t && t <= 6000) {
                        return [Math.round(100 * Math.cos(2 * Math.PI * t / 180)),
                                Math.round(100 * Math.sin(2 * Math.PI * t / 180))];
                    }
                    return NaN;
                }
            })
        );

        RenderLayers[1] = (
            boy
            .fade('in', {alpha: 127, speed: 0.5 * FadeSpeed.SUPER_LOW})
            .wait({t: 30})
            .move({x: 800, y: 200, speed: 1.5 * MoveSpeed.SUPER_HIGH})
            .wait({
                whilst: function() {
                    return boy.x <= 600;
                }
            })
            .rotate({
                fn: function(t) {
                    return -360 * Ease.OutBounce(t / 120);
                }
            })
            .wait()
            .close()
        );
    };
});
