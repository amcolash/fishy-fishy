let debug = true;

if (import.meta.env.MODE === 'production') {
  debug = false;
}

export const Config = {
  debug,
};
