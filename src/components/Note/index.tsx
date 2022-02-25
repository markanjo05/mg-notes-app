import { Button } from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import TextArea, { TextAreaRef } from "antd/lib/input/TextArea";
import moment from "moment";
import { Note as NoteType } from "src/store/types/notes";
import { notesColorSelection } from "src/common/constants/colors";

type Props = {
  data: NoteType;
  onDelete: () => void;
  onSave: (id: string, newContent: string, newColor?: string) => void;
  onManageOpenNotes: (shouldClose: boolean) => void;
  openNotes: string[];
};

const Note = (props: Props) => {
  const { data: note, onDelete, onSave, onManageOpenNotes, openNotes } = props;
  const isNoteOpen = !!openNotes.find((openNote) => openNote === note.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowColorOptions, setIsShowColorOptions] = useState(false);
  const [isEdit, setIsEdit] = useState(isNoteOpen);
  const [noteContent, setNoteContent] = useState(note.content.trim());
  const [noteColor, setNoteColor] = useState(note.color);
  const inputRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
      setNoteContent(note.content.trim());
    }
  }, [isEdit, note]);

  const handleToggleMenu = (shouldPersistOpenNote?: boolean) => {
    if (!shouldPersistOpenNote) {
      onManageOpenNotes(isMenuOpen);
    }

    setIsMenuOpen(!isMenuOpen);
    setIsShowColorOptions(false);
  };

  const handleToggleEdit = () => {
    onManageOpenNotes(isEdit);

    setIsEdit(!isEdit);
  };

  const handleClickEditIcon = () => {
    handleToggleEdit();
    handleToggleMenu(true);
  };

  const handleClickTrashIcon = () => {
    onDelete();
    handleToggleMenu();

    if (isNoteOpen) {
      onManageOpenNotes(true);
    }
  };

  const handleClickColor = () => {
    setIsShowColorOptions(!isShowColorOptions);
  };

  const handleCancelChanges = () => {
    handleToggleEdit();
    setNoteContent(note.content);
    onManageOpenNotes(true);
  };

  const handleSaveChanges = (newColor?: string) => {
    setIsEdit(false);
    onSave(note.id, noteContent, newColor);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const isEnterKeyClicked = event.key === "Enter" && !event.shiftKey;

    if (!!noteContent.trim() && isEnterKeyClicked) {
      handleSaveChanges();
    }
  };

  return (
    <div
      style={{
        background: noteColor,
        borderRadius: "20px",
        width: "100%",
        height: 260,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {isEdit ? (
          <TextArea
            id="noteContent"
            value={noteContent}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={(event) =>
              event.currentTarget.setSelectionRange(
                event.currentTarget.value.length,
                event.currentTarget.value.length
              )
            }
            bordered={false}
            autoSize={false}
            style={{
              resize: "none",
              height: "195px",
              fontSize: "16px",
              fontStyle: "italic",
            }}
            className={"ps-0 pe-0"}
            ref={inputRef}
          />
        ) : (
          <div
            style={{
              height: "195px",
              fontSize: "16px",
            }}
          >
            <pre style={{ fontFamily: "inherit", fontSize: "inherit" }}>
              {noteContent}
            </pre>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between position-relative">
        <span>{moment(note.dateCreated).format("ll")}</span>
        <div>
          {isEdit ? (
            <>
              <Button
                type="primary"
                shape="circle"
                icon={!!note.content ? <CloseOutlined /> : <DeleteOutlined />}
                size="middle"
                style={{ background: "#000" }}
                className={"border-0"}
                onClick={
                  !!note.content ? handleCancelChanges : handleClickTrashIcon
                }
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CheckOutlined />}
                size="middle"
                style={{
                  background: !noteContent.trim() ? "#F5F5F5" : "#000",
                }}
                className={"border-0 ms-2"}
                onClick={() => handleSaveChanges()}
                disabled={!noteContent.trim()}
              />
            </>
          ) : (
            <Button
              type="primary"
              shape="circle"
              icon={isMenuOpen ? <CloseOutlined /> : <EllipsisOutlined />}
              size="middle"
              style={{
                background:
                  openNotes.length > 0 && !isNoteOpen ? "#F5F5F5" : "#000",
              }}
              className={"border-0"}
              onClick={() => handleToggleMenu()}
              disabled={openNotes.length > 0 && !isNoteOpen}
            />
          )}
        </div>
        {isMenuOpen && (
          <div
            className="d-flex flex-column"
            style={{
              position: "absolute",
              right: 0,
              bottom: 32,
            }}
          >
            {isShowColorOptions ? (
              notesColorSelection.map((color) => {
                const handleSelectNewColor = () => {
                  setNoteColor(color.value);
                  setIsShowColorOptions(false);
                  handleSaveChanges(color.value);
                  handleToggleMenu();
                };

                return (
                  color.value !== note.color && (
                    <Button
                      key={color.value}
                      type="primary"
                      shape="circle"
                      icon={
                        <Button
                          type="primary"
                          shape="circle"
                          size="small"
                          style={{
                            background: color.value,
                            minHeight: 20,
                            minWidth: 20,
                            width: 20,
                            height: 20,
                          }}
                          className={"border-0 d-flex mx-auto"}
                        >
                          {" "}
                        </Button>
                      }
                      size="middle"
                      style={{ background: "#000" }}
                      className={"border-0 mb-2"}
                      onClick={handleSelectNewColor}
                    />
                  )
                );
              })
            ) : (
              <>
                <Button
                  type="primary"
                  shape="circle"
                  icon={
                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      style={{
                        background: noteColor,
                        minHeight: 20,
                        minWidth: 20,
                        width: 20,
                        height: 20,
                      }}
                      className={"border-0 d-flex mx-auto"}
                    >
                      {" "}
                    </Button>
                  }
                  size="middle"
                  style={{ background: "#000" }}
                  className={"border-0 mb-2"}
                  onClick={handleClickColor}
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  size="middle"
                  style={{ background: "#000" }}
                  className={"border-0 mb-2"}
                  onClick={handleClickEditIcon}
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="middle"
                  style={{ background: "#000" }}
                  className={"border-0 mb-2"}
                  onClick={handleClickTrashIcon}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
