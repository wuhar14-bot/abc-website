# ABC Website — Project Progress

> 跨 session 状态追踪。每次新开对话先读这个文件。
> 项目路径: `E:\claude-code\abc\abc-website\`
> 网址目标: anythingbutclimbing.com

---

## 当前状态 (2026-03-06)

**阶段**: Phase 3 完成，待做 Checkout + 部署

**可以直接预览**: `cd abc-website && npm run dev` → http://localhost:3000

---

## 已完成 ✅

### 项目基础
- [x] Next.js 16 + Tailwind v4 脚手架 (`abc-website/`)
- [x] 安装 Zustand, next-intl
- [x] 品牌设计系统：黑/白/红 (#e63232)，Space Grotesk 字体，noise overlay
- [x] Navbar（固定，显示购物车实时计数）
- [x] Footer

### 页面
- [x] `/` 首页：hero + 红色 marquee 跑马灯 + 产品预览卡片 + Manifesto
- [x] `/products` 产品列表页
- [x] `/products/chalkemon` Chalkemon 详情页
  - 真实产品图 gallery（15张 DSC01xxx.png）
  - 颜色选择器（Sooty Boo / Muddy Buddy / Dolong Odo）
  - 真实中英双语文案
  - 加购功能（接 Zustand）
- [x] `/products/tshirt` T恤详情页（尺码选择 + 加购）
- [x] `/cart` 购物车页（增减数量、删除、小计）
- [x] `/about` 品牌故事页（真实文案 + Manifesto + Chalkemon介绍）

### 内容
- [x] 15张实拍产品图复制到 `public/photos/`
- [x] 从 `E:\claude-code\abc\` 收集真实品牌文案（见 `_dev/findings.md`）
- [x] 确认 slogan 存入 `README.md`

---

## 待完成 ⏳

### Phase 4 — Checkout & Payments
- [ ] `/checkout` 页面（姓名、邮件、地址表单）
- [ ] Stripe 集成（需要 Stripe 账号 + API key）
- [ ] PayPal 按钮
- [ ] 订单确认页 `/order/[id]`
- [ ] 运费计算（固定分区：HK free / 国际 HK$120）

### Phase 5 — Backend
- [ ] Supabase 项目创建（orders 表）
- [ ] Stripe webhook → 更新订单状态
- [ ] 确认邮件（Resend）

### Phase 6 — 部署
- [ ] 创建 GitHub repo (`wuhar14-bot/abc-website`)
- [ ] 连接 Vercel
- [ ] 配置 GoDaddy DNS → Vercel（A record）
- [ ] 测试完整结账流程

---

## 关键决策记录

| 项目 | 决策 |
|---|---|
| 支付 | Stripe（卡 + 内置 WeChat/Alipay）+ PayPal |
| 后端 | Supabase (PostgreSQL) |
| 结账 | Guest checkout，不需要注册 |
| 运费 | 固定分区（香港免运 / 国际 HK$120） |
| 语言 | 中英双语（英文主，中文辅） |
| 购物车 | Zustand 客户端状态（非持久化，刷新清空） |
| 图片 | 本地 public/photos/，Next.js Image 优化 |

---

## 环境变量（待填写）

创建 `abc-website/.env.local`：
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://anythingbutclimbing.com
```

---

## 品牌 Slogan（已确认）

| 用途 | 文案 |
|---|---|
| 品牌名 / 主 slogan | Anything But Climbing |
| 中文品牌名 | 非爬不可 |
| 产品理念 | Oddly useful. Always FUNctional. |
| Instagram hashtag | #HopelesslyObsessed |
| 长版品牌宣言 | 不做一本正经的装备，给一本正经的攀岩者做有趣的小东西。 |
| Chalkemon 产品文案 | 陪你非爬不可的小毛球。 |

---

## 文件索引

| 文件 | 说明 |
|---|---|
| `app/page.tsx` | 首页 |
| `app/products/chalkemon/page.tsx` | Chalkemon 详情（含颜色/图片/文案） |
| `app/products/tshirt/page.tsx` | T恤详情 |
| `app/cart/page.tsx` | 购物车 |
| `app/about/page.tsx` | 品牌故事 |
| `lib/cart.ts` | Zustand 购物车 store |
| `components/Navbar.tsx` | 顶部导航 |
| `components/Footer.tsx` | 底部 |
| `public/photos/` | 15张产品实拍图 |
| `_dev/findings.md` | 品牌研究笔记（颜色/产品/文案来源） |
| `_dev/task_plan.md` | 原始项目计划 |

---

## Session 日志

### Session 1-2 — 2026-03-06
- 分析品牌设计（design-reference.html + 7张 Figma 截图）
- 收集品牌信息（扫描 `E:\claude-code\abc\` 744个文件）
- 确认技术栈、支付方式、运费方案
- 搭建 Next.js 项目，完成所有页面（首页到购物车）
- 整合真实产品图和品牌文案
- 确认品牌 slogan 写入 README.md
