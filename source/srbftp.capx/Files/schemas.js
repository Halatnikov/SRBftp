"use strict";

let schemas = {};
let s = Superstruct;
s.int = s.integer;

const defaulted = function (struct, fallback) {
	return s.coerce(struct, s.unknown(), (x) => {
		const f = typeof fallback === 'function' ? fallback() : fallback;
		return s.is(x, struct) ? x : f;
	});
};

const boolint = s.size(s.int(), 0,1);

let keycodes_arr = [];
srbftp.set_keycodes = function (x) {
	let arr = Object.keys(x);
	arr.forEach((v, i) => arr[i] = parseInt(v));
	keycodes_arr = arr;
};
const keycodes = s.dynamic(() => keycodes_arr.length != 0 ? s.enums(keycodes_arr) : s.never());

schemas.srbftp_config = s.object({
	"_srbftp_config": 					s.enums([1]),
	"Graphics.WindowSize": 				defaulted(s.enums([0,1,2,3,4]), 2), // 0.5x, 1x, 1.5x, 2x, 2.25x
	"Graphics.Fullscreen": 				defaulted(boolint, 0),
	"Graphics.ScalingQuality": 			defaulted(boolint, 1),
	"Graphics.ShowFPS": 				defaulted(boolint, 0), // 1 if not on desktop
	"Sound.Volume": 					defaulted(s.size(s.int(), 0,20), 20), // 20 multiplied by 5 is 100%
	"Sound.VolumeMusic": 				defaulted(s.size(s.int(), 0,20), 20),
	"Sound.VolumeSFX": 					defaulted(s.size(s.int(), 0,20), 20),
	"Input.1KeyUp": 					defaulted(keycodes, 38),
	"Input.1KeyDown": 					defaulted(keycodes, 40),
	"Input.1KeyLeft": 					defaulted(keycodes, 37),
	"Input.1KeyRight": 					defaulted(keycodes, 39),
	"Input.1KeyA": 						defaulted(keycodes, 13),
	"Input.1KeyStart": 					defaulted(keycodes, 27),
	"Input.1KeyRestart": 				defaulted(keycodes, 82),
	"Input.1PadType": 					defaulted(s.enums([0,1,2,3]), 0), // auto, numbers, xbox, playstation
	"Input.1PadA": 						defaulted(s.size(s.int(), 0,31), 0),
	"Input.1PadStart": 					defaulted(s.size(s.int(), 0,31), 9),
	"Input.1PadRestart": 				defaulted(s.size(s.int(), 0,31), 11),
	"Input.2KeyUp": 					defaulted(keycodes, 87),
	"Input.2KeyDown": 					defaulted(keycodes, 83),
	"Input.2KeyLeft": 					defaulted(keycodes, 65),
	"Input.2KeyRight": 					defaulted(keycodes, 68),
	"Input.2KeyA": 						defaulted(keycodes, 16),
	"Gameplay.Cutscenes": 				defaulted(boolint, 1),
	"Gameplay.ProjectileTrails":		defaulted(boolint, 1),
	"Gameplay.HitMarker": 				defaulted(boolint, 1),
	"Gameplay.InstantCamera": 			defaulted(boolint, 0),
	"Gameplay.CameraPause": 			defaulted(boolint, 1),
	"Gameplay.MonotoneSpecialStages":	defaulted(boolint, 1),
	"Data.MaxRecords": 					defaulted(s.size(s.int(), 3,30), 10),
	"Misc.DiscordRichPresence": 		defaulted(boolint, 1),
});

srbftp.schemas = schemas;
//Object.freeze(schemas)

//s.validate(test, schemas.srbftp_config, {coerce:true})
