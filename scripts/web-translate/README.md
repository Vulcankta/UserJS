# 网页翻译（自用修改版）

给每个非中文的网页角落添加一个谷歌翻译悬浮控件，调用谷歌官方 element.js 引擎将外语网页**整页**翻译为中文。

> 本脚本是已删库停更的原版「网页翻译」（Kaiter-Plus, v1.68）的衍生维护版本。
> 原始导出存档见 [docs/legacy-export-1.68.txt](../../docs/legacy-export-1.68.txt)。

## 功能

- 悬浮翻译控件：展开语言菜单选择目标语言，「原文」按钮一键恢复
- 快捷键翻译：在「更多设置」中捕获自定义快捷键（需包含 Ctrl/Shift/Alt）
- 目标语言与右下角菜单语言清单自定义（31 种语言，含粤语），支持拖拽排序
- 自动检测中文页面并跳过（已翻译页面除外；可关闭）
- 跨页接力翻译：同站跳转经 googtrans cookie 自动延续翻译状态
- 兼容页面自带谷歌翻译控件的网站：直接复用其引擎驱动，不重复注入；
  无自带的页面注入隐藏控件（独立命名空间，互不冲突）
- 谷歌翻译控件退居幕后，全部交互由自研 UI 驱动

## 安装

下载 [web-translate.user.js](web-translate.user.js) 拖入 Tampermonkey，或新建脚本后粘贴全文。

## 测试

`test/harness.html` 为本地回归测试夹具（GM API shim + 模拟 document-end 注入时机），
配合 Playwright/Puppeteer 或直接打开使用。注意：file:// 下谷歌控件拿不到语言选项，
翻译链路需在 http(s) 页面验证。

## 许可证

BSD-3-Clause（继承原版），见同目录 [LICENSE](LICENSE)。
