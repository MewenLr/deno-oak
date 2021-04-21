export default {
  jwt: /^\JWT\s\b[A-Za-z0-9\-\._~\+\/]+=*$/,
  username: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{3,16}$/, /* one upper case, one lower case, and between 3 and 16 characters */
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/, /* one digit, one upper case, one lower case, and between 8 and 32 characters */
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}
