interface userI {
  id?: number;
  email?: string;
  nombre?: string;
  role?: string;
}

interface userCompleteI extends userI {
  password: string;
}

interface userResponseI {
  message: string;
  data: userI;
}

export { userI, userCompleteI, userResponseI };
