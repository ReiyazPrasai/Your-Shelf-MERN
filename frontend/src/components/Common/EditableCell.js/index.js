import React, { useContext, useState, useEffect, useRef } from "react";

import "./index.css";

export const EditableContext = React.createContext(null);

export const EditableRow = ({ index, ...props }) => {
  return (
    <EditableContext.Provider value={props}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  editComponent,
  isAdd,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const Element =
    editComponent instanceof Function
      ? editComponent(record[dataIndex], record, toggleEdit)
      : editComponent;

  let childNode = children;

  if (editable) {
    if (isAdd !== "new") {
      childNode =
        editing || editable === "always" ? (
          Element
        ) : (
          <div
            className="editable-cell-value-wrap edit"
            style={{
              paddingRight: 24,
            }}
            onClick={() => isAdd !== "new" && toggleEdit()}
          >
            {children}
          </div>
        );
    } else {
      childNode =
        record._id === "new" ? (
          Element
        ) : (
          <div
            className="editable-cell-value-wrap edit"
            style={{
              paddingRight: 24,
            }}
            onClick={() => isAdd !== "new" && toggleEdit()}
          >
            {children}
          </div>
        );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export const getColumns = (columns) =>
  columns?.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editComponent: col.editComponent,
        isAdd: col.isAdd,
      }),
    };
  });
