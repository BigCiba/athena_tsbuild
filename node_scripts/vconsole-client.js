const net = require('net');

// VConsole2 连接配置
const VCONSOLE_HOST = 'localhost';
const VCONSOLE_PORT = 29000;

// ANSI 颜色代码
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
	gray: '\x1b[90m',
	white: '\x1b[37m',
};

// 颜色工具函数
const colorize = (text, color) => `${colors[color]}${text}${colors.reset}`;

// 消息类型颜色映射
const MESSAGE_COLORS = {
	'General': 'yellow',
	'VScript': 'cyan',
	'Error': 'red',
	'Warning': 'yellow',
	'Info': 'white',
};

class VConsoleClient {
	constructor(host, port) {
		this.host = host;
		this.port = port;
		this.client = null;
		this.buffer = Buffer.alloc(0);
	}

	connect() {
		console.log(colorize(`正在连接到 VConsole2 (${this.host}:${this.port})...`, 'green'));

		this.client = new net.Socket();

		this.client.connect(this.port, this.host, () => {
			console.log(colorize(`✓ 已连接到 VConsole2`, 'green'));
			console.log(colorize('----------------------------------------', 'gray'));
		});

		this.client.on('data', (data) => {
			this.handleData(data);
		});

		this.client.on('error', (err) => {
			console.error(colorize(`✗ 连接错误: ${err.message}`, 'red'));
		});

		this.client.on('close', () => {
			console.log(colorize('\n✗ 连接已关闭', 'yellow'));
			// 尝试重连
			setTimeout(() => {
				console.log(colorize('尝试重新连接...', 'gray'));
				this.connect();
			}, 3000);
		});
	}

	handleData(data) {
		// 将新数据追加到缓冲区
		this.buffer = Buffer.concat([this.buffer, data]);

		// 尝试解析消息
		this.parseMessages();
	}

	parseMessages() {
		// VConsole2 消息格式：通常包含二进制头部 + 文本消息
		// 格式可能是：[4字节长度] + [消息类型标记] + [文本内容]

		while (this.buffer.length > 0) {
			try {
				// 查找换行符作为消息边界
				const newlineIndex = this.buffer.indexOf(0x0A); // \n

				if (newlineIndex === -1) {
					// 没有完整消息，等待更多数据
					break;
				}

				// 提取一条完整消息
				const messageBuffer = this.buffer.slice(0, newlineIndex);
				this.buffer = this.buffer.slice(newlineIndex + 1);

				// 解析消息
				this.parseMessage(messageBuffer);
			} catch (err) {
				console.error(colorize(`解析错误: ${err.message}`, 'red'));
				// 清空缓冲区以防止死循环
				this.buffer = Buffer.alloc(0);
				break;
			}
		}
	}

