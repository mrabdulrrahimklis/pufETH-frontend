export const intlDateTimeFormat = (timestamp: string, justDay: boolean = false) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        ...(justDay ? {} : {
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
}