// require("./eom_modifier/property_check_value_callback");
// require("./eom_modifier/properties_declare");
// require("./eom_modifier/properties");
// require("./eom_modifier/events");
// require("./eom_modifier/states");
// modifier加载列表
// root
for (const [i, v] of ipairs([
	"modifier_neutral",
	"modifier_original_health_bar",
	"wave_unit"
])) {
	require("modifiers." + v);
}

// enemy
for (const [i, v] of ipairs([
	"modifier_enemy_scaling"
])) {
	require("modifiers.enemy." + v);
}

// framework
for (const [i, v] of ipairs([
	"modifier_common",
	"modifier_npc"
])) {
	require("modifiers.framework." + v);
}
