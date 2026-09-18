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
  let isWaitingNext = false; // 次の問題への遷移待ちフラグ

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

    // 子音（アルファベットかつ母音以外の文字）が3文字以上の単語だけを厳密に抽出
    const validWords = WORD_DATABASE.filter(word => {
      const cleanWord = String(word).replace(/[^a-zA-Z]/g, "").toLowerCase();
      const consonants = removeVowels(cleanWord);
      return consonants.length >= 3;
    });

    // 子音3文字以上の単語が存在しない場合はエラー表示（データベースの確認が必要）
    if (validWords.length === 0) {
      questionDisplay.textContent = "NO WORD";
      return;
    }

    // 子音3文字以上の単語群から、有効な問題が生成できるまでランダム選出をループ
    let selectedWord = "";
    let questionText = "";

    while (questionText.length < 3) {
      const randomIndex = Math.floor(Math.random() * validWords.length);
      selectedWord = String(validWords[randomIndex]).replace(/[^a-zA-Z]/g, "").toLowerCase();
      questionText = removeVowels(selectedWord);
    }

    sampleAnswer = selectedWord;
    currentQuestion = questionText;

    // 画面表示と状態のリセット
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
    // すでに正解・降参後で「次の問題待ち」状態の場合
    if (isWaitingNext) {
      generateQuestion();
      return;
    }

    const inputWord = userInput.value.trim().toLowerCase();
    if (!inputWord) return;

    // 条件1: データベース内に存在する英単語か？
    const existsInDB = WORD_DATABASE.map(w => w.toLowerCase()).includes(inputWord);

    // 条件2: 入力単語から母音を抜いたものが問題文と一致するか？
    const matchesPattern = removeVowels(inputWord) === currentQuestion;

    if (existsInDB && matchesPattern) {
      // 正解処理
      score += 10;
      streak += 1;
      updateStats();
      showFeedback(`正解！ 🎉（"${inputWord}"）\n[Enter] または「次の問題」を押してください`, true);
      
      // 状態の切り替え
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

    // 現在の問題に対する全正解候補を検索
    const validAnswers = WORD_DATABASE.filter(
      w => removeVowels(w.toLowerCase()) === currentQuestion
    );

    streak = 0;
    updateStats();
    showFeedback(`答え: ${validAnswers.join(", ")}\n[Enter] または「次の問題」を押してください`, false);

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
    const validAnswers = WORD_DATABASE.filter(
      w => removeVowels(w.toLowerCase()) === currentQuestion
    );

    hintBox.textContent = `💡 ヒント: 文字数は ${sampleAnswer.length} 文字（正解候補は全部で ${validAnswers.length} 個）`;
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
