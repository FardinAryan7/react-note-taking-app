import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



const Main = ({ activeNote, onUpdateNote, onDeleteNote, onAddNote }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [viewMode, setViewMode] = useState("editor-body-edit");
  const [value, setValue] = useState(activeNote?.body || "");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setValue(activeNote?.body || "");
  }, [activeNote]);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setViewMode("editor-body-edit");
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setViewMode("editor-body-preview");
    onEditField("body", value);
  };

  const handleDeleteClick = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      onDeleteNote(activeNote.id);
    }
  };

  const titleTextareaRef = useRef(null);

  useEffect(() => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.selectionStart = titleTextareaRef.current.value.length;
      titleTextareaRef.current.selectionEnd = titleTextareaRef.current.value.length;
      titleTextareaRef.current.focus();
    }
  }, [activeNote]);

  if (!activeNote)
    return (
      <div className="no-active-note">
        Select a note, or create a new one.
      </div>
    );
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="editor-title">
          <div className="editor-title-input">
            <div className="editor-title-text">
                <textarea 
                className="textarea-text"
                type="text"
                id="title"
                placeholder="Note Title"
                value={activeNote.title}
                onChange={(e) => onEditField("title", e.target.value)}
                ref={titleTextareaRef}
                />
            </div>
            
            
          </div>

          <div className="editor-title-button">
            {isEditing ? (
              <button className="button-save" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="button-edit" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <button className="button-delete" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="editor-body">
        {viewMode === "editor-body-edit" ? (
          <ReactQuill
            className="editor-editor"
            theme="snow"
            value={value}
            onChange={(value) => setValue(value)}
          />
        ) : (
          <div
            className="editor-body-preview"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>
    </div>
  );
};

export default Main;