export const es = {
  app: {
    title: 'Calculadora de Días Hábiles',
    subtitle: 'Calcula una fecha futura sumando días hábiles.',
  },
  form: {
    country: 'País',
    startDate: 'Fecha de Inicio',
    workingDays: 'Días Hábiles a Sumar',
    result: 'Fecha Resultado',
    plainDaysContrast: {
      label: 'Si contaras días corridos:',
      diff: '+{{n}} días de diferencia',
      diff_negative: '{{n}} días de diferencia',
    },
    exclusions: {
      toggleShow: 'Mostrar días excluidos',
      toggleHide: 'Ocultar días excluidos',
      empty: 'No hay días excluidos en este período.',
      weekend: 'Fin de semana',
    },
  },
  reminders: {
    title: 'Recordatorios',
    credits: 'Créditos de Recordatorio:',
    watchAd: 'Ver Anuncio por Crédito',
    addReminder: 'Usar 1 Crédito para Añadir Recordatorio',
    success: '¡Recordatorio configurado con éxito!',
  },
  holidays: {
    title: 'Feriados para {{country}} ({{year}})',
    none: 'No hay datos de feriados para el año seleccionado.',
  },
  result: {
    tooltip: 'Los días hábiles excluyen fines de semana y feriados del país seleccionado.',
    note: 'Calculado desde {{start}}, excluyendo fines de semana y feriados de {{country}}.',
    invalidInput: 'Por favor, ingrese datos válidos para ver el resultado.',
  }
};
