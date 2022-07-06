/*
Context is a singleton containing stuff that gets initialized at startup, such as db connections and whatnot
*/
class Context {
  startupTime: string

  constructor() {
    this.startupTime = new Date().getTime().toString()
  }
}

let context : Context;

export const getContext = () : Context => {
  if (context === undefined) {
    context = new Context();
  }
  return context;
}
