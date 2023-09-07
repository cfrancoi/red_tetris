import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it } from 'vitest';

describe('App', () => {
    it('reander app',  () => {
        render(<App />);

        screen.debug();
    })
});