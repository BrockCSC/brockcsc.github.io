import { Environment } from './types';

export const environment: Environment = {
  production: true,
  discordURL: 'https://discord.gg/qsctEK2',
  stripeKey:
    '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',
  stripe2025: 'https://buy.stripe.com/cN2eV9aVVgHS4G44gm',
  stripe2024: 'https://buy.stripe.com/cN2fZd4xx3V66OceUZ',
  firebase: {
    apiKey: 'AIzaSyCs9zuNhRinJgZAiY2KQOHXP5pNI2ssQyc',
    authDomain: 'brockcsc-b0f6e.firebaseapp.com',
    databaseURL: 'https://brockcsc-b0f6e.firebaseio.com',
    projectId: 'brockcsc-b0f6e',
    storageBucket: 'brockcsc-b0f6e.appspot.com',
    messagingSenderId: '232986247009',
  },
  execApplicationForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfBrVc9NN552xvMBIQ36_-q8jUuuMvgNdBVn2fTM4bsgkcRqw/formResponse',
    // post parameters for the google form
    ids: {
      name: 'entry.475531787',
      email: 'entry.1544656338',
      intrCscExec: 'entry.1838966879',
      skills: 'entry.39093058',
      workshop: 'entry.22914651',
      years: 'entry.147287492',
      role: 'entry.1892201500',
      currentYear: 'entry.1485254061',
    },
  },
  signupForm: {
    url: 'https://docs.google.com/forms/d/16g4HfNf23mC50PitgvU4E-bA-Zwbqn0VgofEqipKjcI/formResponse',
    ids: {
      name: 'entry.1746166300',
      student_id: 'entry.1408207548',
      gender: 'entry.1930392869',
      email: 'entry.232532916',
      program: 'entry.252923868',
      number_of_years_member: 'entry.1045425434',
      interests: 'entry.1308050082',
    },
  },
  discordInviteForm: {
    url: 'https://docs.google.com/forms/d/1wklzi9LiBOnq_ngZIcfDuoKHQgl9x9-J6C0v1He8qq4/formResponse',
    ids: {
      email: 'entry.1065686669',
    },
  },
  contactForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeuMwbqxUfOJ1haeYG4fuvPjHDv2Lr82vLP_SSiISqgRvL70w/formResponse',
    // post parameters for the google form
    ids: {
      name: 'entry.2137362012',
      email: 'entry.1926258208',
      message: 'entry.971826736',
    },
  },
  merchForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf3Aet204vFeXXP5IkWm0oEK_rm-VTvHFl6mwEXQxwuounRSg/formResponse',
    ids: {
      email: 'entry.1102895267',
      id: 'entry.2051086268',
      color: 'entry.1216847753',
      size: 'entry.503150430',
      refnum: 'entry.1253622749',
    },
  },
};
