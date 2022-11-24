import { useTranslation } from "react-i18next";
import TableCommon from "../../../components/TableCommon";

function Products(props) {
  const { t } = useTranslation();
  const cols = [
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
    { label: "column 1", align: "center", width: "20%" },
  ];
  const rows = [
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
    {
      columns: [
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
        { label: "column 1", align: "center", width: "20%" },
      ],
    },
  ];

  const handleRemove = (id) => () => {
    console.log("remove: ", id);
  };

  const handleEdit = (id) => () => {
    console.log("remove: ", id);
  };

  return (
    <TableCommon
      cols={cols}
      rows={rows}
      trueButton={true}
      labelHeader={t("action")}
      handleRemove={handleRemove}
      handleEdit={handleEdit}
    />
  );
}

export default Products;
