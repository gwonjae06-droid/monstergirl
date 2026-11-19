/** One place for animation keys and default timings. Pixel frames can be swapped without touching the game loop. */
export const ANIMATION_PRESETS=Object.freeze({
 idle:{fps:8,loop:true},walk:{fps:12,loop:true},talk:{fps:10,loop:false},
 feed:{fps:12,loop:false},sample:{fps:14,loop:false},nest:{fps:16,loop:false},
 mutate:{fps:12,loop:false},chase:{fps:16,loop:true}
});
