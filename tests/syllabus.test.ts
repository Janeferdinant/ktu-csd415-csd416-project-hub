import { describe, it, expect } from 'vitest';
import { CSD415_SYLLABUS, CSD416_SYLLABUS } from '../src/data/syllabusData';

describe('Official KTU Syllabus Specifications Integrity', () => {
  it('validates Phase I (CSD415) structural requirements', () => {
    expect(CSD415_SYLLABUS.courseCode).toBe('CSD415');
    expect(CSD415_SYLLABUS.totalMarks).toBe(100);
    expect(CSD415_SYLLABUS.cieMarks).toBe(100);
    expect(CSD415_SYLLABUS.eseMarks).toBe(0);
    expect(CSD415_SYLLABUS.courseOutcomes).toHaveLength(6);
    expect(CSD415_SYLLABUS.modules).toHaveLength(9);

    const sumEvaluation = CSD415_SYLLABUS.evaluationScheme.reduce((a, b) => a + b.marks, 0);
    expect(sumEvaluation).toBe(100);
  });

  it('validates Phase II (CSD416) structural requirements', () => {
    expect(CSD416_SYLLABUS.courseCode).toBe('CSD416');
    expect(CSD416_SYLLABUS.totalMarks).toBe(150);
    expect(CSD416_SYLLABUS.cieMarks).toBe(70);
    expect(CSD416_SYLLABUS.eseMarks).toBe(80);
    expect(CSD416_SYLLABUS.courseOutcomes).toHaveLength(6);
    expect(CSD416_SYLLABUS.modules).toHaveLength(9);

    const sumEvaluation = CSD416_SYLLABUS.evaluationScheme.reduce((a, b) => a + b.marks, 0);
    expect(sumEvaluation).toBe(150);
  });
});

