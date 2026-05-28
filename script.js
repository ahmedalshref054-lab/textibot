/* ============================================================
   script.js – TextTools Pro
   Vanilla JS · No dependencies · SEO-friendly
   ============================================================ */

"use strict";

/* ============================================================
   1. CONSTANTS & STATE
   ============================================================ */

const STORAGE_KEYS = {
  theme: "ttp_theme",
  lang:  "ttp_lang",
};

let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || "ar";
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";

/* ── 15 SEO Title Templates (bilingual) ── */
const TITLE_TEMPLATES = {
  ar: [
    (kw) => `دليل ${kw} الشامل: كل ما تحتاجه في 2026`,
    (kw) => `10 أسرار عن ${kw} لا يخبرك بها أحد`,
    (kw) => `كيف تتقن ${kw} في 30 يوماً فقط؟`,
    (kw) => `${kw}: الدليل النهائي للمبتدئين والمحترفين`,
    (kw) => `أفضل 7 استراتيجيات لـ ${kw} تتصدر جوجل 2026`,
    (kw) => `لماذا ${kw} هو مستقبل النجاح الرقمي؟`,
    (kw) => `${kw} من الصفر إلى الاحتراف: دليل مجاني`,
    (kw) => `أخطاء شائعة في ${kw} وكيف تتجنبها`,
    (kw) => `هل تعرف حقاً كيف يعمل ${kw}؟ الحقيقة الكاملة`,
    (kw) => `15 نصيحة ذهبية لإتقان ${kw} بسرعة`,
    (kw) => `${kw}: ما لم يقله لك الخبراء من قبل`,
    (kw) => `تعلم ${kw} خطوة بخطوة مع أمثلة حقيقية`,
    (kw) => `مراجعة شاملة لـ ${kw}: الإيجابيات والسلبيات`,
    (kw) => `كيف يستخدم المحترفون ${kw} لمضاعفة نتائجهم`,
    (kw) => `${kw} في 2026: التوقعات والتغييرات الكبرى`,
  ],
  en: [
    (kw) => `The Ultimate ${kw} Guide: Everything You Need in 2026`,
    (kw) => `10 ${kw} Secrets Nobody Tells You`,
    (kw) => `How to Master ${kw} in Just 30 Days`,
    (kw) => `${kw}: The Complete Beginner-to-Pro Handbook`,
    (kw) => `7 Proven ${kw} Strategies That Dominate Google in 2026`,
    (kw) => `Why ${kw} Is the Future of Digital Success`,
    (kw) => `${kw} From Zero to Expert: Free Step-by-Step Guide`,
    (kw) => `Common ${kw} Mistakes (And How to Avoid Them)`,
    (kw) => `Do You Really Understand ${kw}? The Full Truth`,
    (kw) => `15 Golden Tips to Master ${kw} Faster Than Ever`,
    (kw) => `${kw}: What the Experts Never Tell You`,
    (kw) => `Learn ${kw} Step by Step with Real-World Examples`,
    (kw) => `Full ${kw} Review: Pros, Cons & Verdict`,
    (kw) => `How Professionals Use ${kw} to 10× Their Results`,
    (kw) => `${kw} in 2026: Big Changes, Trends & Predictions`,
  ],
};

/* ============================================================
   2. DOM REFERENCES
   ============================================================ */

const body          = document.body;
const themeToggle   = document.getElementById("theme-toggle");
const themeIcon     = document.getElementById("theme-icon");
const langToggle    = document.getElementById("lang-toggle");
const langLabel     = document.getElementById("lang-label");

// Text Cleaner
const cleanInput    = document.getElementById("clean-input");
const charCount     = document.getElementById("char-count");
const btnSpaces     = document.getElementById("btn-spaces");
const btnLines      = document.getElementById("btn-lines");
const btnTrim       = document.getElementById("btn-trim");
const btnCopy       = document.getElementById("btn-copy");
const copyToast     = document.getElementById("copy-toast");

// Title Generator
const keywordInput  = document.getElementById("keyword-input");
const btnGenerate   = document.getElementById("btn-generate");
const titlesOutput  = document.getElementById("titles-output");

/* ============================================================
   3. THEME MANAGEMENT
   ============================================================ */

function applyTheme(theme) {
  if (theme === "light") {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    themeIcon.textContent = "☽";
  } else {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    themeIcon.textContent = "☀";
  }
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  currentTheme = theme;
}

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

/* ============================================================
   4. LANGUAGE MANAGEMENT (RTL / LTR)
   ============================================================ */

