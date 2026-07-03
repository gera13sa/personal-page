interface ExperiencePeriod {
	startDate: string;
	endDate?: string | null;
}

const pluralize = (value: number, one: string, few: string, many: string) => {
	const mod10 = value % 10;
	const mod100 = value % 100;

	if (mod100 >= 11 && mod100 <= 14) return many;
	if (mod10 === 1) return one;
	if (mod10 >= 2 && mod10 <= 4) return few;
	return many;
};

const parseYearMonth = (date: string) => {
	const [year, month] = date.split('-').map(Number);
	return {year, month: month - 1};
};

const getInclusiveMonthSpan = (startDate: string, endDate: Date) => {
	const start = parseYearMonth(startDate);
	const months = (endDate.getFullYear() - start.year) * 12
		+ (endDate.getMonth() - start.month)
		+ 1;

	return Math.max(0, months);
};

export const formatDurationRu = (totalMonths: number) => {
	if (totalMonths <= 0) return '0 месяцев';

	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;
	const parts: string[] = [];

	if (years > 0) {
		parts.push(`${years} ${pluralize(years, 'год', 'года', 'лет')}`);
	}

	if (months > 0) {
		parts.push(`${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')}`);
	}

	return parts.join(' ');
};

export const getExperienceDuration = (
	{startDate, endDate}: ExperiencePeriod,
	referenceDate = new Date(),
) => {
	const end = endDate ? new Date(`${endDate}T00:00:00`) : referenceDate;
	return formatDurationRu(getInclusiveMonthSpan(startDate, end));
};

export const getTotalExperienceDuration = (
	experiences: readonly ExperiencePeriod[],
	referenceDate = new Date(),
) => {
	if (experiences.length === 0) return '0 месяцев';

	const earliestStart = experiences.reduce((earliest, item) => (
		item.startDate < earliest ? item.startDate : earliest
	), experiences[0].startDate);

	const hasCurrentRole = experiences.some((item) => !item.endDate);
	const latestEnd = hasCurrentRole
		? referenceDate
		: new Date(`${experiences.reduce((latest, item) => {
			if (!item.endDate) return latest;
			return item.endDate > latest ? item.endDate : latest;
		}, experiences[0].endDate ?? '')}T00:00:00`);

	return formatDurationRu(getInclusiveMonthSpan(earliestStart, latestEnd));
};

export const getTotalExperienceShortLabel = (
	experiences: readonly ExperiencePeriod[],
	referenceDate = new Date(),
) => {
	if (experiences.length === 0) return '0 месяцев опыта';

	const earliestStart = experiences.reduce((earliest, item) => (
		item.startDate < earliest ? item.startDate : earliest
	), experiences[0].startDate);

	const hasCurrentRole = experiences.some((item) => !item.endDate);
	const latestEnd = hasCurrentRole
		? referenceDate
		: new Date(`${experiences.reduce((latest, item) => {
			if (!item.endDate) return latest;
			return item.endDate > latest ? item.endDate : latest;
		}, experiences[0].endDate ?? '')}T00:00:00`);

	const totalMonths = getInclusiveMonthSpan(earliestStart, latestEnd);
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	if (years > 0 && months > 0) {
		return `${years}+ ${pluralize(years, 'год', 'года', 'лет')} опыта`;
	}

	return `${formatDurationRu(totalMonths)} опыта`;
};
