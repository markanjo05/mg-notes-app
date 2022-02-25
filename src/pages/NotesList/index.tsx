import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";

// store imports
import { updateNotes } from "src/store/actions/notesActions";
import { updatePageMode } from "src/store/actions/pageSettingsActions";
import { PageSettingsState } from "src/store/types/pageSettings";
import { RootState } from "src/store/reducers";
import { Note as NoteType } from "src/store/types/notes";

// components
import { Note, PageHeader, SideBar } from "src/components";

// utils
import moment from "moment";
import { generateRandomId, getPageColors } from "src/common/functions";

// ant design imports
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import { Col, Row } from "antd";

type Props = {
  notesList: NoteType[];
  pageSettings: PageSettingsState;
  updateNotes: (updatedNotes: NoteType[]) => void;
};

const NotesList = (props: Props) => {
  const { notesList, pageSettings, updateNotes } = props;
  const [isShowColorSelection, setIsShowColorSelection] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [notes, setNotes] = useState<NoteType[]>(notesList);
  const hasNotes = notes.length > 0;
  const isDarkMode = pageSettings.isDarkMode;
  const pageColors = getPageColors(isDarkMode);

  const handleToggleColorSelection = () => {
    setIsShowColorSelection(!isShowColorSelection);
  };

  const [openNotes, setOpenNotes] = useState<string[]>([]);

  const handleAddNote = (color: string) => {
    const newNoteId = generateRandomId();

    setNotes((prev) => [
      {
        id: newNoteId,
        content: "",
        dateCreated: moment().format(),
        color: color,
      },
      ...prev,
    ]);

    handleToggleColorSelection();
    setOpenNotes([...openNotes, newNoteId]);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredKeyword = event.target.value;
    setSearchText(enteredKeyword);
  };

  const handleClearSearchText = () => {
    setSearchText("");
  };

  const displayedNotes = notes.filter((note) =>
    note.content.includes(searchText)
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        height: "100vh",
      }}
    >
      <SideBar
        hasOpenNotes={openNotes.length > 0}
        handleAddNote={handleAddNote}
      />
      <Layout className="site-layout w-100">
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            paddingTop: 0,
            minHeight: 280,
            background: pageColors.body,
            transition: "none",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <PageHeader
            hasOpenNotes={openNotes.length > 0}
            hasNotes={hasNotes}
            displayedNotes={displayedNotes}
            searchText={searchText}
            handleSearch={handleSearch}
            handleClearSearchText={handleClearSearchText}
          />
          <div className="mt-4">
            <Row justify="start" gutter={16}>
              {notes?.map((note) => {
                const isSearchResult = note.content.includes(searchText);

                const handleManageOpenNotes = (shouldClose: boolean) => {
                  if (shouldClose) {
                    setOpenNotes((prev) => prev.filter((id) => id !== note.id));
                  } else {
                    setOpenNotes([...openNotes, note.id]);
                  }
                };

                const handleRemoveNote = () => {
                  const newNotes = notes.filter(
                    (existingNote) => existingNote.id !== note.id
                  );

                  setNotes(newNotes);

                  updateNotes(newNotes);
                };

                const handleSaveChanges = (
                  id: string,
                  newContent: string,
                  newColor?: string
                ) => {
                  let tempNotes = notes;

                  tempNotes.forEach((existingNote) => {
                    if (existingNote.id === id) {
                      existingNote.content = newContent;

                      if (!!newColor) {
                        existingNote.color = newColor;
                      }
                    }
                  });

                  updateNotes(tempNotes);

                  setNotes(tempNotes);
                  handleManageOpenNotes(true);
                };

                return (
                  isSearchResult && (
                    <Col
                      sm={24}
                      md={12}
                      lg={8}
                      xl={6}
                      xxl={4}
                      className="w-100 mb-3"
                    >
                      <Note
                        key={note.id}
                        data={note}
                        onDelete={handleRemoveNote}
                        onSave={handleSaveChanges}
                        onManageOpenNotes={handleManageOpenNotes}
                        openNotes={openNotes}
                      />
                    </Col>
                  )
                );
              })}
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: 0,
            background: pageColors.body,
          }}
        >
          <span className={`${pageColors.text} d-block m-3`}>
            Notes App by{" "}
            <a
              href="https://markanjogalisa.web.app/"
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              Mark Galisa
            </a>
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    notesList: state.notes.list,
    pageSettings: state.pageSettings,
  };
};

export default connect(mapStateToProps, { updateNotes, updatePageMode })(
  NotesList
);
