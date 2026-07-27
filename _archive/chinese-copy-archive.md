# ABC Website — 中文文案存档

> 归档日期：2026-07-27
> 原因：网站改为纯英文（不对外显示中文/中国关联）。此文件保留所有原中文文案，便于日后恢复双语。
> 恢复方式：把各文件的英文分支旁重新加回 `lang === "cn" ? "<中文>" : "<英文>"` ternary，并恢复 `lib/lang.ts` 默认值 + Navbar 语言切换按钮。

---

## lib/lang.ts（原始机制）

```ts
export type Lang = "cn" | "en";
export const useLang = create<LangStore>((set) => ({
  lang: "cn",          // 原默认中文
  setLang: (lang) => set({ lang }),
}));
```

---

## components/Navbar.tsx — 语言切换按钮（已移除）

```tsx
{/* Lang toggle */}
<div className="flex font-mono text-[10px] tracking-[0.15em] border border-abc-gray-mid">
  <button onClick={() => setLang("cn")} ...>CN</button>
  <button onClick={() => setLang("en")} ...>EN</button>
</div>
```

---

## components/Footer.tsx

| 位置 | 中文 |
|:---|:---|
| Social 第二链接 | 小红书（链接 https://www.xiaohongshu.com） |

---

## app/page.tsx（首页）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 新品标签 | — 新品上架 — | — New Drop Available — |
| Hero 副标题 | 认识 Chalkemon 粉袋精灵。 | Meet Chalkemon — your chalk bag companion. |
| Shop 按钮 | 入手 Chalkemon | Shop Chalkemon |
| About 按钮 | 我们的故事 | Our Story |
| 系列标签 | 新品上架 | NEW DROP |
| 系列标题 | 本季系列 | The Collection |
| 查看全部 | 查看全部 → | View All → |
| Chalkemon 卡 sub | 粉袋精灵 | Chalk Bag |
| ABC TEE 卡 sub | 短袖 | T-Shirt |
| Chalkemon tag | 热销 | BESTSELLER |
| ABC TEE tag | 限量 | LIMITED |

---

## app/products/page.tsx（商品列表）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 商店 | Shop |
| 标题 | 全部商品 | All Products |
| Chalkemon sub | 粉袋精灵 | Chalk Bag |
| ABC TEE sub | 短袖 | T-Shirt |
| Chalkemon tag | 热销 | BESTSELLER |
| ABC TEE tag | 限量 | LIMITED |

---

## app/about/page.tsx（关于）

**Hero 标题（中文版）**：非爬不可吗？

**heroLabel**：//// About ABC

**品牌故事 story（中文）**：
1. 我们是ABC，三个沉迷攀岩到无可救药的人组成的兴趣小组。
2. AnythingButClimbing，是我们对「非爬不可」的一种自嘲。
3. ABC是我们生活的B面，是岩壁之外的另一种延伸。
4. 我们喜欢关注一些攀岩无用好物——不一定必要，但一定好玩，致力于为攀岩社区带来更多FUN-ctionality！
5. 让攀岩这件事，继续好玩下去。

**chalkLabel（中文）**：//// 粉袋精灵

**chalkBody（中文）**：
1. Chalkemon 是粉袋精灵。它不是专业装备，也不只是装饰品——它是一个毛茸茸、会发热的小东西，陪你在岩壁上熬过最冷的冬天。
2. 石头做的眼睛，绳子缝的嘴。每一只都是手工的，有时候遇到它也是缘分。我们也没办法解释它到底是干嘛的——就像无法解释清楚一个人为什么非爬不可。

**contactLabel（中文）**：//// 找到我们
**Shop Chalkemon 按钮**：入手 Chalkemon →
**Email 按钮**：发邮件给我们

---

## app/products/tshirt/page.tsx（T恤 PDP）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 颜色名 black | 黑色 | Black |
| 颜色名 burgundy | 酒红 | Burgundy |
| 颜色名 navy | 藏青 | Navy |
| 颜色名 armygreen | 军绿 | Army Green |
| 颜色名 blue | 蓝色 | Royal Blue |
| 颜色名 lightblue | 浅蓝 | Sky Blue |
| 颜色名 gray | 灰色 | Heather Gray |
| 颜色名 lightgray | 浅灰 | Light Gray |
| 颜色名 apricot | 杏色 | Apricot |
| 颜色名 pink | 粉红 | Pink |
| 特性1 | 宽松街头廓形 | Oversized streetwear fit |
| 特性2 | 棉 + Sorona 混纺，柔软抗皱 | Cotton + Sorona blend, soft & wrinkle-resistant |
| 特性3 | 手写体背印 | Hand-lettered back print |
| 特性4 | 10 种配色可选 | 10 colorways available |
| 描述 | 宽松街头短袖，背面手写体「AnythingButClimbing」印花，胸前ABC logo。 | Oversized streetwear tee with the hand-lettered "AnythingButClimbing" print on the back. ABC logo on the front chest. |
| 颜色标签 | 颜色 — {name} | Color — {name} |
| 尺码标签 | 尺码 — {size} | Size — {size} |
| 加购成功 | ✓ 已加入购物车 | ✓ Added to Cart |
| 加购按钮 | 加入购物车 — HK$280 | Add to Cart — HK$280 |
| 运费 | 香港免运费 · 国际配送 HK$120起 | Free shipping HK · Worldwide from HK$120 |

