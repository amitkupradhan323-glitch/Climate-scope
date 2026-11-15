import { EXAM_QUESTIONS, REWARD_BADGES } from '../src/data/examQuestions.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- TESTING 15 CLIMATE EXAM QUESTIONS & REWARDS ---\n');

assert(EXAM_QUESTIONS.length === 15, `Exam has exactly 15 questions (got ${EXAM_QUESTIONS.length})`);

EXAM_QUESTIONS.forEach((q, idx) => {
  const expectedId = idx + 1;
  assert(q.id === expectedId, `Question ${expectedId} has id ${expectedId}`);
  assert(q.category && q.category.length > 0, `Question ${expectedId} has valid category: "${q.category}"`);
  assert(q.question && q.question.length > 15, `Question ${expectedId} has question text`);
  assert(q.options && q.options.length === 4, `Question ${expectedId} has exactly 4 options`);
  
  const keys = q.options.map(o => o.key).join(',');
  assert(keys === 'A,B,C,D', `Question ${expectedId} options keys are A, B, C, D (got ${keys})`);
  assert(['A', 'B', 'C', 'D'].includes(q.correctAnswer), `Question ${expectedId} correctAnswer "${q.correctAnswer}" is valid`);
  assert(q.points === 100, `Question ${expectedId} has 100 points`);
  assert(q.explanation && q.explanation.length > 10, `Question ${expectedId} has scientific explanation`);

  // Verify that the suggested correct answer text exists in options
  const suggestedOpt = q.options.find(o => o.key === q.correctAnswer);
  assert(suggestedOpt && suggestedOpt.text.length > 0, `Question ${expectedId} suggested right answer exists: Option ${q.correctAnswer} - "${suggestedOpt?.text}"`);
});

const totalPoints = EXAM_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
assert(totalPoints === 1500, `Total exam points sum to 1500 (got ${totalPoints})`);

// Test Rewards & Badges
assert(Array.isArray(REWARD_BADGES), 'REWARD_BADGES is defined and is an array');
assert(REWARD_BADGES.length === 6, `Has 6 reward badges (got ${REWARD_BADGES.length})`);

REWARD_BADGES.forEach(b => {
  assert(b.id && b.name && b.icon && b.bonus > 0, `Reward badge "${b.name}" has valid properties and bonus ${b.bonus}`);
  assert(typeof b.check === 'function', `Reward badge "${b.name}" has verification check function`);
});

// Test reward criteria logic
const firstBadge = REWARD_BADGES.find(b => b.id === 'first_spark');
assert(firstBadge.check(1, 1, {}) === true, 'First Spark awards reward when 1 answer is correct');
assert(firstBadge.check(0, 0, {}) === false, 'First Spark does not award when 0 answers are correct');

const streakBadge = REWARD_BADGES.find(b => b.id === 'triple_blaze');
assert(streakBadge.check(3, 3, {}) === true, 'Triple Blaze awards reward on streak 3');
assert(streakBadge.check(2, 2, {}) === false, 'Triple Blaze does not award on streak 2');

console.log(`\nEXAM & REWARD TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);

