import { fireEvent, render, screen } from '@testing-library/react';
import ContactFeedbackModal from '../ContactFeedbackModal';

describe('ContactFeedbackModal', () => {
  it('renders nothing while there is no outcome to report', () => {
    const { container } = render(<ContactFeedbackModal status={null} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('confirms the request was sent and offers WhatsApp as the faster path', () => {
    render(<ContactFeedbackModal status="success" onClose={jest.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('¡Solicitud enviada!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Escribirnos por WhatsApp' })).toHaveAttribute(
      'href',
      expect.stringContaining('agendar%20mi%20asesor'),
    );
  });

  it('explains the failure instead of confirming when the send did not go through', () => {
    render(<ContactFeedbackModal status="error" onClose={jest.fn()} />);

    expect(screen.getByText('No pudimos enviar tu solicitud')).toBeInTheDocument();
    expect(screen.queryByText('¡Solicitud enviada!')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<ContactFeedbackModal status="success" onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the icon button and from the dismiss button', () => {
    const onClose = jest.fn();
    render(<ContactFeedbackModal status="success" onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Volver al sitio' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('locks page scroll while open and restores it on unmount', () => {
    const { unmount } = render(<ContactFeedbackModal status="success" onClose={jest.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
