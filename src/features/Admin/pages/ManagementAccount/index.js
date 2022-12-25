import { t } from "i18next";
import { useCallback, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ManagementAccount.scss";
import TabAccount from "./TabAccount";
import { getAllAccount } from "./AccountSlice";

function ManagementAccount(params) {
  const dispatch = useDispatch();
  const allAccount = useSelector((state) => state.account.allAccount?.account);

  const accountByActive = useCallback(
    (status) => {
      if (status === null) {
        return allAccount;
      } else {
        return allAccount?.filter((itemAccount) => {
          return itemAccount.is_active === status;
        });
      }
    },
    [allAccount]
  );
  
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  return (
    <div id="management-account">
      <div className="container">
        {allAccount && allAccount.length > 0 ? (
          <Tabs
            defaultActiveKey="all"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="all" title={t("all")}>
              <TabAccount accounts={accountByActive(null)} />
            </Tab>
            <Tab eventKey="active" title={t("active")}>
              <TabAccount accounts={accountByActive(true)} />
            </Tab>
            <Tab eventKey="no-active" title={t("no_active")}>
              <TabAccount accounts={accountByActive(false)} />
            </Tab>
          </Tabs>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ManagementAccount;
