import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CurriculumView from './components/CurriculumView';
import LessonViewer from './components/LessonViewer';
import AlphabetView from './components/AlphabetView';
import QuizView from './components/QuizView';
import ChatTutor from './components/ChatTutor';
import VocabularyView from './components/VocabularyView';
import ProgressStats from './components/ProgressStats';

function App() {
  const [activeTab, setActiveTab] = useState('alphabet'); // Default to Alphabet or Curriculum
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('de_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [testScores, setTestScores] = useState(() => {
    try {
      const saved = localStorage.getItem('de_test_scores');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [progress, setProgress] = useState({
    level: 'A1.1',
    month: 1,
    target: 'B2 Goethe/telc',
    streak: 1
  });

  useEffect(() => {
    try {
      localStorage.setItem('de_completed_lessons', JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem('de_test_scores', JSON.stringify(testScores));
    } catch (e) {
      console.error(e);
    }
  }, [testScores]);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab('lesson');
  };

  const handleBackFromLesson = () => {
    setSelectedLesson(null);
    setActiveTab('curriculum');
  };

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const handleFinishTest = (testResult) => {
    setTestScores(prev => [...prev, testResult]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'lesson') setSelectedLesson(null);
        }}
        progress={progress}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        {activeTab === 'curriculum' && (
          <CurriculumView
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />
        )}

        {activeTab === 'alphabet' && (
          <AlphabetView />
        )}

        {activeTab === 'lesson' && selectedLesson && (
          <LessonViewer
            lesson={selectedLesson}
            onBack={handleBackFromLesson}
            onComplete={handleCompleteLesson}
            isCompleted={completedLessons.includes(selectedLesson.id)}
          />
        )}

        {activeTab === 'tests' && (
          <QuizView onFinishTest={handleFinishTest} />
        )}

        {activeTab === 'chat' && (
          <ChatTutor />
        )}

        {activeTab === 'vocab' && (
          <VocabularyView />
        )}

        {activeTab === 'progress' && (
          <ProgressStats
            progress={progress}
            completedLessons={completedLessons}
            testScores={testScores}
          />
        )}
      </main>
    </div>
  );
}

export default App;
