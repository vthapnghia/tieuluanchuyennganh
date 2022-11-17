import "./TableCommon.scss";
import { useMemo, useCallback } from 'react';

function TableCommon({ cols, rows }) {
  const borderRadiusTD = useCallback((i, j, rows, row) => {
    let borderRadius = '';
    if (i === 0 && j === 0) {
        if (rows.length === 1) {
            borderRadius = '4px 0 0 4px';
        } else {
            borderRadius = '4px 0 0 0px';
        }
    } else {
        if (i === 0 && j === row.length - 1) {
            borderRadius = '0 4px 0px 0';
        } else {
            if (i === rows.length - 1 && j === 0) {
                borderRadius = '0 0 0 4px';
            } else {
                if (i === rows.length - 1 && j === row.columns.length - 1 ) {
                    borderRadius = '0 0px 4px 0';
                } else {
                    borderRadius = '0px';
                }
            }
        }
    }
    return borderRadius;
}, []);
  return (
    <div class="table-common table-responsive">
      <table class="table">
        <thead class="table-header">
          {cols.map((col, i) => {
            return (
              <th
                key={i}
                style={{
                  width: col?.width,
                  minWidth: col?.minWidth,
                  textAlign: col?.align,
                  border: "none",
                }}
                className={col?.className}
              >
                {col.label}
              </th>
            );
          })}
        </thead>

        <div style={{ marginTop: "16px", border: "none" }}></div>

        <tbody class="table-body">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.columns.map((r, j) => (
                <td
                  key={j}
                  style={{
                    width: r?.width,
                    minWidth: r.minWidth,
                    textAlign: r?.align,
                    borderBottom: '1px solid #6a6a6a',
                    borderTop: i === 0 ? '1px solid #6a6a6a' : 'none',
                    borderRadius: '8px',
                    borderLeft: j === 0 ? '1px solid #6a6a6a' : 'none',
                    borderRight:
                        row.columns.length - 1 === j
                            ? '1px solid #6a6a6a'
                            : 'none',
                  }}
                  className={r?.className}
                >
                  {r.label}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCommon;
