import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from '../Contact';
import { createLead } from '@/lib/services/leads';

// GSAP anima al hacer scroll y no aporta nada a lo que se prueba acá.
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  context: (fn: () => void) => {
    fn();
    return { revert: jest.fn() };
  },
  fromTo: jest.fn(),
}));
jest.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
jest.mock('@/lib/services/leads', () => ({ createLead: jest.fn() }));

const mockedCreateLead = createLead as jest.MockedFunction<typeof createLead>;

function fillForm() {
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText('Apellido'), { target: { value: 'Rodríguez' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '3000000000' } });
  fireEvent.change(screen.getByLabelText('Me interesa'), { target: { value: 'luminux' } });
}

describe('Contact form', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends the filled form as a lead and confirms it', async () => {
    mockedCreateLead.mockResolvedValue();
    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar Solicitud' }));

    await waitFor(() => expect(mockedCreateLead).toHaveBeenCalledTimes(1));
    expect(mockedCreateLead).toHaveBeenCalledWith({
      full_name: 'Ana Rodríguez',
      email: 'ana@example.com',
      phone: '3000000000',
      message: 'Me interesa: Luminux',
      source: 'formulario-home',
    });
    expect(await screen.findByText('¡Solicitud enviada!')).toBeInTheDocument();
  });

  it('clears the fields once the lead was accepted', async () => {
    mockedCreateLead.mockResolvedValue();
    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar Solicitud' }));

    await screen.findByText('¡Solicitud enviada!');
    expect(screen.getByLabelText('Nombre')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });

  it('reports the failure instead of confirming when the request is rejected', async () => {
    mockedCreateLead.mockRejectedValue(new Error('network down'));
    render(<Contact />);
    fillForm();

    fireEvent.click(screen.getByRole('button', { name: 'Enviar Solicitud' }));

    expect(await screen.findByText('No pudimos enviar tu solicitud')).toBeInTheDocument();
    expect(screen.queryByText('¡Solicitud enviada!')).not.toBeInTheDocument();
    // Lo escrito no se pierde: la persona puede reintentar sin volver a teclear.
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ana');
  });
});
