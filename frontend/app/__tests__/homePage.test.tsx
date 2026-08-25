import { render, screen } from '@testing-library/react';
import HomePage from '../page';

jest.mock('@/components/layout/Header', () => function MockHeader() { return <header data-testid="header" />; });
jest.mock('@/components/layout/Footer', () => function MockFooter() { return <footer data-testid="footer" />; });
jest.mock('@/components/home/Hero', () => function MockHero() { return <div data-testid="hero" />; });
jest.mock('@/components/home/GoogleReviews', () => function MockGoogleReviews() { return <div data-testid="google-reviews" />; });
jest.mock('@/components/home/Services', () => function MockServices() { return <div data-testid="services" />; });
jest.mock('@/components/home/Gallery', () => function MockGallery() { return <div data-testid="gallery" />; });
jest.mock('@/components/home/Process', () => function MockProcess() { return <div data-testid="process" />; });
jest.mock('@/components/home/AboutSection', () => function MockAbout() { return <div data-testid="about" />; });
jest.mock('@/components/home/WhyTenndalux', () => function MockWhy() { return <div data-testid="why" />; });
jest.mock('@/components/home/FabricSelection', () => function MockFabric() { return <div data-testid="fabric" />; });
jest.mock('@/components/home/ComparisonTable', () => function MockComparison() { return <div data-testid="comparison" />; });
jest.mock('@/components/home/CTASection', () => function MockCTA() { return <div data-testid="cta" />; });
jest.mock('@/components/home/Contact', () => function MockContact() { return <div data-testid="contact" />; });
jest.mock('@/components/home/FAQ', () => function MockFAQ() { return <div data-testid="faq" />; });

describe('HomePage', () => {
  it('renders all page sections', () => {
    render(<HomePage />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('google-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('services')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
