export const en = {
  app: {
    title: 'WorkingDays Calculator',
    subtitle: 'Calculate a future date by adding working days.',
  },
  form: {
    country: 'Country',
    startDate: 'Start Date',
    workingDays: 'Working Days to Add',
    result: 'Result Date',
    plainDaysContrast: {
      label: 'If counting plain calendar days:',
      diff: '+{{n}} days difference',
      diff_negative: '{{n}} days difference',
    },
    exclusions: {
      toggleShow: 'Show excluded days',
      toggleHide: 'Hide excluded days',
      empty: 'No excluded days in this period.',
      weekend: 'Weekend',
    },
  },
  reminders: {
    title: 'Reminders',
    credits: 'Reminder Credits:',
    watchAd: 'Watch Ad for Credit',
    addReminder: 'Use 1 Credit to Add Reminder',
    success: 'Reminder set successfully!',
  },
  holidays: {
    title: 'Holidays for {{country}} ({{year}})',
    none: 'No holiday data available for the selected year.',
  },
  result: {
    tooltip: 'Working days exclude weekends and public holidays for the selected country.',
    note: 'Calculated from {{start}}, excluding weekends and {{country}} public holidays.',
    invalidInput: 'Please provide valid inputs to see the result.',
  }
};