---

## app/products/chalkemon/page.tsx（Chalkemon PDP）

**COLORWAYS 中文名**：Sooty Boo=煤球精灵 / Muddy Buddy=泥巴精灵 / Dolong Odo=石笋精灵

**FEATURES（中文）**：
1. 每只都是独一无二的手工制作
2. 石头眼睛，绳子缝的嘴
3. 粉袋 + 暖手器双功能
4. 附赠6个定制暖宝宝
5. 登山扣挂环，挂哪都行
6. 不是玩具，但也不只是装备

**DETAILS（中文）**：
- Craft=手工制作：每只都是手工制作。石头眼睛，绳子缝嘴，登山扣挂环。没有两只完全一样。
- Function=双重功能：粉袋 + 暖手器双功能。塞入暖宝宝，寒冬攀岩持续保暖6小时以上。
- Includes=套装内容：1× Chalkemon 本体，6× 定制暖宝宝，登山扣，特别包装。

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 粉袋精灵 | Chalk Bag |
| 副标题 | 陪你非爬不可的小毛球 | Your chalk bag companion. |
| 颜色版本标签 | 颜色版本 — {cn} | Colorway — {name} |
| 描述 | Chalkemon 是手工制作的粉袋精灵——毛茸茸、暖烘烘，每一只都是独一无二的。石头眼睛，绳子缝的嘴，内置暖手器。 | (见英文原文) |
| 品牌段标签 | //// 它到底是什么？ | //// What is it, exactly? |
| SectionHeader In the Wild | 使用场景 | In the Wild |
| SectionHeader Product Details | 产品细节 | Product Details |
| SectionHeader Colorways | 颜色特别版 | Colorways |

**品牌段文案（中文）**：
- 它不是专业装备，也不只是装饰品——它是一个毛茸茸、会发热的小东西。
- 眼睛是石头做的。嘴是绳子缝的。它会微笑——然后默默评判你的动作序列。
- 我们也没办法解释它到底是干嘛的。就像无法解释一个人为什么非爬不可。

---

## app/cart/page.tsx（购物车）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 购物车 | Your Cart |
| 空购物车标题 | 空空如也 | Empty |
| 去逛逛 | 去逛逛 | Shop Now |
| 件数 | {n} 件商品 | {n} Item(s) |
| 删除 | 删除 | Remove |
| 小计 | 小计 | Subtotal |
| 运费提示 | 运费在结账时计算 | Shipping calculated at checkout |
| 结账 | 前往结账 → | Proceed to Checkout → |

---

## app/checkout/page.tsx（结账）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 结账 | Checkout |
| 标题 | 确认订单 | Review Order |
| 信息提示 | 收货地址与运费将在下一步（Stripe 安全收银台）填写。支付由 Stripe 处理，我们不接触你的银行卡信息。 | (见英文原文) |
| 购物车按钮 | 购物车 | Cart |
| 支付中 | 跳转中… | Redirecting… |
| 支付按钮 | 前往支付 → | Pay with Stripe → |
| 订单摘要 | 订单摘要 | Order Summary |
| 件数 | 件数 | Items |
| 小计 | 小计 | Subtotal |
| 运费提示 | 运费下一步计算 | Shipping calculated next step |
| 合计 | 合计 | Total |

---

## app/success/page.tsx（支付成功）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 支付成功 | Order Placed |
| 标题 | 谢谢你！ | Thank You! |
| 正文 | 订单已提交成功，确认邮件稍后发送到你的邮箱。 | Your order has been placed successfully. You'll receive a confirmation email shortly. |
| 按钮 | 返回首页 | Back to Home |

---

## app/cancel/page.tsx（支付取消）

| 键 | 中文 | 英文 |
|:---|:---|:---|
| 标签 | 支付已取消 | Payment Cancelled |
| 标题 | 还没付款 | No Charge Made |
| 正文 | 你取消了支付，购物车里的东西还在，随时可以回来结账。 | You cancelled the payment. Your cart is still saved — come back whenever you're ready. |
| 按钮 | 返回购物车 | Back to Cart |
