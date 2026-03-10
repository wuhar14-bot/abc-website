# Task Plan: Chalkemon PDP CN/EN Language Toggle

## Goal
为 Chalkemon PDP 页面添加 CN/EN 手动语言切换，所有双语内容通过 toggle 控制，不同时显示两种语言。

## Status: in_progress

---

## 双语内容审计（Phase 1 ✅）

| 位置 | EN | CN |
|---|---|---|
| label `//// Chalk Bag · 粉袋精灵` | `Chalk Bag` | `粉袋精灵` |
| subtitle | `Your chalk bag companion.` | `陪你非爬不可的小毛球` |
| Colorway label | `Colorway — {name}` | `· {cn}` |
| FEATURES 每行副文 | `f.en` only | `f.cn` (currently both shown) |
| SectionHeader "In the Wild" | EN | `使用场景` |
| SectionHeader "Product Details" | EN | `产品细节` |
| Detail cards subtitle | — | `item.cn` |
| SectionHeader "Colorways" | EN | `颜色特别版` |
| Colorway cards 中文名 | — | `c.cn` (currently always shown) |

---

## Phase 2: 设计方案 ✅

- `const [lang, setLang] = useState<"cn" | "en">("cn")` — 默认 CN
- Toggle UI：产品信息区 `//// label` 右侧，`CN | EN` 文字按钮
- SectionHeader 接受 `lang` prop
- 所有双语字段用 `lang === "cn" ? cn : en` 条件渲染

---

## Phase 3: 实现 [ ]

- [ ] 添加 lang state + toggle UI
- [ ] label 区域条件渲染
- [ ] subtitle 条件渲染
- [ ] Colorway label 条件渲染
- [ ] FEATURES 列表：只显示 `f.en` 或 `f.cn`，去掉副行
- [ ] SectionHeader 传 lang，条件显示中文副标题
- [ ] Product Details cards 条件显示 `item.cn`
- [ ] Colorway cards 条件显示 `c.cn`

## Phase 4: Verify [ ]
- [ ] 默认 CN 显示正确
- [ ] 切换 EN 所有文案切换
