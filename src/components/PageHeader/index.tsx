import { ChangeEvent } from "react";
import { connect } from "react-redux";

// utils
import { getPageColors } from "src/common/functions";

// store imports
import { RootState } from "src/store/reducers";
import { PageSettingsState } from "src/store/types/pageSettings";
import { Note as NoteType } from "src/store/types/notes";

// ant design imports
import { Col, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

type Props = {
  hasOpenNotes: boolean;
  hasNotes: boolean;
  displayedNotes: NoteType[];
  searchText: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchText: () => void;
  pageSettings: PageSettingsState;
};

const PageHeader = (props: Props) => {
  const {
    hasOpenNotes,
    hasNotes,
    searchText,
    handleSearch,
    handleClearSearchText,
    displayedNotes,
    pageSettings,
  } = props;

  const isDarkMode = pageSettings.isDarkMode;
  const pageColors = getPageColors(isDarkMode);

  return (
    <div
      style={{
        position: "sticky",
        zIndex: 999,
        background: pageColors.header,
        top: 0,
        width: "100%",
      }}
      className="pt-4 pb-1"
    >
      <Row className="w-100">
        <Col sm={24} md={12} lg={10} xl={8} xxl={6} className="w-100 mb-3">
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="mb-2 w-100"
            style={{ borderRadius: "20px" }}
            disabled={hasOpenNotes}
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <Title className={`mb-0 ${pageColors.text}`}>Notes</Title>
      <Text type="secondary" className={`${pageColors.text}`}>
        {hasNotes ? (
          <>
            {displayedNotes.length === 0 && !!searchText && "No results."}
            {displayedNotes.length > 0 &&
              `${displayedNotes.length} note${
                displayedNotes.length > 1 ? "s" : ""
              } ${!!searchText ? "found" : "registered"}.`}
            {!!searchText && (
              <span
                className="ms-2"
                onClick={handleClearSearchText}
                style={{
                  cursor: "pointer",
                  color: "#1890FF",
                }}
              >
                Clear search filter
              </span>
            )}
          </>
        ) : (
          `No saved notes yet.`
        )}
      </Text>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    pageSettings: state.pageSettings,
  };
};

export default connect(mapStateToProps)(PageHeader);
