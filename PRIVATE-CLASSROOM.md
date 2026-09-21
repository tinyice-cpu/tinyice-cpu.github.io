# 如何访问私密课堂

本仓库保持 **Private**，原 `tinyice-cpu.github.io` 公开站点已关闭。登录 GitHub 能查看仓库和下载资料，不等于原 Pages 网址变成了带登录的学习网站。

## 今天的完整版本

[下载私密双课程资料包](https://github.com/tinyice-cpu/tinyice-cpu.github.io/releases/tag/private-classroom-2026-09-21)。需要登录有仓库权限的 GitHub 账号。

包含原光电子学展示和物理光学双书对照：47 个授课小节、64 个梁书参考小节、685 页原页、全文搜索与笔记。全书原图与 PDF 放在这个私有 Release 资料包中，避免每次更新反复增大 Git 历史。

## 通过网址私密阅读（Codespaces）

本仓库已提供启动配置，但**同步文件不会自动创建或启动云端环境**。

1. 登录自己的 `tinyice-cpu` GitHub 账号。先在个人设置 Billing and licensing 中查看 Codespaces 计算与存储剩余额度；未确认额度前不要创建。不要开通超额付费。
2. 打开本仓库，点击绿色 **Code → Codespaces → Create codespace on main**。如果显示额外条款、费用或需要升级，请先停止。
3. 初始化后自动下载并校验私有资料包，启动课堂。在下方 **Ports（端口）** 中找到 **8766**，确认 **Visibility = Private**，点击浏览器图标打开。
4. 这个地址形如 `https://<你的环境名称>-8766.app.github.dev/`，首次创建前无法预先给出完整地址。登录自己的 GitHub 后可访问；保持端口 Private，不要设为 Public。
5. 不阅读时在 Codespaces 菜单选择 **Stop codespace**。下次进入 [Codespaces 列表](https://github.com/codespaces)，启动已有环境，再打开同一个 8766 端口。不要每次新建。环境休眠期间网页不能访问。

这是一种个人云端阅读预览，有计算与存储额度，不是无限免费的常驻网站。私密端口只有创建者通过 GitHub 验证后才能访问，见 [GitHub 官方安全说明](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces)。如果希望长期在线、像普通网站一样随时打开，应另行配置带本人登录限制的托管服务。

## 本机阅读

解压完整资料包，双击“打开私密课堂.html”；或在已有 Node.js 的电脑双击“启动私密课堂.cmd”，打开 `http://127.0.0.1:8766/`。这个地址只在运行本地服务的电脑可用，不是互联网网址。

两种方式的笔记存储在各自浏览器来源中，不会自动跨设备同步，请用“导出本节笔记”备份。
