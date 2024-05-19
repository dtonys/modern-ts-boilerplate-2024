export default function onLinkClick(event: React.MouseEvent<HTMLElement>) {
  const href: string = (event.target as Element).getAttribute('href')!;
  // prevent full page reload
  event.preventDefault();
  // update url
  window.history.pushState({}, '', href);

  // communicate to Routes that URL has changed
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
}
