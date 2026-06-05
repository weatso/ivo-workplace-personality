import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PersonalityType } from '@/data/questions';

export interface AnswerHistory {
  questionId: number;
  questionText: string;
  answerText: string;
  typeSelected: PersonalityType;
}

interface QuizState {
  answers: PersonalityType[];
  currentStep: number;
  answersHistory: AnswerHistory[];
  addAnswer: (type: PersonalityType) => void;
  saveAnswerHistory: (answer: AnswerHistory) => void;
  nextStep: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: [],
      currentStep: 0,
      answersHistory: [],
      
      addAnswer: (type) => set((state) => ({ answers: [...state.answers, type] })),
      
      saveAnswerHistory: (answer) => set((state) => ({ 
        answersHistory: [...state.answersHistory, answer] 
      })),
      
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      
      resetQuiz: () => set({ 
        answers: [], 
        currentStep: 0, 
        answersHistory: [] 
      }),
    }),
    {
      name: 'ivo-quiz-storage',
    }
  )
);
