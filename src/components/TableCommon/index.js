import "./TableCommon.scss";
import { Pagination } from "react-bootstrap";
import { Formik } from "formik";
import Icons from "../Icons";

function TableCommon({
  cols,
  rows,
  paginate,
  trueButton,
  handleEdit,
  handleRemove,
  oneButton,
  labelHeader,
  ...props
}) {
  return (
    <>
      <Formik initialValues={{ search: "" }}>
        <>
          <div className="table-common table-responsive">
            <div className="table">
              <ul className="responsive-table">
                <li className="table-header align-items-center">
                  {cols.map((col, index) => {
                    return (
                      <div
                        key={index}
                        className="col"
                        style={{ flex: col.width, textAlign: col.align }}
                      >
                        {col.label}
                      </div>
                    );
                  })}
                  {(trueButton || oneButton) && (
                    <div
                      className="col"
                      style={{ flex: "10%", textAlign: "center" }}
                    >
                      {labelHeader}
                    </div>
                  )}
                </li>

                {rows.map((row, index) => (
                  <li className="table-row align-items-center">
                    {row.columns.map((r, index) => (
                      <div
                        key={index}
                        className="col"
                        style={{ flex: r.width, textAlign: r.align }}
                      >
                        {r.label}
                      </div>
                    ))}
                    {trueButton && (
                      <div
                        className="col d-flex"
                        style={{
                          flex: "10%",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <div className="button" onClick={handleEdit(row.id)}>
                          <Icons.Edit />
                        </div>
                        <div className="button" onClick={handleRemove(row.id)}>
                          <Icons.Trash />
                        </div>
                      </div>
                    )}
                    {oneButton && (
                      <div
                        className="col d-flex"
                        style={{
                          flex: "10%",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div className="button" onClick={handleRemove(row.id)}>
                          <Icons.Remove />
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {paginate && (
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
            )}
          </div>
        </>
      </Formik>
    </>
  );
}

export default TableCommon;
