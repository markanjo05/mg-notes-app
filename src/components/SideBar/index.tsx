import { useState } from "react";
import { connect } from "react-redux";

// utils
import { getPageColors } from "src/common/functions";
import { notesColorSelection } from "src/common/constants/colors";

// store imports
import { RootState } from "src/store/reducers";
import { updatePageMode } from "src/store/actions/pageSettingsActions";
import { PageSettingsState } from "src/store/types/pageSettings";

// ant design imports
import { Button, Space, Switch } from "antd";
import Sider from "antd/lib/layout/Sider";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

type Props = {
  hasOpenNotes: boolean;
  handleAddNote: (color: string) => void;
  pageSettings: PageSettingsState;
  updatePageMode: (isDarkMode: boolean) => void;
};

const SideBar = (props: Props) => {
  const { hasOpenNotes, handleAddNote, pageSettings, updatePageMode } = props;
  const [isShowColorSelection, setIsShowColorSelection] =
    useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    pageSettings.isDarkMode
  );

  const pageColors = getPageColors(isDarkMode);

  const handleToggleColorSelection = () => {
    setIsShowColorSelection(!isShowColorSelection);
  };

  const handleToggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    updatePageMode(checked);
  };

  return (
    <Sider
      collapsed={true}
      className="d-flex justify-content-center pt-5 ps-5 pe-5"
      style={{
        background: pageColors.sidebar,
        transition: "none",
      }}
    >
      <div className="d-flex flex-column justify-content-between h-100 align-items-center">
        <div className="mb-3">
          <Button
            type="primary"
            shape="circle"
            icon={isShowColorSelection ? <CloseOutlined /> : <PlusOutlined />}
            size="large"
            style={{
              background: hasOpenNotes ? "" : isDarkMode ? "" : "#000",
              height: 60,
              width: 60,
              transition: "none",
            }}
            className={"border-0"}
            onClick={handleToggleColorSelection}
            disabled={hasOpenNotes}
          />
          {isShowColorSelection && (
            <Space
              direction="vertical"
              size="large"
              className="d-flex align-items-center mt-5"
            >
              {notesColorSelection.map((color) => (
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  style={{ background: color.value }}
                  className={"border-0"}
                  onClick={() => {
                    handleAddNote(color.value);
                  }}
                >
                  {" "}
                </Button>
              ))}
            </Space>
          )}
        </div>
        <div className="text-center mb-4">
          <Switch checked={isDarkMode} onChange={handleToggleDarkMode} />
          <span className={`${pageColors.text} d-block mt-2`}>
            {isDarkMode ? "Dark" : "Light"}
          </span>
        </div>
      </div>
    </Sider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    pageSettings: state.pageSettings,
  };
};

export default connect(mapStateToProps, { updatePageMode })(SideBar);
