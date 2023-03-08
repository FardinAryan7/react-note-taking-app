const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    
    const handleAddNote = () => {
      onAddNote();
    }

    function stripHtmlTags(html) {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      }
      
  
    if (!activeNote) {
      return (
        <div className="app-sidebar">
          <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={handleAddNote} className="app-sidebar-add-button">&#43;</button>
          </div>
          <div className="no-sidebar-note">No Note Yet</div>
        </div>
      );
    }
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button onClick={handleAddNote} className="app-sidebar-add-button">&#43;</button>
        </div>
        <div className="app-sidebar-notes">
          {notes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
              </div>
              <small className="note-meta">
                {new Date(lastModified).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    })
                }
              </small>
              <p className="sidebar-note-preview two-lines">{body && stripHtmlTags(body.substr(0, 100)) + "..."}</p>

              
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
