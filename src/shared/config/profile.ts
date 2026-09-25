export interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	startDate: string;
	endDate?: string | null;
	location: string;
	description: string[];
	stack: string[];
}

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	tags: string[];
	company: string;
}

export interface SkillGroup {
	category: string;
	skills: { name: string; level: number }[];
}

export const profile = {
	name: 'Александр',
	fullName: 'Герасимов Александр Денисович',
	title: 'Frontend-разработчик',
	location: 'Саранск',
	age: 24,
	email: 'gera13sa@npminstall.ru',
	phone: '+7 (952) 071-90-70',
	telegram: '@gera13sa',
	vk: 'https://vk.ru/gera13sa',
	resume: '/docs/resume.pdf',
	about: [
		'Выпускник магистратуры МГУ им. Н.П. Огарёва по направлению «Программная инженерия». Начал работать в IT с третьего курса – начинал с поддержки legacy-кода на AngularJS первой и второй версий, постепенно переходил на современный Angular v8+, затем на React и мобильную разработку на React-Native.',
		'В свободное время занимаюсь плёночной и цифровой фотографией. Держу домашний сервер для экспериментов с ИИ и развёртывания личных проектов и сервисов.',
	],
	education: [
		{
			degree: 'Магистр',
			year: '2026',
			university: 'Национальный исследовательский Мордовский государственный университет им. Н.П. Огарёва',
			faculty: 'Факультет математики и информационных технологий',
			specialty: 'Программная инженерия',
		},
		{
			degree: 'Бакалавр',
			year: '2024',
			university: 'Национальный исследовательский Мордовский государственный университет им. Н.П. Огарёва',
			faculty: 'Факультет математики и информационных технологий',
			specialty: 'Программная инженерия',
		}
	],
	languages: [
		{name: 'Русский', level: 'Родной'},
		{name: 'Английский', level: 'B2 – Средне-продвинутый'},
	],
	experience: [
		{
			id: 'basis',
			company: 'ИТЦ Базис',
			role: 'Frontend-разработчик',
			period: 'Ноябрь 2024 – настоящее время',
			startDate: '2024-11',
			endDate: null,
			location: 'Саранск',
			description: [
				'Разрабатывал мобильные приложения для регионов на React Native и PWA-версии порталов государственных сервисов для повышения удобства получения информации о мерах соц. поддержки и мероприятиях региона.',
				'Проектировал и разрабатывал порталы и административные панели для систем ЭСРН (электронный социальный регистр населения).',
				'Разрабатывал и разворачивал корпоративный сайт организации для повышения заинтересованности потенциальный заказчиков.',
				'Создавал внутренние утилиты для автоматизации работы отдела аналитики для сокращения время ручных операций.',
				'Занимался поддержкой и доработкой legacy PHP кода.',
			],
			stack: ['React', 'React-Native', 'Next.js', 'Node.js', 'Laravel', 'PWA Manifest'],
		},
		{
			id: 'evolenta',
			company: 'Эволента',
			role: 'Frontend-разработчик',
			period: 'Май 2023 – Октябрь 2024',
			startDate: '2023-05',
			endDate: '2024-10',
			location: 'Саранск',
			description: [
				'Разрабатывал новые программные модули для систем «Электронная очередь» и «СИЭР», используемых в филиалах МФЦ по всей России: терминал выдачи талонов, табло очереди, административная панель, панель для сотрудника.',
				'Разрабатывал чат-бота для групп МФЦ ВКонтакте, позволяющего гражданам записываться в филиалы и отслеживать статус заявлений.',
				'Занимался поддержкой и расширением функционала legacy-кода AngularJS и его переносом на Angular v15.',
				'Участвовал в технической поддержке третьей и четвёртой линии: диагностика багов, восстановление данных, оперативные доработки.',
			],
			stack: ['Angular v15', 'Angular v15 SSR', 'AngularJS (legacy)', 'Node.js',],
		},
	] satisfies ExperienceItem[],
	projects: [
		{
			id: 'mfc-queue',
			title: 'Электронная очередь МФЦ',
			description: 'Комплекс модулей для филиалов МФЦ: терминал выдачи талонов, табло очереди, панели для сотрудников и администраторов.',
			tags: ['Angular', 'SSR', 'Node.js'],
			company: 'Эволента',
		},
		{
			id: 'mfc-bot',
			title: 'Чат-бот МФЦ',
			description: 'Бот для групп МФЦ ВКонтакте – запись в филиалы и отслеживание статуса заявлений без обращения в офис.',
			tags: ['Node.js', 'VK API'],
			company: 'Эволента',
		},
		{
			id: 'regional-app',
			title: 'Региональные мобильные приложения',
			description: 'Мобильные приложения и PWA-порталы для регионов с информацией о мерах соцподдержки и мероприятиях.',
			tags: ['React Native', 'React', 'PWA'],
			company: 'ИТЦ Базис',
		},
		{
			id: 'esrn',
			title: 'Порталы ЭСРН',
			description: 'Порталы и административные панели для электронного социального регистра населения – проектирование и разработка интерфейсов для государственных сервисов.',
			tags: ['React', 'PWA', 'Laravel'],
			company: 'ИТЦ Базис',
		},
		{
			id: 'corp-site',
			title: 'Корпоративный сайт',
			description: 'Разработка и развёртывание корпоративного сайта организации для привлечения потенциальных заказчиков.',
			tags: ['React', 'Node.js'],
			company: 'ИТЦ Базис',
		},
		{
			id: 'angular-migration',
			title: 'AngularJS → Angular v15',
			description: 'Перенос legacy-приложений с AngularJS на современный Angular v15 с SSR, сохраняя работоспособность для тысяч пользователей МФЦ.',
			tags: ['AngularJS', 'Angular v15', 'SSR'],
			company: 'Эволента',
		},
	] satisfies ProjectItem[],
	skillGroups: [
		{
			category: 'Frontend',
			skills: [
				{name: 'React', level: 95},
				{name: 'TypeScript', level: 80},
				{name: 'Angular', level: 60},
				{name: 'React Native', level: 40},
				{name: 'HTML / CSS', level: 85},
				{name: 'Vite', level: 85},
			],
		},
		{
			category: 'Backend & Tools',
			skills: [
				{name: 'Node.js', level: 40},
				{name: 'Docker', level: 60},
				{name: 'Nginx', level: 55},
				{name: 'Git', level: 75},
				{name: 'CI/CD', level: 50},
			],
		},
		{
			category: 'Практики',
			skills: [
				{name: 'FSD', level: 70},
				{name: 'Storybook', level: 55},
				{name: 'REST API', level: 80},
				{name: 'Redux / Zustand', level: 65},
				{name: 'Linux', level: 60},
			],
		},
	] satisfies SkillGroup[],
} as const;
