import "./TableCommon.scss";
import { Pagination } from "react-bootstrap";
import { Formik } from "formik";
import Icons from "../Icons";
import { useCallback } from "react";

function TableCommon({
  cols = [],
  rows = [],
  paginate,
  trueButton,
  handleEdit,
  handleRemove,
  oneButton,
  labelHeader,
  checkAll,
  handleSort,
  handleClick,
  handleOnClickLeftIcon,
  ...props
}) {

  const handleSortTable = useCallback(
    (type, index) => {
      const arrowUp = document.getElementById(`arrow-up-${index}`);
      const arrowDown = document.getElementById(`arrow-down-${index}`);
      const arrowDownClick =
        document.getElementsByClassName("arrow-down-click");
      const arrowUpClick = document.getElementsByClassName("arrow-up-click");
      if (type === "increase") {
        if (arrowDownClick) {
          arrowDown.classList.remove("arrow-down-click");
        }
        arrowUp.classList.toggle("arrow-up-click");
      } else {
        if (arrowUpClick) {
          arrowUp.classList.remove("arrow-up-click");
        }
        arrowDown.classList.toggle("arrow-down-click");
      }
      handleSort(type, index);
    },
    [handleSort]
  );

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
                        {col.sort ? (
                          <div className="d-flex flex-row align-items-center justify-content-center">
                            <span>{col.label}</span>
                            <div className="col-sort">
                              <div
                                onClick={() =>
                                  handleSortTable("increase", index)
                                }
                                id={`arrow-up-${index}`}
                                className="arrow-up"
                              ></div>
                              <div className="arrow-beetwen"></div>
                              <div
                                onClick={() =>
                                  handleSortTable("decrease", index)
                                }
                                id={`arrow-down-${index}`}
                                className="arrow-down"
                              ></div>
                            </div>
                          </div>
                        ) : (
                          col.label
                        )}
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
                  <li key={index} className="table-row align-items-center" onClick={handleClick(row.id)}>
                    {row.columns.map((r, index) => (
                      <div
                        key={index}
                        className="col"
                        style={{
                          flex: r.width,
                          textAlign: r.align,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
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
