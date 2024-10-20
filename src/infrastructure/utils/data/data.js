// data.js
let defaultData = JSON.parse(localStorage.getItem('words')) || [
  {
    id: 1,
    en: 'A little bit',
    ua: 'Трохи, трішки',
    category: 'Phrasal verb',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 2,
    en: 'Able',
    ua: 'Здібний',
    category: 'Adjective',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 3,
    en: 'Absolutely',
    ua: 'Абсолютно',
    category: 'Adverb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 4,
    en: 'Swim, swam, swum',
    ua: 'Плавати',
    category: 'Participle',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 5,
    en: 'Think, thought, thought',
    ua: 'Думати',
    category: 'Participle',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 6,
    en: 'Come apart',
    ua: 'Роз’єднувати',
    category: 'Phrasal verb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 7,
    en: 'Go back',
    ua: 'Повертатися',
    category: 'Phrasal verb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 8,
    en: 'Develop',
    ua: 'Розвиватися',
    category: 'Verb',
    progress: 0,
    isRegular: true,
    isIrregular: false,
    editDelete: 'Edit/Delete',
  },
  {
    id: 9,
    en: 'Break in',
    ua: 'Вмішуватися, встрявати',
    category: 'Phrasal verb',
    progress: 100,
    editDelete: 'Edit/Delete',
  },
  {
    id: 10,
    en: 'Care',
    ua: 'Турбота, догляд',
    category: 'Verb',
    progress: 100,
    isRegular: true,
    isIrregular: false,
    editDelete: 'Edit/Delete',
  },
  {
    id: 11,
    en: 'During',
    ua: 'Протягом, під час',
    category: 'Preposition',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 12,
    en: 'Until',
    ua: 'Поки, недо',
    category: 'Preposition',
    progress: 100,
    editDelete: 'Edit/Delete',
  },
  {
    id: 13,
    en: 'Phone',
    ua: 'Телефон',
    category: 'Noun',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 14,
    en: 'Shoes',
    ua: 'Взуття',
    category: 'Noun',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 15,
    en: 'Bring',
    ua: 'Приносити',
    category: 'Verb',
    progress: 0,
    isRegular: false,
    isIrregular: true,
    editDelete: 'Edit/Delete',
  },
  {
    id: 16,
    en: 'Know-knew-known',
    ua: 'Знати',
    category: 'Verb',
    progress: 0,
    isRegular: false,
    isIrregular: true,
    editDelete: 'Edit/Delete',
  },
];

export default defaultData;
