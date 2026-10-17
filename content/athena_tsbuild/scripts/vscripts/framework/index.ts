require("enums");
require("constant");
require("large_number_health");
require("pseudo_random");
require("global");
require("module");
require("message");
require("notification");
require("timer");
require("particle_clear");
require("debug");
require("request");
require("game_event");
require("event");
require("draw_pool");
require('property_system/property_system');
require('state_system/state_system');

if (IsServer()) {
	require('game_state');
	require("demo");
	require("npc");
	require("settings");
	require("unit_manager");
	require("unit_attributes");
	require("game_time");
}
