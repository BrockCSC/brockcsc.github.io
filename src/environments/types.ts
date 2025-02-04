import { FirebaseOptions } from '@angular/fire/app';

export type Environment = {
  production: boolean;
  discordURL: string;
  stripeKey: string;
  stripe2025: string;
  stripe2024: string;
  firebase: FirebaseOptions;
  execApplicationForm: ExecApplicationFormConfig;
  signupForm: SignUpGoogleFormConfig;
  discordInviteForm: DiscordSignUpGoogleFormConfig;
  contactForm: ContactFormConfig;
  merchForm: MerchFormConfig;
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

export type MerchFormConfig = {
  url: string;
  ids: {
    email: string;
    id: string;
    color: string;
    size: string;
    refnum: string;
  };
};