function applyLang(lang) {
  const html = document.documentElement;
  currentLang = lang;

  if (lang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    body.setAttribute("data-lang", "ar");
    langLabel.textContent = "EN";
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    body.setAttribute("data-lang", "en");
    langLabel.textContent = "عربي";
  }

  // Translate all elements with data-ar / data-en attributes
  document.querySelectorAll("[data-ar], [data-en]").forEach((el) => {
    const value = el.getAttribute(`data-${lang}`);
    if (value) el.textContent = value;
  });

  // Translate placeholders
  document.querySelectorAll("[data-placeholder-ar], [data-placeholder-en]").forEach((el) => {
    const ph = el.getAttribute(`data-placeholder-${lang}`);
    if (ph) el.setAttribute("placeholder", ph);
  });

  localStorage.setItem(STORAGE_KEYS.lang, lang);
}

langToggle.addEventListener("click", () => {
  applyLang(currentLang === "ar" ? "en" : "ar");
});

/* ============================================================
   5. TEXT CLEANER TOOL
   ============================================================ */

// Live character count
cleanInput.addEventListener("input", updateCharCount);

function updateCharCount() {
  charCount.textContent = cleanInput.value.length.toLocaleString();
}

// Remove extra spaces (collapse multiple spaces into one per line)
btnSpaces.addEventListener("click", () => {
  cleanInput.value = cleanInput.value
    .split("\n")
    .map((line) => line.replace(/ {2,}/g, " ").trim())
    .join("\n");
  updateCharCount();
});

// Delete blank lines
btnLines.addEventListener("click", () => {
  cleanInput.value = cleanInput.value
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
  updateCharCount();
});

// Full clean: spaces + blank lines + leading/trailing whitespace
btnTrim.addEventListener("click", () => {
  cleanInput.value = cleanInput.value
    .split("\n")
    .map((line) => line.replace(/ {2,}/g, " ").trim())
    .filter((line) => line !== "")
    .join("\n")
    .trim();
  updateCharCount();
});

// Copy to clipboard
btnCopy.addEventListener("click", async () => {
  const text = cleanInput.value;
  if (!text.trim()) {
    showToast(
      currentLang === "ar" ? "⚠️ لا يوجد نص للنسخ" : "⚠️ Nothing to copy",
      true
    );
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(currentLang === "ar" ? "✅ تم النسخ بنجاح!" : "✅ Copied!");
  } catch {
    // Fallback for older browsers
    cleanInput.select();
    document.execCommand("copy");
    showToast(currentLang === "ar" ? "✅ تم النسخ!" : "✅ Copied!");
  }
});

function showToast(msg, isError = false) {
  copyToast.textContent = msg;
  copyToast.style.color = isError
    ? "var(--accent)"
    : "var(--success)";
  copyToast.classList.add("show");
  setTimeout(() => copyToast.classList.remove("show"), 2200);
}

/* ============================================================
   6. TITLE GENERATOR TOOL
   ============================================================ */

btnGenerate.addEventListener("click", generateTitles);
keywordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateTitles();
});

function generateTitles() {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    titlesOutput.innerHTML = `
      <div class="titles-placeholder">
        <span class="placeholder-icon">⚠️</span>
        <p>${
          currentLang === "ar"
            ? "الرجاء إدخال كلمة مفتاحية أولاً"
            : "Please enter a keyword first"
        }</p>
      </div>`;
    return;
  }

  const templates = TITLE_TEMPLATES[currentLang];
  const fragment = document.createDocumentFragment();

  templates.forEach((fn, i) => {
    const title = fn(keyword);
    const item = createTitleItem(i + 1, title);
    item.style.animationDelay = `${i * 40}ms`;
    fragment.appendChild(item);
  });

  titlesOutput.innerHTML = "";
  titlesOutput.appendChild(fragment);
}

function createTitleItem(num, text) {
  const item = document.createElement("div");
  item.className = "title-item";

  const numEl = document.createElement("span");
  numEl.className = "title-num";
  numEl.textContent = num;

  const textEl = document.createElement("span");
  textEl.className = "title-text";
  textEl.textContent = text;

  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-title-btn";
  copyBtn.setAttribute("aria-label", currentLang === "ar" ? "نسخ العنوان" : "Copy title");
  copyBtn.textContent = currentLang === "ar" ? "نسخ" : "Copy";

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      const orig = copyBtn.textContent;
      copyBtn.textContent = currentLang === "ar" ? "✓ تم" : "✓ Done";
      copyBtn.style.color = "var(--success)";
      copyBtn.style.borderColor = "var(--success)";
      setTimeout(() => {
        copyBtn.textContent = orig;
        copyBtn.style.color = "";
        copyBtn.style.borderColor = "";
      }, 1800);
    } catch {
      // silent fail
    }
  });

  item.appendChild(numEl);
  item.appendChild(textEl);
  item.appendChild(copyBtn);
  return item;
}

/* ============================================================
   7. INIT – Apply saved preferences on load
   ============================================================ */

(function init() {
  applyTheme(currentTheme);
  applyLang(currentLang);
  updateCharCount();
})();
