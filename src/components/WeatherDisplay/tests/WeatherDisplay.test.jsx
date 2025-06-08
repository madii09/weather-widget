import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WeatherDisplay } from '../WeatherDisplay';

describe('WeatherDisplay', () => {
	const mockData = {
		city: 'Tokyo',
		updatedAt: 'June 8, 2025',
		icon: 'https://openweathermap.org/img/wn/10d@2x.png',
		description: 'light rain',
		temp: 22,
		unit: 'metric',
	};

	it('renders city name and temperature', () => {
		render(<WeatherDisplay data={mockData} displayOptions={{}} />);

		expect(screen.getByText('Tokyo')).toBeInTheDocument();
		expect(screen.getByText('22°C')).toBeInTheDocument();
	});

	it('renders description if showDescription is true', () => {
		render(<WeatherDisplay data={mockData} displayOptions={{ showDescription: true }} />);
		expect(screen.getByText(/light rain/i)).toBeInTheDocument();
	});

	it('does not render description if showDescription is false', () => {
		render(<WeatherDisplay data={mockData} displayOptions={{ showDescription: false }} />);
		expect(screen.queryByText(/light rain/i)).not.toBeInTheDocument();
	});

	it('displays correct image alt and src', () => {
		render(<WeatherDisplay data={mockData} displayOptions={{}} />);
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', mockData.icon);
		expect(img).toHaveAttribute('alt', mockData.description);
	});
});
