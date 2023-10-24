import SignIn from '@/app/signin/page';
import { render, screen } from '@testing-library/react';

describe('Sign In Page', () => {
    beforeEach(() => {
        render(<SignIn/>);
    })
    it('Sign In Action', () => {
        expect(screen.getByTestId('card-title')).toHaveTextContent('Signin')
    });

    it('should focus on username on initial load', () => {
        expect(screen.getByTestId('email-input')).toHaveFocus()
    })
})