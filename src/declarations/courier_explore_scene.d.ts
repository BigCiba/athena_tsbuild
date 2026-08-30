declare interface CourierExploreSceneSlotView {
	slot_id: number;
	entindex: EntityIndex;
	start_time: number;
}

declare interface CourierExploreSceneViewData {
	updated_at: number;
	slots: CourierExploreSceneSlotView[];
}

declare interface NetDataDeclarations {
	courier_explore_scene_view: CourierExploreSceneViewData;
}
