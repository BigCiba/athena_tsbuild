declare var old_debug_traceback: typeof debug.traceback;
old_debug_traceback ??= debug.traceback;
if (old_debug_traceback !== undefined) {
	debug.traceback = (error: any, ...args: any[]) => {
		let a = old_debug_traceback(error, ...args);
		print(IsServer() ? "[Server Error]" : "[Client Error]", a);
		pcall(() => {
			if (IsServer()) {
				CommonService.CallAction("/v1/log/report", 0, { level: "Server", message: a });
			} else {
				const params = { level: "Client", message: a };
				const address = "http://150.158.155.234:8003/v1/log/report";
				const handle = CreateHTTPRequestScriptVM("POST", address);
				handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
				handle.SetHTTPRequestHeaderValue("Accept-Encoding", "gzip");
				handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
				handle.SetHTTPRequestAbsoluteTimeoutMS(30000);
				handle.Send((response) => {
					PrintLongStr(`[Client Error]\tStatusCode: ${response.StatusCode}\tBody: ${response.Body}`, address);
				});
			}
		});
		return a;
	};
}

declare var PUIErrorEventListenerID: EventListenerID | undefined;
if (IsClient()) {
	// if (PUIErrorEventListenerID != undefined) {
	// 	StopListeningToGameEvent(PUIErrorEventListenerID);
	// 	PUIErrorEventListenerID = undefined;
	// }
	// PUIErrorEventListenerID = ListenToGameEvent("pui_error_msg", (data) => {
	// 	const params = { level: "Pui", message: data.error };
	// 	const address = "http://150.158.155.234:8003/v1/log/report";
	// 	const handle = CreateHTTPRequestScriptVM("POST", address);
	// 	handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
	// 	handle.SetHTTPRequestHeaderValue("Accept-Encoding", "gzip");
	// 	handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
	// 	handle.SetHTTPRequestAbsoluteTimeoutMS(30000);
	// 	handle.Send((response) => {
	// 		PrintLongStr(`[PUI Error]\tStatusCode: ${response.StatusCode}\tBody: ${response.Body}`, address);
	// 	});
	// }, undefined);
}
