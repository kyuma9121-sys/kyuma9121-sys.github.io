/* =========================================================
   Portfolio Interactive Script (app.js)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. タイピングアニメーション（Heroセクション）
  // ==========================================
  // ★ここに入力：トップ画面で1文字ずつ順番に表示させたいフレーズ
  const phrases = [
    "Web Design & Development (HTML / CSS / JS / WordPress)",
    "Creative Coding with Processing & Python",
    "Kendo 3-Dan / Eiken Pre-1st / IT Passport"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typingText");

  function typeLoop() {
    if (!typingEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // 1文字ずつ増やす
      typingEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000); // 全文表示後に2秒待機
        return;
      }
    } else {
      // 1文字ずつ消す
      typingEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 35 : 65);
  }
  typeLoop();

  // ==========================================
  // 2. スクロール連動フェードイン＆スキルバー伸長
  // ==========================================
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 画面内に入ったら visible クラスを付与して浮かび上がらせる
        entry.target.classList.add("visible");

        // Skillsセクション内のゲージを data-level の数値まで伸ばす
        const bars = entry.target.querySelectorAll(".skill-bar-fill");
        bars.forEach((bar) => {
          bar.style.width = bar.dataset.level;
        });
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));

  // ==========================================
  // 3. ダークモード / ライトモード切り替え
  // ==========================================
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    });
  }

  // ==========================================
  // 4. Works カテゴリフィルター機能
  // ==========================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // ボタンの選択状態を切り替え
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetCategory = btn.dataset.filter;

      // カードの表示・非表示を切り替え
      workCards.forEach((card) => {
        if (targetCategory === "all" || card.dataset.category === targetCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ==========================================
  // 5. Works 詳細モーダルウィンドウ（ポップアップ）
  // ==========================================
  const modal = document.getElementById("workModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalTech = document.getElementById("modalTech");
  const modalDesc = document.getElementById("modalDesc");
  const modalLink = document.getElementById("modalLink");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  workCards.forEach((card) => {
    card.addEventListener("click", () => {
      // HTML側の data-〇〇 属性に書いたテキストを読み込んでモーダルに反映
      modalTitle.textContent = card.dataset.title;
      modalTech.textContent = card.dataset.tech;
      modalDesc.textContent = card.dataset.desc;
      modalLink.href = card.dataset.link;
      modal.classList.add("open");
    });
  });

  // 閉じるボタン、または背景の暗い部分をクリックしたら閉じる
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

});
