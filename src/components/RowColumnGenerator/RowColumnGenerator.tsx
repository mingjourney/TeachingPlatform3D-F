import React, { useState } from 'react'

interface Props {
  row: number
  column: number
  emitResult: (row: number, column: number) => void
}

const RowColumnGenerator: React.FC<Props> = ({ row, column, emitResult }) => {
  const [hoveredCell, setHoveredCell] = useState<{
    row: number
    column: number
  }>({ row: 0, column: 0 })
  const [clickedCell, setClickedCell] = useState<{
    row: number
    column: number
  } | null>(null)

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const clickedCell = { row: rowIndex, column: columnIndex }
    setClickedCell(clickedCell)
    emitResult(rowIndex, columnIndex)
  }
  const handleCellHover = (rowIndex: number, columnIndex: number) => {
    const hoveredCell = { row: rowIndex, column: columnIndex }
    setHoveredCell(hoveredCell)
  }

  return (
    <div
      className="flex flex-col gap-1"
      onMouseLeave={() => handleCellHover(-1, -1)}
    >
      <h3>
        当前选中教室{hoveredCell.row}行,{hoveredCell.column}列
      </h3>
      {Array(row)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {Array(column)
              .fill(null)
              .map((_, columnIndex) => {
                const isHovered =
                  hoveredCell &&
                  hoveredCell.row >= rowIndex &&
                  hoveredCell.column >= columnIndex
                const isChecked =
                  clickedCell &&
                  clickedCell.row >= rowIndex &&
                  clickedCell.column >= columnIndex
                const cellClassNames = `border border-gray-400 w-3 h-3 ${
                  isHovered || isChecked ? 'bg-blue-300' : 'transparent'
                }`
                return (
                  <div
                    className={cellClassNames}
                    key={columnIndex}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    onMouseEnter={() => handleCellHover(rowIndex, columnIndex)}
                  />
                )
              })}
          </div>
        ))}
    </div>
  )
}

export default RowColumnGenerator
3
29
