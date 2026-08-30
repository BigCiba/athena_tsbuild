import fs from 'node:fs';
import path from 'node:path';

export function writeReportData(data, targetPath) {
	const absolutePath = path.resolve(targetPath);
	fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
	const tempPath = `${absolutePath}.tmp`;
	fs.writeFileSync(tempPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
	fs.renameSync(tempPath, absolutePath);
	return absolutePath;
}
