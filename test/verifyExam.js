import { EXAM_QUESTIONS } from '../src/data/examQuestions.js';

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

console.log('--- TESTING 15 CLIMATE EXAM QUESTIONS ---\n');

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
});

const totalPoints = EXAM_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
assert(totalPoints === 1500, `Total exam points sum to 1500 (got ${totalPoints})`);

console.log(`\nEXAM TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);
