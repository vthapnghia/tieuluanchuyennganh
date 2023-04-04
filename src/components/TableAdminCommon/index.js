import "./TableAdminCommon.scss";
import Icons from "../Icons";
import { useCallback } from "react";
import { t } from "i18next";

function TableAdminCommon({
  cols,
  rows,
  handleRemove,
  oneButton,
  handleSort,
  handleClick,
}) {

  const handleSortTable = useCallback(
    (type, index) => {
      const arrowUp = document.getElementById(`arrow-up-${index}`);
      const arrowDown = document.getElementById(`arrow-down-${index}`);
      const arrowDownClick =
        document.getElementsByClassName("arrow-down-click");
      const arrowUpClick = document.getElementsByClassName("arrow-up-click");
      if (type === 1) {
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
    <div className="table-admin">
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  {cols.map((col, index) => {
                    return (
                      <th>
                        {col.sort ? (
                          <div className="d-flex flex-row align-items-center justify-content-start">
                            <span>{col.label}</span>
                            <div className="col-sort">
                              <div
                                onClick={() => handleSortTable(1, index)}
                                id={`arrow-up-${index}`}
                                className="arrow-up"
                              ></div>
                              <div className="arrow-beetwen"></div>
                              <div
                                onClick={() => handleSortTable(-1, index)}
                                id={`arrow-down-${index}`}
                                className="arrow-down"
                              ></div>
                            </div>
                          </div>
                        ) : (
                          col.label
                        )}
                      </th>
                    );
                  })}
                  <th style={{ textAlign: "center" }}>{t("remove")}</th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => {
                  return (
                    <tr onClick={handleClick(row.id)}>
                      <th>{index + 1}</th>
                      {row.columns.map((item) => {
                        return <td>{item.label}</td>;
                      })}
                      <th>
                        {oneButton && (
                          <td
                            className="col d-flex"
                            style={{
                              flex: "5%",
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              className="button"
                              onClick={handleRemove(row.id)}
                            >
                              <Icons.Trash />
                            </div>
                          </td>
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableAdminCommon;
