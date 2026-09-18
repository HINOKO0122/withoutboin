// 高校1年生以下（中学〜高1基礎）の英単語データベース（約1,000語）
const WORD_DATABASE = [
  // --- 中学1〜2年レベル（超基本） ---
  // 名詞：身の回り・学校・家族・自然
  "apple", "desk", "chair", "table", "window",
  "clock", "watch", "phone", "computer", "picture",
  "bird", "fish", "tiger", "rabbit", "horse",
  "star", "sky", "cloud", "snow", "wind", "river",
  "flower", "grass", "park", "school", "class", "teacher", "student", "friend", "family",
  "father", "mother", "brother", "sister", "son", "daughter", "child", "children", "boy", "girl",
  "man", "woman", "person", "people", "doctor", "nurse", "driver", "player", "king", "queen",
  "water", "milk", "tea", "coffee", "juice", "bread", "rice", "egg", "cake", "food",
  "lunch", "dinner", "breakfast", "meal", "fruit", "meat", "fish", "sugar", "salt", "soup",
  "car", "bus", "train", "bike", "ship", "plane", "station", "airport", "street", "road",
  "city", "town", "country", "japan", "world", "map", "name", "word", "number", "time",
  "year", "month", "week", "day", "hour", "minute", "second", "morning", "afternoon", "evening",
  "night", "today", "tomorrow", "yesterday", "spring", "summer", "autumn", "winter", "season", "weather",

  // 身体・服
  "head", "face", "eye", "ear", "nose", "mouth", "tooth", "hair", "hand", "arm",
  "leg", "foot", "body", "heart", "shirt", "pants", "shoes", "hat", "cap", "coat",

  // 動詞（動作・状態）
  "be", "have", "do", "go", "come", "make", "take", "see", "look", "watch",
  "listen", "hear", "speak", "talk", "say", "tell", "read", "write", "study", "learn", "teach",
  "run", "walk", "jump", "swim", "fly", "play", "sing", "dance", "eat", "drink",
  "sleep", "wash", "open", "close", "start", "stop", "finish", "clean", "help", "use",
  "find", "get", "give", "sell", "send", "bring", "carry", "push",
  "pull", "sit", "stand", "fall", "cut", "put", "keep", "know",
  "think", "want", "like", "love", "hope", "feel", "live", "stay", "work", "wait",

  // 形容詞・副詞
  "good", "bad", "big", "small", "large", "little", "long", "short", "high", "low",
  "hot", "cold", "warm", "cool", "new", "old", "young", "fast", "slow", "early",
  "late", "hard", "easy", "soft", "heavy", "light", "bright", "dark", "clean", "dirty",
  "happy", "sad", "kind", "busy", "rich", "poor", "safe", "free", "fine", "great",
  "red", "blue", "green", "yellow", "white", "black", "pink", "brown", "orange", "purple",
  "very", "too", "so", "well", "now", "then", "here", "there", "always", "usually",
  "often", "sometimes", "never", "again", "today", "together", "also", "maybe", "quite", "really",

  // --- 中学3年〜高校1年レベル（基礎応用） ---
  // 名詞：概念・社会・情報
  "air", "art", "bank", "beach", "beauty", "blood", "board", "body", "brain", "bridge",
  "building", "business", "camera", "card", "center", "chance", "change", "church", "circle", "cloth",
  "club", "coin", "color", "company", "corner", "culture", "danger", "date", "death", "decision",
  "design", "dream", "earth", "effort", "end", "energy", "event", "fact", "farm", "field",
  "fire", "floor", "forest", "future", "game", "garden", "glass", "ground", "group", "health",
  "history", "hole", "holiday", "home", "hospital", "hotel", "human", "ice", "idea", "image",
  "interest", "island", "job", "journey", "key", "kind", "land", "language", "law", "life",
  "light", "line", "list", "machine", "market", "matter", "meaning", "memory", "mind", "money",
  "mountain", "music", "nature", "news", "noise", "ocean", "office", "order", "paper", "part",
  "party", "past", "peace", "pet", "place", "plan", "plant", "point", "police", "power",
  "practice", "present", "problem", "question", "radio", "reason", "rule", "safety", "sand", "science",
  "score", "shape", "side", "sign", "skill", "space", "speech", "sport", "stage", "stone",
  "store", "story", "subject", "system", "task", "taste", "team", "test", "thought", "ticket",
  "topic", "tour", "town", "trip", "trouble", "truth", "universe", "value", "voice", "wall",
  "war", "way", "weather", "web", "weight", "work", "yard", "youth",

  // 動詞（発信・思考・変化）
  "accept", "add", "agree", "allow", "appear", "arrive", "ask", "become", "begin", "believe",
  "belong", "build", "call", "change", "check", "choose", "collect", "compare", "connect", "continue",
  "cook", "create", "cross", "decide", "describe", "die", "discover", "discuss", "draw",
  "drive", "drop", "enjoy", "enter", "explain", "express", "fail", "fill", "follow", "forget",
  "grow", "guess", "happen", "hate", "hit", "hold", "hope", "hurt", "imagine", "include",
  "increase", "invite", "join", "jump", "keep", "kill", "laugh", "lead", "leave", "lend",
  "lose", "match", "mean", "move", "need", "notice", "offer", "pass", "pick", "plan",
  "prepare", "produce", "protect", "prove", "provide", "reach", "receive", "remember", "repeat", "report",
  "return", "ring", "rise", "save", "search", "seem", "serve", "set", "share", "show",
  "sing", "smile", "sound", "spend", "stand", "start", "suggest", "surprise", "touch", "travel",
  "try", "turn", "understand", "visit", "wish", "worry",

  // 形容詞（感情・状態・社会）
  "able", "active", "afraid", "alone", "angry", "another", "available", "beautiful", "best", "better",
  "brave", "bright", "broad", "calm", "careful", "certain", "cheap", "clear", "clever", "close",
  "common", "complete", "correct", "cute", "daily", "dangerous", "dark", "dead", "dear", "deep",
  "different", "difficult", "each", "early", "empty", "equal", "famous", "fast",
  "favorite", "few", "final", "fine", "first", "foreign", "formal", "fresh", "full", "fun",
  "funny", "general", "glad", "great", "green", "half", "hard", "heavy", "high", "honest",
  "hot", "huge", "hungry", "important", "impossible", "international", "kind", "last", "late", "lazy",
  "left", "light", "likely", "local", "lonely", "loud", "low", "lucky", "main", "major",
  "many", "medical", "modern", "more", "most", "much", "national", "natural", "near", "necessary",
  "next", "nice", "normal", "official", "old", "only", "open", "own", "perfect", "personal",
  "physical", "pleasant", "polite", "popular", "possible", "present", "pretty", "private", "public", "pure",
  "quick", "quiet", "ready", "real", "recent", "red", "rich", "right", "safe", "same",
  "secret", "serious", "several", "simple", "single", "sleepy", "slow", "small", "soft", "special",
  "strange", "strong", "successful", "sure", "sweet", "tall", "terrible", "thick", "thin", "thirsty",
  "typical", "useful", "warm", "welcome", "whole", "wild",
  "wrong", "young",

  //追加
  "beautiful",

  //別解
  "clone", "neither", "sheer", "sample", "port", "cord", "disk", "whale", "while", "wheel", "worm", "paints", "peanuts", "plate", "pleat", "plot", "pilot"
];
