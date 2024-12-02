import { useCallback } from 'react';
//приймає параметр field ('classes' або 'subjects')
//повертає функцію, яка перевіряє, чи змінилися значення
//якщо значення змінилися, то викликає відповідний обробник onUpdTeacherClasses або onUpdTeacherSubject

export default function useTeacherUpdater(teachers, onUpdTeacherClasses, onUpdTeacherSubject) {
  return useCallback(
    field => (teacherId, updValues) => {
      const teacher = teachers.find(t => t.id === teacherId);
      if (teacher && JSON.stringify(teacher[field]) !== JSON.stringify(updValues)) {
        if (field === 'classes') onUpdTeacherClasses(teacherId, updValues);
        if (field === 'subjects') onUpdTeacherSubject(teacherId, updValues);
      }
    },
    [teachers, onUpdTeacherClasses, onUpdTeacherSubject]
  );
}
