import {profile} from '@shared/config/profile.ts';

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export async function sendContactForm(data: ContactFormData): Promise<void> {
	const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

	if (accessKey) {
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				access_key: '6c5f2245-f66f-4dd4-b4f3-f17521b3834a',
				name: data.name,
				email: data.email,
				message: data.message,
				subject: `Сообщение с сайта от ${data.name}`,
			}),
		});

		const result = await response.json();
		if (!result.success) throw new Error('Web3Forms error');
		return;
	}

	const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			message: data.message,
			_subject: `Сообщение с сайта от ${data.name}`,
		}),
	});

	if (!response.ok) {
		const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(`Сообщение от ${data.name}`)}&body=${encodeURIComponent(`От: ${data.name} (${data.email})\n\n${data.message}`)}`;
		window.location.href = mailtoLink;
		throw new Error('FormSubmit failed');
	}

	const result = await response.json();
	if (!result.success) throw new Error('FormSubmit error');
}
