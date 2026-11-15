import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe2, 
  Volume2, 
  VolumeX, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  BookOpen, 
  Check, 
  X,
  Sparkles,
  HelpCircle,
  BarChart3,
  Gift,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { EXAM_QUESTIONS, REWARD_BADGES } from '../../data/examQuestions';
import { useClimateStore } from '../../store/useClimateStore';

// Lightweight HTML5 Canvas Confetti Burst (0 external dependencies)
function triggerConfetti() {
  const canvas = document.getElementById('reward-confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'];
  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: window.innerWidth * (0.35 + Math.random() * 0.3),
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 1.6) * 12 - 5,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  const startTime = Date.now();
  let animationId;

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.32; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.rotationSpeed;
      if (elapsed > 1100) {
        p.opacity = Math.max(0, 1 - (elapsed - 1100) / 900);
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    });

    if (elapsed < 2000) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }

  render();
}

// Web Audio API Synthesizer for reward fanfares, chimes, and tones
const playSound = (type, isMuted) => {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    if (type === 'reward' || type === 'correct') {
      // 4-Note Ascending Celebratory Fanfare: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.32);
      });
    } else if (type === 'incorrect') {
      // Gentle downward corrective tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    // Autoplay policy fallback
  }
};

export default function ClimateExam() {
  const setCurrentView = useClimateStore((state) => state.setCurrentView);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [viewMode, setViewMode] = useState('focus'); // 'focus' | 'all'
  const [isMuted, setIsMuted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  
  // Gamified Rewards State
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [showBadgesDrawer, setShowBadgesDrawer] = useState(false);
  const [rewardToast, setRewardToast] = useState(null);

  const totalQuestions = EXAM_QUESTIONS.length;
  const currentQ = EXAM_QUESTIONS[currentIndex];

  // Calculate live statistics
  const answeredCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  let incorrectCount = 0;

  Object.entries(selectedAnswers).forEach(([qId, ansKey]) => {
    const q = EXAM_QUESTIONS.find(item => item.id === Number(qId));
    if (q) {
      if (q.correctAnswer === ansKey) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  // Calculate base score + bonus badge rewards
  const baseScore = correctCount * 100;
  const bonusRewardScore = unlockedBadges.reduce((acc, bId) => {
    const badge = REWARD_BADGES.find(b => b.id === bId);
    return acc + (badge ? badge.bonus : 0);
  }, 0);
  const currentScore = baseScore + bonusRewardScore;
  const maxScore = (totalQuestions * 100) + 900; // 1500 base + 900 bonus

  // Check and award badges dynamically
  const evaluateBadges = (newCorrectCount, newStreak, newAnswers) => {
    const newlyEarned = [];
    REWARD_BADGES.forEach(badge => {
      if (!unlockedBadges.includes(badge.id)) {
        if (badge.check(newCorrectCount, newStreak, newAnswers)) {
          newlyEarned.push(badge);
        }
      }
    });

    if (newlyEarned.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newlyEarned.map(b => b.id)]);
      return newlyEarned[0]; // Primary badge for toast
    }
    return null;
  };

  // Handle Option Select
  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return;

    const isAlreadyAnswered = selectedAnswers[questionId] !== undefined;
    const q = EXAM_QUESTIONS.find(item => item.id === questionId);
    if (!q) return;

    const isCorrect = q.correctAnswer === optionKey;
    const newAnswers = { ...selectedAnswers, [questionId]: optionKey };

    setSelectedAnswers(newAnswers);

    if (!isAlreadyAnswered) {
      if (isCorrect) {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        const nextCorrectCount = correctCount + 1;

        // 1. Play Sound & Confetti Reward
        playSound('reward', isMuted);
        triggerConfetti();

        // 2. Evaluate Badge Rewards
        const newBadge = evaluateBadges(nextCorrectCount, nextStreak, newAnswers);

        // 3. Trigger Reward Toast
        setRewardToast({
          type: 'correct',
          title: '🎉 Correct Answer Reward!',
          message: '+100 Points Awarded to your score!',
          streak: nextStreak,
          badge: newBadge ? `🏆 Unlocked "${newBadge.name}" (+${newBadge.bonus} Bonus Pts)!` : null
        });

      } else {
        setStreak(0);
        playSound('incorrect', isMuted);

        setRewardToast({
          type: 'incorrect',
          title: '❌ Incorrect Selection',
          message: `The suggested right answer is Option ${q.correctAnswer}.`,
          streak: 0,
          badge: null
        });
      }
    } else {
      // Re-answering or clicking
      playSound('click', isMuted);
    }
  };

  // Allow retrying a question that was answered wrong
  const handleRetryQuestion = (questionId) => {
    if (isSubmitted) return;
    const updated = { ...selectedAnswers };
    delete updated[questionId];
    setSelectedAnswers(updated);
    setRewardToast(null);
    playSound('click', isMuted);
  };

  const handleFinishSubmit = () => {
    setIsSubmitted(true);
    setShowSummaryModal(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setStreak(0);
    setUnlockedBadges([]);
    setRewardToast(null);
    setIsSubmitted(false);
    setShowSummaryModal(false);
  };

  // Auto-dismiss reward toast after 4 seconds
  useEffect(() => {
    if (rewardToast) {
      const timer = setTimeout(() => setRewardToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [rewardToast]);

  // Scroll to top on question change in focus mode
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 relative">
      
      {/* 0. Full-Screen Confetti Canvas Overlay */}
      <canvas 
        id="reward-confetti-canvas" 
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Floating Animated Reward / Feedback Toast */}
      {rewardToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full animate-bounce-short">
          <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-start justify-between gap-3 ${
            rewardToast.type === 'correct' 
              ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950' 
              : 'bg-amber-50/95 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                rewardToast.type === 'correct' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {rewardToast.type === 'correct' ? <Sparkles className="w-4 h-4 fill-amber-300" /> : <X className="w-4 h-4" />}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-black tracking-tight">{rewardToast.title}</div>
                <div className="text-xs font-medium opacity-90">{rewardToast.message}</div>
                {rewardToast.streak > 1 && (
                  <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-0.5">
                    <Flame className="w-3 h-3 fill-amber-500" />
                    <span>Streak: {rewardToast.streak} in a row!</span>
                  </div>
                )}
                {rewardToast.badge && (
                  <div className="text-[11px] font-extrabold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-lg border border-emerald-200 mt-1 shadow-2xs">
                    {rewardToast.badge}
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => setRewardToast(null)}
              className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 1. Exam Top Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Exam Title */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-500 p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Our Warming World: Climate Exam
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                15 Questions on Causes, Impacts on Nature & Global Solutions
              </p>
            </div>
          </div>

          {/* Widgets & Action Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* Score Pill */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs"
              title={`Base Score: ${baseScore} + Bonus Rewards: ${bonusRewardScore}`}
            >
              <span>Score:</span>
              <span className="font-mono text-emerald-900 font-extrabold">{currentScore}</span>
              {bonusRewardScore > 0 && (
                <span className="text-[10px] text-amber-700 font-mono">+{bonusRewardScore} bonus</span>
              )}
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span className="font-mono">{streak}</span>
            </div>

            {/* Rewards / Badges Shelf Toggle */}
            <button
              onClick={() => setShowBadgesDrawer(!showBadgesDrawer)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-bold text-cyan-800 hover:bg-cyan-100 transition-colors cursor-pointer shadow-2xs"
              title="View Unlocked Rewards & Trophies"
            >
              <Gift className="w-3.5 h-3.5 text-cyan-700" />
              <span className="hidden sm:inline">Rewards:</span>
              <span className="font-mono">{unlockedBadges.length} / {REWARD_BADGES.length}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-700" />}
            </button>

            {/* Finish & Submit Button */}
            <button
              onClick={handleFinishSubmit}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isSubmitted ? 'View Results' : 'Finish & Submit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Back to Dashboard */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Return to ClimateScope Dashboard"
            >
              Dashboard
            </button>
          </div>

        </div>

        {/* Collapsible Rewards & Trophy Showcase Bar */}
        {showBadgesDrawer && (
          <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-4 animate-fadeIn">
            <div className="max-w-5xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Climate Achievement Rewards & Bonus Multipliers</span>
                </div>
                <span className="text-slate-500 font-medium">
                  {unlockedBadges.length} of {REWARD_BADGES.length} Badges Unlocked (+{bonusRewardScore} Pts)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {REWARD_BADGES.map(b => {
                  const isUnlocked = unlockedBadges.includes(b.id);
                  return (
                    <div 
                      key={b.id}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isUnlocked
                          ? 'bg-white border-amber-300 shadow-xs ring-1 ring-amber-200'
                          : 'bg-slate-100/70 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="text-xl mb-1">{b.icon}</div>
                      <div className="text-[11px] font-bold text-slate-900 leading-tight">{b.name}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{b.desc}</div>
                      <div className="mt-1 inline-block px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-amber-50 text-amber-800 border border-amber-200">
                        +{b.bonus} pts
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        
        {/* 2. Top Status Bar (Answered, Correct, Incorrect & Mode Toggle) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-600 font-medium">
              Answered: <strong className="text-slate-900 font-mono font-bold">{answeredCount} / {totalQuestions}</strong>
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <strong className="font-mono">{correctCount}</strong> Correct
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <strong className="font-mono">{incorrectCount}</strong> Incorrect
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl border border-slate-300/80 text-xs self-start sm:self-auto shadow-2xs">
            <button
              onClick={() => setViewMode('focus')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'focus'
                  ? 'bg-white text-cyan-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              One-by-One Focus
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-white text-cyan-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Questions View
            </button>
          </div>
        </div>

        {/* 3. Question Navigator Bar (1 to 15 pills) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            {EXAM_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isAnswered = userAns !== undefined;
              const isCorrect = isAnswered && userAns === q.correctAnswer;
              const isActive = idx === currentIndex && viewMode === 'focus';

              let stateStyle = 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white';
              if (isActive) {
                stateStyle = 'border-2 border-emerald-500 text-emerald-800 bg-emerald-50/50 ring-2 ring-emerald-200 font-extrabold shadow-2xs';
              } else if (isAnswered) {
                if (isCorrect) {
                  stateStyle = 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold';
                } else {
                  stateStyle = 'border-rose-300 bg-rose-50 text-rose-800 font-bold';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (viewMode === 'all') {
                      const el = document.getElementById(`question-card-${q.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border text-xs sm:text-sm flex items-center justify-center shrink-0 transition-all cursor-pointer font-mono ${stateStyle}`}
                  title={`Jump to Question ${q.id}`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MODE A: ONE-BY-ONE FOCUS VIEW (Matching the user's uploaded screenshot with Suggested Answer & Rewards) */}
        {viewMode === 'focus' && (() => {
          const userAns = selectedAnswers[currentQ.id];
          const hasAnswered = userAns !== undefined;
          const isUserCorrect = hasAnswered && userAns === currentQ.correctAnswer;
          const correctOption = currentQ.options.find(o => o.key === currentQ.correctAnswer);

          return (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Question Top Tags & Points */}
              <div className="flex items-center justify-between text-xs pb-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold font-mono">
                    Question {currentQ.id} of {totalQuestions}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {currentQ.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium font-mono text-[11px]">
                    {currentQ.points} Points Available
                  </span>
                </div>
              </div>

              {/* Question Statement */}
              <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug sm:leading-relaxed">
                {currentQ.question}
              </h2>

              {/* 4 Options Grid */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = userAns === opt.key;
                  const isCorrectOption = opt.key === currentQ.correctAnswer;

                  let cardStyle = 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-800';
                  let badgeStyle = 'bg-slate-100 text-slate-700';
                  let rightTag = null;

                  if (hasAnswered || isSubmitted) {
                    if (isCorrectOption) {
                      // Correct option is ALWAYS highlighted in green when question is answered!
                      cardStyle = 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-200';
                      badgeStyle = 'bg-emerald-600 text-white font-black';
                      rightTag = (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-2xs animate-pulse">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isSelected ? 'Correct Choice (+100 Pts)' : '★ Suggested Right Answer'}</span>
                        </span>
                      );
                    } else if (isSelected) {
                      // Option selected by user is WRONG!
                      cardStyle = 'border-2 border-rose-400 bg-rose-50/80 text-rose-950 font-bold';
                      badgeStyle = 'bg-rose-600 text-white font-black';
                      rightTag = (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-2xs">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Your Selection (Incorrect)</span>
                        </span>
                      );
                    } else {
                      cardStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                      badgeStyle = 'bg-slate-100 text-slate-400';
                    }
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Left Letter Pill */}
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${badgeStyle}`}>
                          {opt.key}
                        </span>
                        {/* Option Text */}
                        <span className="text-sm font-semibold leading-relaxed">
                          {opt.text}
                        </span>
                      </div>

                      {/* Right Tag / Indicator Pill */}
                      <div className="flex items-center shrink-0">
                        {rightTag || (
                          <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-mono font-bold text-xs flex items-center justify-center">
                            {opt.key}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DYNAMIC FEEDBACK SECTION: REWARD ON RIGHT ANSWER, SUGGEST RIGHT ANSWER ON WRONG ANSWER */}
              {hasAnswered && (
                <div>
                  {isUserCorrect ? (
                    /* REWARD BANNER (When Answer is Right) */
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border-2 border-emerald-400 shadow-sm space-y-3 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounce-short">
                            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                              <span>Brilliant! Answer Is Right!</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-200/90 text-emerald-900 text-[10px] font-extrabold">
                                +100 Points Awarded
                              </span>
                            </div>
                            <p className="text-xs text-emerald-700 font-medium mt-0.5">
                              Planetary knowledge verified. Reward added to your live score!
                            </p>
                          </div>
                        </div>

                        {/* Reward Points Pill */}
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-sm self-start sm:self-auto">
                          <Gift className="w-4 h-4 text-slate-950" />
                          <span>+100 PTS CLAIMED</span>
                        </div>
                      </div>

                      {/* Streak Bonus Status */}
                      <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200 text-xs text-slate-800">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="font-bold text-amber-800 font-mono">Streak: {streak} in a row!</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 font-medium">
                          {streak >= 3 ? '🔥 Unstoppable run! Your climate fluency is soaring!' : 'Keep it going to unlock bonus reward badges!'}
                        </span>
                      </div>

                      {/* Scientific Context */}
                      <div className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-emerald-200/70 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <HelpCircle className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Scientific Evidence:</span>
                        </div>
                        <p className="leading-relaxed text-slate-600">
                          {currentQ.explanation}
                        </p>
                        <div className="text-[11px] text-cyan-800 font-semibold pt-0.5">
                          Source: Our Vibrant Planet presentation ({currentQ.pdfPage})
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* SUGGESTED RIGHT ANSWER BANNER (When Answer is Wrong) */
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-emerald-50/80 border-2 border-amber-300 shadow-sm space-y-3 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                            <X className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider text-rose-700">
                              Selected Answer Was Wrong
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              Here is the verified scientific right answer for this indicator:
                            </div>
                          </div>
                        </div>

                        {/* Retry Button */}
                        <button
                          onClick={() => handleRetryQuestion(currentQ.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
                          title="Try this question again"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Try Again</span>
                        </button>
                      </div>

                      {/* Prominent Suggested Right Answer Box */}
                      <div className="p-3.5 bg-white rounded-xl border-2 border-emerald-400 shadow-2xs flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-xs">
                          {correctOption?.key}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Suggested Right Answer:</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                            {correctOption?.text}
                          </p>
                        </div>
                      </div>

                      {/* Scientific Explanation of Right Answer */}
                      <div className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-amber-200/70 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <HelpCircle className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Why this is the correct answer:</span>
                        </div>
                        <p className="leading-relaxed text-slate-600">
                          {currentQ.explanation}
                        </p>
                        <div className="text-[11px] text-cyan-800 font-semibold pt-0.5">
                          Source Reference: Our Vibrant Planet presentation ({currentQ.pdfPage})
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Card Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                    currentIndex === 0 
                      ? 'text-slate-300 cursor-not-allowed' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Question</span>
                </button>

                <span className="font-mono text-slate-500 font-semibold hidden sm:inline">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishSubmit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <span>Finish & Submit</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          );
        })()}

        {/* 5. MODE B: ALL QUESTIONS SEQUENTIAL VIEW (With Suggested Right Answers and Rewards) */}
        {viewMode === 'all' && (
          <div className="space-y-6">
            {EXAM_QUESTIONS.map((q) => {
              const userAns = selectedAnswers[q.id];
              const hasAnswered = userAns !== undefined;
              const isUserCorrect = hasAnswered && userAns === q.correctAnswer;
              const correctOpt = q.options.find(o => o.key === q.correctAnswer);

              return (
                <div 
                  key={q.id}
                  id={`question-card-${q.id}`}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold font-mono">
                        Q{q.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {q.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasAnswered && (
                        isUserCorrect ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                            <span>+100 Pts Reward</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRetryQuestion(q.id)}
                            className="text-[11px] text-cyan-700 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Retry</span>
                          </button>
                        )
                      )}
                      <span className="text-slate-400 font-mono text-[11px]">100 Pts</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = userAns === opt.key;
                      const isCorrect = opt.key === q.correctAnswer;

                      let cardStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                      let badgeStyle = 'bg-slate-100 text-slate-700';

                      if (hasAnswered || isSubmitted) {
                        if (isCorrect) {
                          cardStyle = 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
                          badgeStyle = 'bg-emerald-600 text-white';
                        } else if (isSelected) {
                          cardStyle = 'border-2 border-rose-400 bg-rose-50/80 text-rose-950 font-bold';
                          badgeStyle = 'bg-rose-600 text-white';
                        } else {
                          cardStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <div
                          key={opt.key}
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${cardStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${badgeStyle}`}>
                              {opt.key}
                            </span>
                            <span className="text-xs font-semibold leading-relaxed">
                              {opt.text}
                            </span>
                          </div>
                          {hasAnswered && isCorrect && (
                            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                              <Check className="w-3.5 h-3.5" />
                              <span>Right</span>
                            </span>
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <span className="text-[10px] text-rose-700 font-bold flex items-center gap-0.5">
                              <X className="w-3.5 h-3.5" />
                              <span>Your Pick</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Feedback Banner in All Questions View */}
                  {hasAnswered && (
                    <div className="pt-1">
                      {isUserCorrect ? (
                        <div className="p-3 bg-emerald-50/80 border border-emerald-300 rounded-xl text-xs flex items-start gap-2.5">
                          <Gift className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <div className="font-extrabold text-emerald-900">
                              🎉 Correct Answer! +100 Points Reward Claimed
                            </div>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                              {q.explanation} ({q.pdfPage})
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-amber-50/90 border border-amber-300 rounded-xl text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-rose-700 font-bold">
                            <span className="flex items-center gap-1.5">
                              <XCircle className="w-4 h-4 text-rose-500" />
                              <span>Answer is wrong.</span>
                            </span>
                            <span className="text-emerald-800 text-[11px] font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md">
                              Suggested Right Answer: Option {correctOpt?.key}
                            </span>
                          </div>
                          <div className="text-slate-900 font-semibold bg-white p-2 rounded-lg border border-emerald-300 text-xs">
                            <span className="text-emerald-700 font-bold">Option {correctOpt?.key}: </span>
                            {correctOpt?.text}
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed pt-0.5">
                            <strong className="text-slate-800">Explanation: </strong>
                            {q.explanation} ({q.pdfPage})
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-center pt-2">
              <button
                onClick={handleFinishSubmit}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Finish & Submit All Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 6. Score & Final Submission Modal with Rewards Summary */}
      {showSummaryModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowSummaryModal(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Official Examination Complete
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {correctCount >= 13 ? '🏆 Master Climatologist' : correctCount >= 9 ? '🌱 Planetary Guardian' : '📘 Climate Science Explorer'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You tested your knowledge on the core mechanisms and solutions of Earth's climate system.
              </p>
            </div>

            {/* Score Metric Cards */}
            <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono">
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-sans">Final Score</span>
                <span className="text-lg font-black text-slate-900">{currentScore}</span>
                <span className="text-[10px] text-slate-400 block">/ {maxScore}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-sans">Accuracy</span>
                <span className="text-lg font-black text-emerald-600">
                  {Math.round((correctCount / totalQuestions) * 100)}%
                </span>
                <span className="text-[10px] text-slate-400 block">Percent</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-sans">Rewards</span>
                <span className="text-lg font-black text-amber-600">+{bonusRewardScore}</span>
                <span className="text-[10px] text-slate-400 block">{unlockedBadges.length} Badges</span>
              </div>
            </div>

            {/* Unlocked Badges Showcase */}
            {unlockedBadges.length > 0 && (
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-left space-y-1.5">
                <div className="text-[11px] font-extrabold text-amber-900 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>Unlocked Achievement Rewards:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {unlockedBadges.map(bId => {
                    const badge = REWARD_BADGES.find(b => b.id === bId);
                    if (!badge) return null;
                    return (
                      <span key={bId} className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-xs font-bold text-slate-800 shadow-2xs">
                        {badge.icon} {badge.name} (+{badge.bonus})
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Review Detailed Answers
              </button>

              <button
                onClick={handleRetake}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Examination</span>
              </button>

              <button
                onClick={() => {
                  setShowSummaryModal(false);
                  setCurrentView('dashboard');
                }}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Return to ClimateScope Dashboard
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
