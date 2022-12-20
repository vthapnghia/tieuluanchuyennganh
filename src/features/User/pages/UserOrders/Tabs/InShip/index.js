import { t } from "i18next";
import { useCallback, useMemo } from "react";
import TableCommon from "../../../../../../components/TableCommon";

function InShip({ orders }) {
  const cols = [
    { label: t("image"), align: "center", width: "10%" },
    { label: t("product"), align: "center", width: "15%" },
    { label: t("price"), align: "center", width: "15%" },
    { label: t("size"), align: "center", width: "10%" },
    { label: t("quantity"), align: "center", width: "12%" },
    { label: t("total"), align: "center", width: "15%" },
  ];

  const rows = useMemo(() => {
    let productInCart = [];
    orders?.forEach((element) => {
      productInCart.push({
        id: 1,
        columns: [
          { label: "test", align: "center", width: "10%" },
          { label: "test", align: "center", width: "15%" },
          { label: "test", align: "center", width: "15%" },
          { label: "test", align: "center", width: "10%" },
          { label: "test", align: "center", width: "12%" },
          { label: "tes", align: "center", width: "15%" },
        ],
      });
    });

    return productInCart;
  }, [orders]);

  const handleClick = useCallback((idRow) => () => {}, []);
  return (
    <div>
      <TableCommon
        cols={cols}
        rows={rows}
        labelHeader={t("remove")}
        handleClick={handleClick}
      />
    </div>
  );
}

export default InShip;
