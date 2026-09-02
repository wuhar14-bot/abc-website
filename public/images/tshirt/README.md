# T恤图片 — ABC 独立站

新的 T 恤图片放这个文件夹。站上引用路径是 `/images/tshirt/<文件名>`。

例：`public/images/tshirt/model-burgundy-01.jpg` → 代码里写 `/images/tshirt/model-burgundy-01.jpg`

## 命名建议

| 类型 | 命名 | 例 |
|:---|:---|:---|
| 模特图 | `model-<颜色>-<序号>.jpg` | `model-burgundy-01.jpg` |
| 平铺图 | `flat-<颜色>-<正/背>.jpg` | `flat-black-back.jpg` |
| 色卡/规格图 | `spec-<颜色>.png` | `spec-navy.png` |
| 细节图 | `detail-<部位>.jpg` | `detail-collar.jpg` |
| 尺码表 | `size-chart.png` | |

颜色用英文小写：`black` `burgundy` `navy` `armygreen` `blue` `lightblue` `gray` `lightgray` `apricot` `pink`

## 注意

- **老图还在 `public/images/` 根目录**（`tshirt-*.jpg` / `tshirt-spec-*.png`），代码正在引用，没动过。新图走这个子文件夹，要迁老图再说。
- 上站的照片先压到 web 尺寸（长边 ~1600px，JPG 质量 80），别直接放 20MB 的原图。原图归档在 `E:\claude-code\abc\产品照片库\T恤\`。
- 只放要上站的图。AI 生成的草稿、设计源文件不进这里。
