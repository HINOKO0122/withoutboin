// 高校1年生以下（中学〜高1基礎）の英単語データベース（約1,000語）
const WORD_DATABASE = [
  // --- 中学1〜2年レベル（超基本） ---
  // 名詞：身の回り・学校・家族・自然
  "apple", "desk", "chair", "table", "window",
  "clock", "watch", "phone", "computer", "picture",
  "bird", "fish", "tiger", "rabbit", "horse",
  "star", "sky", "cloud", "snow", "wind", "river",
  "flower", "grass", "park", "school", "class", "teacher", "student", "friend", "family",
  "father", "mother", "brother", "sister", "daughter", "child", "children", "girl",
  "woman", "person", "people", "doctor", "nurse", "driver", "player", "king",
  "water", "milk", "coffee", "bread",
  "lunch", "dinner", "breakfast", "fruit", "fish", "sugar", "salt",
  "car", "bus", "train", "bike", "ship", "plane", "station", "airport", "street",
  "city", "town", "country", "japan", "world", "word", "number",
  "month", "week", "minute", "second", "morning", "afternoon", "evening",
  "night", "today", "tomorrow", "yesterday", "spring", "summer", "autumn", "winter", "season", "weather",

  // 身体・服
  "mouth", "tooth", "hand",
  "body", "heart", "shirt", "pants", "shoes",

  // 動詞（動作・状態）
  "watch", "listen", "speak", "talk", "tell", "write", "study", "learn", "teach",
  "walk", "jump", "swim", "play", "sing", "dance", "drink",
  "sleep", "wash", "close", "start", "stop", "finish", "clean", "help",
  "find", "sell", "send", "bring", "carry", "push",
  "pull", "stand", "fall", "know",
  "think", "want", "stay", "work",

  // 形容詞・副詞
  "small", "large", "little", "long", "short", "high",
  "cold", "warm", "young", "fast", "slow", "early",
  "hard", "soft", "heavy", "light", "bright", "dark", "clean", "dirty",
  "happy", "kind", "busy", "rich", "fine", "great",
  "blue", "green", "yellow", "white", "black", "pink", "brown", "orange", "purple",
  "very",  "well", "then", "there", "always", "usually",
  "often", "sometimes", "never", "again", "today", "together", "maybe", "really",

  // --- 中学3年〜高校1年レベル（基礎応用） ---
  // 名詞：概念・社会・情報
  "bank", "beach", "beauty", "blood", "board", "brain", "bridge",
  "building", "business", "camera", "card", "center", "chance", "change", "church", "circle", "cloth",
  "club", "color", "company", "corner", "culture", "danger", "death", "decision",
  "design", "dream", "earth", "effort", "energy", "event", "fact", "farm", "field",
  "floor", "forest", "future", "garden", "glass", "ground", "group", "health",
  "history", "holiday", "hospital", "hotel", "human",
  "interest", "island", "journey", "kind", "land", "language",
  "light", "list", "machine", "market", "matter", "meaning", "memory", "mind", "money",
  "mountain", "music", "nature", "news", "office", "order", "paper", "part",
  "party", "past", "place", "plan", "plant", "point", "police", "power",
  "practice", "present", "problem", "question", "radio", "reason", "rule", "safety", "sand", "science",
  "score", "shape", "sign", "skill", "space", "speech", "sport", "stage", "stone",
  "store", "story", "subject", "system", "task", "taste", "team", "test", "thought", "ticket",
  "topic", "trip", "trouble", "truth", "universe", "wall",
  "weather", "weight", "work", "yard", "youth",

  // 動詞（発信・思考・変化）
  "accept", "agree", "allow", "appear", "arrive", "become", "begin", "believe",
  "belong", "build", "call", "change", "check", "choose", "collect", "compare", "connect", "continue",
  "create", "cross", "decide", "describe", "discover", "discuss", "draw",
  "drive", "drop", "enjoy", "enter", "explain", "express", "fill", "follow", "forget",
  "grow", "guess", "happen", "hold", "hurt", "imagine", "include",
  "increase", "invite", "jump", "kill", "laugh", "leave", "lend",
  "match", "notice", "offer", "pass", "pick", "plan",
  "prepare", "produce", "protect", "prove", "provide", "reach", "receive", "remember", "repeat",
  "report",
  "return", "ring", "search", "serve", "set", "share", "show",
  "sing", "smile", "sound", "spend", "stand", "start", "suggest", "surprise", "touch", "travel",
  "turn", "understand", "visit", "wish", "worry",

  // 形容詞（感情・状態・社会）
  "active", "afraid", "alone", "angry", "another", "available", "beautiful", "best", "better",
  "brave", "bright", "broad", "calm", "careful", "certain", "cheap", "clear", "clever", "close",
  "common", "complete", "correct", "daily", "dangerous", "dark",
  "different", "difficult", "early", "empty", "equal", "famous", "fast",
  "favorite", "final", "first", "foreign", "formal", "fresh", "full",
  "funny", "general", "glad", "great", "green", "half", "hard", "heavy", "high", "honest",
  "hungry", "important", "impossible", "international", "kind", "last", "lazy",
  "left", "light", "likely", "local", "lonely", "lucky", "major",
  "many", "medical", "modern", "more", "most", "much", "national", "natural", "near", "necessary",
  "next", "normal", "official", "only", "perfect", "personal",
  "physical", "pleasant", "polite", "popular", "possible", "present", "pretty", "private", "public",
  "pure",
  "quick", "ready", "recent", "rich", "right",
  "secret", "serious", "several", "simple", "single", "sleepy", "slow", "small", "soft", "special",
  "strange", "strong", "successful", "sure", "sweet", "tall", "terrible", "thick", "thin", "thirsty",
  "typical", "useful", "warm", "welcome", "whole", "wild",
  "wrong", "young",

  //追加
  "beautiful", "three", "seven", "eight", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "square", "triangle", "guitar", "piano",
  "soccer", "baseball", "tennis", "basketball", "everyday",

  //別解
  "clone", "neither", "sample", "port", "cord", "disk", "whale", "while", "wheel", "worm",
  "paint", "peanuts", "plate", "pleat", "plot", "pilot", "proper", "slot", "trap", "bitter", "butter",
  "mist", "must", "song", "shop", "further", "feather", "escort", "mint", "thank", "planet"
];
