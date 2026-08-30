import { promises } from 'fs';

// 重写 Node.js 中的 promises.writeFile 方法。主要的作用是在尝试写入文件之前，先检查文件的内容是否与要写入的数据相同，如果相同就不进行写入操作，从而避免不必要的文件写入操作，提高性能和效率。
const w = promises.writeFile;
const r = promises.readFile;

const RETRYABLE_WRITE_ERRORS = new Set([
    'EACCES',
    'EBUSY',
    'EPERM',
    'UNKNOWN',
]);
const MAX_WRITE_ATTEMPTS = 5;

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeWithRetry(
    file: Parameters<typeof w>[0],
    data: Parameters<typeof w>[1],
    options: Parameters<typeof w>[2],
): Promise<void> {
    for (let attempt = 1; attempt <= MAX_WRITE_ATTEMPTS; attempt++) {
        try {
            await w(file, data, options);
            return;
        } catch (err: any) {
            const shouldRetry =
                RETRYABLE_WRITE_ERRORS.has(err?.code) &&
                attempt < MAX_WRITE_ATTEMPTS;
            if (!shouldRetry) {
                throw err;
            }

            // Windows 上 Dota、杀毒软件或索引服务短暂占用输出文件时，稍后重试。
            await delay(50 * 2 ** (attempt - 1));
        }
    }
}

const ww: typeof w = async function (file, data, options): Promise<void> {
    if (typeof data == "string" && data.startsWith("/*forceFresh*/")) {
        await writeWithRetry(file, data.slice("/*forceFresh*/".length), options);
        return;
    }
    try {
        const content = await r(file, options);
        if (typeof content === 'string') {
            if (content === data) {
                return;
            }
        } else if (Buffer.isBuffer(content)) {
            if (
                content.equals(
                    Buffer.isBuffer(data) ? data : Buffer.from(data as string)
                )
            ) {
                return;
            }
        }
    } catch (err) { }
    await writeWithRetry(file, data, options);
};
promises.writeFile = ww;
