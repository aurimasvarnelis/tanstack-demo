import type {Table as ReactTable} from '@tanstack/react-table'
import {flexRender} from '@tanstack/react-table'

interface TableProps<TData> {
    table: ReactTable<TData>
}

export function Table<TData>({table}: TableProps<TData>) {
    return (
        <table style={{borderCollapse: 'collapse', width: '100%'}}>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                        const canSort = header.column.getCanSort()
                        return (
                            <th
                                key={header.id}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    cursor: canSort ? 'pointer' : 'default',
                                }}
                                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                {/* 🔹 Sorting Indicator */}
                                {{
                                    asc: ' 🔼',
                                    desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                            </th>
                        )
                    })}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td
                            key={cell.id}
                            style={{border: '1px solid #ddd', padding: '8px'}}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
