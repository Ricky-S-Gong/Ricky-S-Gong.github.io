# 第二轮：GitHub 免费鲲鹏／飞鲸素材核查

日期：2026-11-01。按最新要求，只考虑 GitHub 上免费开放许可的既有项目；不生成视频、不购买素材。付费素材检索已停止。

## 结果

没有找到已核实同时具备“鲸鲲躯体＋巨大羽翼＋写实电影质感＋自然飞行动画”的免费 GitHub 素材。本轮找到了以下可直接看预览的相关项目，但各有明确缺口，不能把它们当成符合要求的最终鲲鹏。

## 1. Glass Cube Cloud Whale：许可清晰的实时三维云鲸，造型仍不匹配

- [仓库](https://github.com/csuyincs-creator/glass-whale-side-by-side)
- [作者原始预览图](https://github.com/csuyincs-creator/glass-whale-side-by-side/blob/main/shots/side-by-side.webp)
- [MIT 许可证](https://github.com/csuyincs-creator/glass-whale-side-by-side/blob/main/LICENSE)
- [鲸体实现](https://github.com/csuyincs-creator/glass-whale-side-by-side/blob/main/right/src/whale.js)

核实：根许可证为 MIT、作者 csuyincs-creator；鲸体由参数化管状几何、鳍与 shader 实时构建，未依赖外部鲸 GLB。README 标注左侧为星尘云鲸、右侧为参数化躯干与半透明琉璃材质。

已查看作者预览：玻璃盒中的微缩浮岛与半透明鲸，确是三维动态艺术场景，但没有羽翼，且偏梦幻艺术摆件。可免费复用程序结构并保留 MIT 声明；不应宣称是写实鲲化鹏素材。未启动完整场景测量移动端帧率。

## 2. Skyfarer：云海与巨大飞鲸的空间关系接近，模型授权不能由 MIT 推断

- [项目与预览 GIF](https://github.com/lovisdotio/video-to-game/tree/main/gallery/skyfarer)
- [在线交互预览](https://fal-video-to-game.vercel.app/O2_3D_SKYFARER/)
- [MIT 代码许可证](https://github.com/lovisdotio/video-to-game/blob/main/LICENSE)
- [单页游戏代码](https://github.com/lovisdotio/video-to-game/blob/main/gallery/skyfarer/game/index.html)

作者 README 写明素材已通过 fal/Meshy 等工具生成，但 **assets are not in this repository**，完整模型/图片/声音只在部署的游戏中。代码 MIT 可以确认，不能据此认定托管在其他地址的模型和视频也已获得可再分发许可。

已查看原始 GIF：巨型鲸体穿行云海，背部为可站立的草地与植被，体侧为鳍，没有确认巨大羽翼。它是最接近“飞鲸与云海尺度关系”的新发现，可看预览评审构图；游戏风格与模型授权缺口使其不适合直接抽取素材上线。本轮没有生成该视频，也未下载或再分发其托管模型。

## 3. Mythic Whale：代码与模型许可都能核对，但与上一轮同一模型

- [GitHub 仓库](https://github.com/rudra-xi/mythic_whale)
- [作者在线地址](https://mythic-whale.netlify.app/)：本轮实际浏览器检查时模型请求 `assets/mythic_whale_model/scene.gltf` 返回 404，当前不能完整预览；不作为可用动态预览入口。
- [代码 MIT](https://github.com/rudra-xi/mythic_whale/blob/main/LICENSE.md)
- [模型 CC BY 4.0 与作者署名要求](https://github.com/rudra-xi/mythic_whale/blob/main/assets/mythic_whale_model/license.txt)

仓库模型的 `license.txt` 和 `scene.gltf.asset.extras` 均指向 Meleagor 的 Sketchfab 模型 `124137f938ec4f5390ddde6dffd7c62e`；带 1 段动画、101 个 animation channels。代码 MIT 与模型 CC BY 4.0 是两套许可，需分别保留。

这只是上一轮荧光、多眼、风格化神话鲸的可下载 GitHub 分发，**不是新的鲲鹏造型**，不推荐再次作为视觉方案。

## 公开但不可直接视作免费开放素材的仓库

- [Skywhale Airways](https://github.com/WalksWithASwagger/skywhale-airways)：有电影片段与艺术素材的 Git LFS 指针，仓库根目录未查到许可证。README 说明项目已迁移到 `WalksWithASwagger/kk-kb`，旧仓库公开不构成素材再利用授权。
- [From. Whale](https://github.com/jeongmint/from-whale)：确有多款 GLB，但根目录未查到许可证；其低多边形自然鲸也无羽翼。不应仅因可下载而复制进主页。
- [Krill](https://github.com/jbhooper9000/krill)：鲸群与海洋游戏，未查到根许可证，且不是带翼鲸。未作为候选素材采用。
- [Harness Whale Wallpaper](https://github.com/HeShen-1/deepseek-whale-wallpaper)：MIT，但明确为约 1,750 点的点阵鲸。用户已排除这种粒子/简化图形方案，故不推荐。

## 检索边界与后续

通过 GitHub 官方仓库信息、目录树、原始 LICENSE/README/模型许可证及作者预览核实。关键词包括 skywhale、flying whale、winged whale、kunpeng/鲲鹏、云鲸、飞鲸、whale＋clouds/three.js。GitHub 搜索 API 中途触发共享 IP 限流后改用网页索引，未反复请求受限接口。

目前只有程序基础与近似视觉参考，缺少真正符合造型的免费主素材。应把“可运行的开源场景”和“最终艺术形象符合要求”分开；没有足够证据选择上述任一项作为主页的最终鲲鹏背景。
