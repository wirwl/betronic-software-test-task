export const THEMES = {
  vkontakte: 'vkontakte',
  whatsapp: 'whatsapp',
  gitlab: 'gitlab'
}

export const getTheme = (theme) => {
  const { vkontakte, whatsapp, gitlab } = THEMES;
  switch (theme) {
    case vkontakte:
      return vkontakte;
    case whatsapp:
      return whatsapp;
    case gitlab:
      return gitlab;
    default:
      return false;
  }
}