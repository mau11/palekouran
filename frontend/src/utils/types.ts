export type Session = {
  access_token: string;
};

export type AccountProps = {
  session: Session;
  onSignOut: () => void;
};
