import {useState, type FormEvent, useEffect, useRef} from 'react';

import {profile} from '@shared/config/profile.ts';
import {AppButton} from '@shared/ui/app-button/AppButton.tsx';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';
import {ScrollReveal} from '@shared/ui/scroll-reveal/ScrollReveal.tsx';
import {TelegramIcon} from '@shared/ui/icons/TelegramIcon.tsx';
import {sendContactForm} from '@shared/api/contact/index.ts';

import '../styles/contact.scss';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
	name: string;
	email: string;
	message: string;
}

const initialForm: FormData = {name: '', email: '', message: ''};

export const Contact = () => {
	const [form, setForm] = useState<FormData>(initialForm);
	const [status, setStatus] = useState<FormStatus>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const contactSectionRef = useRef<HTMLDivElement | null>(null);

	// todo сделать анимацию мета боллов
	const animateBall = () => {
		return;
	};

	useEffect(() => {
		const animation = requestAnimationFrame(animateBall);
		return () => cancelAnimationFrame(animation);
	}, []);

	const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({...prev, [field]: e.target.value}));
		if (status !== 'idle') setStatus('idle');
	};

	const handleSubmit = async (e?: FormEvent) => {
		e?.preventDefault();

		if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
			setStatus('error');
			setErrorMessage('Заполните все поля');
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setStatus('error');
			setErrorMessage('Введите корректный email');
			return;
		}

		setStatus('loading');

		try {
			await sendContactForm(form);
			setStatus('success');
			setForm(initialForm);
		} catch {
			setStatus('error');
			setErrorMessage('Не удалось отправить. Попробуйте написать напрямую на почту.');
		}
	};

	return (
		<section ref={contactSectionRef} className="contact" id="contact">
			<SectionTitle text="Контакты" subtitle="Напишите мне – отвечу в ближайшее время" />

			<div className="contact__layout">
				<ScrollReveal delay={150}>
					<form className="contact__form" onSubmit={handleSubmit}>
						<div className="contact__form-panel">
							<div className="contact__field">
								<label htmlFor="contact-name" className="contact__label">Имя</label>
								<input
									id="contact-name"
									type="text"
									className="contact__input"
									placeholder="Как к вам обращаться?"
									value={form.name}
									onChange={handleChange('name')}
									disabled={status === 'loading'}
								/>
							</div>

							<div className="contact__field">
								<label htmlFor="contact-email" className="contact__label">Email</label>
								<input
									id="contact-email"
									type="email"
									className="contact__input"
									placeholder="your@email.com"
									value={form.email}
									onChange={handleChange('email')}
									disabled={status === 'loading'}
								/>
							</div>

							<div className="contact__field">
								<label htmlFor="contact-message" className="contact__label">Сообщение</label>
								<textarea
									id="contact-message"
									className="contact__textarea"
									placeholder="Расскажите о проекте или задайте вопрос..."
									rows={5}
									value={form.message}
									onChange={handleChange('message')}
									disabled={status === 'loading'}
								/>
							</div>

							{status === 'success' && (
								<p className="contact__status contact__status--success">
									Сообщение отправлено! Спасибо, я свяжусь с вами.
								</p>
							)}

							{status === 'error' && (
								<p className="contact__status contact__status--error">{errorMessage}</p>
							)}

							<AppButton
								text={status === 'loading' ? 'Отправка...' : 'Отправить'}
								type="glass"
								size="large"
								style={{width: 'auto'}}
								elastic
								disabled={status === 'loading'}
								onEvent={() => handleSubmit()}
							/>
						</div>
					</form>
				</ScrollReveal>

				<ScrollReveal>
					<div className="contact__info">
						<div className="contact__info-panel">
							<div className="contact__info-item">
								<span className="contact__info-label">Email</span>
								<a href={`mailto:${profile.email}`} className="contact__info-link">
									{profile.email}
								</a>
							</div>
							<div className="contact__info-item">
								<span className="contact__info-label">Телефон</span>
								<a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact__info-link">
									{profile.phone}
								</a>
							</div>
							<div className="contact__info-item">
								<span className="contact__info-label">Telegram</span>
								<a
									href={`https://t.me/${profile.telegram.replace('@', '')}`}
									target="_blank"
									rel="noopener noreferrer"
									className="contact__info-link contact__info-link--with-icon"
								>
									<TelegramIcon size={18} />
									{profile.telegram}
								</a>
							</div>
							<div className="contact__info-item">
								<span className="contact__info-label">ВКонтакте</span>
								<a href={profile.vk} target="_blank" rel="noopener noreferrer" className="contact__info-link">
									vk.ru/gera13sa
								</a>
							</div>
							<div className="contact__info-item">
								<span className="contact__info-label">Локация</span>
								<span className="contact__info-value">{profile.location}</span>
							</div>
						</div>
					</div>
				</ScrollReveal>
			</div>

			<footer className="contact__footer">
				<a href={'https://github.com/gera13sa/personal-page'} target='_blank'>
					Репозиторий на GitHub
				</a>
				{/*<p>{new Date().getFullYear()} {profile.fullName}</p>*/}
			</footer>
		</section>
	);
};
