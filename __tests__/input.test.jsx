import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { Input } from '../components/ui/input';
import '@testing-library/jest-dom';


describe('Input component', () => {
  it('renders input element', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('handles onChange event', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(1); // 'test' has 4 characters
  });
});
