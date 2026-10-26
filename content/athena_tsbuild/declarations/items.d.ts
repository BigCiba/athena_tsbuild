interface AthenaInventoryItem { entity: EntityIndex; name: string; slot: number; charges: number; sellable: boolean; sell_gold: number; }
interface AthenaInventorySnapshot { run_id: number; players: Record<string, AthenaInventoryItem[]>; }
interface AthenaShopEntry { name: string; currency: "gold" | "crystal" | "score"; price: number; ingredients: string[]; }
interface AthenaShopCatalog { run_id: number; groups: Record<string, AthenaShopEntry[]>; related?: Record<string, AthenaShopEntry>; }
interface AthenaShopAction { run_id: number; request_id: string; action: "buy" | "sell"; item_name?: string; item_entity?: EntityIndex; }
interface AthenaShopResult { run_id: number; request_id: string; success: boolean; error?: string; }
