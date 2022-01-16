function logger(fn = 'log') {
  if (process.env.NODE_ENV !== 'production' || fn === 'error') {
    return console[fn].bind(console, 'Logger: ');
  }
  return () => {};
}

export const consoleLog = logger();
export const consoleDebug = logger('debug');
export const consoleWarning = logger('warn');
export const consoleError = logger('error');
