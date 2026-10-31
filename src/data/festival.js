import { Coins, Flame, Flower2, Mountain, HeartHandshake } from 'lucide-react'

/** The five days of Diwali. Dates differ slightly by region / panchang, so ranges are shown where sources differ. */
export const FIVE_DAYS = [
  {
    id: 'dhanteras',
    day: 1,
    name: 'Dhanteras',
    sanskrit: 'धनतेरस',
    date: 'Fri, 6 Nov',
    icon: Coins,
    accent: '#ffd566',
    summary: 'The festival opens with prayers for health and prosperity.',
    description:
      'Families honour Dhanvantari, the divine physician, and Goddess Lakshmi. It is considered auspicious to bring home something new — gold, silver or a shining utensil — and to light the first lamp at the doorstep at dusk.',
    rituals: ['Buy something new & shining', 'Yama Deepam at dusk', 'Clean & decorate the home'],
  },
  {
    id: 'naraka',
    day: 2,
    name: 'Naraka Chaturdashi',
    sanskrit: 'नरक चतुर्दशी',
    date: '7–8 Nov',
    icon: Flame,
    accent: '#ff7a2f',
    summary: 'Choti Diwali — the night evil is overcome.',
    description:
      'Remembered as the day Lord Krishna defeated the demon Narakasura and freed the world from fear. Before dawn, people take a ritual oil bath, wear new clothes, and light rows of small lamps to banish the last of the darkness.',
    rituals: ['Pre-dawn oil bath', 'Rangoli at the door', 'First rows of diyas'],
  },
  {
    id: 'lakshmi',
    day: 3,
    name: 'Lakshmi Puja',
    sanskrit: 'लक्ष्मी पूजन',
    date: 'Sun, 8 Nov',
    icon: Flower2,
    accent: '#ffb347',
    summary: 'The main night — homes glow for Goddess Lakshmi.',
    description:
      'The heart of Diwali, falling on the new-moon night of Kartika. Homes are lit from threshold to rooftop, Lakshmi and Ganesha are worshipped after sunset, sweets are shared with neighbours, and the sky fills with fireworks.',
    rituals: ['Lakshmi–Ganesh puja', 'Light every corner', 'Share sweets & gifts'],
  },
  {
    id: 'govardhan',
    day: 4,
    name: 'Govardhan Puja',
    sanskrit: 'गोवर्धन पूजा',
    date: '9–10 Nov',
    icon: Mountain,
    accent: '#f2a23a',
    summary: 'Gratitude to nature, and a mountain of food.',
    description:
      'Celebrates Krishna lifting Govardhan hill to shelter his village from a storm. Devotees prepare Annakut — a towering offering of dozens of dishes — and in many regions this day also begins the new year.',
    rituals: ['Annakut food offering', 'Build a Govardhan from clay', 'New-year blessings'],
  },
  {
    id: 'bhaidooj',
    day: 5,
    name: 'Bhai Dooj',
    sanskrit: 'भाई दूज',
    date: '10–11 Nov',
    icon: HeartHandshake,
    accent: '#ff8fa3',
    summary: 'A festival of siblings to close the celebration.',
    description:
      'Sisters apply a tilak to their brothers’ foreheads and pray for their long, happy lives; brothers return the love with gifts and promises of protection. A gentle, family-filled finale to five days of light.',
    rituals: ['Tilak & aarti', 'Exchange gifts', 'A family feast'],
  },
]

export const DIYA_WISHES = [
  { name: 'Prosperity', line: 'May abundance find its way to every corner of your home.' },
  { name: 'Health', line: 'May your days be strong, your sleep deep, and your heart light.' },
  { name: 'Love', line: 'May the people you cherish stay close, and love grow louder.' },
  { name: 'Wisdom', line: 'May you always find the right light to choose your path by.' },
  { name: 'Peace', line: 'May stillness settle over your mind like a glowing evening.' },
  { name: 'Joy', line: 'May laughter echo through your rooms long after the lamps burn low.' },
  { name: 'Courage', line: 'May you carry a small flame of bravery into every dark place.' },
  { name: 'Gratitude', line: 'May you notice the quiet blessings that were always there.' },
  { name: 'Harmony', line: 'May kindness bind your family, friends and neighbours together.' },
]

export const WISHES = [
  'May the glow of a thousand lamps light every corner of your life, and may joy find its way to your doorstep.',
  'On this Diwali, may every wish you hold quietly in your heart be lit with hope and answered with grace.',
  'May Goddess Lakshmi bless your home with abundance, and may Lord Ganesha clear every path ahead of you.',
  'Wishing you sweets that never run out, laughter that fills the house, and a year as bright as tonight’s sky.',
  'Let the lamps you light today chase away every worry, and leave behind only warmth, peace and gratitude.',
  'May this festival of lights bring you closer to the people you love and the dreams you have been nurturing.',
  'Just as one diya can light a thousand others without losing its flame, may your kindness multiply endlessly.',
  'May your days sparkle brighter than the fireworks and your heart stay lighter than a floating lantern.',
  'Here’s to new beginnings, brighter days, and the quiet courage to light a lamp wherever it is dark.',
  'May prosperity knock on your door, health stay by your side, and happiness be your forever guest.',
  'Wishing you and your family a Diwali full of golden moments, glowing faces and endless blessings.',
  'May the light of Diwali bring you wisdom to choose well, strength to rise again, and love that never dims.',
]
