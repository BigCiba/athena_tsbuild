import chokidar from 'chokidar';
import color from 'cli-color';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import * as rollup from 'rollup';
import GetRollupWatchOptions from './build-rollup-config';
import { dirExists, fileColor, normalizedPath, Panorama, ReadAddonName, ReadPackage, Tooltip } from './utils';

// 导入 tsconfig 生成器和 enum 同步器
const { generateSrcTsConfig } = require('../node_scripts/generate-tsconfig');
const { syncEnums, shouldIgnoreMirroredChange, getEnumWatchPaths } = require('../node_scripts/sync-enums');

const rootPath = normalizedPath(path.join(__dirname, '../src'));

/**
 * 启动Rollup编译
 */
async function StartRollup(): Promise<void> {
    const packageInfo = await ReadPackage();
    let options: rollup.RollupWatchOptions = GetRollupWatchOptions(rootPath, packageInfo);
    let watcher = rollup.watch(options);

    // 监听双端 enums 文件变化
    const enumsWatcher = chokidar.watch(getEnumWatchPaths(), {
        persistent: true,
        ignoreInitial: true
    });

    enumsWatcher.on('change', (filePath: string) => {
        if (shouldIgnoreMirroredChange(filePath)) {
            console.log(Panorama + ` ↩️ Ignored mirrored enums change: ${path.relative(path.join(__dirname, '..'), filePath)}`);
            return;
        }

        console.log(Panorama + ` 📝 Enums changed, syncing from ${path.relative(path.join(__dirname, '..'), filePath)}...`);
        try {
            syncEnums({ sourcePath: filePath });
            console.log(Panorama + ' ✅ Enums synced successfully');
        } catch (error) {
            console.error(Panorama + ' ❌ Failed to sync enums:', error);
        }
    });

    // 监听错误
    watcher.on('event', async evt => {
        if (evt.code === 'ERROR') {
            const f = normalizedPath(evt.error.loc?.file || '').replace(
                rootPath + '/',
                ''
            );
            console.log(evt);
            console.log(
                Panorama +
                ' Build Error: ' +
                color.red(f) +
                ': ' +
                color.yellow(evt.error.loc?.line)
            );
            console.log(
                Panorama + ' Build Error: ' + color.red(evt.error.message)
            );
        }
    });

    let cacheLog = "🥇 First compilation complete";
    watcher.on('change', p => {
        if (p.includes("tooltips")) {
            cacheLog = Tooltip + ' ✒️  ' + fileColor(path.basename(p));
            console.log(Tooltip + " 👁️  change detected");
        } else {
            cacheLog = Panorama + ' ✒️  ' + fileColor(path.basename(p));
            console.log(Panorama + " 👁️  change detected");
        }
    });

    watcher.on("event", (event) => {
        if (event.code == "END") {
            console.log(cacheLog);
        }
    });
}

function copySolidCore(addonName: string) {
    const source = path.join(__dirname, 'solid-core.js');
    const target = path.join(__dirname, `../content/${addonName}/panorama/scripts/custom_game/solid-core.js`);
    const dir = path.dirname(target);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    copyFileSync(source, target);
    console.log('📁 solid-core.js 已复制到自定义游戏目录');
}

/**
 * 任务入口
 */
export default async function TaskPUI() {
    const addonName = await ReadAddonName();
    if (addonName) {
        if (await dirExists(`./content/${addonName}`)) {
            // 同步双端 enums
            try {
                syncEnums();
            } catch (error) {
                console.error('❌ 同步 enums 失败:', error);
            }

            // 生成 src 的 tsconfig.json（确保配置是最新的）
            try {
                generateSrcTsConfig();
            } catch (error) {
                console.error('❌ 生成 src tsconfig.json 失败:', error);
            }

            copySolidCore(addonName);
            StartRollup();
        } else {
            console.error(`./content/${addonName} 目录不存在，检查package.json的name属性`);
        }
    } else {
        console.error('package.json 没有配置正确的 name 属性');
    }
}

TaskPUI();
