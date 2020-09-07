import RcTable from '@cfxjs/rc-table'
import React from 'react'
import css from 'styled-jsx/css'
import useTheme from '../styles/use-theme'
import { InputVariantTypes } from '../utils/prop-types'
import ExpandIcon from './ExpandIcon'
import { TableProps as RcTableProps } from '@cfxjs/rc-table/es/Table'
export type { ColumnType, ColumnsType, CellType } from '@cfxjs/rc-table/es/interface'
export type TableVariants = InputVariantTypes

export interface Props<RecordType> extends RcTableProps<RecordType> {
  variant?: TableVariants
}

const defaultProps = {
  variant: 'solid' as TableVariants,
}

type NativeAttrs<RecordType> = Omit<React.TableHTMLAttributes<any>, keyof Props<RecordType>>
export type TableProps<RecordType> = Props<RecordType> &
  typeof defaultProps &
  NativeAttrs<RecordType>

function Table<RecordType>({ variant, children, ...props }: TableProps<RecordType>) {
  const theme = useTheme()
  const { expressiveness, palette, layout } = theme
  if (props.expandable && !props.expandable.expandIcon) {
    props.expandable.expandIcon = ExpandIcon
  }
  const { className, styles } = css.resolve`
    .table {
      background-color: ${palette.cNeutral8};
      font-size: 1rem;
      color: ${palette.cNeutral7};
      line-height: 1.5;
      box-sizing: border-box;
      position: relative;
    }
    .table-rtl {
      direction: rtl;
    }
    .table :global(table) {
      border-spacing: 0px;
      width: 100%;
    }
    .table :global(th),
    .table :global(td) {
      font-weight: normal;
      padding: 0;
      position: relative;
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-top: 0;
      border-left: 0;
      border-right: 0;
      transition: box-shadow 0.3s;
      padding: ${layout.gap} calc((${layout.gapHalf} / 2) * 3);
      box-sizing: border-box;
      white-space: normal;
      word-break: break-word;
    }
    .table-rtl.table :global(th),
    .table-rtl.table :global(td) {
      border-left: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-right: 0;
    }
    .table :global(.table-cell-fix-left),
    .table :global(.table-cell-fix-right) {
      z-index: 1;
    }
    .table :global(.table-cell-fix-right:last-child:not(&-fix-sticky)) {
      border-right-color: transparent;
    }
    .table.table-rtl :global(.table-cell-fix-right:last-child) {
      border-right-color: ${palette.cNeutral2};
    }
    .table.table-rtl :global(.table-cell-fix-left:last-child) {
      border-left-color: transparent;
    }
    .table.table-rtl :global(.table-cell-fix-left-first) {
      box-shadow: 1px 0 0 ${palette.cNeutral2};
    }
    .table :global(.table-cell-fix-left-first::after),
    .table :global(.table-cell-fix-left-last::after) {
      pointer-events: none;
      content: '';
      transition: box-shadow 0.3s;
      position: absolute;
      top: 0;
      bottom: -1px;
      width: 1.4286rem;
      right: -1px;
      transform: translateX(100%);
    }
    .table :global(.table-cell-fix-right-first),
    .table :global(.table-cell-fix-right-last) {
      box-shadow: -1px 0 0 ${palette.cNeutral2};
    }
    .table.table-rtl :global(.table-cell-fix-right-first),
    .table.table-rtl :global(.table-cell-fix-right-last) {
      box-shadow: none;
    }
    .table :global(.table-cell.table-cell-fix-right-first::after),
    .table :global(.table-cell.table-cell-fix-right-last::after) {
      pointer-events: none;
      content: '';
      transition: box-shadow 0.3s;
      position: absolute;
      top: 0;
      bottom: -1px;
      width: 1.4286rem;
      left: -1px;
      transform: translateX(-100%);
    }
    .table :global(.table-cell.table-cell-ellipsis) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .table :global(.table-cell.table-cell-ellipsis.table-cell-fix-left-first),
    .table :global(.table-cell.table-cell-ellipsis.table-cell-fix-left-last),
    .table
      :global(.table-cell.table-cell-ellipsis.table-cell-fix-right-first
        .table-cell.table-cell-ellipsis.table-cell-fix-right-last) {
      overflow: visible;
    }
    .table :global(.table-cell.table-cell-ellipsis.table-cell-fix-left-first .table-cell-content),
    .table :global(.table-cell.table-cell-ellipsis.table-cell-fix-left-last .table-cell-content),
    .table
      :global(.table-cell.table-cell-ellipsis.table-cell-fix-right-first
        .table-cell.table-cell-ellipsis.table-cell-fix-right-last
        .table-cell-content) {
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    .table.table-ping-left :global(.table-cell-fix-left-first::after),
    .table.table-ping-left :global(.table-cell-fix-left-last::after) {
      box-shadow: inset 10px 0 8px -8px ${palette.cNeutral2};
    }
    .table.table-ping-right :global(.table-cell-fix-right-first::after),
    .table.table-ping-right :global(.table-cell-fix-right-last::after) {
      box-shadow: inset -10px 0 8px -8px ${palette.cNeutral2};
    }
    .table :global(.table-expand-icon-col) {
      width: 4.2857rem;
    }
    .table :global(.table-row-expand-icon-cell) {
      text-align: left;
    }
    .table :global(thead td),
    .table :global(thead th) {
      text-align: left;
      background: ${palette.cNeutral8};
      color: ${palette.cNeutral5};
    }
    .table.variant-line :global(thead td),
    .table.variant-line :global(thead th) {
      background: ${palette.cNeutral0};
    }
    .table :global(thead .table-cell-scrollbar::after) {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      left: -1px;
      width: 1px;
      background: ${palette.cNeutral0};
    }
    .table-rtl.table :global(thead .table-cell-scrollbar::after) {
      right: -1px;
      left: auto;
    }
    .table :global(.table-header) {
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-right: 0;
      border-bottom: 0;
    }
    .table :global(.table-placeholder) {
      text-align: left;
    }
    .table :global(tbody tr td),
    .table :global(tbody tr th) {
      background: ${palette.cNeutral8};
    }
    .table :global(.table-content) {
      border-bottom: 0;
    }
    .table :global(.table-body) {
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-right: 0;
      border-bottom: 0;
      border-top: 0;
    }
    .table.table-fixed-column :global(.table-body::after) {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      z-index: 1;
    }
    .table :global(.table-expanded-row .table-cell) {
      box-shadow: inset 0 8px 8px -8px ${palette.cNeutral2};
    }
    .table :global(.table-expanded-row-fixed) {
      box-sizing: border-box;
      margin: -${layout.gap} -${layout.gapHalf};
      padding: ${layout.gap} ${layout.gapHalf};
      margin-right: -calc((${layout.gapQuarter} * 5) / 2);
    }
    .table :global(.table-expanded-row-fixed::after) {
      content: '';
      position: absolute;
      width: 0;
      top: 0;
      bottom: 0;
      right: 1px;
      border-right: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
    }
    .table :global(.table-row-expand-icon) {
      position: relative;
      display: inline-flex;
      float: left;
      box-sizing: border-box;

      width: 1rem;
      height: 1rem;
      padding: 0;
      color: inherit;
      line-height: 1rem;
      vertical-align: -2px;
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} currentColor;
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      user-select: none;
    }
    .table :global(.table-row-expand-icon:hover),
    .table :global(.table-row-expand-icon:focus),
    .table :global(.table-row-expand-icon:active) {
      border-color: currentColor;
    }
    .table :global(.table-row-expand-icon::before),
    .table :global(.table-row-expand-icon::after) {
      position: absolute;
      background: currentColor;
      transition: transform 0.3s ease-out;
      content: '';
    }
    .table :global(.table-row-expand-icon::before) {
      top: calc(50% - (${expressiveness.L1} / 2));
      right: calc(1rem / 4);
      left: calc(1rem / 4);
      height: ${expressiveness.L1};
    }
    .table :global(.table-row-expand-icon::after) {
      top: calc(1rem / 4);
      bottom: calc(1rem / 4);
      left: calc(50% - (${expressiveness.L1} / 2));
      width: ${expressiveness.L1};
      transform: rotate(90deg);
    }
    .table :global(.table-row-expand-icon.table-row-expand-icon-collapsed::before) {
      transform: rotate(-180deg);
    }
    .table :global(.table-row-expand-icon.table-row-expand-icon-collapsed::after) {
      transform: rotate(0deg);
    }
    .table :global(.table-row-expand-icon.table-row-expand-icon-spaced) {
      background: transparent;
      border: 0;
      visibility: hidden;
    }
    .table :global(.table-row-expand-icon.table-row-expand-icon-spaced::before),
    .table :global(.table-row-expand-icon.table-row-expand-icon-spaced::after) {
      display: none;
      content: none;
    }
    .table :global(.table-title) {
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-bottom: 0;
      padding: ${layout.gap} ${layout.gapHalf};
    }
    .table :global(.table-footer) {
      border: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
      border-top: 0;
      padding: ${layout.gap} ${layout.gapHalf};
    }
    .table :global(tfoot td) {
      background: #fff;
    }
    .table :global(.table-sticky-header) {
      position: sticky;
      z-index: 2;
    }
    .table :global(.table-sticky-scroll) {
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;
      border-top: ${expressiveness.L1} ${expressiveness.cLineStyle1} #f3f3f3;
      opacity: 0.6;
      transition: transform 0.1s ease-in 0s;
      z-index: 2;
    }
    .table :global(.table-sticky-scroll:hover) {
      transform: scaleY(1.2);
      transform-origin: center bottom;
    }
    .table :global(.table-sticky-scroll-bar) {
      height: ${layout.gapHalf};
      border-radius: ${expressiveness.R2};
      background-color: #bbb;
    }
    .table :global(.table-sticky-scroll-bar:hover) {
      background-color: #999;
    }
    .table :global(.table-sticky-scroll-bar-active) {
      background-color: #999;
    }
    .table.variant-solid :global(*) {
      border: transparent;
    }
    .table.variant-solid :global(tbody tr.table-row-even th),
    .table.variant-solid :global(tbody tr.table-row-even td) {
      background-color: ${palette.cNeutral0};
    }
    .table.variant-solid :global(tbody tr:hover td) {
      background-color: ${palette.cTheme0};
    }

    // variant-line
    .table.variant-line :global(tr th) {
      border-top: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral1};
    }
    .table.variant-line :global(tr th:first-child) {
      border-left: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral1};
    }
    .table.variant-line :global(tr th:last-child) {
      border-right: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral1};
    }
    .table.variant-line :global(tbody tr td) {
      border-top: ${expressiveness.L1} ${expressiveness.cLineStyle1} transparent;
    }
    .table.variant-line :global(tr td:first-child) {
      border-left: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
    }
    .table.variant-line :global(tr td:last-child) {
      border-right: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cNeutral2};
    }
    .table.variant-line :global(tbody tr:hover td) {
      border-top: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cTheme5};
      border-bottom: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cTheme5};
    }
    .table.variant-line :global(tbody tr:hover td:first-child) {
      border-left: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cTheme5};
    }
    .table.variant-line :global(tbody tr:hover td:last-child) {
      border-right: ${expressiveness.L1} ${expressiveness.cLineStyle1} ${palette.cTheme5};
    }
  `
  return (
    <div>
      <RcTable<RecordType>
        prefixCls="table"
        className={`${className} ${variant === 'solid' ? 'variant-solid' : 'variant-line'}`}
        {...props}>
        {children}
      </RcTable>
      {styles}
    </div>
  )
}

Table.defaultProps = defaultProps
Table.Column = RcTable.Column
Table.ColumnGroup = RcTable.ColumnGroup

export default Table
