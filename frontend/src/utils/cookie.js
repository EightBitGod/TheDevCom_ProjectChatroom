export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const findCookie = cname =>
  document.cookie.split(';').filter(item => item.includes(`${cname}=`));

export const getCookie = cname => {
  const cookie = findCookie(cname);
  if (cookie.length) {
    return cookie[0].split('=')[1];
  }
  return undefined;
};

export const checkCookie = cname => {
  const cookie = findCookie(cname);
  return cookie.length;
};

export const deleteCookie = cname => {
  setCookie(cname, '', -1);
};
