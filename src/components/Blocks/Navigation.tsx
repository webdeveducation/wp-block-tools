import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  htmlContent: string;
};

export function Navigation({ htmlContent, children }: Props) {
  useEffect(() => {
    // logic to detect open / close mobile menu
    const tempHolder = document.createElement('div');
    tempHolder.innerHTML = htmlContent || '';
    const tempEl = tempHolder.querySelectorAll(
      '[data-micromodal-trigger]'
    )?.[0];
    if (tempEl) {
      const modalId = tempEl.getAttribute('data-micromodal-trigger') || '';
      const el = document.querySelectorAll(
        `[data-micromodal-trigger=${modalId}]`
      )?.[0];
      const handleOpenClick = () => {
        document
          .getElementById(modalId)
          ?.classList.add('is-menu-open', 'has-modal-open');
      };
      const handleCloseClick = () => {
        document
          .getElementById(modalId)
          ?.classList.remove('is-menu-open', 'has-modal-open');
      };
      const closeButton = document
        .getElementById(modalId)
        ?.querySelectorAll('[data-micromodal-close]')?.[0];
      if (closeButton) {
        closeButton.addEventListener('click', handleCloseClick);
      }
      el.addEventListener('click', handleOpenClick);
      return () => {
        if (closeButton) {
          closeButton.removeEventListener('click', handleCloseClick);
        }
        el.removeEventListener('click', handleOpenClick);
      };
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
