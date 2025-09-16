import type { RefObject } from 'react';

export const getMaxImageHeight = (imageRef: RefObject<HTMLImageElement | null>) => {
  let modalHeight = 0;
  let headerHeight = 0;
  let maxImageHeight = 0;

  console.log('getMaxImageHeight called with imageRef:', imageRef.current);
  if (!imageRef.current) {
    console.log('imageRef.current is null');
    return 0;
  }
  // Get the top modal content, as this gives the actual rendered size of the modal
  const modalContent = imageRef.current.closest('.file-modal-content');
  // Get the modal header from the top modal content
  const modalHeader = modalContent?.querySelector('.file-modal-header');
  // Get the modal body from the top modal content, to get the padding size
  const modalBody = modalContent?.querySelector('.file-modal-body');
  // Get the select file stack and select buttons to subtract their heights
  const selectFileStack = modalContent?.querySelector('.select-file-stack');
  const selectButtons = modalContent?.querySelector('.select-buttons');
  // console.log('modalContent:', modalContent);
  // console.log('modalHeader:', modalHeader);
  // console.log('modalBody:', modalBody);
  // console.log('selectButtons:', selectButtons);
  if (modalContent && modalHeader && modalBody && selectButtons) {
    modalHeight = modalContent.getBoundingClientRect().height;
    headerHeight = modalHeader.getBoundingClientRect().height;
    const bodyBottomPadding = Number.parseInt(getComputedStyle(modalBody).paddingBottom, 10);
    let selectStackHeight = 0;
    if (selectFileStack) {
      selectStackHeight = selectFileStack.getBoundingClientRect().height;
      const selectStackTopMargin = Number.parseInt(getComputedStyle(selectFileStack).marginBottom, 10);
      selectStackHeight += selectStackTopMargin;
    }
    let buttonsHeight = selectButtons.getBoundingClientRect().height;
    const buttonsTopMargin = Number.parseInt(getComputedStyle(selectButtons).marginTop, 10);
    buttonsHeight += buttonsTopMargin;
    maxImageHeight = Math.trunc(modalHeight - headerHeight - selectStackHeight - buttonsHeight - bodyBottomPadding);
    console.log('Returning maxImageHeight:', maxImageHeight);
  } else {
    console.log('One of modalContent, modalHeader, modalBody, selectButtons is null');
  }

  return maxImageHeight;
};
