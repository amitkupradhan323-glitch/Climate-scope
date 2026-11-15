import React, { useState, useEffect } from 'react';
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
  BarChart3
} from 'lucide-react';
import { EXAM_QUESTIONS } from '../../data/examQuestions';
import { useClimateStore } from '../../store/useClimateStore';

// Simple Web Audio API Synthesizer for chimes without external audio assets
const playSound = (type, isMuted) => {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'incorrect') {
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(261.63, ctx.currentTime + 0.12); // C4
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'click') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    // Ignore audio context errors if browser blocks autoplay
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

  const currentScore = correctCount * 100;
  const maxScore = totalQuestions * 100;

  // Handle Option Select
  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return; // Prevent changing after final submit

    const isAlreadyAnswered = selectedAnswers[questionId] !== undefined;
    const q = EXAM_QUESTIONS.find(item => item.id === questionId);
    const isCorrect = q && q.correctAnswer === optionKey;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));

    if (!isAlreadyAnswered) {
      if (isCorrect) {
        setStreak(prev => prev + 1);
        playSound('correct', isMuted);
      } else {
        setStreak(0);
        playSound('incorrect', isMuted);
      }
    } else {
      playSound('click', isMuted);
    }
  };

  const handleFinishSubmit = () => {
    setIsSubmitted(true);
    setShowSummaryModal(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setStreak(0);
    setIsSubmitted(false);
    setShowSummaryModal(false);
  };

  // Scroll to top on question change in focus mode
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
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
          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
            {/* Score Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
              <span>Score:</span>
              <span className="font-mono text-emerald-900">{currentScore}</span>
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span className="font-mono">{streak}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-700" />}
            </button>

            {/* Finish & Submit Button */}
            <button
              onClick={handleFinishSubmit}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
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
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'focus'
                  ? 'bg-white text-cyan-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              One-by-One Focus
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
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
                if (isSubmitted || isCorrect) {
                  stateStyle = isCorrect 
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-rose-300 bg-rose-50 text-rose-800 font-bold';
                } else {
                  stateStyle = 'border-cyan-300 bg-cyan-50 text-cyan-800 font-bold';
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

        {/* 4. MODE A: ONE-BY-ONE FOCUS VIEW (Matching the user's uploaded screenshot) */}
        {viewMode === 'focus' && (
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
              <span className="text-slate-400 font-medium font-mono text-[11px]">
                {currentQ.points} Points Available
              </span>
            </div>

            {/* Question Statement */}
            <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug sm:leading-relaxed">
              {currentQ.question}
            </h2>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.key;
                const isCorrect = opt.key === currentQ.correctAnswer;
                const showValidation = isSubmitted || isSelected;

                let cardStyle = 'border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-800';
                let badgeStyle = 'bg-slate-100 text-slate-700';

                if (showValidation) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else if (isSelected) {
                    cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 font-bold';
                    badgeStyle = 'bg-rose-600 text-white';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-cyan-500 bg-cyan-50/50 text-cyan-950 font-bold shadow-xs';
                  badgeStyle = 'bg-cyan-600 text-white';
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

                    {/* Right Letter / Indicator Pill */}
                    <div className="flex items-center shrink-0">
                      {showValidation && isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : showValidation && isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-mono font-bold text-xs flex items-center justify-center">
                          {opt.key}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instant Scientific Explanation Banner */}
            {selectedAnswers[currentQ.id] !== undefined && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <HelpCircle className="w-4 h-4 text-cyan-700" />
                  <span>Scientific Explanation & Source Reference</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] text-cyan-800 font-semibold pt-1">
                  Source: Our Vibrant Planet presentation ({currentQ.pdfPage})
                </div>
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
        )}

        {/* 5. MODE B: ALL QUESTIONS SEQUENTIAL VIEW */}
        {viewMode === 'all' && (
          <div className="space-y-6">
            {EXAM_QUESTIONS.map((q, idx) => (
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
                  <span className="text-slate-400 font-mono text-[11px]">100 Pts</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = selectedAnswers[q.id] === opt.key;
                    const isCorrect = opt.key === q.correctAnswer;
                    const showValidation = isSubmitted || isSelected;

                    let cardStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                    let badgeStyle = 'bg-slate-100 text-slate-700';

                    if (showValidation) {
                      if (isCorrect) {
                        cardStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
                        badgeStyle = 'bg-emerald-600 text-white';
                      } else if (isSelected) {
                        cardStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 font-bold';
                        badgeStyle = 'bg-rose-600 text-white';
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
                        {showValidation && isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {showValidation && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {selectedAnswers[q.id] !== undefined && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    <strong className="text-slate-900">Explanation: </strong>{q.explanation} ({q.pdfPage})
                  </p>
                )}
              </div>
            ))}

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

      {/* 6. Score & Final Submission Modal */}
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
                <span className="text-[10px] text-slate-400 block">/ 1500</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-sans">Accuracy</span>
                <span className="text-lg font-black text-emerald-600">
                  {Math.round((correctCount / totalQuestions) * 100)}%
                </span>
                <span className="text-[10px] text-slate-400 block">Percent</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-sans">Correct</span>
                <span className="text-lg font-black text-cyan-600">{correctCount}</span>
                <span className="text-[10px] text-slate-400 block">of 15</span>
              </div>
            </div>

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
