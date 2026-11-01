# 鲲化鹏素材补充检索

检索日期：2026-11-01。范围：现成可复用素材；不生成视频，不联系作者，不购买资源。

## 结论

本轮没有找到同时满足以下条件的已核实素材：鲸鲲躯体、巨幅羽翼、写实电影质感、已有自然飞行动画、许可明确且可直接用于公开个人主页。以下是实际核实到的补充来源，**不是可以直接冒充鲲鹏的替代推荐**。

“公开展示”“可免费下载”“开源/开放许可”分别记录；不能互相推断。模型页面的许可也不自动授权其演示影片中使用的第三方天空或音乐。

## 有明确许可、但只适合作为基础的素材

| 来源 | 已核实的内容和许可 | 缺口及实际工作量 |
| --- | --- | --- |
| [The Gentle Giant — der_On / BlendSwap](https://blendswap.com/blend/8628) | 作者发布鲸鱼短片的源文件；页面标 CC BY；60.7 MB、Blender 2.5x。作者说明除天空外其他模型/贴图均自制，并明确移除了受 cgtextures 版权限制的天空。 | 是普通鲸，没有羽翼；旧版 Blender Internal 场景，需要材质迁移、GLB 导出及移动端优化。不能直接照搬演示影片天空。 |
| [Humpback Whale low poly rig with simple movement cycle — hanksantini / UFMG](https://blendswap.com/blend/33279) | 页面标 CC0；1.13 MB；Blender 5.0x；作者说明已绑定并带简单运动循环。 | 是自然座头鲸，没有羽翼，且明确是 low-poly。适合动作/加载链路验证，不满足电影级主视觉。 |
| [Whale — gabriel / BlendSwap](https://blendswap.com/blend/4618) | CC0；1.26 MB；有 rig、shape keys；身体和尾部由 mesh-deformer 驱动，嘴、眼、鳍使用 shape keys。 | 作者明确说未贴图；无羽翼；旧版 Blender 变形器不等同于可直接由 GLTFLoader 播放的骨骼动画，需要烘焙和导出。 |

以上许可和规格来自各作者上传页，不是转载站描述。没有下载并执行这些 `.blend` 文件；因此未验证内部 rig 的兼容性或实际帧率。

## 扩展到 Meshy 现有社区模型

[Meshy 官方 Whale 素材库](https://www.meshy.ai/tags/whale)说明社区模型可按 CC0 使用，提供 GLB/PBR、FBX、OBJ 等格式；同时说明多数鲸模型是静态网格，并非已绑定动画。

实际查看了以下**已存在**模型的发布预览，没有自行生成模型或影片：

- [Massive marine creature, carnivorous whale, covered in feathers…](https://www.meshy.ai/posts/0195afd7-d204-751c-8987-0494a7d2166a)：确有羽毛状表面，但实际预览为白色带齿怪兽，鳍短、无巨大羽翼；不符合安静、宏伟的鲲鹏形象。
- [Ethereal Blue Whale](https://www.meshy.ai/posts/0197b74a-2a3b-7fd4-af00-8469ee64a81b)：预览是蓝色荧光纹理的普通鲸，没有羽翼，游戏感明显。
- [A giant flying whale carrying a small ecosystem… — Wild190](https://www.meshy.ai/zh/posts/019de02e-a120-7328-8107-04e96dc7ff05)：页面结构化模型数据标 CC0；但主题是鲸背生态岛，与用户要求的无装饰、带羽翼鲲化鹏不符。

Meshy 的模型许可与发布预览图许可可能不同：当前页面文案区分模型 CC0、图片 CC BY-NC 4.0。即便最终采用模型，也不能把下载的预览图直接当商业背景图。没有把这些预览或模型集成进主页。

## 排除的“免费”或名称接近来源

- [CGDive / Todor 的 Humpback Whale](https://toshicg.gumroad.com/l/whale_3dmodel)：有贴图和简单 rig，但作者条款并非通用开放许可。个人非商业使用要求署名及邮件告知；小型商业项目要求付费；未联系作者或下载采用。
- [CGTrader — auspicious beast Kunpeng](https://www.cgtrader.com/3d-print-models/art/sculpture/3d-model-of-a-clay-sculpture-of-the-auspicious-beast-kunpeng)：真正以鲲鹏命名，但为付费打印雕塑，Royalty Free 不是开源；并非现成动画。
- [Floating Whale — Aleandrus / Nexprint](https://www.nexprint.com/en/models/G9363845)：CC BY-NC-SA，3MF 打印摆件，无飞行动画；不能当通用可商用资源。
- [If Whales Could Fly — Christopher Michel / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:If_Whales_Could_Fly._-_Flickr_-_Christopher.Michel.jpg)：CC BY 2.0，但为真实鲸照片，不是羽翼鲸、3D 动画或云海影片。

## 可执行的选择边界

若坚持原始视觉标准，不应把低多边形鲸、荧光怪兽或普通鹰通过遮罩包装后声称已经实现鲲鹏。现阶段应保留现有主页背景，把开放许可基础模型与真正符合造型的最终艺术素材分开评审。找到符合造型的素材后，再检查文件内的动画、贴图大小、许可证及浏览器性能；目前没有足够证据选择并部署某个补充候选。
