import { PickerMode } from '@jnoodle/rc-picker/lib/interface'
import enUS from '@jnoodle/rc-picker/lib/locale/en_US'
import zhCN from '@jnoodle/rc-picker/lib/locale/zh_CN'

const langPlaceholder = {
  'en-US': {
    placeholder: 'Select date',
    yearPlaceholder: 'Select year',
    quarterPlaceholder: 'Select quarter',
    monthPlaceholder: 'Select month',
    weekPlaceholder: 'Select week',
    rangePlaceholder: ['Start date', 'End date'],
    rangeYearPlaceholder: ['Start year', 'End year'],
    rangeMonthPlaceholder: ['Start month', 'End month'],
    rangeWeekPlaceholder: ['Start week', 'End week'],
    timePlaceholder: 'Select time',
    timeRangePlaceholder: ['Start time', 'End time'],
  },
  'zh-CN': {
    placeholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeWeekPlaceholder: ['开始周', '结束周'],
    timePlaceholder: '请选择时间',
    timeRangePlaceholder: ['开始时间', '结束时间'],
  },
}

export const normalizeLocaleString = (locale: string) => {
  switch (locale) {
    case 'en-US':
    case 'en_US':
    case 'en':
    case 'english':
      return 'en-US'
    case 'zh-CN':
    case 'zh_CN':
    case 'zh':
    case '中文':
    case '中文简体':
      return 'zh-CN'
    default:
      return 'en-US'
  }
}

// get date picker locale
export const getLocale = (locale: string) => {
  switch (normalizeLocaleString(locale)) {
    case 'zh-CN':
      return zhCN
    // TODO add more locale
    default:
      return enUS
  }
}

// get picker placeholder text
export function getPlaceholder(
  picker: PickerMode | undefined,
  locale: string,
  customizePlaceholder?: string,
): string {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder
  }

  let lang = langPlaceholder[normalizeLocaleString(locale)]

  switch (picker) {
    case 'year':
      return lang.yearPlaceholder
    case 'quarter':
      return lang.quarterPlaceholder
    case 'month':
      return lang.monthPlaceholder
    case 'week':
      return lang.weekPlaceholder
    case 'time':
      return lang.timePlaceholder
    default:
      return lang.placeholder
  }
}

// get range placeholder text
export function getRangePlaceholder(
  picker: PickerMode | undefined,
  locale: string,
  customizePlaceholder?: [string, string],
) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder
  }

  let lang = langPlaceholder[normalizeLocaleString(locale)]

  switch (locale) {
    case 'zh-CN':
    case 'zh':
      lang = langPlaceholder['zh-CN']
      break
  }

  switch (picker) {
    case 'year':
      return lang.rangeYearPlaceholder
    case 'month':
      return lang.rangeMonthPlaceholder
    case 'week':
      return lang.rangeWeekPlaceholder
    case 'time':
      return lang.timeRangePlaceholder
    default:
      return lang.rangePlaceholder
  }
}
