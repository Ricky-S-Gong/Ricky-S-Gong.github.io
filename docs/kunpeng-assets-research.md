# 鲲化鹏背景素材调查

核对日期：2026-11-01。目标是鲸鲲般厚重躯体、巨大羽翼、自然运动和电影光影。用户已否定白头鹰，并明确要求继续寻找现成开放素材，不自行生成视频。

## 当前结论

目前核实的候选中，没有同时满足造型、写实画质、现成动画、可取得文件、明确开放授权五项条件的完整素材。没有把“可观看”或“免费下载”当作开放授权，也没有把普通鲸、卡通鲸或放大的鹰当成最终鲲鹏。

生产代码目前只加入诗句；背景原型未发布。任何后续背景集成仍需验证实际模型、手机性能、首次加载、静态回退和 reduced-motion。

## 已核实的模型

以下造型判断来自原作者缩略图；面数、动画数量、下载状态及授权来自原作者的 Sketchfab v3 API 元数据。面数不能代替实际性能测试；未下载的模型没有实测载入时间或帧率。

| 原作者素材 | 授权与动画 | 画面及集成判断 |
| --- | --- | --- |
| [Animated Eagle — noyou](https://sketchfab.com/models/cd2a2d7fe1134a40a4fe65eb422fe736) | CC BY 4.0；有动画；取得的 GLB 3,276,272 字节，内嵌作者及授权 | 实际浏览器原型已检查；本质是白头鹰，用户明确拒绝；移出生产目录。 |
| [Whale of the veil — Meleagors](https://sketchfab.com/models/7a54c3e8514647bf852f07aa27b0c203) | CC BY 4.0；1 个动画；182,028 三角面；标为可下载 | 透明鲸身、珊瑚和植物；风格化且没有羽翼。面数与透明材质增加移动端负担，尚未实测。 |
| [Mythic Whale — Meleagors](https://sketchfab.com/models/124137f938ec4f5390ddde6dffd7c62e) | CC BY 4.0；1 个动画；12,422 三角面；标为可下载 | 多眼、蓝色发光纹样；有神话感，但偏游戏/卡通。不能仅调暗就声称达到写实要求。 |
| [Whisker Whale — Spinnee](https://sketchfab.com/models/5d2929e342dd413f995f69f23ad77af5) | CC BY 4.0；0 个动画；7,698 三角面；标为可下载 | 自然表面材质、长须、多眼，有异兽感；缺少羽翼和现成动画。 |
| [Flying Whale Creature — jason.lp.davis](https://sketchfab.com/models/debc2d1c1277409eb7212a814b67fe7c) | CC BY 4.0；0 个动画；41,659 三角面 | 彩色怪兽、发光符号、悬浮岩石；与克制写实要求不符。 |
| [Fantasy Whale — Sebastian Espinoza](https://sketchfab.com/models/acc442ca543242febfc1e459e0e78254) | CC BY 4.0；0 个动画；58,902 三角面 | 有飞鲸概念，但短鳍与造型细节不符合巨大羽翼，且无动画。 |
| [bird whale / cute fantasy creature — frannnny](https://sketchfab.com/models/b9ddd95448a843c1ae7f690aaceee136) | CC BY 4.0；0 个动画；3,080 三角面 | 有鲸身与羽翼，但是明确的可爱卡通风格，排除。 |
| [Whale Shark Fantasy — Alenzo](https://sketchfab.com/models/451892c9c18c4d74bf893bea8b626b02) | CC BY 4.0；6 个动画；4,918 三角面 | 发光鲸鲨，缺少鹏翼；不是目标造型。 |
| [Whale with wings — KX-Allegra](https://sketchfab.com/models/0ce772de24fe42738dbe27933929e5c6) | 未开放下载；无可复用许可证字段；0 个动画 | 只有造型参考价值；不可因为能预览就抓取用于主页。 |
| [Blue whale (Animated, downloadable) — Andrey](https://sketchfab.com/models/1fc22d7e249b41b995dbff1052bb2a1a) | 原作者页面标 CC BY；约 12.1k 三角面；有动画 | 普通蓝鲸基础，不具鹏翼；不是完整候选。 |
| [Model 93A — DigitalLife3D](https://sketchfab.com/models/51a1e06a393b4817bf5cdbc484a4cddc) | CC BY-NC；约 1.1M 三角面 | 摄影参考重建、鲸体可信，但无羽翼；非商业限制和高面数，不优先。 |
| [Moon Harvest — Leviathan](https://sketchfab.com/models/c5c40447fd0b405c82d041bd90a426e2) | CC BY-NC；1 个动画；55,508 三角面 | 荧光骨架怪物，偏游戏效果，排除。 |

CC BY 模型如果最终采用，需要在网页提供作者、素材原链接、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 及改动说明。只有在取得实际文件后才能核对动画、贴图、压缩支持和体积。

## 场景与渲染方案

| 来源 | 许可与技术 | 评估 |
| --- | --- | --- |
| [three.js volume cloud](https://github.com/mrdoob/three.js/blob/r170/examples/webgl_volume_cloud.html) | [MIT](https://github.com/mrdoob/three.js/blob/r170/LICENSE)；WebGL2/3D 纹理与体积采样 | 已做限分辨率原型；云形细节不够自然，原型未采用。 |
| [Takram three-geospatial](https://github.com/takram-design-engineering/three-geospatial) | MIT；大气散射与体积云，见项目各包与许可 | 高质量技术方向；需要额外依赖及 GPU 预算，不能替代缺失的生物模型。未在本项目实测。 |
| [Eanpa Sky](https://github.com/SkyeShark/Eanpa-Sky) | MIT；Three.js WebGPU/TSL | 云海可作为参考，但 WebGPU 与启动管线预热不符合“无感延迟”的最简方案。未实测。 |
| [Three.js Whale Particles](https://codepen.io/bmills20/pen/ZEVygYz) | 需分别核对 Pen 和模型授权 | 粒子鲸不是写实生物，不采用。 |
| [OpenGameArt Swimming Whale](https://opengameart.org/content/swimming-whale) | 原页列出 CC0 等；2D sprite | 明确为像素精灵，不符合需求。 |

## 视频素材核对

- [Mixkit 云中穿行](https://mixkit.co/free-stock-video/flying-through-the-clouds-in-a-blue-sky-30310/)：该**具体条目**免费版为 720p、仅个人用途的 Restricted License，不能把素材库整体宣传的“免费”当成该条目的商业授权；且没有鲲鹏。
- [Pexels Eagle Flying Freely](https://www.pexels.com/video/eagle-flying-freely-4438384/)：普通鹰的实拍，不满足用户已明确的造型要求。
- [Vecteezy 巨鹰云中飞行](https://www.vecteezy.com/video/52085786-a-large-eagle-flies-majestically-among-the-clouds)：Pro 授权，非开放素材，且仍是鹰。
- YouTube 上“Copyright Free”的鹰飞行转发：上传者自称并非原作者，未核实原始授权，排除。

目前没有核实到可直接用于该主页的完整“写实鲸鲲＋羽翼＋云海”的开放授权循环短片。没有自行生成视频，也不使用未授权转发片段。

## 首屏与降级约定

最终选定素材后，优先保证正文立即可用；静态海报优先加载，动态素材准备完毕且有可显示帧后平滑接替。`prefers-reduced-motion`、省流模式、播放失败或不支持的图形能力保持海报；隐藏页面暂停。不能把技术降级策略当作已经交付合格动态鲲鹏的证明。

## 已落地的独立排版

诗句保留原简体字，首页末尾增加作者与《上李邕》。本地字体为 [Ma Shan Zheng](https://github.com/google/fonts/tree/main/ofl/mashanzheng) 的诗句字符子集，OFL 许可随字体保存在 `assets/kunpeng/OFL.txt`，不新增运行时第三方字体请求。
