/**
 * From https://zellwk.com/blog/keyboard-focusable-elements/.
 */

export function getAllFocusableElements<T extends HTMLElement>({
  parent = document,
}: {
  parent: Document | T;
}) {
  if (!parent) return;

  const elements = parent.querySelectorAll(
    'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
  );

  return Array.from(elements).filter(
    (element) =>
      !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'),
  );
}
