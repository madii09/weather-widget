import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: undefined };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo);
	}

	render() {
		const { hasError, error } = this.state;
		const { children } = this.props;

		if (hasError) {
			return <>Error: {error.message}</>;
		}

		return children;
	}
}

export default ErrorBoundary;
