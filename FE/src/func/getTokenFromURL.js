export function getTokenFromUrl(paramName = "token") {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}