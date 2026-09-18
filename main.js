document.addEventListener("DOMContentLoaded", () => {
  // DOM要素
  const questionDisplay = document.getElementById("question-display");
  const userInput = document.getElementById("user-input");
  const answerForm = document.getElementById("answer-form");
  const submitBtn = document.getElementById("submit-btn");
  const feedbackMessage = document.getElementById("feedback-message");
  const scoreDisplay = document.getElementById("score");
  const streakDisplay = document.getElementById("streak");
  const showAnswerBtn = document.getElementById("show-answer-btn");
  const hintBtn = document.getElementById("hint-btn");
  const hintBox = document.getElementById("hint-box");
  const quizCard = document.querySelector(".quiz-card");

  // アプリの状態
  let currentQuestion = ""; 
  let sampleAnswer = "";    
  let score = 0;
  let streak = 0;
  let isWaitingNext = false;

  // 母音を取り除く関数
  function removeVowels(word) {
    return word.toLowerCase().replace(/[aiueo]/g, "");
  }

  // 現在の問題に対する WORD_DATABASE 内の「すべての正解候補」を取得する関数
  function getAllValidAnswers() {
    if (!WORD_DATABASE) return [];
    
    // 重複を排除しつつ一致する単語を抽出
    const uniqueWords = Array.from(new Set(WORD_DATABASE));
    return uniqueWords.filter(w => {
      const cleanWord = String(w).replace(/[^a-zA-Z]/g, "").toLowerCase();
      return removeVowels(cleanWord) === currentQuestion;
    });
  }

  // 新しい問題を設定
  function generateQuestion() {
    if (!WORD_DATABASE || WORD_DATABASE.length === 0) {
      questionDisplay.textContent = "ERR";
      return;
    }

    // 子音（母音抜き）が3文字以上の単語のみを抽出
    const validWords = WORD_DATABASE.filter(word => {
      const cleanWord = String(word).replace(/[^a-zA-Z]/g, "").toLowerCase();
      const consonants = removeVowels(cleanWord);
      return consonants.length >= 3;
    });

    if (validWords.length === 0) {
      questionDisplay.textContent = "NO WORD";
      return;
    }

    const randomIndex = Math.floor(Math.random() * validWords.length);
    sampleAnswer = String(validWords[randomIndex]).replace(/[^a-zA-Z]/g, "").toLowerCase();
    currentQuestion = removeVowels(sampleAnswer);

    questionDisplay.textContent = currentQuestion.toUpperCase();
    userInput.value = "";
    userInput.disabled = false;
    submitBtn.querySelector("span").textContent = "判定";
    isWaitingNext = false;

    hideFeedback();
    hideHint();
    userInput.focus();
  }

  // 判定および進行ロジック
  function handleFormSubmit() {
    if (isWaitingNext) {
      generateQuestion();
      return;
    }

    const inputWord = userInput.value.trim().toLowerCase();
    if (!inputWord) return;

    // WORD_DATABASE 内に小文字変換して存在するか確認
    const cleanDB = WORD_DATABASE.map(w => String(w).replace(/[^a-zA-Z]/g, "").toLowerCase());
    const existsInDB = cleanDB.includes(inputWord);
    const matchesPattern = removeVowels(inputWord) === currentQuestion;

    if (existsInDB && matchesPattern) {
      // 正解処理：words.js 内の全別解を取得して表示
      score += 10;
      streak += 1;
      updateStats();

      const allAnswers = getAllValidAnswers();
      const answersText = allAnswers.join(", ");

      showFeedback(
        `正解！ 🎉（あなたが入力: "${inputWord}"）\n` +
        `【すべての正解候補 (${allAnswers.length}個)】\n${answersText}\n\n` +
        `[Enter] または「次の問題」を押してください`, 
        true
      );
      
      isWaitingNext = true;
      userInput.disabled = true;
      submitBtn.querySelector("span").textContent = "次の問題";
      submitBtn.focus();
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

  // 「答えを見る」処理
  function showAnswer() {
    if (isWaitingNext) return;

    const allAnswers = getAllValidAnswers();
    const answersText = allAnswers.join(", ");

    streak = 0;
    updateStats();
    
    showFeedback(
      `【すべての正解候補 (${allAnswers.length}個)】\n${answersText}\n\n` +
      `[Enter] または「次の問題」を押してください`, 
      false
    );

    isWaitingNext = true;
    userInput.disabled = true;
    submitBtn.querySelector("span").textContent = "次の問題";
    submitBtn.focus();
  }

  // スコア表示の更新
  function updateStats() {
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
  }

  // フィードバックの表示
  function showFeedback(text, isSuccess) {
    feedbackMessage.innerText = text;
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
    const allAnswers = getAllValidAnswers();

    hintBox.textContent = `💡 ヒント: 出題例の文字数は ${sampleAnswer.length} 文字（正解候補はデータベース内に合計 ${allAnswers.length} 個）`;
    hintBox.classList.remove("hidden");
  }

  function hideHint() {
    hintBox.classList.add("hidden");
  }

  // イベントリスナー
  answerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit();
  });

  showAnswerBtn.addEventListener("click", showAnswer);
  hintBtn.addEventListener("click", showHint);

  // 初期化
  generateQuestion();
});
