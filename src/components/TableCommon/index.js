import "./TableCommon.scss";
import Icons from "../Icons";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { arrayCheckBox } from "../../features/User/pages/Cart/cartSlice";

function TableCommon({
  cols = [],
  rows = [],
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
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const dispatch = useDispatch();

  const handleOnChangeAll = useCallback(
    () => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(rows.map((row) => row.id));
      if (isCheckAll) {
        setIsCheck([]);
      }
    },

    [isCheckAll, rows]
  );

  const handleOnChangeOne = useCallback(
    (e) => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
      setIsCheckAll(!isCheckAll);
    },
    [isCheck, isCheckAll]
  );

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

  useEffect(() => {
    dispatch(arrayCheckBox(isCheck));
  }, [isCheck, dispatch]);

  return (
    <>
      <div className="table-common table-responsive">
        <div className="table">
          <ul className="responsive-table">
            <li className="table-header align-items-center">
              {checkAll && (
                <div>
                  <input
                    type="checkbox"
                    onChange={handleOnChangeAll}
                    id="check-all"
                    checked={isCheckAll && rows.length === isCheck.length}
                  />
                </div>
              )}
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
                  </div>
                );
              })}
              {(trueButton || oneButton) && (
                <div
                  className="col"
                  style={{ flex: "5%", textAlign: "center" }}
                >
                  {labelHeader}
                </div>
              )}
            </li>
            {rows.map((row, index) => (
              <li
                key={index}
                className="table-row align-items-center"
                onClick={handleClick(row.id)}
              >
                {checkAll && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      id={row.id}
                      onChange={handleOnChangeOne}
                      checked={isCheck.includes(row.id)}
                    />
                  </div>
                )}
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
                      flex: "5%",
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
      </div>
    </>
  );
}

export default TableCommon;
