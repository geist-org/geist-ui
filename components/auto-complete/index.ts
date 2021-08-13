import AutoComplete from './auto-complete'
import AutoCompleteItem from './auto-complete-item'
import AutoCompleteSearching from './auto-complete-searching'
import AutoCompleteEmpty from './auto-complete-empty'

export type AutoCompleteComponentType = typeof AutoComplete & {
  Item: typeof AutoCompleteItem
  Option: typeof AutoCompleteItem
  Searching: typeof AutoCompleteSearching
  Empty: typeof AutoCompleteEmpty
}
;(AutoComplete as AutoCompleteComponentType).Item = AutoCompleteItem
;(AutoComplete as AutoCompleteComponentType).Option = AutoCompleteItem
;(AutoComplete as AutoCompleteComponentType).Searching = AutoCompleteSearching
;(AutoComplete as AutoCompleteComponentType).Empty = AutoCompleteEmpty

export type {
  AutoCompleteOption,
  AutoCompleteOptions,
  AutoCompleteProps,
  AutoCompleteTypes,
} from './auto-complete'
export default AutoComplete as AutoCompleteComponentType
