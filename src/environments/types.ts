import { FirebaseOptions } from '@angular/fire/app';

export type Environment = {
  production: boolean;
  discordURL: string;
  firebase: FirebaseOptions;
  execApplicationForm: ExecApplicationFormConfig;
  signupForm: SignUpGoogleFormConfig;
  discordInviteForm: DiscordSignUpGoogleFormConfig;
  contactForm: ContactFormConfig;
};

export type SignUpGoogleFormConfig = {
  url: string;
  ids: {
    name: string;
    student_id: string;
    gender: string;
    program: string;
    email: string;
    number_of_years_member: string;
    interests: string;
  };
};

export type DiscordSignUpGoogleFormConfig = {
  url: string;
  ids: {
    email: string;
  };
};

export type ExecApplicationFormConfig = {
  url: string;
  ids: {
    name: string;
    email: string;
    intrCscExec: string;
    skills: string;
    workshop: string;
    years: string;
    role: string;
    currentYear: string;
  };
};

export type ContactFormConfig = {
  url: string;
  ids: {
    name: string;
    email: string;
    message: string;
  };
};
