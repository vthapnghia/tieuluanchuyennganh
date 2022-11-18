import "./TableCommon.scss";
import { Pagination } from "react-bootstrap";
import Input from "../Input";
import { Formik } from "formik";

function TableCommon({ cols, rows }) {
  return (
    <>
      <Formik initialValues={{search: ""}}>
        <>
          <div class="table-common table-responsive">
            <div className="input-search">
              <Input name="search" type="text"></Input>
            </div>
            
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
                        color: 'white'
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
                          borderBottom: "1px solid #6a6a6a",
                          borderTop: i === 0 ? "1px solid #6a6a6a" : "none",
                          borderLeft: j === 0 ? "1px solid #6a6a6a" : "none",
                          borderRight:
                            row.columns.length - 1 === j
                              ? "1px solid #6a6a6a"
                              : "none",
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
            <div className="bottom-pagination">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </>
      </Formik>
    </>
  );
}

export default TableCommon;
