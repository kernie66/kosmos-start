// import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { createActor } from 'xstate';
import { imageSelectionMachine } from '../selectImageMachine';

describe('selectImageMachine', () => {
  it('should handle paste events correctly', () => {
    // const setup = userEvent.setup();
    // Test implementation for paste event handling
    const imageSelectionActor = createActor(imageSelectionMachine);
    imageSelectionActor.start();
    expect(imageSelectionActor.getSnapshot().value).toBe('Select Image');
    // Simulate a paste event with a mock image file
    imageSelectionActor.send({ type: 'get image.paste', data: new File([], 'test.png', { type: 'image/png' }) });
    expect(imageSelectionActor.getSnapshot().value).toBe('Get Image');
    // Add assertions based on expected state transitions or context updates
    // imageSelectionActor.stop();
  });
});
