import { t } from "i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ManagementAccount.scss";
import TabAccount from "./TabAccount";
import { getAllAccount, searchAccount } from "./AccountSlice";
import Icons from "../../../../components/Icons";

function ManagementAccount(params) {
  const dispatch = useDispatch();
  const allAccount = useSelector((state) => state.account.allAccount?.account);
  const [listAcount, setListAccount] = useState(allAccount);
  const ref = useRef();

  const accountByActive = useCallback(
    (status) => {
      return listAcount?.filter((itemAccount) => {
        return itemAccount.is_active === status;
      });
    },
    [listAcount]
  );

  const handleOnkeyDown = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        await dispatch(searchAccount(ref.current.value)).then((res) => {
          if (res.payload.status === 200) {
            setListAccount(res.payload?.data.accounts);
          }
        });
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(async () => {
    await dispatch(searchAccount(ref.current.value)).then((res) => {
      if (res.payload.status === 200) {
        setListAccount(res.payload?.data.accounts);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (allAccount && allAccount.length > 0) {
      setListAccount(allAccount);
    }
  }, [allAccount]);

  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);

  return (
    <div id="management-account">
      <div className="container">
        <div className="input-search-account">
          <input
            type="text"
            placeholder={t("search")}
            ref={ref}
            onKeyDown={handleOnkeyDown}
          ></input>
          <div className="icon-search" onClick={handleSearch}>
            <Icons.Search />
          </div>
        </div>
        {allAccount && allAccount.length > 0 ? (
          <Tabs
            defaultActiveKey="active"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {/* <Tab eventKey="all" title={t("all")}>
              <TabAccount accounts={accountByActive(null)} />
            </Tab> */}
            <Tab eventKey="active" title={t("active")}>
              <TabAccount accounts={accountByActive(true)} isLock={false} />
            </Tab>
            <Tab eventKey="no-active" title={t("no_active")}>
              <TabAccount accounts={accountByActive(false)} isLock={true} />
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