	parseMessage(buffer) {
		try {
			// VConsole2 协议格式：
			// PRNT (4字节) + 时间戳 (8字节) + Channel字符串 (null结尾) + 消息内容

			let channel = 'Info';
			let cleanMessage = '';

			// 查找 PRNT 标记
			const prntIndex = buffer.indexOf('PRNT');

			if (prntIndex !== -1) {
				const afterPrnt = buffer.slice(prntIndex + 4);

				// 跳过时间戳（大约8-12字节的二进制数据）
				// 然后查找 channel 字符串（通常在时间戳之后，以 null 或特定字符结尾）

				// 策略1：在跳过前面的二进制数据后，查找已知的 channel 名称
				const knownChannels = [
					'Developer', 'VScript', 'Console', 'General', 'Warning', 'Error',
					'Panorama', 'Host', 'Network', 'Physics', 'Animation', 'Server',
					'Client', 'Steam', 'Workshop', 'VConComm'
				];

				let detectedChannel = null;
				let channelEndIndex = -1;

				// 在前 50 字节内查找 channel 名称
				const searchRange = afterPrnt.slice(0, Math.min(50, afterPrnt.length));

				for (const ch of knownChannels) {
					const idx = searchRange.indexOf(ch);
					if (idx !== -1 && (channelEndIndex === -1 || idx < channelEndIndex)) {
						detectedChannel = ch;
						channelEndIndex = idx + ch.length;
					}
				}

				if (detectedChannel) {
					channel = detectedChannel;

					// 消息内容在 channel 之后
					// 查找第一个可打印字符作为消息开始
					const afterChannel = afterPrnt.slice(channelEndIndex);
					let messageStart = -1;

					for (let i = 0; i < afterChannel.length; i++) {
						const byte = afterChannel[i];
						// 找到第一个字母或数字
						if ((byte >= 48 && byte <= 57) || (byte >= 65 && byte <= 90) || (byte >= 97 && byte <= 122)) {
							messageStart = i;
							break;
						}
					}

					if (messageStart !== -1) {
						cleanMessage = afterChannel.slice(messageStart).toString('utf8').trim();
					}
				} else {
					// 没找到 channel，直接提取消息
					let firstPrintable = -1;
					for (let i = 0; i < afterPrnt.length; i++) {
						const byte = afterPrnt[i];
						if ((byte >= 48 && byte <= 57) || (byte >= 65 && byte <= 90) || (byte >= 97 && byte <= 122)) {
							firstPrintable = i;
							break;
						}
					}

					if (firstPrintable !== -1) {
						cleanMessage = afterPrnt.slice(firstPrintable).toString('utf8').trim();
					}
				}
			} else {
				// 没有 PRNT 标记，直接提取
				cleanMessage = buffer.toString('utf8').trim();
			}

			// 清理消息：移除不可打印字符
			cleanMessage = cleanMessage.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');

			if (!cleanMessage) return;

			// 根据 channel 设置消息类型和颜色
			let messageType = 'Info';
			let coloredMessage = cleanMessage;

			switch (channel) {
				case 'VScript':
					messageType = 'VScript';
					coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['VScript']);
					break;
				case 'Developer':
				case 'General':
				case 'Console':
					messageType = 'General';
					coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['General']);
					break;
				case 'Error':
					messageType = 'Error';
					coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['Error']);
					break;
				case 'Warning':
					messageType = 'Warning';
					coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['Warning']);
					break;
				default:
					// 根据消息内容二次判断
					if (cleanMessage.includes('Error') || cleanMessage.includes('Failed') || cleanMessage.includes('Missing')) {
						messageType = 'Error';
						coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['Error']);
					} else if (cleanMessage.includes('Warning')) {
						messageType = 'Warning';
						coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['Warning']);
					} else {
						messageType = 'Info';
						coloredMessage = colorize(cleanMessage, MESSAGE_COLORS['Info']);
					}
			}

			// 打印消息（包含 channel 信息）
			const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
			console.log(`${colorize(`[${timestamp}]`, 'gray')} ${colorize(`[${channel}]`, 'blue')} ${coloredMessage}`);

		} catch (err) {
			console.error(colorize(`消息解析失败: ${err.message}`, 'red'));
		}
	}

	disconnect() {
		if (this.client) {
			console.log(colorize('\n正在断开连接...', 'yellow'));
			this.client.destroy();
			this.client = null;
		}
	}
}

// 创建客户端实例
const vconsole = new VConsoleClient(VCONSOLE_HOST, VCONSOLE_PORT);

// 连接到 VConsole
vconsole.connect();

// 优雅退出
process.on('SIGINT', () => {
	console.log(colorize('\n\n接收到退出信号...', 'yellow'));
	vconsole.disconnect();
	process.exit(0);
});

process.on('SIGTERM', () => {
	vconsole.disconnect();
	process.exit(0);
});

console.log(colorize('\nVConsole2 客户端已启动', 'cyan'));
console.log(colorize('按 Ctrl+C 退出\n', 'gray'));
