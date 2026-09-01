# UserJS

个人油猴（Tampermonkey）脚本集合。

## 脚本列表

| 脚本 | 说明 | 状态 |
|---|---|---|
| [网页翻译（自用修改版）](scripts/web-translate/) | 调用 Google 翻译接口的整页翻译悬浮控件，支持快捷键、自定义语言清单 | 维护中 |

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)
2. 打开脚本文件的 raw 页面（或下载 `.user.js` 文件后拖入 Tampermonkey 图标）
3. 确认安装即可

## 目录结构

```
scripts/<script-name>/   每个脚本一个目录，内含 .user.js 与相关资源
docs/                    存档与文档
```

## 许可证

各脚本许可证独立，见脚本头部 `@license` 元信息及其目录内的 LICENSE 文件：

- [scripts/web-translate/LICENSE](scripts/web-translate/LICENSE) — BSD-3-Clause（继承原版）
