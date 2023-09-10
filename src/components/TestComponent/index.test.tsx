import { render, screen  } from '@testing-library/react'
import { TestComponent } from '.'
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<TestComponent />)
 
    const heading = screen.getByRole('heading', {
      name: /This is Test1/i,
    })
 
    expect(heading).toBeInTheDocument()
  })
})