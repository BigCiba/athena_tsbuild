import { reloadable } from "../lib/tstl-utils";
@reloadable
class CServiceReconstruct extends CModule {
	init(reload: boolean) {

	}
	/** 重构邮件数据 */
	ParseMailData(data: any) {
		let reconstruct: { [mail_id: string]: Table; } = {};
		for (const [k, v] of pairs(data)) {
			// v.items = json.decode(v.items);
			if (v.step == 9) {
				// @ts-ignore
				reconstruct[tostring(v.mail_id)] = "nil";
			} else {
				v.items = json.decode(v.items)[0];
				reconstruct[tostring(v.mail_id)] = v;
			}
		}
		return reconstruct;
	}
}

declare global {
	/**
	 * @ServerOnly
	 */
	var ServiceReconstruct: CServiceReconstruct;
}
ServiceReconstruct ??= new CServiceReconstruct();
