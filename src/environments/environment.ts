// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Environment } from './types';

export const environment: Environment = {
  production: false,
  discordURL: 'https://discord.gg/qsctEK2',
  firebase: {
    apiKey: 'AIzaSyDQDfY9LihVJctR7xkiaSAK3oY_gWymzMo',
    authDomain: 'brockcsc-test.firebaseapp.com',
    databaseURL: 'https://brockcsc-test.firebaseio.com',
    projectId: 'brockcsc-test',
    storageBucket: 'brockcsc-test.appspot.com',
    messagingSenderId: '616874187714',
    appId: '1:616874187714:web:7c2991b562ffab0944d45b',
  },
  execApplicationForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScOYzySwdp33VLDSTFMmeNIIg_2VHEWoiSiDUw7EC_BXoHcng/formResponse',
    ids: {
      name: 'entry.475531787',
      email: 'entry.1544656338',
      intrCscExec: 'entry.1838966879',
      skills: 'entry.39093058',
      workshop: 'entry.22914651',
      years: 'entry.147287492',
      role: 'entry.1736790380',
      currentYear: 'entry.1485254061',
    },
  },
  signupForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScfT1oeDUiFjoMoHiIwDMrc_ubjSAoDjSrC1BCJiD-sW2zVcA/formResponse',
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
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfIMBt7liyTYChtmhRHKg83Kk6PBUu9MqQFBD6XUX7IUn3qaA/formResponse',
    ids: {
      email: 'entry.1065686669',
    },
  },
  contactForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSetrnW07PDBEuBV-NMf801AQaExf8Pu_TJ9kr95cLBoNl6sjQ/formResponse',
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
