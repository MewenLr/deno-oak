interface User {
  email: string,
  username: string,
  password: string,
}

interface UserDoc {
  _id: string,
  email: string,
  username: string,
  password: string,
  // confirmed: boolean,
  // expireAt: Date,
}

export type {
  User,
  UserDoc,
}
