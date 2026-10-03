export interface WorkExample {
	id: string;
	title: string;
	previewUrl: string;
	fullUrl: string;
}

const WORK_FILES = [
	{file: 'soc-portal-vladimir.png', title: 'Социальный навигатор'},
	{file: 'soc-portal-vladimir-anketa.png', title: 'Социальный навигатор. Анкета подбора мер поддержки'},
	{file: 'patronage-queue.png', title: 'Патронаж СВО. Очередь потребностей'},
	{file: 'patronage-recipients.png', title: 'Патронаж СВО. Реестр получателей'},
	{file: 'patronage-passport.png', title: 'Патронаж СВО. Социальный паспорт'},
	{file: 'patronage-settings.png', title: 'Патронаж СВО. Настройки уведомлений'},
	{file: 'corp-site.png', title: 'Корпоративный сайт'},
	{file: 'corp-site-geo1.png', title: 'Корпоративный сайт. География внедрения'},
	{file: 'ryzan-app.png', title: 'Приложение Рязанской области'},
	{file: 'mfc-bot-1.png', title: 'Чат-бот МФЦ'},
	{file: 'personal-page-for-person-1.png', title: 'Портфолио дизайнера: навигация'},
	{file: 'personal-page-for-person-2.png', title: 'Портфолио дизайнера: проекты'},
	{file: 'mfc-queue.png', title: 'Электронная очередь МФЦ'},
	{file: 'mfc-queue-terminal.png', title: 'Электронная очередь. Терминал выдачи талонов'},
	{file: 'mfc-queue-operator.png', title: 'Электронная очередь. Панель сотрудника'},
	{file: 'mfc-queue-stats.png', title: 'Электронная очередь. Статистика зала'},
	{file: 'mfc-queue-admin.png', title: 'Электронная очередь. Администрирование офисов'},
] as const;

export const workExamples: WorkExample[] = WORK_FILES.map(({file, title}) => {
	const id = file.replace(/\.[^.]+$/, '');

	return {
		id,
		title,
		previewUrl: `/images/projects/previews/preview_${id}.jpeg`,
		fullUrl: `/images/projects/${file}`,
	};
});

export const INITIAL_WORKS_COUNT = 8;
