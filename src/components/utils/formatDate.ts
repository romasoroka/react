export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  export const formatYears = (years: number) => {
    if (years % 10 === 1 && years % 100 !== 11) return `${years} рік`;
    if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) return `${years} роки`;
    return `${years} років`;
  };
  