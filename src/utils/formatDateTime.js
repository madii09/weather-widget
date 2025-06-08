export const formatDateTime = raw => {
	const date = typeof raw === 'string' ? new Date(raw) : new Date(raw);
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date);
};
