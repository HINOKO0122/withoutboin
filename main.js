document.addEventListener("DOMContentLoaded", () => {
  // DOM要素
  const questionDisplay = document.getElementById("question-display");
  const userInput = document.getElementById("user-input");
  const answerForm = document.getElementById("answer-form");
  const feedbackMessage = document.getElementById("feedback-message");
  const scoreDisplay = document.getElementById("score");
  const streakDisplay = document.getElementById("streak");
  const skipBtn = document.getElementById("skip-btn");
  const hintBtn = document.getElementById("hint-btn");
  const hintBox = document.getElementById("hint-box");
  const quizCard = document.querySelector(".quiz-card");

  // アプリの状態
  let currentQuestion = ""; // 例: "dg"
  let sampleAnswer = "";    // 代表解 (例: "dog")
  let score = 0;
  let streak = 0;

  // 母音を取り除く関数
  function removeVowels(word) {
    return word.toLowerCase().replace(/[aiueo]/g, "");
  }

  // 新しい問題を設定
  function generateQuestion() {
    if (!WORD_DATABASE || WORD_DATABASE.length === 0) {
      questionDisplay.textContent = "ERR";
      return;
    }

    // ランダムに基本単語を選択
    const randomIndex = Math.floor(Math.random() * WORD_DATABASE.length);
    sampleAnswer = WORD_DATABASE[randomIndex].toLowerCase();
    currentQuestion = removeVowels(sampleAnswer);

    // 母音のみの単語など、抜け結果が空になる場合は再生成
    if (currentQuestion.length === 0) {
      generateQuestion();
      return;
    }

    questionDisplay.textContent = currentQuestion.toUpperCase();
    userInput.value = "";
    hideFeedback();
    hideHint();
    userInput.focus();
  }

  // 判定ロジック
  function checkAnswer(inputWord) {
    const cleanedInput = inputWord.trim().toLowerCase();

    if (!cleanedInput) return;

    // 条件1: データベース内に存在する英単語か？
    const existsInDB = WORD_DATABASE.map(w => w.toLowerCase()).includes(cleanedInput);

    // 条件2: 入力単語から母音を抜いたものが問題文と一致するか？
    const matchesPattern = removeVowels(cleanedInput) === currentQuestion;

    if (existsInDB && matchesPattern) {
      // 正解処理
      score += 10;
      streak += 1;
      updateStats();
      showFeedback(`正解！ 🎉（"${cleanedInput}"）`, true);

      // 少し待って次の問題へ
      setTimeout(() => {
        generateQuestion();
      }, 1200);
    } else {
      // 不正解処理
      streak = 0;
      updateStats();
      
      let errorMsg = "不正解です。もう一度挑戦してみよう！";
      if (!existsInDB && matchesPattern) {
        errorMsg = "母音パターンは合っていますが、データベースに存在しない単語です。";
      } else if (existsInDB && !matchesPattern) {
        errorMsg = "単語は存在しますが、問題の母音パターンと一致しません。";
      }

      showFeedback(errorMsg, false);
      triggerShake();
    }
  }

  // スコア・連続正解数の表示更新
  function updateStats() {
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
  }

  // フィードバックの表示
  function showFeedback(text, isSuccess) {
    feedbackMessage.textContent = text;
    feedbackMessage.className = `feedback-message ${isSuccess ? "success" : "error"}`;
  }

  function hideFeedback() {
    feedbackMessage.className = "feedback-message hidden";
  }

  // シェイクアニメーション
  function triggerShake() {
    quizCard.classList.add("shake");
    setTimeout(() => {
      quizCard.classList.remove("shake");
    }, 400);
  }

  // ヒント表示
  function showHint() {
    // 現在の問題パターンに当てはまる答えの候補数を算出
    const validAnswers = WORD_DATABASE.filter(
      w => removeVowels(w.toLowerCase()) === currentQuestion
    );

    hintBox.textContent = `💡 ヒント: 文字数は ${sampleAnswer.length} 文字（正解候補は全部で ${validAnswers.length} 個あります）`;
    hintBox.classList.remove("hidden");
  }

  function hideHint() {
    hintBox.classList.add("hidden");
  }

  // イベントリスナー
  answerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkAnswer(userInput.value);
  });

  skipBtn.addEventListener("click", () => {
    streak = 0;
    updateStats();
    generateQuestion();
  });

  hintBtn.addEventListener("click", showHint);

  // 初期化
  generateQuestion();
});
