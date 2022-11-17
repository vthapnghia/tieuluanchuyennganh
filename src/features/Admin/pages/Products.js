import TableCommon from "../../../components/TableCommon";

function Products(props) {
  const cols = [
    { label: "column 1", align: "center" },
    { label: "column 1", align: "center" },
    { label: "column 1", align: "center" },
    { label: "column 1", align: "center" },
  ];
  const rows = [
    {columns: [
        { label: "column 1", align: "center" },
        { label: "column 1", align: "center" },
        { label: "column 1", align: "center" },
        { label: "column 1", align: "center" },
    ]},
    {columns: [
        { label: "column 1", align: "center" },
        { label: "column 1", align: "center" },
        { label: "column 1", align: "center"},
        { label: "column 1", align: "center"},
    ]}
  ]
  return (
    <>
      <TableCommon cols={cols} rows={rows}/>
    </>
  );
}

export default Products;
